import * as turf from '@turf/turf';
import * as PF from 'pathfinding';
import { Point, Waypoint, BuildingFeature, GridNode, RouteOptions } from '@/types/route';

/**
 * Generate a safe route from start to end point avoiding buildings
 * @param start - Starting point {lat, lng}
 * @param end - Ending point {lat, lng}
 * @param buildings - Array of building features
 * @param options - Route calculation options
 * @returns Array of waypoints for the safe route
 */
export function generateSafeRoute(
  start: Point,
  end: Point,
  buildings: BuildingFeature[],
  options: RouteOptions = {}
): Waypoint[] {
  const {
    bufferDistance = 0.0001, // ~10m buffer around buildings
    gridSize = 0.0002 // ~20m grid size
  } = options;

  try {
    // Create bounding box around start and end points
    const startPoint = turf.point([start.lng, start.lat]);
    const endPoint = turf.point([end.lng, end.lat]);
    
    // Calculate bounds with padding
    const bounds = turf.bbox(turf.featureCollection([startPoint, endPoint]));
    const padding = 0.005; // ~500m padding
    const expandedBounds = [
      bounds[0] - padding, // minLng
      bounds[1] - padding, // minLat
      bounds[2] + padding, // maxLng
      bounds[3] + padding  // maxLat
    ];

    // Create buffered buildings (no-fly zones)
    const bufferedBuildings = buildings.map(building => {
      const buffered = turf.buffer(building, bufferDistance, { units: 'degrees' });
      return buffered;
    });

    // Generate grid of points
    const grid = generateGrid(expandedBounds, gridSize, bufferedBuildings);
    
    // Find nearest grid nodes to start and end points
    const startNode = findNearestGridNode(start, grid);
    const endNode = findNearestGridNode(end, grid);
    
    if (!startNode || !endNode) {
      console.error('Could not find valid grid nodes for start/end points');
      return [start, end]; // Fallback to direct route
    }

    // Create pathfinding grid
    const pathfindingGrid = createPathfindingGrid(grid, expandedBounds, gridSize);
    
    // Run A* pathfinding
    const finder = new PF.AStarFinder();
    const path = finder.findPath(startNode.x, startNode.y, endNode.x, endNode.y, new PF.Grid(pathfindingGrid));
    
    if (!path || path.length === 0) {
      console.warn('No path found, returning direct route');
      return [start, end]; // Fallback to direct route
    }

    // Convert path grid coordinates back to lat/lng
    const waypoints = pathToWaypoints(path, expandedBounds, gridSize);
    
    // Optimize path (remove unnecessary waypoints)
    const optimizedWaypoints = optimizePath(waypoints);
    
    console.log('Safe route generated:', optimizedWaypoints);
    return optimizedWaypoints;
  } catch (error) {
    console.error('Error generating safe route:', error);
    return [start, end]; // Fallback to direct route
  }
}

/**
 * Generate a grid of walkable nodes
 */
function generateGrid(bounds: number[], gridSize: number, obstacles: any[]): GridNode[] {
  const [minLng, minLat, maxLng, maxLat] = bounds;
  const grid: GridNode[] = [];
  
  let xIndex = 0;
  let yIndex = 0;
  
  for (let lat = minLat; lat <= maxLat; lat += gridSize) {
    xIndex = 0;
    for (let lng = minLng; lng <= maxLng; lng += gridSize) {
      const point = turf.point([lng, lat]);
      
      // Check if point is inside any obstacle
      let walkable = true;
      for (const obstacle of obstacles) {
        if (turf.booleanPointInPolygon(point, obstacle)) {
          walkable = false;
          break;
        }
      }
      
      grid.push({
        x: xIndex,
        y: yIndex,
        lat,
        lng,
        walkable
      });
      
      xIndex++;
    }
    yIndex++;
  }
  
  return grid;
}

/**
 * Find the nearest walkable grid node to a point
 */
function findNearestGridNode(point: Point, grid: GridNode[]): GridNode | null {
  let nearestNode: GridNode | null = null;
  let minDistance = Infinity;
  
  for (const node of grid) {
    if (!node.walkable) continue;
    
    const distance = turf.distance(
      turf.point([point.lng, point.lat]),
      turf.point([node.lng, node.lat]),
      { units: 'degrees' }
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestNode = node;
    }
  }
  
  return nearestNode;
}

/**
 * Create a 2D grid for pathfinding algorithm
 */
function createPathfindingGrid(grid: GridNode[], bounds: number[], gridSize: number): number[][] {
  const [minLng, minLat, maxLng, maxLat] = bounds;
  const cols = Math.ceil((maxLng - minLng) / gridSize) + 1;
  const rows = Math.ceil((maxLat - minLat) / gridSize) + 1;
  
  // Initialize grid with 1 (walkable)
  const pathfindingGrid: number[][] = Array(rows).fill(null).map(() => Array(cols).fill(1));
  
  // Mark obstacles as 0 (not walkable)
  for (const node of grid) {
    if (!node.walkable) {
      pathfindingGrid[node.y][node.x] = 0;
    }
  }
  
  return pathfindingGrid;
}

/**
 * Convert path grid coordinates back to lat/lng waypoints
 */
function pathToWaypoints(path: number[][], bounds: number[], gridSize: number): Waypoint[] {
  const [minLng, minLat] = bounds;
  
  return path.map(([x, y]) => ({
    lat: minLat + (y * gridSize),
    lng: minLng + (x * gridSize)
  }));
}

/**
 * Optimize path by removing unnecessary waypoints
 */
function optimizePath(waypoints: Waypoint[]): Waypoint[] {
  if (waypoints.length <= 2) return waypoints;
  
  const optimized: Waypoint[] = [waypoints[0]]; // Always keep start point
  
  for (let i = 1; i < waypoints.length - 1; i++) {
    const prev = optimized[optimized.length - 1];
    const current = waypoints[i];
    const next = waypoints[i + 1];
    
    // Check if current point is necessary (not collinear)
    const angle = calculateAngle(prev, current, next);
    
    // If angle is close to 180 degrees, points are collinear, skip current point
    if (Math.abs(angle - 180) > 5) {
      optimized.push(current);
    }
  }
  
  optimized.push(waypoints[waypoints.length - 1]); // Always keep end point
  
  return optimized;
}

/**
 * Calculate angle between three points in degrees
 */
function calculateAngle(p1: Waypoint, p2: Waypoint, p3: Waypoint): number {
  const bearing1 = turf.bearing(turf.point([p1.lng, p1.lat]), turf.point([p2.lng, p2.lat]));
  const bearing2 = turf.bearing(turf.point([p2.lng, p2.lat]), turf.point([p3.lng, p3.lat]));
  
  let angle = bearing2 - bearing1;
  if (angle < 0) angle += 360;
  if (angle > 360) angle -= 360;
  
  return angle;
}

/**
 * Check if a point is inside any building
 */
export function isPointInBuilding(point: Point, buildings: BuildingFeature[]): boolean {
  const turfPoint = turf.point([point.lng, point.lat]);
  
  for (const building of buildings) {
    if (turf.booleanPointInPolygon(turfPoint, building)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Calculate total distance of a route
 */
export function calculateRouteDistance(waypoints: Waypoint[]): number {
  let totalDistance = 0;
  
  for (let i = 0; i < waypoints.length - 1; i++) {
    const distance = turf.distance(
      turf.point([waypoints[i].lng, waypoints[i].lat]),
      turf.point([waypoints[i + 1].lng, waypoints[i + 1].lat]),
      { units: 'kilometers' }
    );
    totalDistance += distance;
  }
  
  return totalDistance;
}