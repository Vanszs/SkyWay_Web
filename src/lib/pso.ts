import { Point } from '@/types/route';
import * as turf from '@turf/turf';
import { isPointInBuilding, calculateRouteDistance } from './pathfinding';

// Helper function to calculate distance between two points
function calculateDistance(point1: Point, point2: Point): number {
  return turf.distance(
    turf.point([point1.lng, point1.lat]),
    turf.point([point2.lng, point2.lat]),
    { units: 'kilometers' }
  );
}

// Helper function to check if a line segment collides with any building or is too close
function checkLineCollision(start: Point, end: Point, buildings: any[]): boolean {
  const line = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]]);
  
  for (const building of buildings) {
    // Check direct intersection with building
    if (turf.booleanIntersects(line, building)) {
      return true;
    }
    
    // Create buffer zone for this building
    const buffered = turf.buffer(building, 0.1, { units: 'kilometers' });
    if (buffered && turf.booleanIntersects(line, buffered)) {
      return true;
    }
    
    // Check multiple points along the line segment for better collision detection
    const segmentLength = turf.distance(
      turf.point([start.lng, start.lat]),
      turf.point([end.lng, end.lat]),
      { units: 'kilometers' }
    );
    
    // Sample points every 20 meters along the segment (reduced for performance)
    const numSamples = Math.max(2, Math.ceil(segmentLength / 0.02));
    for (let i = 0; i <= numSamples; i++) {
      const fraction = i / numSamples;
      const interpolatedPoint = turf.along(line, fraction * segmentLength, { units: 'kilometers' });
      
      // Check if point is within buffer zone
      if (buffered && turf.booleanContains(buffered, interpolatedPoint)) {
        return true;
      }
    }
  }
  
  return false;
}

// PSO Configuration
export interface PSOConfig {
  populationSize: number;      // Number of particles
  maxIterations: number;       // Maximum iterations
  w: number;                   // Inertia weight
  c1: number;                  // Cognitive coefficient
  c2: number;                  // Social coefficient
  maxVelocity: number;         // Maximum velocity
  waypointCount: number;       // Number of waypoints to optimize
  collisionWeight: number;     // Weight for collision penalty
  distanceWeight: number;      // Weight for distance penalty
  smoothnessWeight: number;    // Weight for smoothness penalty
}

// Fully optimized automatic PSO configuration for best routes with 100m building avoidance
export const DEFAULT_PSO_CONFIG: PSOConfig = {
  populationSize: 80,    // Reduced population to prevent freezing
  maxIterations: 200,    // Reduced iterations for faster performance
  w: 0.7,               // Higher inertia for better exploration
  c1: 1.5,              // Cognitive coefficient for personal best
  c2: 1.5,              // Social coefficient for global best
  maxVelocity: 0.002,   // Higher velocity for faster exploration
  waypointCount: 8,     // Fewer waypoints for faster computation
  collisionWeight: 2000000, // Even higher penalty for collisions
  distanceWeight: 1,     // Moderate priority for distance
  smoothnessWeight: 3    // Lower priority for smooth routes
};

// Particle class for PSO
class Particle {
  position: Point[];      // Current position (waypoints)
  velocity: number[][];   // Velocity for each waypoint
  personalBest: Point[];  // Best position found by this particle
  personalBestFitness: number; // Fitness of personal best
  fitness: number;        // Current fitness

  constructor(
    private start: Point,
    private end: Point,
    private config: PSOConfig,
    private buildings: any[]
  ) {
    // Initialize particle with random waypoints
    this.position = this.initializeRandomWaypoints();
    this.velocity = this.initializeVelocity();
    this.personalBest = [...this.position];
    this.personalBestFitness = Infinity;
    this.fitness = Infinity;
  }

  // Initialize random waypoints between start and end
  private initializeRandomWaypoints(): Point[] {
    const waypoints: Point[] = [];
    const latStep = (this.end.lat - this.start.lat) / (this.config.waypointCount + 1);
    const lngStep = (this.end.lng - this.start.lng) / (this.config.waypointCount + 1);

    for (let i = 1; i <= this.config.waypointCount; i++) {
      // Base position on straight line
      const baseLat = this.start.lat + (latStep * i);
      const baseLng = this.start.lng + (lngStep * i);
      
      // Add random variation with larger range for better obstacle avoidance
      const variation = 0.005; // ~500m variation for better exploration
      waypoints.push({
        lat: baseLat + (Math.random() - 0.5) * variation,
        lng: baseLng + (Math.random() - 0.5) * variation
      });
    }
    
    return waypoints;
  }

  // Initialize velocity with appropriate random values for better exploration
  private initializeVelocity(): number[][] {
    return Array(this.config.waypointCount).fill(null).map(() => [
      (Math.random() - 0.5) * 0.001, // lat velocity
      (Math.random() - 0.5) * 0.001  // lng velocity
    ]);
  }

  // Calculate fitness of current position
  calculateFitness(): number {
    // Create full route including start and end points
    const fullRoute: Point[] = [this.start, ...this.position, this.end];
    
    let totalDistance = 0;
    let collisionPenalty = 0;
    let buildingProximityPenalty = 0;
    let smoothnessPenalty = 0;
    let directCollisionCount = 0;

    // Calculate total distance and check for collisions
    for (let i = 0; i < fullRoute.length - 1; i++) {
      const segment = [fullRoute[i], fullRoute[i + 1]];
      totalDistance += calculateDistance(segment[0], segment[1]);
      
      // Check for collisions with buildings (very high penalty)
      if (checkLineCollision(segment[0], segment[1], this.buildings)) {
        collisionPenalty += this.config.collisionWeight;
        directCollisionCount++;
      }
      
      // Check proximity to buildings (moderate penalty)
      buildingProximityPenalty += this.calculateBuildingProximityPenalty(segment[0], segment[1]);
    }

    // Extra penalty for any direct collisions
    if (directCollisionCount > 0) {
      collisionPenalty += directCollisionCount * this.config.collisionWeight * 2;
    }

    // Calculate smoothness penalty (penalize ALL turns to encourage straight routes)
    for (let i = 1; i < fullRoute.length - 1; i++) {
      const angle1 = Math.atan2(
        fullRoute[i].lat - fullRoute[i-1].lat,
        fullRoute[i].lng - fullRoute[i-1].lng
      );
      const angle2 = Math.atan2(
        fullRoute[i+1].lat - fullRoute[i].lat,
        fullRoute[i+1].lng - fullRoute[i].lng
      );
      let angleDiff = Math.abs(angle2 - angle1);
      
      // Normalize angle difference to [0, π]
      if (angleDiff > Math.PI) {
        angleDiff = 2 * Math.PI - angleDiff;
      }
      
      // Penalize ALL turns, with exponential penalty for sharper turns
      smoothnessPenalty += Math.pow(angleDiff, 2) * this.config.smoothnessWeight * 10;
    }

    // Total fitness (lower is better)
    this.fitness = (totalDistance * this.config.distanceWeight) +
                   collisionPenalty +
                   buildingProximityPenalty +
                   smoothnessPenalty;

    // If there are any collisions, make fitness extremely high
    if (directCollisionCount > 0) {
      this.fitness += 1000000 * directCollisionCount;
    }

    // Update personal best if current position is better
    if (this.fitness < this.personalBestFitness) {
      this.personalBestFitness = this.fitness;
      this.personalBest = [...this.position];
    }

    return this.fitness;
  }

  // Calculate penalty for being too close to buildings
  private calculateBuildingProximityPenalty(start: Point, end: Point): number {
    const line = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]]);
    let proximityPenalty = 0;
    
    for (const building of this.buildings) {
      // Calculate distance from line segment to building
      const buildingCenter = turf.center(building);
      const distance = turf.pointToLineDistance(buildingCenter, line, { units: 'kilometers' });
      
      // Add penalty if within 100 meters (0.1 km) of building - strict safety margin
      if (distance < 0.1) {
        // Exponential penalty for closer proximity
        const penaltyMultiplier = Math.pow((0.1 - distance) * 10, 2);
        proximityPenalty += penaltyMultiplier * 10000; // Much higher penalty
      }
      
      // Additional penalty for direct intersection
      if (turf.booleanIntersects(line, building)) {
        proximityPenalty += 500000; // Extreme penalty for intersection
      }
    }
    
    return proximityPenalty;
  }

  // Update particle velocity and position
  updateVelocity(globalBest: Point[]): void {
    for (let i = 0; i < this.config.waypointCount; i++) {
      // Cognitive component (personal best)
      const cognitiveLat = this.config.c1 * Math.random() * 
        (this.personalBest[i].lat - this.position[i].lat);
      const cognitiveLng = this.config.c1 * Math.random() * 
        (this.personalBest[i].lng - this.position[i].lng);

      // Social component (global best)
      const socialLat = this.config.c2 * Math.random() * 
        (globalBest[i].lat - this.position[i].lat);
      const socialLng = this.config.c2 * Math.random() * 
        (globalBest[i].lng - this.position[i].lng);

      // Update velocity with inertia
      this.velocity[i][0] = this.config.w * this.velocity[i][0] + 
                           cognitiveLat + socialLat;
      this.velocity[i][1] = this.config.w * this.velocity[i][1] + 
                           cognitiveLng + socialLng;

      // Clamp velocity
      this.velocity[i][0] = Math.max(-this.config.maxVelocity, 
                              Math.min(this.config.maxVelocity, this.velocity[i][0]));
      this.velocity[i][1] = Math.max(-this.config.maxVelocity, 
                              Math.min(this.config.maxVelocity, this.velocity[i][1]));
    }
  }

  // Update particle position
  updatePosition(): void {
    for (let i = 0; i < this.config.waypointCount; i++) {
      this.position[i].lat += this.velocity[i][0];
      this.position[i].lng += this.velocity[i][1];
    }
  }
}

// PSO Algorithm implementation
export class PSOOptimizer {
  private particles: Particle[] = [];
  private globalBest: Point[] = [];
  private globalBestFitness: number = Infinity;
  private iteration: number = 0;
  private fitnessHistory: number[] = [];

  constructor(
    private start: Point,
    private end: Point,
    private buildings: any[],
    private config: PSOConfig = DEFAULT_PSO_CONFIG
  ) {
    this.initializeSwarm();
  }

  // Calculate penalty for being too close to buildings with individual buffer zones
  private calculateBuildingProximityPenalty(start: Point, end: Point): number {
    const line = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]]);
    let proximityPenalty = 0;
    
    for (const building of this.buildings) {
      // Create buffer zone for this building
      const buffered = turf.buffer(building, 0.1, { units: 'kilometers' });
      
      // Check against buffer zone
      if (buffered && turf.booleanIntersects(line, buffered)) {
        proximityPenalty += 1000000; // Extreme penalty for entering buffer zone
      }
      
      // Additional check for direct building intersection
      if (turf.booleanIntersects(line, building)) {
        proximityPenalty += 2000000; // Extreme penalty for building intersection
      }
      
      // Check multiple points along the line segment for better collision detection
      const segmentLength = turf.distance(
        turf.point([start.lng, start.lat]),
        turf.point([end.lng, end.lat]),
        { units: 'kilometers' }
      );
      
      // Sample points every 20 meters along the segment (reduced for performance)
      const numSamples = Math.max(2, Math.ceil(segmentLength / 0.02));
      for (let i = 0; i <= numSamples; i++) {
        const fraction = i / numSamples;
        const interpolatedPoint = turf.along(line, fraction * segmentLength, { units: 'kilometers' });
        
        // Check if point is within buffer zone
        if (buffered && turf.booleanContains(buffered, interpolatedPoint)) {
          proximityPenalty += 500000; // High penalty for point in buffer
        }
      }
    }
    
    return proximityPenalty;
  }

  // Initialize particle swarm
  private initializeSwarm(): void {
    this.particles = [];
    for (let i = 0; i < this.config.populationSize; i++) {
      this.particles.push(new Particle(this.start, this.end, this.config, this.buildings));
    }
  }

  // Run dynamic PSO optimization until optimal route found
  async optimize(progressCallback?: (iteration: number, bestFitness: number) => void): Promise<{ route: Point[], fitness: number, iterations: number, history: number[] }> {
    console.log(`Starting dynamic PSO optimization with ${this.config.populationSize} particles`);
    
    let noImprovementCount = 0;
    let previousBestFitness = Infinity;
    let maxIterations = this.config.maxIterations;
    let currentConfig = { ...this.config };

    for (this.iteration = 0; this.iteration < maxIterations; this.iteration++) {
      // Evaluate fitness for all particles
      for (const particle of this.particles) {
        particle.calculateFitness();
      }

      // Find global best
      for (const particle of this.particles) {
        if (particle.fitness < this.globalBestFitness) {
          this.globalBestFitness = particle.fitness;
          this.globalBest = [...particle.personalBest];
        }
      }

      // Record best fitness for this iteration
      this.fitnessHistory.push(this.globalBestFitness);

      // Check for improvement
      if (this.globalBestFitness < previousBestFitness - 0.01) {
        noImprovementCount = 0;
        previousBestFitness = this.globalBestFitness;
      } else {
        noImprovementCount++;
      }

      // Dynamic parameter adjustment based on progress
      if (noImprovementCount > 50) {
        // Increase exploration
        currentConfig.w = Math.min(0.9, currentConfig.w + 0.1);
        currentConfig.maxVelocity = Math.min(0.005, currentConfig.maxVelocity * 1.2);
        noImprovementCount = 0;
        console.log(`Adjusting parameters for better exploration: w=${currentConfig.w}, maxVelocity=${currentConfig.maxVelocity}`);
      } else if (noImprovementCount > 20) {
        // Increase population for better search
        if (this.particles.length < 200) {
          for (let i = 0; i < 20; i++) {
            this.particles.push(new Particle(this.start, this.end, currentConfig, this.buildings));
          }
          console.log(`Increased population to ${this.particles.length} particles`);
        }
      }

      // Update particles with current config
      for (const particle of this.particles) {
        particle.updateVelocity(this.globalBest);
        particle.updatePosition();
      }

      // Call progress callback if provided
      if (progressCallback) {
        progressCallback(this.iteration, this.globalBestFitness);
      }

      // Log progress every 20 iterations
      if (this.iteration % 20 === 0) {
        console.log(`Iteration ${this.iteration}: Best fitness = ${this.globalBestFitness.toFixed(2)}, No improvement: ${noImprovementCount}`);
      }

      // Check if we found a perfect route (no collisions, very straight, short distance)
      const testRoute = [this.start, ...this.globalBest, this.end];
      const hasCollisions = this.checkRouteForCollisions(testRoute);
      const routeDistance = this.calculateRouteDistance(testRoute);
      const straightness = this.calculateStraightness(testRoute);
      
      // Early termination if we found an optimal route
      if (!hasCollisions && straightness > 0.95 && routeDistance < this.getDirectDistance() * 1.2) {
        console.log(`Found optimal route at iteration ${this.iteration}!`);
        break;
      }

      // Extend iterations if still improving significantly
      if (this.iteration === maxIterations - 1 && noImprovementCount < 10) {
        maxIterations += 100;
        console.log(`Extending optimization to ${maxIterations} iterations due to continued improvement`);
      }

      // Yield to browser every 5 iterations to prevent freezing
      if (this.iteration % 5 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }

    let finalRoute: Point[] = [this.start, ...this.globalBest, this.end];
    
    // Post-process the route for final optimization
    finalRoute = this.postProcessRoute(finalRoute);
    
    console.log(`Dynamic PSO optimization complete. Final fitness: ${this.globalBestFitness.toFixed(2)}`);

    return {
      route: finalRoute,
      fitness: this.globalBestFitness,
      iterations: this.iteration,
      history: this.fitnessHistory
    };
  }

  // Helper method to check if route has collisions
  private checkRouteForCollisions(route: Point[]): boolean {
    for (let i = 0; i < route.length - 1; i++) {
      const line = turf.lineString([[route[i].lng, route[i].lat], [route[i+1].lng, route[i+1].lat]]);
      for (const building of this.buildings) {
        if (turf.booleanIntersects(line, building)) {
          return true;
        }
      }
    }
    return false;
  }

  // Helper method to calculate route straightness (0-1, where 1 is perfectly straight)
  private calculateStraightness(route: Point[]): number {
    if (route.length < 3) return 1;
    
    const directDistance = this.getDirectDistance();
    const actualDistance = this.calculateRouteDistance(route);
    
    // Perfect straightness ratio is direct distance / actual distance
    return directDistance / actualDistance;
  }

  // Helper method to get direct distance between start and end
  private getDirectDistance(): number {
    return calculateDistance(this.start, this.end);
  }

  // Helper method to calculate total route distance
  private calculateRouteDistance(route: Point[]): number {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += calculateDistance(route[i], route[i + 1]);
    }
    return totalDistance;
  }

  // Post-process route to remove unnecessary waypoints and optimize for straightest path
  private postProcessRoute(route: Point[]): Point[] {
    if (route.length <= 2) return route;
    
    // Start with just the start and end points
    let optimized: Point[] = [route[0], route[route.length - 1]];
    
    // Try to add back essential waypoints only if absolutely necessary
    for (let i = 1; i < route.length - 1; i++) {
      const current = route[i];
      let needsWaypoint = false;
      
      // Check all segments in the current optimized route
      for (let j = 0; j < optimized.length - 1; j++) {
        const segmentStart = optimized[j];
        const segmentEnd = optimized[j + 1];
        
        // Check if current waypoint is needed to avoid collisions
        if (checkLineCollision(segmentStart, segmentEnd, this.buildings)) {
          // Try both paths: start->current and current->end
          const firstSegmentSafe = !checkLineCollision(segmentStart, current, this.buildings);
          const secondSegmentSafe = !checkLineCollision(current, segmentEnd, this.buildings);
          
          if (firstSegmentSafe && secondSegmentSafe) {
            needsWaypoint = true;
            break;
          }
        }
      }
      
      if (needsWaypoint) {
        // Find the best place to insert this waypoint
        let bestInsertIndex = 1;
        let minDistanceIncrease = Infinity;
        
        for (let j = 0; j < optimized.length - 1; j++) {
          const segmentStart = optimized[j];
          const segmentEnd = optimized[j + 1];
          
          // Calculate distance increase if we insert this waypoint
          const originalDistance = calculateDistance(segmentStart, segmentEnd);
          const newDistance = calculateDistance(segmentStart, current) + calculateDistance(current, segmentEnd);
          const distanceIncrease = newDistance - originalDistance;
          
          if (distanceIncrease < minDistanceIncrease) {
            minDistanceIncrease = distanceIncrease;
            bestInsertIndex = j + 1;
          }
        }
        
        optimized.splice(bestInsertIndex, 0, current);
      }
    }
    
    // Final optimization: try to remove any redundant points
    let changed = true;
    while (changed && optimized.length > 2) {
      changed = false;
      
      for (let i = 1; i < optimized.length - 1; i++) {
        const prev = optimized[i - 1];
        const current = optimized[i];
        const next = optimized[i + 1];
        
        // Check if we can remove current point
        if (!checkLineCollision(prev, next, this.buildings)) {
          // Check proximity to buildings with strict 100m safety distance
          const proximityPenalty = this.calculateBuildingProximityPenalty(prev, next);
          if (proximityPenalty === 0) { // Only remove if completely safe (100m+ distance)
            optimized.splice(i, 1);
            changed = true;
            break; // Restart the loop
          }
        }
      }
    }
    
    return optimized;
  }

  // Get current best solution
  getCurrentBest(): { route: Point[], fitness: number } {
    return {
      route: [this.start, ...this.globalBest, this.end],
      fitness: this.globalBestFitness
    };
  }
}

// Helper function to run PSO optimization (async)
export async function optimizeRouteWithPSO(
  start: Point,
  end: Point,
  buildings: any[],
  config?: Partial<PSOConfig>,
  progressCallback?: (iteration: number, bestFitness: number) => void
): Promise<{ route: Point[], fitness: number, iterations: number, history: number[] }> {
  const finalConfig = { ...DEFAULT_PSO_CONFIG, ...config };
  const optimizer = new PSOOptimizer(start, end, buildings, finalConfig);
  return await optimizer.optimize(progressCallback);
}