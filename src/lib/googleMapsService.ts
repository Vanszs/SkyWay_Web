/**
 * Google Maps Service for Drone Delivery
 * Integrates with Google Maps APIs for elevation, geocoding, and routing
 */

// Types for Google Maps API responses
export interface GoogleLatLng {
  lat: number;
  lng: number;
}

export interface ElevationResult {
  location: GoogleLatLng;
  elevation: number;
  resolution: number;
}

export interface ElevationResponse {
  results: ElevationResult[];
  status: string;
}

export interface GeocodingResult {
  formatted_address: string;
  geometry: {
    location: GoogleLatLng;
    location_type: string;
  };
  place_id: string;
}

export interface RoutesApiResponse {
  routes: Route[];
  status: string;
}

export interface Route {
  legs: RouteLeg[];
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: {
    encodedPolyline: string;
  };
}

export interface RouteLeg {
  startLocation: GoogleLatLng;
  endLocation: GoogleLatLng;
  steps: RouteStep[];
  distanceMeters: number;
  duration: string;
  staticDuration: string;
}

export interface RouteStep {
  startLocation: GoogleLatLng;
  endLocation: GoogleLatLng;
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: {
    encodedPolyline: string;
  };
}

class GoogleMapsService {
  private apiKey: string;
  private baseUrl = 'https://maps.googleapis.com/maps/api';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
    }
  }

  /**
   * Get elevation data for specific points
   * Useful for drone altitude planning and terrain avoidance
   */
  async getElevationForLocations(locations: GoogleLatLng[]): Promise<ElevationResponse> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key is required');
    }

    const params = new URLSearchParams({
      locations: locations.map(loc => `${loc.lat},${loc.lng}`).join('|'),
      key: this.apiKey
    });

    const response = await fetch(`${this.baseUrl}/elevation/json?${params}`);
    
    if (!response.ok) {
      throw new Error(`Elevation API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get elevation data along a path
   * Useful for drone route elevation profiling
   */
  async getElevationAlongPath(path: GoogleLatLng[], samples: number = 100): Promise<ElevationResponse> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key is required');
    }

    const params = new URLSearchParams({
      path: path.map(loc => `${loc.lat},${loc.lng}`).join('|'),
      samples: samples.toString(),
      key: this.apiKey
    });

    const response = await fetch(`${this.baseUrl}/elevation/json?${params}`);
    
    if (!response.ok) {
      throw new Error(`Elevation API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Convert address to coordinates
   * Useful for user-friendly address input
   */
  async geocodeAddress(address: string): Promise<GeocodingResult[]> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key is required');
    }

    const params = new URLSearchParams({
      address: address,
      key: this.apiKey
    });

    const response = await fetch(`${this.baseUrl}/geocode/json?${params}`);
    
    if (!response.ok) {
      throw new Error(`Geocoding API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  }

  /**
   * Convert coordinates to address
   * Useful for displaying human-readable locations
   */
  async reverseGeocode(location: GoogleLatLng): Promise<GeocodingResult[]> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key is required');
    }

    const params = new URLSearchParams({
      latlng: `${location.lat},${location.lng}`,
      key: this.apiKey
    });

    const response = await fetch(`${this.baseUrl}/geocode/json?${params}`);
    
    if (!response.ok) {
      throw new Error(`Reverse geocoding API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  }

  /**
   * Calculate optimal route using Google Routes API
   * Provides real-time traffic and advanced routing options
   */
  async calculateRoute(
    origin: GoogleLatLng,
    destination: GoogleLatLng,
    options: {
      avoidTolls?: boolean;
      avoidHighways?: boolean;
      avoidFerries?: boolean;
      travelMode?: 'DRIVE' | 'WALK' | 'BICYCLE';
      routingPreference?: 'TRAFFIC_AWARE' | 'TRAFFIC_AWARE_OPTIMAL';
    } = {}
  ): Promise<RoutesApiResponse> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key is required');
    }

    const requestBody = {
      origin: {
        location: {
          latLng: {
            latitude: origin.lat,
            longitude: origin.lng
          }
        }
      },
      destination: {
        location: {
          latLng: {
            latitude: destination.lat,
            longitude: destination.lng
          }
        }
      },
      travelMode: options.travelMode || 'DRIVE',
      routingPreference: options.routingPreference || 'TRAFFIC_AWARE',
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: options.avoidTolls || false,
        avoidHighways: options.avoidHighways || false,
        avoidFerries: options.avoidFerries || false
      }
    };

    const response = await fetch(`${this.baseUrl}/routes/v2:computeRoutes?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Routes API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Analyze terrain for drone flight safety
   * Combines elevation data with terrain analysis
   */
  async analyzeTerrainForDroneFlight(
    route: GoogleLatLng[],
    droneAltitude: number = 100 // meters above ground
  ): Promise<{
    elevationProfile: ElevationResult[];
    maxElevation: number;
    minElevation: number;
    elevationChange: number;
    recommendedAltitude: number;
    terrainHazards: string[];
  }> {
    try {
      const elevationResponse = await this.getElevationAlongPath(route, 200);
      const elevations = elevationResponse.results;
      
      const elevationsOnly = elevations.map(e => e.elevation);
      const maxElevation = Math.max(...elevationsOnly);
      const minElevation = Math.min(...elevationsOnly);
      const elevationChange = maxElevation - minElevation;
      
      // Recommended altitude is max elevation + safety margin + drone altitude
      const safetyMargin = 50; // 50 meters safety margin
      const recommendedAltitude = maxElevation + safetyMargin + droneAltitude;
      
      // Analyze terrain hazards
      const terrainHazards: string[] = [];
      
      // Check for significant elevation changes
      if (elevationChange > 100) {
        terrainHazards.push('Significant elevation change detected - adjust altitude accordingly');
      }
      
      // Check for low elevation areas (potential obstacles)
      const lowElevationAreas = elevations.filter(e => e.elevation < 10);
      if (lowElevationAreas.length > elevations.length * 0.3) {
        terrainHazards.push('Multiple low elevation areas - potential obstacles');
      }
      
      return {
        elevationProfile: elevations,
        maxElevation,
        minElevation,
        elevationChange,
        recommendedAltitude,
        terrainHazards
      };
    } catch (error) {
      console.error('Error analyzing terrain:', error);
      throw error;
    }
  }

  /**
   * Get drone-friendly route considering terrain and obstacles
   * Combines multiple Google Maps APIs for optimal drone routing
   */
  async getDroneOptimizedRoute(
    origin: GoogleLatLng,
    destination: GoogleLatLng
  ): Promise<{
    route: Route;
    terrainAnalysis: {
      elevationProfile: ElevationResult[];
      maxElevation: number;
      minElevation: number;
      elevationChange: number;
      recommendedAltitude: number;
      terrainHazards: string[];
    };
    addresses: {
      origin: string;
      destination: string;
    };
  }> {
    try {
      // Get basic route
      const routeResponse = await this.calculateRoute(origin, destination, {
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE'
      });
      
      if (!routeResponse.routes || routeResponse.routes.length === 0) {
        throw new Error('No route found');
      }
      
      const route = routeResponse.routes[0];
      
      // Decode polyline for terrain analysis
      const routePath = this.decodePolyline(route.polyline.encodedPolyline);
      
      // Analyze terrain
      const terrainAnalysis = await this.analyzeTerrainForDroneFlight(routePath);
      
      // Get addresses for origin and destination
      const [originAddress, destinationAddress] = await Promise.all([
        this.reverseGeocode(origin),
        this.reverseGeocode(destination)
      ]);
      
      return {
        route,
        terrainAnalysis,
        addresses: {
          origin: originAddress[0]?.formatted_address || 'Unknown location',
          destination: destinationAddress[0]?.formatted_address || 'Unknown location'
        }
      };
    } catch (error) {
      console.error('Error getting drone optimized route:', error);
      throw error;
    }
  }

  /**
   * Decode Google Maps encoded polyline
   * Converts encoded string back to array of coordinates
   */
  private decodePolyline(encoded: string): GoogleLatLng[] {
    const points: GoogleLatLng[] = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let shift = 0;
      let result = 0;
      let b: number;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      lat += ((result & 1) ? ~(result >> 1) : (result >> 1));

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      lng += ((result & 1) ? ~(result >> 1) : (result >> 1));

      points.push({
        lat: lat / 1e5,
        lng: lng / 1e5
      });
    }

    return points;
  }
}

// Export singleton instance
export const googleMapsService = new GoogleMapsService();
export default googleMapsService;