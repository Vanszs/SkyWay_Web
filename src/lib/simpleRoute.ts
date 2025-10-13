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
  
  // First, try direct line with expanded safety buffer
  const directLine = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]])
  
  // Check if direct line has collisions with expanded buffer
  let hasCollision = false
  for (const building of buildings) {
    // Check direct intersection
    if (turf.booleanIntersects(directLine, building)) {
      hasCollision = true
      break
    }
    
    // Check if line is too close to building (within safe distance)
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
  
  // If no collision, return direct route
  if (!hasCollision) {
    console.log('Direct route is safe, returning straight line')
    return [start, end]
  }
  
  // If there are collisions, create waypoints to avoid buildings
  console.log('Direct route has collisions, creating simple avoidance waypoints')
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
  
  // Find buildings that intersect with the direct path or are too close
  const intersectingBuildings = buildings.filter(building => {
    const line = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]])
    
    // Check direct intersection
    if (turf.booleanIntersects(line, building)) {
      return true
    }
    
    // Check if line is too close to building
    const buildingCenter = turf.center(building)
    const distance = turf.pointToLineDistance(
      buildingCenter,
      line,
      { units: 'kilometers' }
    )
    
    return distance < safeDistanceKm
  })
  
  console.log(`Found ${intersectingBuildings.length} buildings to avoid`)
  
  // If no buildings to avoid, return direct route
  if (intersectingBuildings.length === 0) {
    return [start, end]
  }
  
  // Sort buildings by distance from start
  const sortedBuildings = intersectingBuildings.sort((a, b) => {
    const centerA = turf.center(a)
    const centerB = turf.center(b)
    const distA = turf.distance(startToPoint, centerA, { units: 'kilometers' })
    const distB = turf.distance(startToPoint, centerB, { units: 'kilometers' })
    return distA - distB
  })
  
  // For each building, create waypoints to go around it
  let currentPoint = start
  
  // Limit the number of buildings to avoid to prevent infinite loops
  const maxBuildingsToAvoid = Math.min(5, sortedBuildings.length)
  
  for (let i = 0; i < maxBuildingsToAvoid; i++) {
    const building = sortedBuildings[i]
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
    
    // Calculate building bounds to ensure we go around it completely
    const buildingBounds = turf.bbox(building)
    const buildingWidth = Math.abs(buildingBounds[2] - buildingBounds[0]) // lng difference
    const buildingHeight = Math.abs(buildingBounds[3] - buildingBounds[1]) // lat difference
    
    // Calculate avoidance distance based on building size plus safe margin
    const avoidanceDistance = Math.max(
      safeDistanceKm * 3, // Triple the safe distance for better avoidance
      Math.max(buildingWidth, buildingHeight) + safeDistanceKm * 2
    )
    
    // Calculate perpendicular bearing to go around the building
    const toBuilding = turf.bearing(
      turf.point([currentPoint.lng, currentPoint.lat]),
      buildingCenter
    )
    
    // Create multiple avoidance points to ensure we go around the building
    const leftAvoidanceBearing = (toBuilding - 90 + 360) % 360
    const rightAvoidanceBearing = (toBuilding + 90) % 360
    
    // Calculate avoidance points at safe distance
    const leftAvoidancePoint = turf.destination(
      buildingCenter,
      avoidanceDistance,
      leftAvoidanceBearing,
      { units: 'kilometers' }
    )
    
    const rightAvoidancePoint = turf.destination(
      buildingCenter,
      avoidanceDistance,
      rightAvoidanceBearing,
      { units: 'kilometers' }
    )
    
    // Test both avoidance points to see which gives a better path to target
    const leftPathDistance = turf.distance(
      leftAvoidancePoint,
      endPoint,
      { units: 'kilometers' }
    )
    
    const rightPathDistance = turf.distance(
      rightAvoidancePoint,
      endPoint,
      { units: 'kilometers' }
    )
    
    // Choose the avoidance point that gives shorter remaining distance
    const chosenAvoidancePoint = leftPathDistance < rightPathDistance
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

// Create a more robust avoidance route with multiple checkpoints
function createRobustAvoidanceRoute(
  start: Point,
  end: Point,
  buildings: any[],
  safeDistance: number
): Point[] {
  const route: Point[] = [start]
  const safeDistanceKm = safeDistance / 1000
  
  // Calculate total distance
  const totalDistance = turf.distance(
    turf.point([start.lng, start.lat]),
    turf.point([end.lng, end.lat]),
    { units: 'kilometers' }
  )
  
  // Calculate bearing from start to end
  const startPoint = turf.point([start.lng, start.lat])
  const endPoint = turf.point([end.lng, end.lat])
  const bearing = turf.bearing(startPoint, endPoint)
  
  // Create intermediate checkpoints along the path
  const numCheckpoints = Math.max(3, Math.ceil(totalDistance / 2)) // One checkpoint every 2km
  let currentPoint = start
  
  for (let i = 1; i <= numCheckpoints; i++) {
    // Calculate the target point along the direct path
    const targetDistance = (totalDistance / numCheckpoints) * i
    let targetPoint = turf.destination(
      startPoint,
      targetDistance,
      bearing,
      { units: 'kilometers' }
    )
    
    // If this is the last checkpoint, use the end point
    if (i === numCheckpoints) {
      targetPoint = endPoint
    }
    
    // Check if the path from currentPoint to targetPoint has collisions
    const testLine = turf.lineString([
      [currentPoint.lng, currentPoint.lat],
      [targetPoint.geometry.coordinates[0], targetPoint.geometry.coordinates[1]]
    ])
    
    let hasCollision = false
    let closestBuilding = null
    let minDistance = Infinity
    
    for (const building of buildings) {
      // Check direct intersection
      if (turf.booleanIntersects(testLine, building)) {
        hasCollision = true
        const buildingCenter = turf.center(building)
        const distance = turf.distance(
          turf.point([currentPoint.lng, currentPoint.lat]),
          buildingCenter,
          { units: 'kilometers' }
        )
        
        if (distance < minDistance) {
          minDistance = distance
          closestBuilding = building
        }
      }
      
      // Check if line is too close to building
      const buildingCenter = turf.center(building)
      const distance = turf.pointToLineDistance(
        buildingCenter,
        testLine,
        { units: 'kilometers' }
      )
      
      if (distance < safeDistanceKm) {
        hasCollision = true
        if (distance < minDistance) {
          minDistance = distance
          closestBuilding = building
        }
      }
    }
    
    if (hasCollision && closestBuilding) {
      // Create avoidance waypoints around the closest building
      const buildingCenter = turf.center(closestBuilding)
      const buildingBounds = turf.bbox(closestBuilding)
      const buildingWidth = Math.abs(buildingBounds[2] - buildingBounds[0])
      const buildingHeight = Math.abs(buildingBounds[3] - buildingBounds[1])
      
      // Calculate avoidance distance
      const avoidanceDistance = Math.max(
        safeDistanceKm * 2.5, // Even larger safe distance
        Math.max(buildingWidth, buildingHeight) + safeDistanceKm
      )
      
      // Calculate perpendicular bearings
      const toBuilding = turf.bearing(
        turf.point([currentPoint.lng, currentPoint.lat]),
        buildingCenter
      )
      
      const leftAvoidanceBearing = (toBuilding - 90 + 360) % 360
      const rightAvoidanceBearing = (toBuilding + 90) % 360
      
      // Calculate avoidance points
      const leftAvoidancePoint = turf.destination(
        buildingCenter,
        avoidanceDistance,
        leftAvoidanceBearing,
        { units: 'kilometers' }
      )
      
      const rightAvoidancePoint = turf.destination(
        buildingCenter,
        avoidanceDistance,
        rightAvoidanceBearing,
        { units: 'kilometers' }
      )
      
      // Test both avoidance points
      const leftPathDistance = turf.distance(
        leftAvoidancePoint,
        targetPoint,
        { units: 'kilometers' }
      )
      
      const rightPathDistance = turf.distance(
        rightAvoidancePoint,
        targetPoint,
        { units: 'kilometers' }
      )
      
      // Choose the better avoidance point
      const chosenAvoidancePoint = leftPathDistance < rightPathDistance
        ? leftAvoidancePoint
        : rightAvoidancePoint
      
      const waypoint: Point = {
        lat: chosenAvoidancePoint.geometry.coordinates[1],
        lng: chosenAvoidancePoint.geometry.coordinates[0]
      }
      
      route.push(waypoint)
      currentPoint = waypoint
      
      // Don't advance the target point, we'll try again from the new position
      i--
    } else {
      // No collision, add the target point to the route
      const waypoint: Point = {
        lat: targetPoint.geometry.coordinates[1],
        lng: targetPoint.geometry.coordinates[0]
      }
      
      route.push(waypoint)
      currentPoint = waypoint
    }
  }
  
  // Ensure the end point is included
  if (route[route.length - 1].lat !== end.lat || route[route.length - 1].lng !== end.lng) {
    route.push(end)
  }
  
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