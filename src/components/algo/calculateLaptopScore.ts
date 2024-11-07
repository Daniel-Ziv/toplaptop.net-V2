interface ComponentScoreRange {
  min: number;
  max: number;
}

interface TaskRequirements {
  cpu: ComponentScoreRange;
  ram: ComponentScoreRange;
  ramType: ComponentScoreRange;
  gpu: ComponentScoreRange;
  storageSpace: ComponentScoreRange;
  storageType: ComponentScoreRange;
}

// Define CPU model base scores
const cpuModelDetails: Record<string, number> = {

  "Intel Core i5": 6,
 
 "Intel Core i7": 8,
 
 "Intel Core Ultra 7": 8,
 
 "Intel Core i9": 10,
 
 "Intel Core i3": 4,
 
 "M1": 8,
 
 "Intel Core Ultra 5": 6,
 
 "Intel Celeron": 3,
 
 "AMD Ryzen 7": 8,
 
 "M3": 8,
 
 "AMD Athlon Silver": 4,
 
 "Intel Core Ultra 9": 10,
 
 "M2": 8,
 
 "Intel Processor": 4,
 
 "Intel Core 7": 8,
 
 "AMD Ryzen 5": 6,
 
 "M3 Pro": 8,
 
 "Intel Core 5": 6,
 
 "AMD Ryzen Ai 9": 10,
 
 "Intel Pentium": 3,
 
 "Intel Pentium Silver": 3,
 
 "AMD Ryzen 9": 10,
 
 "Intel N200": 3,
 
 "AMD Ryzen 7 PRO": 8,
 
 "Qualcomm Snapdragon": 8,
 
 "AMD": 4,
 
 "M3 Max": 10,
 
 "Intel N100": 2,
 
 "Intel Core 3": 4,
 
 "Qualcomm Snapdragon X Plus": 8,
 
 "M2 Max": 10,
 
 "M2 PRO": 8,
 
 "Intel Pentium Gold": 3,
 
 "AMD A4": 2,
 
 "X Elite": 6,
 
 "Intel Core 2 Duo": 2,
 
 "M1 Max": 10,
 
 "AMD Ryzen 5 PRO": 6,
 
 "Intel Atom": 2,
 
 "Intel Core M3": 4,
 
 "AMD Athlon Silver APU": 4,
 
 "Intel Core Duo": 2,
 
 "M1 Pro": 8,
 
 "Intel Core M5": 4,
 
 "Intel Xeon": 6,
 
 "AMD Ryzen 3": 4,
 
 "Intel Mobile": 4,
 
 "M4 Pro": 8,
 
 "M4": 8,
 
 "M4 Max": 10,
 
 };

// Ideal ranges for each task
const taskRequirements: Record<string, TaskRequirements> = {
  "Heavy Programming": {
    cpu: { min: 7, max: 10 },
    ram: { min: 8, max: 10 },
    gpu: { min: 5, max: 8 },
    storageType: { min: 6, max: 8 },
  },
  // Define other tasks as needed
};

// Calculate component score based on Euclidean distance
function calculateComponentScore(
  componentScore: number,
  idealRange: ComponentScoreRange
): number {
  const midpoint = (idealRange.min + idealRange.max) / 2;
  const maxDistance = Math.abs(idealRange.max - idealRange.min) / 2 || 1; // Ensure non-zero maxDistance
  const distance = Math.abs(midpoint - componentScore);
  const normalizedScore = 100 - (distance / maxDistance) * 100; // Scale to 0-100
  return Math.max(0, normalizedScore); // Ensure score is at least 0
}

// Main function to calculate laptop score
export function calculateLaptopScore(laptop: any, answers: any): number {
  const { tasks } = answers;

  // Aggregate ideal task requirements
  const combinedTaskRequirements: TaskRequirements = tasks.reduce(
    (acc: TaskRequirements, task: string) => {
      const requirements = taskRequirements[task];
      for (const key in requirements) {
        const component = key as keyof TaskRequirements;
        acc[component].min = Math.max(acc[component].min, requirements[component].min);
        acc[component].max = Math.max(acc[component].max, requirements[component].max);
      }
      return acc;
    },
    {
      cpu: { min: 0, max: 10 },
      ram: { min: 0, max: 10 },
      gpu: { min: 0, max: 10 },
      storageType: { min: 0, max: 10 },
      screenSize: { min: 0, max: 10 },
      weight: { min: 0, max: 10 }
    }
  );
  console.log("Combined Task Requirements:", combinedTaskRequirements);


  // Define weights for each component
  const weights = {
    cpu: 0.25,
    ram: 0.2,
    gpu: 0.2,
    storageType: 0.15,
    screenSize: 0.1,
    weight: 0.1
  };

  // Objective component scores (out of 10)
  const cpuScore = cpuModelDetails[laptop.cpu] || 0;
  const ramScore = (laptop.ram_size / 16) * 10; // Example: 16GB as full score
  const gpuScore = laptop.gpu_score || 5; // Use a default if missing
  const storageTypeScore = laptop.storageType === "SSD" ? 8 : 5; // Example: SSD scores 8, HDD scores 5
  const screenSizeScore = laptop.screen_size >= 15 ? 8 : 5;
  const weightScore = laptop.weight <= 2.0 ? 8 : 5;

  console.log("Component Scores:", { cpuScore, ramScore, gpuScore, storageTypeScore, screenSizeScore, weightScore });


  // Calculate weighted sum of distances
  let totalDistance = 0;
  let maxDistance = 0;

  // Sum the Euclidean distances for each component
  totalDistance += weights.cpu * Math.pow(calculateComponentScore(cpuScore, combinedTaskRequirements.cpu) - 100, 2);
  totalDistance += weights.ram * Math.pow(calculateComponentScore(ramScore, combinedTaskRequirements.ram) - 100, 2);
  totalDistance += weights.gpu * Math.pow(calculateComponentScore(gpuScore, combinedTaskRequirements.gpu) - 100, 2);
  totalDistance += weights.storageType * Math.pow(calculateComponentScore(storageTypeScore, combinedTaskRequirements.storageType) - 100, 2);
  totalDistance += weights.screenSize * Math.pow(calculateComponentScore(screenSizeScore, combinedTaskRequirements.screenSize) - 100, 2);
  totalDistance += weights.weight * Math.pow(calculateComponentScore(weightScore, combinedTaskRequirements.weight) - 100, 2);

  // Calculate max possible distance for normalization
  maxDistance += weights.cpu * Math.pow(100, 2);
  maxDistance += weights.ram * Math.pow(100, 2);
  maxDistance += weights.gpu * Math.pow(100, 2);
  maxDistance += weights.storageType * Math.pow(100, 2);
  maxDistance += weights.screenSize * Math.pow(100, 2);
  maxDistance += weights.weight * Math.pow(100, 2);

  // Normalize to get final score as a percentage
  const finalScore = 100 - (Math.sqrt(totalDistance) / Math.sqrt(maxDistance)) * 100;
  return Math.max(0, Math.round(finalScore));
}
