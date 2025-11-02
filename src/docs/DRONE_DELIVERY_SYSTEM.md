# Drone Delivery Route Planning System

## Overview

This system provides intelligent route planning for drone deliveries with building avoidance, terrain analysis, and real-time traffic data integration. It combines multiple mapping technologies to provide safe and efficient drone routes.

## Features

### 🚁 Core Features
- **Interactive Route Planning**: Click-to-set pickup and delivery points
- **Building Avoidance**: Automatic route calculation avoiding no-fly zones
- **Terrain Analysis**: Elevation profiling for safe drone altitude planning
- **Real-time Traffic**: Integration with Google Maps Routes API for current conditions
- **Address Geocoding**: Convert addresses to coordinates and vice versa
- **Visual Route Display**: Interactive map with route visualization

### 🗺️ Mapping Technologies
- **Leaflet + MapBox**: Base mapping and interactive features
- **Google Maps APIs**: Enhanced routing, elevation, and geocoding
- **Turf.js**: Geospatial calculations and spatial analysis
- **Pathfinding.js**: A* algorithm for optimal route calculation

## Architecture

### Components

#### 1. MapContainer (`src/components/MapContainer.tsx`)
Main interactive map component that:
- Handles user interactions for setting route points
- Integrates with multiple mapping services
- Displays buildings, routes, and elevation data
- Provides real-time route calculation

#### 2. Google Maps Service (`src/lib/googleMapsService.ts`)
Service layer for Google Maps integration:
- Elevation API for terrain analysis
- Routes API for optimal routing with traffic
- Geocoding API for address resolution
- Terrain analysis for drone safety

#### 3. Pathfinding Library (`src/lib/pathfinding.ts`)
Custom pathfinding implementation:
- A* algorithm for route optimization
- Building avoidance logic
- Grid-based path calculation
- Safety buffer zones

#### 4. Building Data (`src/data/gedung.geojson`)
GeoJSON dataset of buildings in Sidoarjo & Surabaya:
- No-fly zone definitions
- Building footprints
- Height restrictions
- Restricted airspace areas

## Setup Instructions

### 1. Environment Variables

Create/update `.env.local` with the following:

```env
# MapBox Access Token for Leaflet Maps
# Get your token from: https://account.mapbox.com/access-tokens/
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# Google Maps API Key for enhanced routing and elevation data
# Get your key from: https://console.cloud.google.com/apis/credentials
# Enable: Maps JavaScript API, Routes API, Elevation API, Geocoding API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Drone Route System Configuration
DRONE_ROUTE_BUFFER_DISTANCE=0.0001
DRONE_ROUTE_GRID_SIZE=0.0002
```

### 2. Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Routes API**
   - **Elevation API**
   - **Geocoding API**
4. Create API credentials (API Key)
5. Add the API key to your `.env.local` file
6. Configure API key restrictions for security

### 3. MapBox Setup

1. Go to [MapBox Account](https://account.mapbox.com/access-tokens/)
2. Create a new access token
3. Add the token to your `.env.local` file

## Usage

### Basic Route Planning

1. Navigate to `/admin/new-order`
2. Click on the map to set the START point (green marker)
3. Click again to set the END point (orange marker)
4. The system will automatically calculate the optimal route
5. View route details including distance, duration, and safety information

### Advanced Features

#### Terrain Analysis
- Automatic elevation profiling along the route
- Recommended drone altitude calculations
- Terrain hazard identification
- Elevation change visualization

#### Building Avoidance
- Red polygons indicate no-fly zones (buildings)
- Routes automatically avoid these areas
- Configurable safety buffer distances
- Real-time collision avoidance

#### Address Input
- Manual address entry for pickup/delivery
- Automatic geocoding to coordinates
- Reverse geocoding for map points
- Address validation and correction

## API Integration

### Google Maps APIs Used

1. **Routes API**
   - Optimal route calculation
   - Real-time traffic data
   - Multiple routing options
   - Distance and duration calculation

2. **Elevation API**
   - Terrain elevation data
   - Altitude profiling
   - Obstacle detection
   - Safety margin calculations

3. **Geocoding API**
   - Address to coordinates
   - Coordinates to address
   - Place validation
   - Location standardization

### Fallback Mechanism

The system includes intelligent fallback:
- If Google Maps API fails, uses local pathfinding
- Offline route calculation capability
- Building-based avoidance always available
- Graceful degradation of features

## Data Sources

### Building Data
- **Location**: Sidoarjo & Surabaya, Indonesia
- **Format**: GeoJSON
- **Source**: Generated realistic building footprints
- **Update**: Manual updates for new construction

### Elevation Data
- **Source**: Google Maps Elevation API
- **Resolution**: High-precision terrain data
- **Coverage**: Global coverage
- **Accuracy**: Within 5 meters

## Performance Considerations

### Optimization Features
- Lazy loading of map components
- Caching of route calculations
- Efficient grid-based pathfinding
- Minimal API calls through intelligent caching

### Recommended Settings
- Grid size: 0.0002 degrees (~20m)
- Buffer distance: 0.0001 degrees (~10m)
- Elevation samples: 100-200 points per route
- Route calculation timeout: 10 seconds

## Security

### API Key Protection
- Environment variable storage
- Client-side restrictions (HTTP referrers)
- Server-side proxy option available
- Usage monitoring and quotas

### Data Privacy
- No user location storage
- Temporary route calculations only
- GDPR compliant data handling
- Optional data anonymization

## Troubleshooting

### Common Issues

1. **Map not loading**
   - Check MapBox token validity
   - Verify network connectivity
   - Check browser console for errors

2. **Google Maps features not working**
   - Verify API key is valid and enabled
   - Check API quotas and billing
   - Ensure required APIs are enabled

3. **Route calculation fails**
   - Check if points are in valid area
   - Verify building data is loaded
   - Try refreshing the page

4. **Elevation data missing**
   - Check Google Maps API key
   - Verify Elevation API is enabled
   - Check network connectivity

### Debug Mode

Enable debug logging by setting:
```javascript
localStorage.setItem('drone-debug', 'true')
```

This will provide detailed console logs for troubleshooting.

## Future Enhancements

### Planned Features
1. **Weather Integration**: Real-time weather data for flight safety
2. **Battery Optimization**: Route planning based on drone battery life
3. **Multiple Drones**: Fleet management and coordination
4. **3D Visualization**: 3D route preview with terrain
5. **Real-time Tracking**: Live drone position tracking
6. **Delivery Confirmation**: Photo-based delivery verification

### API Expansions
1. **Weather API**: Integration for weather-based routing
2. **Solar API**: Solar panel analysis for charging stations
3. **Air Quality API**: Environmental monitoring integration
4. **Time Zone API**: Delivery time optimization

## Support

For technical support or questions:
1. Check the troubleshooting section
2. Review browser console logs
3. Verify API configurations
4. Check network connectivity
5. Review this documentation

## License

This system is proprietary to SkyWay Drone Delivery Services.
All third-party APIs are used according to their respective terms of service.

---

**Last Updated**: October 2024
**Version**: 1.0.0
**Compatible**: Next.js 14+, React 18+, TypeScript 5+