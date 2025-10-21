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
  
  // Otherwise, create waypoints to avoid buildings
  console.log('Direct line unsafe, creating avoidance waypoints')
  
  // Calculate intermediate waypoints
  const numWaypoints = 5 // Fixed number of waypoints for simplicity
  const totalDistance = turf.distance(
    turf.point([start.lng, start.lat]),
    turf.point([end.lng, end.lat]),
    { units: 'kilometers' }
  )
  
  for (let i = 1; i < numWaypoints; i++) {
    const fraction = i / numWaypoints
    const targetPoint = turf.along(directLine, fraction * totalDistance, { units: 'kilometers' })
    
    // Check if this segment intersects with any building buffer
    const prevPoint = route[route.length - 1]
    const testLine = turf.lineString([
      [prevPoint.lng, prevPoint.lat],
      [targetPoint.geometry.coordinates[0], targetPoint.geometry.coordinates[1]]
    ])
    
    let hasCollision = false
    let closestBuilding = null
    let minDistance = Infinity
    
    for (const building of buildings) {
      const buffered = turf.buffer(building, safeDistanceKm, { units: 'kilometers' })
      if (buffered && turf.booleanIntersects(testLine, buffered)) {
        hasCollision = true
        const buildingCenter = turf.center(building)
        const distance = turf.distance(
          turf.point([prevPoint.lng, prevPoint.lat]),
          buildingCenter,
          { units: 'kilometers' }
        )
        
        if (distance < minDistance) {
          minDistance = distance
          closestBuilding = building
        }
      }
    }
    
    if (hasCollision && closestBuilding) {
      // Create avoidance waypoint
      const buildingCenter = turf.center(closestBuilding)
      const avoidanceDistance = safeDistanceKm * 2 // 200m buffer for avoidance
      
      // Calculate perpendicular direction to go around building
      const toBuilding = turf.bearing(
        turf.point([prevPoint.lng, prevPoint.lat]),
        buildingCenter
      )
      
      // Go around the building (left or right)
      const leftBearing = (toBuilding - 90 + 360) % 360
      const rightBearing = (toBuilding + 90) % 360
      
      // Try both directions
      const leftPoint = turf.destination(
        buildingCenter,
        avoidanceDistance,
        leftBearing,
        { units: 'kilometers' }
      )
      
      const rightPoint = turf.destination(
        buildingCenter,
        avoidanceDistance,
        rightBearing,
        { units: 'kilometers' }
      )
      
      // Choose the better option
      const leftDistance = turf.distance(
        leftPoint,
        turf.point([end.lng, end.lat]),
        { units: 'kilometers' }
      )
      
      const rightDistance = turf.distance(
        rightPoint,
        turf.point([end.lng, end.lat]),
        { units: 'kilometers' }
      )
      
      const chosenPoint = leftDistance < rightDistance ? leftPoint : rightPoint
      
      const waypoint: Point = {
        lat: chosenPoint.geometry.coordinates[1],
        lng: chosenPoint.geometry.coordinates[0]
      }
      
      route.push(waypoint)
    } else {
      // No collision, add the target point
      const waypoint: Point = {
        lat: targetPoint.geometry.coordinates[1],
        lng: targetPoint.geometry.coordinates[0]
      }
      
      route.push(waypoint)
    }
  }
  
  // Add final destination
  route.push(end)
  
  // Optimize route by removing unnecessary waypoints
  return optimizeSimpleRoute(route, buildings, safeDistance)
}

// Simple route optimization
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
    
    // Check if we can remove current point
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
  }
  
  optimized.push(route[route.length - 1])
  
  console.log(`Fake PSO: Optimized from ${route.length} to ${optimized.length} waypoints`)
  return optimized
}