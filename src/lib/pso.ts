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

// Helper function to check if a line segment collides with any building
function checkLineCollision(start: Point, end: Point, buildings: any[]): boolean {
  const line = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]]);
  
  for (const building of buildings) {
    if (turf.booleanIntersects(line, building)) {
      return true;
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

// Default PSO configuration for drone route optimization
export const DEFAULT_PSO_CONFIG: PSOConfig = {
  populationSize: 50,
  maxIterations: 150,
  w: 0.5,          // Lower inertia for faster convergence
  c1: 2.0,         // Higher cognitive coefficient for personal best
  c2: 1.0,         // Lower social coefficient to avoid premature convergence
  maxVelocity: 0.005, // Smaller velocity for finer adjustments
  waypointCount: 8,  // More waypoints for better building avoidance
  collisionWeight: 10000, // Very high penalty for collisions
  distanceWeight: 5,    // Higher priority for shorter routes
  smoothnessWeight: 2   // Lower penalty for turns to allow direct paths
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
      
      // Add smaller random variation for more focused search
      const variation = 0.002; // ~200m variation (reduced from 500m)
      waypoints.push({
        lat: baseLat + (Math.random() - 0.5) * variation,
        lng: baseLng + (Math.random() - 0.5) * variation
      });
    }
    
    return waypoints;
  }

  // Initialize velocity with smaller random values
  private initializeVelocity(): number[][] {
    return Array(this.config.waypointCount).fill(null).map(() => [
      (Math.random() - 0.5) * 0.0005, // lat velocity (reduced)
      (Math.random() - 0.5) * 0.0005  // lng velocity (reduced)
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

    // Calculate total distance and check for collisions
    for (let i = 0; i < fullRoute.length - 1; i++) {
      const segment = [fullRoute[i], fullRoute[i + 1]];
      totalDistance += calculateDistance(segment[0], segment[1]);
      
      // Check for collisions with buildings (very high penalty)
      if (checkLineCollision(segment[0], segment[1], this.buildings)) {
        collisionPenalty += this.config.collisionWeight;
      }
      
      // Check proximity to buildings (moderate penalty)
      buildingProximityPenalty += this.calculateBuildingProximityPenalty(segment[0], segment[1]);
    }

    // Calculate smoothness penalty (only for very sharp turns)
    for (let i = 1; i < fullRoute.length - 1; i++) {
      const angle1 = Math.atan2(
        fullRoute[i].lat - fullRoute[i-1].lat,
        fullRoute[i].lng - fullRoute[i-1].lng
      );
      const angle2 = Math.atan2(
        fullRoute[i+1].lat - fullRoute[i].lat,
        fullRoute[i+1].lng - fullRoute[i].lng
      );
      const angleDiff = Math.abs(angle2 - angle1);
      // Only penalize very sharp turns (> 90 degrees)
      if (angleDiff > Math.PI / 2) {
        smoothnessPenalty += angleDiff * this.config.smoothnessWeight;
      }
    }

    // Total fitness (lower is better)
    this.fitness = (totalDistance * this.config.distanceWeight) +
                   collisionPenalty +
                   buildingProximityPenalty +
                   smoothnessPenalty;

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
      
      // Add penalty if within 50 meters of building
      if (distance < 0.05) {
        proximityPenalty += (0.05 - distance) * 1000; // Scale up penalty
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

  // Calculate penalty for being too close to buildings (moved from Particle class)
  private calculateBuildingProximityPenalty(start: Point, end: Point): number {
    const line = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]]);
    let proximityPenalty = 0;
    
    for (const building of this.buildings) {
      // Calculate distance from line segment to building
      const buildingCenter = turf.center(building);
      const distance = turf.pointToLineDistance(buildingCenter, line, { units: 'kilometers' });
      
      // Add penalty if within 100 meters (0.1 km) of building
      if (distance < 0.1) {
        proximityPenalty += (0.1 - distance) * 5000; // Higher penalty for closer proximity
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

  // Run PSO optimization
  optimize(progressCallback?: (iteration: number, bestFitness: number) => void): { route: Point[], fitness: number, iterations: number, history: number[] } {
    console.log(`Starting PSO optimization with ${this.config.populationSize} particles for ${this.config.maxIterations} iterations`);

    for (this.iteration = 0; this.iteration < this.config.maxIterations; this.iteration++) {
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

      // Update particles
      for (const particle of this.particles) {
        particle.updateVelocity(this.globalBest);
        particle.updatePosition();
      }

      // Call progress callback if provided
      if (progressCallback) {
        progressCallback(this.iteration, this.globalBestFitness);
      }

      // Log progress every 10 iterations
      if (this.iteration % 10 === 0) {
        console.log(`Iteration ${this.iteration}: Best fitness = ${this.globalBestFitness.toFixed(2)}`);
      }
    }

    let finalRoute: Point[] = [this.start, ...this.globalBest, this.end];
    
    // Post-process the route for final optimization
    finalRoute = this.postProcessRoute(finalRoute);
    
    console.log(`PSO optimization complete. Final fitness: ${this.globalBestFitness.toFixed(2)}`);

    return {
      route: finalRoute,
      fitness: this.globalBestFitness,
      iterations: this.iteration,
      history: this.fitnessHistory
    };
  }

  // Post-process route to remove unnecessary waypoints and optimize path
  private postProcessRoute(route: Point[]): Point[] {
    if (route.length <= 2) return route;
    
    const optimized: Point[] = [route[0]]; // Always keep start point
    
    for (let i = 1; i < route.length - 1; i++) {
      const prev = optimized[optimized.length - 1];
      const current = route[i];
      const next = route[i + 1];
      
      // Check if we can remove current point (direct path from prev to next is safe)
      if (!checkLineCollision(prev, next, this.buildings)) {
        // Check if direct path is not too close to buildings
        const proximityPenalty = this.calculateBuildingProximityPenalty(prev, next);
        if (proximityPenalty < 50) { // Lower threshold for acceptable proximity
          continue; // Skip current point
        }
      }
      
      optimized.push(current);
    }
    
    optimized.push(route[route.length - 1]); // Always keep end point
    
    // If we removed too many points, ensure minimum waypoints
    if (optimized.length < 3 && route.length > 2) {
      // Add back some intermediate points if needed
      const midIndex = Math.floor(route.length / 2);
      if (!optimized.includes(route[midIndex])) {
        optimized.splice(1, 0, route[midIndex]);
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