# PSO (Particle Swarm Optimization) for Drone Route Planning

## Overview

Particle Swarm Optimization (PSO) is a computational method inspired by the social behavior of bird flocking or fish schooling. In our drone delivery system, PSO is used to find optimal routes that avoid no-fly zones while minimizing distance and ensuring smooth flight paths.

## How PSO Works in Our System

### 1. Particle Representation
- Each **particle** represents a potential route solution
- A route consists of waypoints between start and end points
- Particles explore the solution space by adjusting their positions

### 2. Fitness Function
The fitness function evaluates route quality based on:
- **Collision Avoidance**: High penalty for routes passing through no-fly zones
- **Distance**: Shorter routes are preferred
- **Smoothness**: Routes with fewer sharp turns are better

### 3. Optimization Process
```
1. Initialize particle swarm with random routes
2. Evaluate fitness of each particle
3. Update personal best positions
4. Update global best position
5. Adjust particle velocities and positions
6. Repeat until convergence or max iterations
```

## Configuration Parameters

### Core Parameters
- **populationSize**: Number of particles (20-100)
- **maxIterations**: Maximum optimization cycles (20-200)
- **waypointCount**: Number of intermediate waypoints (2-10)

### PSO-Specific Parameters
- **w**: Inertia weight (0.1-1.0) - Balances exploration vs exploitation
- **c1**: Cognitive coefficient (1.0-2.0) - Personal best influence
- **c2**: Social coefficient (1.0-2.0) - Global best influence
- **maxVelocity**: Maximum particle movement speed

### Fitness Weights
- **collisionWeight**: Penalty for building collisions (100-5000)
- **distanceWeight**: Route distance importance (0.1-5.0)
- **smoothnessWeight**: Turn smoothness importance (1-50)

## Preset Configurations

### Fast Mode
```typescript
{
  populationSize: 20,
  maxIterations: 50,
  waypointCount: 3,
  w: 0.8,
  c1: 1.2,
  c2: 1.2,
  collisionWeight: 500,
  distanceWeight: 2,
  smoothnessWeight: 5
}
```
**Use Case**: Quick route planning, real-time applications

### Balanced Mode (Default)
```typescript
{
  populationSize: 30,
  maxIterations: 100,
  waypointCount: 5,
  w: 0.7,
  c1: 1.5,
  c2: 1.5,
  collisionWeight: 1000,
  distanceWeight: 1,
  smoothnessWeight: 10
}
```
**Use Case**: General purpose route planning

### Precise Mode
```typescript
{
  populationSize: 50,
  maxIterations: 150,
  waypointCount: 7,
  w: 0.6,
  c1: 1.8,
  c2: 1.8,
  collisionWeight: 2000,
  distanceWeight: 0.5,
  smoothnessWeight: 20
}
```
**Use Case**: Critical deliveries requiring highest safety

## Implementation Details

### File Structure
```
src/lib/pso.ts                 # Core PSO implementation
src/components/PSOControlPanel.tsx  # UI controls for PSO configuration
src/components/MapContainer.tsx     # Integration with map interface
```

### Key Classes and Functions

#### PSOOptimizer Class
```typescript
class PSOOptimizer {
  constructor(start: Point, end: Point, buildings: any[], config: PSOConfig)
  optimize(progressCallback?: Function): OptimizationResult
  getCurrentBest(): { route: Point[], fitness: number }
}
```

#### Particle Class
```typescript
class Particle {
  calculateFitness(): number
  updateVelocity(globalBest: Point[]): void
  updatePosition(): void
}
```

#### Helper Functions
```typescript
optimizeRouteWithPSO(start, end, buildings, config?, progressCallback?): OptimizationResult
```

## Usage Examples

### Basic PSO Optimization
```typescript
import { optimizeRouteWithPSO, DEFAULT_PSO_CONFIG } from '@/lib/pso'

const result = optimizeRouteWithPSO(
  { lat: -7.2575, lng: 112.7521 },  // Start point
  { lat: -7.2775, lng: 112.7721 },  // End point
  buildings,                        // No-fly zone data
  DEFAULT_PSO_CONFIG                 // Configuration
)

console.log('Optimal route:', result.route)
console.log('Fitness score:', result.fitness)
```

### Custom Configuration
```typescript
const customConfig = {
  ...DEFAULT_PSO_CONFIG,
  populationSize: 40,
  maxIterations: 120,
  collisionWeight: 1500
}

const result = optimizeRouteWithPSO(start, end, buildings, customConfig)
```

### With Progress Tracking
```typescript
const result = optimizeRouteWithPSO(
  start, end, buildings, config,
  (iteration, bestFitness) => {
    console.log(`Iteration ${iteration}: Fitness = ${bestFitness}`)
  }
)
```

## Performance Considerations

### Optimization Speed vs Quality
- **Higher population size** = Better results, slower computation
- **More iterations** = Better convergence, longer wait time
- **More waypoints** = Smoother routes, increased complexity

### Memory Usage
- Each particle stores route data and fitness history
- Consider reducing population size for memory-constrained environments

### Real-time Applications
- Use "Fast" preset for real-time route adjustments
- Implement progressive refinement: start with fast mode, then precise mode

## Integration with Map System

### UI Controls
The PSOControlPanel component provides:
- Enable/disable PSO toggle
- Real-time parameter adjustment
- Preset configuration selection
- Progress visualization
- Performance statistics

### Visual Feedback
- PSO routes displayed in purple color
- Different line styles for PSO vs standard routes
- Real-time progress indicator during optimization
- Fitness score display

## Troubleshooting

### Common Issues

#### Slow Optimization
- Reduce population size or max iterations
- Use "Fast" preset configuration
- Check building data complexity

#### Poor Route Quality
- Increase collision weight for better avoidance
- Add more waypoints for smoother paths
- Increase population size for better exploration

#### Convergence Issues
- Adjust inertia weight (w) - lower for faster convergence
- Balance cognitive (c1) and social (c2) coefficients
- Check for valid start/end points

### Debug Information
Enable console logging to monitor optimization:
```typescript
// PSO automatically logs progress every 10 iterations
// Check browser console for detailed optimization information
```

## Future Enhancements

### Planned Features
1. **Adaptive PSO**: Dynamic parameter adjustment during optimization
2. **Multi-objective Optimization**: Balance multiple competing objectives
3. **Hybrid Algorithms**: Combine PSO with other optimization methods
4. **Machine Learning**: Learn from historical route data
5. **Real-time Replanning**: Dynamic route adjustment during flight

### Performance Optimizations
1. **Web Workers**: Run PSO in background threads
2. **GPU Acceleration**: Parallel fitness evaluation
3. **Caching**: Store and reuse previous optimization results
4. **Progressive Loading**: Display intermediate results

## API Reference

### PSOConfig Interface
```typescript
interface PSOConfig {
  populationSize: number
  maxIterations: number
  w: number
  c1: number
  c2: number
  maxVelocity: number
  waypointCount: number
  collisionWeight: number
  distanceWeight: number
  smoothnessWeight: number
}
```

### OptimizationResult Interface
```typescript
interface OptimizationResult {
  route: Point[]           // Optimal waypoints
  fitness: number          // Final fitness score
  iterations: number       // Iterations completed
  history: number[]        // Fitness progression history
}
```

## Conclusion

PSO optimization provides intelligent route planning that considers multiple factors beyond simple distance calculation. By avoiding no-fly zones, optimizing for smooth flight paths, and adapting to complex urban environments, our drone delivery system can achieve safer and more efficient operations.

The modular design allows for easy configuration and tuning based on specific use cases, from quick real-time adjustments to precise pre-flight planning for critical deliveries.