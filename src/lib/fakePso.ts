import { Point } from '@/types/route'
import * as turf from '@turf/turf'

// 🎯 Enhanced PSO: Rute mengikuti tepi buffer 100m, bukan masuk ke dalam
export function calculateFakePSORoute(
  start: Point,
  end: Point,
  buildings: any[],
  safeDistance: number = 100 // 100 meters
): Point[] {
  console.log('🚁 Using Enhanced PSO - edge-following route around merged buffers')
  
  const safeDistanceKm = safeDistance / 1000
  
  // 1️⃣ Buat garis lurus start → end
  const straightLine = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]])
  
  // 2️⃣ Buat buffer 100m untuk setiap gedung dan gabungkan yang saling tumpang tindih
  const mergedBuffer = createMergedBuffer(buildings, safeDistanceKm)
  
  // 3️⃣ Jika tidak ada buffer yang terbentuk, return garis lurus
  if (!mergedBuffer) {
    console.log('✅ No buildings to avoid, using straight line')
    return [start, end]
  }
  
  // 4️⃣ Cek apakah garis lurus memotong buffer
  const intersects = turf.booleanIntersects(straightLine, mergedBuffer)
  
  if (!intersects) {
    console.log('✅ Direct line is safe, using straight route')
    return [start, end]
  }
  
  // 5️⃣ Jika memotong, buat rute yang menempel di tepi buffer
  console.log('⚠️ Direct line intersects buffer, calculating edge-following route')
  return calculateBufferEdgeRoute(start, end, mergedBuffer, straightLine, safeDistanceKm)
}

// 📦 Gabungkan semua buffer gedung menjadi satu area (union buffer yang tumpang tindih)
function createMergedBuffer(buildings: any[], safeDistanceKm: number): any {
  if (buildings.length === 0) return null
  
  try {
    // Buat buffer untuk setiap gedung
    const buffers = buildings
      .map(building => {
        try {
          return turf.buffer(building, safeDistanceKm, { units: 'kilometers' })
        } catch (e) {
          console.warn('Failed to buffer building:', e)
          return null
        }
      })
      .filter(b => b !== null)
    
    if (buffers.length === 0) return null
    
    // Gabungkan semua buffer menjadi satu area
    let merged = buffers[0]
    
    for (let i = 1; i < buffers.length; i++) {
      try {
        // @ts-ignore - turf.union terkadang punya type signature yang kompleks
        const unionResult = turf.union(turf.featureCollection([merged, buffers[i]]))
        if (unionResult) {
          merged = unionResult
        }
      } catch (e) {
        console.warn('Failed to union buffers:', e)
        // Jika union gagal, tambahkan sebagai feature collection
        continue
      }
    }
    
    console.log(`✅ Merged ${buildings.length} building buffers into single area`)
    return merged
    
  } catch (e) {
    console.error('Error creating merged buffer:', e)
    return null
  }
}

// 🎯 Hitung rute yang menempel di tepi buffer (edge-following)
function calculateBufferEdgeRoute(
  start: Point,
  end: Point,
  mergedBuffer: any,
  straightLine: any,
  safeDistanceKm: number
): Point[] {
  try {
    // 🎯 STRATEGI BARU: Tangent-based routing (seperti sinar cahaya yang memantul)
    
    // 1️⃣ Cari "tangent points" - titik di tepi buffer yang membuat jalur terpendek
    const tangentRoute = calculateTangentRoute(start, end, mergedBuffer, safeDistanceKm)
    
    if (tangentRoute && tangentRoute.length > 2) {
      console.log(`✅ Created tangent-based route with ${tangentRoute.length} waypoints`)
      return tangentRoute
    }
    
    // Fallback ke metode lama jika tangent gagal
    console.warn('Tangent method failed, using intersection-based method')
    
    // 1️⃣ Cari titik potong antara garis lurus dengan buffer
    const intersectionPoints = turf.lineIntersect(straightLine, mergedBuffer)
    
    if (intersectionPoints.features.length === 0) {
      console.warn('No intersection points found, using fallback route')
      return createFallbackRoute(start, end, mergedBuffer, safeDistanceKm)
    }
    
    // 2️⃣ Ambil titik masuk (entry) dan keluar (exit) dari buffer
    const intersections = intersectionPoints.features.map(f => ({
      lng: f.geometry.coordinates[0],
      lat: f.geometry.coordinates[1]
    }))
    
    // Urutkan berdasarkan jarak dari start
    intersections.sort((a, b) => {
      const distA = turf.distance(
        turf.point([start.lng, start.lat]),
        turf.point([a.lng, a.lat]),
        { units: 'kilometers' }
      )
      const distB = turf.distance(
        turf.point([start.lng, start.lat]),
        turf.point([b.lng, b.lat]),
        { units: 'kilometers' }
      )
      return distA - distB
    })
    
    const entryPoint = intersections[0]
    const exitPoint = intersections[intersections.length - 1]
    
    console.log(`📍 Entry point: [${entryPoint.lng}, ${entryPoint.lat}]`)
    console.log(`📍 Exit point: [${exitPoint.lng}, ${exitPoint.lat}]`)
    
    // 3️⃣ Buat path mengikuti tepi buffer dari entry ke exit
    const edgePath = calculateShortestEdgePath(
      entryPoint,
      exitPoint,
      mergedBuffer,
      start,
      end
    )
    
    // 4️⃣ Gabungkan: start → entry → edge path → exit → end
    const route: Point[] = [start]
    
    const distToEntry = turf.distance(
      turf.point([start.lng, start.lat]),
      turf.point([entryPoint.lng, entryPoint.lat]),
      { units: 'kilometers' }
    )
    
    if (distToEntry > 0.01) {
      route.push(entryPoint)
    }
    
    route.push(...edgePath)
    
    const distToEnd = turf.distance(
      turf.point([exitPoint.lng, exitPoint.lat]),
      turf.point([end.lng, end.lat]),
      { units: 'kilometers' }
    )
    
    if (distToEnd > 0.01) {
      route.push(exitPoint)
    }
    
    route.push(end)
    
    console.log(`✅ Created edge-following route with ${route.length} waypoints`)
    return route
    
  } catch (e) {
    console.error('Error calculating buffer edge route:', e)
    return createFallbackRoute(start, end, mergedBuffer, safeDistanceKm)
  }
}

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
    
    // Ekstrak boundary points
    let boundaryCoords: number[][] = []
    
    if (buffer.geometry.type === 'Polygon') {
      boundaryCoords = buffer.geometry.coordinates[0]
    } else if (buffer.geometry.type === 'MultiPolygon') {
      // Gabungkan semua polygon boundaries
      buffer.geometry.coordinates.forEach((poly: any) => {
        boundaryCoords.push(...poly[0])
      })
    }
    
    // Sampling boundary points (tidak perlu semua titik, ambil setiap N titik)
    const sampledBoundary: Point[] = []
    const sampleRate = Math.max(1, Math.floor(boundaryCoords.length / 20)) // Max 20 sample points
    
    for (let i = 0; i < boundaryCoords.length; i += sampleRate) {
      sampledBoundary.push({
        lng: boundaryCoords[i][0],
        lat: boundaryCoords[i][1]
      })
    }
    
    // Coba berbagai kombinasi tangent points
    let bestRoute: Point[] | null = null
    let shortestDistance = Infinity
    
    // Single tangent point (jika buffer kecil)
    for (const tangent of sampledBoundary) {
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
    for (let i = 0; i < sampledBoundary.length; i++) {
      for (let j = i + 1; j < sampledBoundary.length; j++) {
        const t1 = sampledBoundary[i]
        const t2 = sampledBoundary[j]
        
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