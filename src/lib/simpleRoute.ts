import { Point } from '@/types/route'
import * as turf from '@turf/turf'

// Simple route calculation with collision avoidance
export function calculateSimpleRoute(
  start: Point,
  end: Point,
  buildings: any[],
  safeDistance: number = 50 // 50 meters safe distance
): Point[] {
  console.log('Calculating simple route with collision avoidance')
  
  // First, try direct line
  const directLine = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]])
  
  // Check if direct line has collisions
  let hasCollision = false
  for (const building of buildings) {
    if (turf.booleanIntersects(directLine, building)) {
      hasCollision = true
      break
    }
  }
  
  // If no collision, return direct route
  if (!hasCollision) {
    console.log('Direct route is safe, returning straight line')
    return [start, end]
  }
  
  // If there are collisions, create waypoints to avoid buildings
  console.log('Direct route has collisions, creating avoidance waypoints')
  return createAvoidanceWaypoints(start, end, buildings, safeDistance)
}

// Create waypoints to avoid buildings
function createAvoidanceWaypoints(
  start: Point,
  end: Point,
  buildings: any[],
  safeDistance: number
): Point[] {
  const route: Point[] = [start]
  const safeDistanceKm = safeDistance / 1000 // Convert to kilometers
  
  // Calculate bearing from start to end
  const startToPoint = turf.point([start.lng, start.lat])
  const endPoint = turf.point([end.lng, end.lat])
  const bearing = turf.bearing(startToPoint, endPoint)
  
  // Find buildings that intersect with the direct path
  const intersectingBuildings = buildings.filter(building => {
    const line = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]])
    return turf.booleanIntersects(line, building)
  })
  
  console.log(`Found ${intersectingBuildings.length} buildings to avoid`)
  
  // Sort buildings by distance from start
  const sortedBuildings = intersectingBuildings.sort((a, b) => {
    const centerA = turf.center(a)
    const centerB = turf.center(b)
    const distA = turf.distance(startToPoint, centerA, { units: 'kilometers' })
    const distB = turf.distance(startToPoint, centerB, { units: 'kilometers' })
    return distA - distB
  })
  
  let currentPoint = start
  
  // For each building, create waypoints to go around it
  for (const building of sortedBuildings) {
    const buildingCenter = turf.center(building)
    const buildingDistance = turf.distance(
      turf.point([currentPoint.lng, currentPoint.lat]),
      buildingCenter,
      { units: 'kilometers' }
    )
    
    // If we've passed this building, skip it
    if (buildingDistance > turf.distance(startToPoint, endPoint, { units: 'kilometers' })) {
      continue
    }
    
    // Calculate perpendicular bearing to go around the building
    const toBuilding = turf.bearing(
      turf.point([currentPoint.lng, currentPoint.lat]),
      buildingCenter
    )
    
    // Create two possible avoidance points (left and right of building)
    const leftAvoidanceBearing = (toBuilding - 90 + 360) % 360
    const rightAvoidanceBearing = (toBuilding + 90) % 360
    
    // Calculate avoidance points at safe distance
    const leftAvoidancePoint = turf.destination(
      buildingCenter,
      safeDistanceKm,
      leftAvoidanceBearing,
      { units: 'kilometers' }
    )
    
    const rightAvoidancePoint = turf.destination(
      buildingCenter,
      safeDistanceKm,
      rightAvoidanceBearing,
      { units: 'kilometers' }
    )
    
    // Choose the avoidance point that's closer to our target bearing
    const leftBearingDiff = Math.abs(
      turf.bearing(
        turf.point([currentPoint.lng, currentPoint.lat]),
        leftAvoidancePoint
      ) - bearing
    )
    
    const rightBearingDiff = Math.abs(
      turf.bearing(
        turf.point([currentPoint.lng, currentPoint.lat]),
        rightAvoidancePoint
      ) - bearing
    )
    
    const chosenAvoidancePoint = leftBearingDiff < rightBearingDiff 
      ? leftAvoidancePoint 
      : rightAvoidancePoint
    
    const waypoint: Point = {
      lat: chosenAvoidancePoint.geometry.coordinates[1],
      lng: chosenAvoidancePoint.geometry.coordinates[0]
    }
    
    route.push(waypoint)
    currentPoint = waypoint
  }
  
  // Add final destination
  route.push(end)
  
  // Optimize the route by removing unnecessary waypoints
  return optimizeRoute(route, buildings, safeDistance)
}

// Optimize route by removing waypoints that aren't needed
function optimizeRoute(
  route: Point[],
  buildings: any[],
  safeDistance: number
): Point[] {
  if (route.length <= 2) return route
  
  const optimized: Point[] = [route[0]]
  
  for (let i = 1; i < route.length - 1; i++) {
    const prev = optimized[optimized.length - 1]
    const current = route[i]
    const next = route[i + 1]
    
    // Check if we can remove current point (direct path from prev to next is safe)
    const directLine = turf.lineString([[prev.lng, prev.lat], [next.lng, next.lat]])
    let hasCollision = false
    
    for (const building of buildings) {
      // Check for direct intersection
      if (turf.booleanIntersects(directLine, building)) {
        hasCollision = true
        break
      }
      
      // Check if we're too close to building (within safe distance)
      const buildingCenter = turf.center(building)
      const distance = turf.pointToLineDistance(
        buildingCenter,
        directLine,
        { units: 'kilometers' }
      )
      
      if (distance < safeDistance / 1000) {
        hasCollision = true
        break
      }
    }
    
    if (hasCollision) {
      optimized.push(current)
    }
  }
  
  optimized.push(route[route.length - 1])
  
  console.log(`Optimized route from ${route.length} points to ${optimized.length} points`)
  return optimized
}

// Check if a route is safe (no collisions within safe distance)
export function isRouteSafe(
  route: Point[],
  buildings: any[],
  safeDistance: number = 50
): boolean {
  const safeDistanceKm = safeDistance / 1000
  
  for (let i = 0; i < route.length - 1; i++) {
    const line = turf.lineString([
      [route[i].lng, route[i].lat],
      [route[i + 1].lng, route[i + 1].lat]
    ])
    
    for (const building of buildings) {
      // Check for direct intersection
      if (turf.booleanIntersects(line, building)) {
        return false
      }
      
      // Check if we're too close to building
      const buildingCenter = turf.center(building)
      const distance = turf.pointToLineDistance(
        buildingCenter,
        line,
        { units: 'kilometers' }
      )
      
      if (distance < safeDistanceKm) {
        return false
      }
    }
  }
  
  return true
}

// Calculate total route distance
export function calculateRouteDistance(route: Point[]): number {
  let totalDistance = 0
  
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += turf.distance(
      turf.point([route[i].lng, route[i].lat]),
      turf.point([route[i + 1].lng, route[i + 1].lat]),
      { units: 'kilometers' }
    )
  }
  
  return totalDistance
}