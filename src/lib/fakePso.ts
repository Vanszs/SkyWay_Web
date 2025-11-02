import { Point } from '@/types/route'
import * as turf from '@turf/turf'

// 🎯 Enhanced PSO: Rute mengikuti tepi buffer 100m, bukan masuk ke dalam
export function calculateFakePSORoute(
  start: Point,
  end: Point,
  buildings: any[],
  safeDistance: number = 100 // 100 meters
): Point[] {
  console.log('🚁 DEBUG: Starting Enhanced PSO route calculation')
  console.log(`🚁 DEBUG: Start point: [${start.lng}, ${start.lat}]`)
  console.log(`🚁 DEBUG: End point: [${end.lng}, ${end.lat}]`)
  console.log(`🚁 DEBUG: Total buildings: ${buildings.length}`)
  
  const safeDistanceKm = safeDistance / 1000
  
  // 1️⃣ Buat garis lurus start → end
  const straightLine = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]])
  // 2️⃣ Buat buffer groups (gabungkan buffer yang overlap/menyatu)
  const bufferGroups = createBufferGroups(buildings, safeDistanceKm)
  
  console.log(`📦 DEBUG: Created ${bufferGroups.length} buffer groups`)
  
  // 3️⃣ Jika tidak ada buffer yang terbentuk, return garis lurus
  if (bufferGroups.length === 0) {
    console.log('✅ No buildings to avoid, using straight line')
    return [start, end]
  }
  
  // 4️⃣ Cek apakah garis lurus memotong salah satu buffer group
  const intersectingGroups = bufferGroups.filter(group => 
    turf.booleanIntersects(straightLine, group.buffer)
  )
  
  console.log(`🔍 DEBUG: ${intersectingGroups.length} buffer groups intersect the direct path`)
  
  if (intersectingGroups.length === 0) {
    console.log('✅ Direct line is safe from all buffer groups')
    return [start, end]
  }
  
  // 5️⃣ Jika ada intersection, gunakan iterative multi-obstacle routing
  console.log('⚠️ Direct line intersects obstacles, calculating multi-obstacle route')
  return calculateMultiObstacleRoute(start, end, intersectingGroups, straightLine, safeDistanceKm)
}

// 📦 NEW: Buat buffer groups - gabungkan buffer yang overlap/menyatu
function createBufferGroups(
  buildings: any[],
  safeDistanceKm: number
): Array<{ buffer: any; buildingIndices: number[]; isMerged: boolean }> {
  if (buildings.length === 0) return []
  
  console.log(`📦 DEBUG: Creating buffer groups from ${buildings.length} buildings...`)
  
  try {
    // 1️⃣ Buat buffer untuk setiap gedung
    const buffers = buildings
      .map((building, index) => {
        try {
          const buffer = turf.buffer(building, safeDistanceKm, { units: 'kilometers' })
          return { buffer, buildingIndex: index }
        } catch (e) {
          console.warn(`Failed to buffer building ${index}:`, e)
          return null
        }
      })
      .filter(b => b !== null) as Array<{ buffer: any; buildingIndex: number }>
    
    if (buffers.length === 0) return []
    
    // 2️⃣ Group buffers yang overlap/menyatu
    const processed = new Set<number>()
    const groups: Array<{ buffer: any; buildingIndices: number[]; isMerged: boolean }> = []
    
    for (let i = 0; i < buffers.length; i++) {
      if (processed.has(i)) continue
      
      let groupBuffer = buffers[i].buffer
      const buildingIndices = [buffers[i].buildingIndex]
      processed.add(i)
      
      // Cari buffer lain yang overlap dengan group ini
      let foundOverlap = true
      while (foundOverlap) {
        foundOverlap = false
        
        for (let j = 0; j < buffers.length; j++) {
          if (processed.has(j)) continue
          
          try {
            // Cek apakah buffer[j] overlap atau touch dengan groupBuffer
            const overlaps = turf.booleanOverlap(groupBuffer, buffers[j].buffer)
            const intersects = turf.booleanIntersects(groupBuffer, buffers[j].buffer)
            
            if (overlaps || intersects) {
              console.log(`📦 DEBUG: Buffer ${buffers[j].buildingIndex} overlaps with group (${buildingIndices.join(', ')})`)
              
              // Merge ke group
              const unionResult = turf.union(
                turf.featureCollection([groupBuffer, buffers[j].buffer])
              )
              
              if (unionResult) {
                groupBuffer = unionResult
                buildingIndices.push(buffers[j].buildingIndex)
                processed.add(j)
                foundOverlap = true
                console.log(`📦 DEBUG: Successfully merged buffer ${buffers[j].buildingIndex} into group`)
              }
            }
          } catch (e) {
            console.warn(`Failed to check/union buffer ${j}:`, e)
          }
        }
      }
      
      const isMerged = buildingIndices.length > 1
      console.log(`📦 DEBUG: Created buffer group with ${buildingIndices.length} building(s) ${isMerged ? '(MERGED)' : '(SINGLE)'}: [${buildingIndices.join(', ')}]`)
      
      groups.push({
        buffer: groupBuffer,
        buildingIndices,
        isMerged
      })
    }
    
    console.log(`✅ Created ${groups.length} buffer groups total`)
    return groups
    
  } catch (e) {
    console.error('Error creating buffer groups:', e)
    return []
  }
}

// 🎯 NEW: Calculate route with multiple obstacles (iterative approach)
function calculateMultiObstacleRoute(
  start: Point,
  end: Point,
  obstacleGroups: Array<{ buffer: any; buildingIndices: number[]; isMerged: boolean }>,
  straightLine: any,
  safeDistanceKm: number
): Point[] {
  console.log(`🎯 DEBUG: Starting multi-obstacle route calculation with ${obstacleGroups.length} obstacle groups`)
  
  // Sort obstacle groups by distance from start
  const startPoint = turf.point([start.lng, start.lat])
  const sortedObstacles = obstacleGroups
    .map(group => {
      const groupCenter = turf.center(group.buffer)
      const distFromStart = turf.distance(startPoint, groupCenter, { units: 'kilometers' })
      return { ...group, distFromStart }
    })
    .sort((a, b) => a.distFromStart - b.distFromStart)
  
  console.log('🎯 DEBUG: Sorted obstacles by distance from start:')
  sortedObstacles.forEach((obstacle, index) => {
    console.log(`  Obstacle ${index}: distance=${(obstacle.distFromStart * 1000).toFixed(0)}m, buildings=[${obstacle.buildingIndices.join(', ')}], merged=${obstacle.isMerged}`)
  })
  
  let currentPos = start
  const route: Point[] = [start]
  let processedObstacles = 0
  
  for (const obstacle of sortedObstacles) {
    console.log(`\n🎯 DEBUG: Processing obstacle group ${processedObstacles + 1}/${sortedObstacles.length}`)
    console.log(`  Buildings: [${obstacle.buildingIndices.join(', ')}], Merged: ${obstacle.isMerged}`)
    
    // Cek apakah path currentPos → end memotong obstacle ini
    const pathToEnd = turf.lineString([[currentPos.lng, currentPos.lat], [end.lng, end.lat]])
    const intersectsObstacle = turf.booleanIntersects(pathToEnd, obstacle.buffer)
    
    if (!intersectsObstacle) {
      console.log(`  ✓ Path does not intersect this obstacle, skipping`)
      continue
    }
    
    console.log(`  ⚠️ Path intersects this obstacle, calculating avoidance...`)
    
    // Hitung rute keliling obstacle ini
    const avoidanceRoute = calculateObstacleAvoidance(
      currentPos,
      end,
      obstacle.buffer,
      safeDistanceKm
    )
    
    if (avoidanceRoute && avoidanceRoute.length > 1) {
      // Tambahkan waypoints (skip first point karena itu currentPos)
      const newWaypoints = avoidanceRoute.slice(1)
      route.push(...newWaypoints)
      
      // Update currentPos ke exit point dari obstacle ini
      currentPos = newWaypoints[newWaypoints.length - 1]
      
      console.log(`  ✓ Added ${newWaypoints.length} waypoints, new position: [${currentPos.lng}, ${currentPos.lat}]`)
    } else {
      console.warn(`  ✗ Failed to calculate avoidance for obstacle`)
    }
    
    processedObstacles++
  }
  
  // Add final destination
  route.push(end)
  
  console.log(`\n🎯 DEBUG: Multi-obstacle route complete with ${route.length} waypoints`)
  console.log('🎯 DEBUG: Final route waypoints:')
  route.forEach((point, index) => {
    console.log(`  WP${index}: [${point.lng.toFixed(6)}, ${point.lat.toFixed(6)}]`)
  })
  
  // Verify route safety
  console.log('\n🔍 DEBUG: Verifying multi-obstacle route safety...')
  let routeIsSafe = true
  
  for (let i = 0; i < route.length - 1; i++) {
    const segment = turf.lineString([[route[i].lng, route[i].lat], [route[i + 1].lng, route[i + 1].lat]])
    let segmentIntersects = false
    let intersectedObstacle = -1
    
    for (let j = 0; j < sortedObstacles.length; j++) {
      if (turf.booleanIntersects(segment, sortedObstacles[j].buffer)) {
        segmentIntersects = true
        intersectedObstacle = j
        break
      }
    }
    
    if (segmentIntersects) {
      console.log(`  ✗ Segment ${i} → ${i + 1}: INTERSECTS obstacle ${intersectedObstacle}`)
      routeIsSafe = false
    } else {
      console.log(`  ✓ Segment ${i} → ${i + 1}: SAFE`)
    }
  }
  
  console.log(`🔍 DEBUG: Multi-obstacle route safety: ${routeIsSafe ? '✓ SAFE' : '✗ UNSAFE'}`)
  
  return route
}

// 🎯 Calculate avoidance route for a single obstacle (dapat berupa merged buffer)
function calculateObstacleAvoidance(
  currentPos: Point,
  destination: Point,
  obstacleBuffer: any,
  safeDistanceKm: number
): Point[] | null {
  try {
    console.log(`  🎯 Calculating avoidance from [${currentPos.lng.toFixed(6)}, ${currentPos.lat.toFixed(6)}]`)
    
    // Try tangent-based routing first (fastest)
    const tangentRoute = calculateTangentRoute(currentPos, destination, obstacleBuffer, safeDistanceKm)
    
    if (tangentRoute && tangentRoute.length >= 2) {
      console.log(`  ✓ Tangent route found with ${tangentRoute.length} waypoints`)
      return tangentRoute
    }
    
    console.log(`  ⚠️ Tangent route failed, using intersection-based method`)
    
    // Fallback: intersection-based edge following
    const pathLine = turf.lineString([[currentPos.lng, currentPos.lat], [destination.lng, destination.lat]])
    const intersectionPoints = turf.lineIntersect(pathLine, obstacleBuffer)
    
    if (!intersectionPoints || intersectionPoints.features.length === 0) {
      console.warn('  ✗ No intersection points found')
      return null
    }
    
    // Get entry and exit points
    const intersections = intersectionPoints.features.map(f => ({
      lng: f.geometry.coordinates[0],
      lat: f.geometry.coordinates[1]
    }))
    
    // Sort by distance from current position
    intersections.sort((a, b) => {
      const distA = turf.distance(
        turf.point([currentPos.lng, currentPos.lat]),
        turf.point([a.lng, a.lat]),
        { units: 'kilometers' }
      )
      const distB = turf.distance(
        turf.point([currentPos.lng, currentPos.lat]),
        turf.point([b.lng, b.lat]),
        { units: 'kilometers' }
      )
      return distA - distB
    })
    
    const entryPoint = intersections[0]
    const exitPoint = intersections[intersections.length - 1]
    
    console.log(`  Entry: [${entryPoint.lng.toFixed(6)}, ${entryPoint.lat.toFixed(6)}]`)
    console.log(`  Exit: [${exitPoint.lng.toFixed(6)}, ${exitPoint.lat.toFixed(6)}]`)
    
    // Calculate edge path around obstacle
    const edgePath = calculateShortestEdgePath(
      entryPoint,
      exitPoint,
      obstacleBuffer,
      currentPos,
      destination
    )
    
    // Build avoidance route: currentPos → entry → edge → exit
    const avoidanceRoute: Point[] = [currentPos]
    
    const distToEntry = turf.distance(
      turf.point([currentPos.lng, currentPos.lat]),
      turf.point([entryPoint.lng, entryPoint.lat]),
      { units: 'kilometers' }
    )
    
    if (distToEntry > 0.01) {  // > 10 meters
      avoidanceRoute.push(entryPoint)
    }
    
    avoidanceRoute.push(...edgePath)
    
    const distFromExitToCurrent = turf.distance(
      turf.point([exitPoint.lng, exitPoint.lat]),
      turf.point([avoidanceRoute[avoidanceRoute.length - 1].lng, avoidanceRoute[avoidanceRoute.length - 1].lat]),
      { units: 'kilometers' }
    )
    
    if (distFromExitToCurrent > 0.01) {  // > 10 meters
      avoidanceRoute.push(exitPoint)
    }
    
    console.log(`  ✓ Avoidance route has ${avoidanceRoute.length} waypoints`)
    
    return avoidanceRoute
    
  } catch (e) {
    console.error('  ✗ Error calculating obstacle avoidance:', e)
    return null
  }
}

// 📦 DEPRECATED: Old single merged buffer approach (kept for reference)
// Now using createBufferGroups() which properly handles both merged and separate buffers
/*
function createMergedBuffer(buildings: any[], safeDistanceKm: number): any {
  // ... old implementation that only created one merged buffer
  // Problem: Lost separate buffers that don't overlap
}
*/

// 🎯 DEPRECATED: Old buffer edge route (now using calculateObstacleAvoidance)
/*
function calculateBufferEdgeRoute(...) {
  // ... old implementation
}
*/

// 🎯 Hitung rute tangent (seperti cahaya memantul di cermin)
function calculateTangentRoute(
  start: Point,
  end: Point,
  buffer: any,
  safeDistanceKm: number
): Point[] | null {
  try {
    // Strategi: Cari titik di tepi buffer yang membentuk garis lurus terpendek
    // dari start → tangent1 → tangent2 → end tanpa memotong buffer
    
    const startPoint = turf.point([start.lng, start.lat])
    const endPoint = turf.point([end.lng, end.lat])
    
    // 💡 STRATEGI BARU: Gunakan titik sudut dari convex hull sebagai kandidat tangent
    // Ini jauh lebih efisien dan akurat daripada sampling.
    const allPoints = turf.explode(buffer)
    const convexHull = turf.convex(allPoints)
    
    if (!convexHull) {
      console.warn('❌ Could not create convex hull, tangent route calculation failed.')
      return null
    }
    
    // Ambil titik-titik dari convex hull sebagai kandidat
    const candidatePoints: Point[] = convexHull.geometry.coordinates[0].map((coord: number[]) => ({
      lng: coord[0],
      lat: coord[1]
    }))
    
    console.log(`💡 Using ${candidatePoints.length} vertices from convex hull for tangent search.`)
    
    // Coba berbagai kombinasi tangent points
    let bestRoute: Point[] | null = null
    let shortestDistance = Infinity
    
    // Single tangent point (jika buffer kecil)
    for (const tangent of candidatePoints) {
      const tangentPoint = turf.point([tangent.lng, tangent.lat])
      
      // Cek apakah start→tangent dan tangent→end aman
      const line1 = turf.lineString([[start.lng, start.lat], [tangent.lng, tangent.lat]])
      const line2 = turf.lineString([[tangent.lng, tangent.lat], [end.lng, end.lat]])
      
      const safe1 = !turf.booleanIntersects(line1, buffer)
      const safe2 = !turf.booleanIntersects(line2, buffer)
      
      if (safe1 && safe2) {
        const totalDist = 
          turf.distance(startPoint, tangentPoint, { units: 'kilometers' }) +
          turf.distance(tangentPoint, endPoint, { units: 'kilometers' })
        
        if (totalDist < shortestDistance) {
          shortestDistance = totalDist
          bestRoute = [start, tangent, end]
        }
      }
    }
    
    if (bestRoute) {
      console.log(`✅ Found single tangent route, distance: ${(shortestDistance * 1000).toFixed(0)}m`)
      return bestRoute
    }
    
    // Double tangent points (jika perlu 2 titik belok)
    for (let i = 0; i < candidatePoints.length; i++) {
      for (let j = i + 1; j < candidatePoints.length; j++) {
        const t1 = candidatePoints[i]
        const t2 = candidatePoints[j]
        
        const tp1 = turf.point([t1.lng, t1.lat])
        const tp2 = turf.point([t2.lng, t2.lat])
        
        // Cek semua segmen aman
        const line1 = turf.lineString([[start.lng, start.lat], [t1.lng, t1.lat]])
        const line2 = turf.lineString([[t1.lng, t1.lat], [t2.lng, t2.lat]])
        const line3 = turf.lineString([[t2.lng, t2.lat], [end.lng, end.lat]])
        
        const safe1 = !turf.booleanIntersects(line1, buffer)
        const safe2 = !turf.booleanIntersects(line2, buffer)
        const safe3 = !turf.booleanIntersects(line3, buffer)
        
        if (safe1 && safe2 && safe3) {
          const totalDist = 
            turf.distance(startPoint, tp1, { units: 'kilometers' }) +
            turf.distance(tp1, tp2, { units: 'kilometers' }) +
            turf.distance(tp2, endPoint, { units: 'kilometers' })
          
          if (totalDist < shortestDistance) {
            shortestDistance = totalDist
            bestRoute = [start, t1, t2, end]
          }
        }
      }
    }
    
    if (bestRoute) {
      console.log(`✅ Found double tangent route, distance: ${(shortestDistance * 1000).toFixed(0)}m`)
      return bestRoute
    }
    
    console.warn('❌ No tangent route found')
    return null
    
  } catch (e) {
    console.error('Error calculating tangent route:', e)
    return null
  }
}

// 🔄 Hitung path terpendek mengikuti tepi buffer
function calculateShortestEdgePath(
  entry: Point,
  exit: Point,
  buffer: any,
  start: Point,
  end: Point
): Point[] {
  try {
    // ⚡ STRATEGI BARU: Cek apakah garis langsung entry→exit aman
    // Jika aman, langsung return kosong (straight line sudah cukup)
    const directPath = turf.lineString([[entry.lng, entry.lat], [exit.lng, exit.lat]])
    
    // Cek apakah direct path memotong buffer
    const directIntersects = turf.booleanIntersects(directPath, buffer)
    
    if (!directIntersects) {
      // Direct path aman! Tidak perlu ikuti boundary
      console.log('✅ Direct path between entry-exit is safe, no edge following needed')
      return []
    }
    
    // ⚠️ Direct path tidak aman, harus ikuti tepi buffer
    console.log('⚠️ Direct path intersects buffer, following edge...')
    
    // Ekstrak boundary dari buffer
    let boundary: any
    
    if (buffer.geometry.type === 'Polygon') {
      boundary = turf.lineString(buffer.geometry.coordinates[0])
    } else if (buffer.geometry.type === 'MultiPolygon') {
      // Untuk MultiPolygon, ambil polygon yang dilalui garis lurus
      const polygons = buffer.geometry.coordinates
      let relevantPolygon = polygons[0]
      
      for (const poly of polygons) {
        const testPoly = turf.polygon(poly)
        if (turf.booleanIntersects(directPath, testPoly)) {
          relevantPolygon = poly
          break
        }
      }
      
      boundary = turf.lineString(relevantPolygon[0])
    } else {
      throw new Error('Unsupported geometry type: ' + buffer.geometry.type)
    }
    
    // Cari titik terdekat di boundary untuk entry dan exit
    const entryOnBoundary = turf.nearestPointOnLine(
      boundary,
      turf.point([entry.lng, entry.lat])
    )
    
    const exitOnBoundary = turf.nearestPointOnLine(
      boundary,
      turf.point([exit.lng, exit.lat])
    )
    
    // Ekstrak koordinat boundary
    const boundaryCoords = boundary.geometry.coordinates
    
    // Cari index entry dan exit di boundary
    const entryIndex = findClosestPointIndex(
      boundaryCoords,
      entryOnBoundary.geometry.coordinates
    )
    
    const exitIndex = findClosestPointIndex(
      boundaryCoords,
      exitOnBoundary.geometry.coordinates
    )
    
    // Hitung kedua jalur (clockwise & counterclockwise)
    const pathClockwise = extractPath(boundaryCoords, entryIndex, exitIndex, true)
    const pathCounterClockwise = extractPath(boundaryCoords, entryIndex, exitIndex, false)
    
    const distClockwise = calculatePathLength(pathClockwise)
    const distCounterClockwise = calculatePathLength(pathCounterClockwise)
    
    // Pilih path terpendek
    const shortestPath = distClockwise < distCounterClockwise 
      ? pathClockwise 
      : pathCounterClockwise
    
    // Konversi ke Point[] dan optimasi
    const waypoints = shortestPath.map(coord => ({
      lng: coord[0],
      lat: coord[1]
    }))
    
    // Aggressive simplification - hanya simpan titik penting
    const optimized = simplifyPath(waypoints, 0.05) // 50 meters threshold untuk lebih lurus
    
    console.log(`🛤️ Edge path: ${optimized.length} waypoints (${distClockwise < distCounterClockwise ? 'clockwise' : 'counterclockwise'})`)
    
    return optimized
    
  } catch (e) {
    console.error('Error calculating shortest edge path:', e)
    return []
  }
}

// 🔍 Cari index koordinat terdekat di boundary
function findClosestPointIndex(coords: number[][], target: number[]): number {
  let minDist = Infinity
  let minIndex = 0
  
  for (let i = 0; i < coords.length; i++) {
    const dist = Math.sqrt(
      Math.pow(coords[i][0] - target[0], 2) +
      Math.pow(coords[i][1] - target[1], 2)
    )
    
    if (dist < minDist) {
      minDist = dist
      minIndex = i
    }
  }
  
  return minIndex
}

// 📏 Ekstrak path dari boundary (clockwise atau counterclockwise)
function extractPath(
  coords: number[][],
  startIdx: number,
  endIdx: number,
  clockwise: boolean
): number[][] {
  const path: number[][] = []
  
  if (clockwise) {
    if (startIdx <= endIdx) {
      for (let i = startIdx; i <= endIdx; i++) {
        path.push(coords[i])
      }
    } else {
      for (let i = startIdx; i < coords.length; i++) {
        path.push(coords[i])
      }
      for (let i = 0; i <= endIdx; i++) {
        path.push(coords[i])
      }
    }
  } else {
    if (startIdx >= endIdx) {
      for (let i = startIdx; i >= endIdx; i--) {
        path.push(coords[i])
      }
    } else {
      for (let i = startIdx; i >= 0; i--) {
        path.push(coords[i])
      }
      for (let i = coords.length - 1; i >= endIdx; i--) {
        path.push(coords[i])
      }
    }
  }
  
  return path
}

// 📐 Hitung panjang total path
function calculatePathLength(path: number[][]): number {
  let length = 0
  
  for (let i = 1; i < path.length; i++) {
    const dist = turf.distance(
      turf.point(path[i - 1]),
      turf.point(path[i]),
      { units: 'kilometers' }
    )
    length += dist
  }
  
  return length
}

// 🎨 Simplifikasi path dengan menghapus titik yang terlalu dekat
function simplifyPath(points: Point[], thresholdKm: number): Point[] {
  if (points.length <= 2) return points
  
  const simplified: Point[] = [points[0]]
  
  for (let i = 1; i < points.length - 1; i++) {
    const prev = simplified[simplified.length - 1]
    const current = points[i]
    
    const dist = turf.distance(
      turf.point([prev.lng, prev.lat]),
      turf.point([current.lng, current.lat]),
      { units: 'kilometers' }
    )
    
    // Hanya tambahkan jika jarak > threshold
    if (dist > thresholdKm) {
      simplified.push(current)
    }
  }
  
  simplified.push(points[points.length - 1])
  
  return simplified
}

// 🚨 Fallback route jika edge calculation gagal
function createFallbackRoute(
  start: Point,
  end: Point,
  buffer: any,
  safeDistanceKm: number
): Point[] {
  console.log('⚠️ Using fallback perpendicular route')
  
  try {
    // Cari center dari buffer
    const bufferCenter = turf.center(buffer)
    
    // Hitung bearing dari start ke buffer center
    const bearingToBuffer = turf.bearing(
      turf.point([start.lng, start.lat]),
      bufferCenter
    )
    
    // Buat waypoint perpendicular (90 derajat dari arah ke buffer)
    const perpendicularAngle = (bearingToBuffer + 90) % 360
    
    const waypoint = turf.destination(
      bufferCenter,
      safeDistanceKm * 1.5, // 150m dari center untuk safety
      perpendicularAngle,
      { units: 'kilometers' }
    )
    
    return [
      start,
      {
        lat: waypoint.geometry.coordinates[1],
        lng: waypoint.geometry.coordinates[0]
      },
      end
    ]
    
  } catch (e) {
    console.error('Fallback route failed:', e)
    return [start, end]
  }
}