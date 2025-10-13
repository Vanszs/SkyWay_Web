// Waypoint type for drone navigation
export interface Waypoint {
  lat: number;
  lng: number;
}

// Building feature type
export interface BuildingFeature {
  type: 'Feature';
  properties: {
    name: string;
    height: number;
    restricted: boolean;
  };
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

// GeoJSON FeatureCollection for buildings
export interface BuildingGeoJSON {
  type: 'FeatureCollection';
  features: BuildingFeature[];
}

// Point on map
export interface Point {
  lat: number;
  lng: number;
}

// Grid node for pathfinding
export interface GridNode {
  x: number;
  y: number;
  lat: number;
  lng: number;
  walkable: boolean;
}

// Route calculation options
export interface RouteOptions {
  bufferDistance?: number;
  gridSize?: number;
}

// Route point with address information
export interface RoutePoint {
  lat: number;
  lng: number;
  address: string;
}

// Complete route data
export interface RouteData {
  start: RoutePoint;
  end: RoutePoint;
  waypoints: Waypoint[];
  distance: number;
  estimatedDuration: number;
  isSafe: boolean;
  path: [number, number][];
}