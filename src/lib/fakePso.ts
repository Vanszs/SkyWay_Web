import { Point } from '@/types/route'
import * as turf from '@turf/turf'

// Simple fake PSO that creates waypoints to avoid buildings without complex optimization
export function calculateFakePSORoute(
  start: Point,
  end: Point,
  buildings: any[],
  safeDistance: number = 100 // 100 meters
): Point[] {
  console.log('Using Fake PSO - simple obstacle avoidance')
  
  const safeDistanceKm = safeDistance / 1000
  const route: Point[] = [start]
  
  // Create direct line
  const directLine = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]])
  
  // Check if direct line is safe
  let isSafe = true
  for (const building of buildings) {
    const buffered = turf.buffer(building, safeDistanceKm, { units: 'kilometers' })
    if (buffered && turf.booleanIntersects(directLine, buffered)) {
      isSafe = false
      break
    }
  }
  
  // If direct line is safe, return it
  if (isSafe) {
    console.log('Direct line is safe, returning straight route')
    return [start, end]
  }
  
  // Otherwise, create waypoints to avoid buildings with smooth curves
  console.log('Direct line unsafe, creating smooth avoidance waypoints')
  
  // Find all buildings that intersect with the direct line
  const intersectingBuildings = []
  for (const building of buildings) {
    const buffered = turf.buffer(building, safeDistanceKm, { units: 'kilometers' })
    if (buffered && turf.booleanIntersects(directLine, buffered)) {
      intersectingBuildings.push(building)
    }
  }
  
  // Sort buildings by distance from start
  intersectingBuildings.sort((a, b) => {
    const centerA = turf.center(a)
    const centerB = turf.center(b)
    const distA = turf.distance(
      turf.point([start.lng, start.lat]),
      centerA,
      { units: 'kilometers' }
    )
    const distB = turf.distance(
      turf.point([start.lng, start.lat]),
      centerB,
      { units: 'kilometers' }
    )
    return distA - distB
  })
  
  let currentPoint = start
  
  // Create smooth waypoints around each building
  for (const building of intersectingBuildings) {
    const buildingCenter = turf.center(building)
    const buildingBounds = turf.bbox(building)
    
    // Calculate building dimensions
    const buildingWidth = Math.abs(buildingBounds[2] - buildingBounds[0]) // lng difference
    const buildingHeight = Math.abs(buildingBounds[3] - buildingBounds[1]) // lat difference
    
    // Calculate safe distance (building size + safety margin)
    const safeDistance = Math.max(
      safeDistanceKm * 2, // 200m minimum
      Math.max(buildingWidth, buildingHeight) + safeDistanceKm
    )
    
    // Calculate approach and exit angles for smooth turns
    const approachAngle = turf.bearing(
      turf.point([currentPoint.lng, currentPoint.lat]),
      buildingCenter
    )
    
    const exitAngle = turf.bearing(
      buildingCenter,
      turf.point([end.lng, end.lat])
    )
    
    // Determine which side to go around (left or right)
    const angleDiff = ((exitAngle - approachAngle + 180) % 360) - 180
    const goLeft = angleDiff > 0
    
    // Calculate smooth arc waypoints
    const arcRadius = safeDistance
    const arcAngle = 90 // 90 degree arc around building
    const numArcPoints = 3 // Number of points in the arc for smoothness
    
    // Start point of arc (before building)
    const startArcAngle = approachAngle + (goLeft ? -90 : 90)
    const startArcPoint = turf.destination(
      buildingCenter,
      arcRadius,
      startArcAngle,
      { units: 'kilometers' }
    )
    
    // Add approach waypoint to smooth the turn
    const approachDistance = Math.min(arcRadius * 0.5, 0.1) // Max 100m approach
    const approachPoint = turf.destination(
      turf.point([currentPoint.lng, currentPoint.lat]),
      approachDistance,
      startArcAngle,
      { units: 'kilometers' }
    )
    
    route.push({
      lat: approachPoint.geometry.coordinates[1],
      lng: approachPoint.geometry.coordinates[0]
    })
    
    // Add arc waypoints for smooth turn around building
    for (let i = 1; i <= numArcPoints; i++) {
      const arcProgress = i / numArcPoints
      const currentArcAngle = startArcAngle + (goLeft ? arcAngle : -arcAngle) * arcProgress
      
      const arcPoint = turf.destination(
        buildingCenter,
        arcRadius,
        currentArcAngle,
        { units: 'kilometers' }
      )
      
      route.push({
        lat: arcPoint.geometry.coordinates[1],
        lng: arcPoint.geometry.coordinates[0]
      })
    }
    
    // Exit point of arc (after building)
    const exitArcAngle = startArcAngle + (goLeft ? arcAngle : -arcAngle)
    const exitArcPoint = turf.destination(
      buildingCenter,
      arcRadius,
      exitArcAngle,
      { units: 'kilometers' }
    )
    
    // Add exit waypoint to smooth the turn
    const exitDistance = Math.min(arcRadius * 0.5, 0.1) // Max 100m exit
    const exitPoint = turf.destination(
      exitArcPoint,
      exitDistance,
      exitArcAngle,
      { units: 'kilometers' }
    )
    
    route.push({
      lat: exitPoint.geometry.coordinates[1],
      lng: exitPoint.geometry.coordinates[0]
    })
    
    currentPoint = {
      lat: exitPoint.geometry.coordinates[1],
      lng: exitPoint.geometry.coordinates[0]
    }
  }
  
  // Add final destination
  route.push(end)
  
  // Optimize route by removing unnecessary waypoints
  return optimizeSimpleRoute(route, buildings, safeDistance)
}

// Enhanced route optimization with smooth curve preservation
function optimizeSimpleRoute(
  route: Point[],
  buildings: any[],
  safeDistance: number
): Point[] {
  if (route.length <= 2) return route
  
  const optimized: Point[] = [route[0]]
  const safeDistanceKm = safeDistance / 1000
  
  for (let i = 1; i < route.length - 1; i++) {
    const prev = optimized[optimized.length - 1]
    const current = route[i]
    const next = route[i + 1]
    
    // Calculate turn angle to preserve smooth curves
    const angle1 = Math.atan2(
      current.lat - prev.lat,
      current.lng - prev.lng
    )
    const angle2 = Math.atan2(
      next.lat - current.lat,
      next.lng - current.lng
    )
    let angleDiff = Math.abs(angle2 - angle1)
    
    // Normalize angle difference to [0, π]
    if (angleDiff > Math.PI) {
      angleDiff = 2 * Math.PI - angleDiff
    }
    
    // Keep waypoints that create sharp turns (> 30 degrees)
    const isSharpTurn = angleDiff > (Math.PI / 6) // 30 degrees
    
    // Check if we can remove current point (only if not a sharp turn)
    if (!isSharpTurn) {
      const directLine = turf.lineString([[prev.lng, prev.lat], [next.lng, next.lat]])
      let canRemove = true
      
      for (const building of buildings) {
        const buffered = turf.buffer(building, safeDistanceKm, { units: 'kilometers' })
        if (buffered && turf.booleanIntersects(directLine, buffered)) {
          canRemove = false
          break
        }
      }
      
      if (!canRemove) {
        optimized.push(current)
      }
    } else {
      // Keep sharp turn waypoints for smooth navigation
      optimized.push(current)
    }
  }
  
  optimized.push(route[route.length - 1])
  
  // Add intermediate points for very long straight segments to maintain smoothness
  const finalOptimized: Point[] = [optimized[0]]
  for (let i = 1; i < optimized.length; i++) {
    const prev = finalOptimized[finalOptimized.length - 1]
    const current = optimized[i]
    
    const segmentDistance = turf.distance(
      turf.point([prev.lng, prev.lat]),
      turf.point([current.lng, current.lat]),
      { units: 'kilometers' }
    )
    
    // Add intermediate point if segment is too long (> 500m)
    if (segmentDistance > 0.5) {
      const midPoint = turf.midpoint(
        turf.point([prev.lng, prev.lat]),
        turf.point([current.lng, current.lat])
      )
      
      finalOptimized.push({
        lat: midPoint.geometry.coordinates[1],
        lng: midPoint.geometry.coordinates[0]
      })
    }
    
    finalOptimized.push(current)
  }
  
  console.log(`Fake PSO: Optimized from ${route.length} to ${finalOptimized.length} waypoints with smooth curves`)
  return finalOptimized
}