interface ComponentScoreRange {
  min: number;
  max: number;
}

interface TaskRequirements {
  cpu: ComponentScoreRange;
  ram: ComponentScoreRange;
  gpu: ComponentScoreRange;
  storageType: ComponentScoreRange;
  screenSize: ComponentScoreRange;
  weight: ComponentScoreRange;
  // Add more components as needed
}

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



// Define ideal ranges for each task (example)
const taskRequirements: Record<string, TaskRequirements> = {
  "Heavy Programming": {
    cpu: { min: 7, max: 10 },
    ram: { min: 8, max: 10 },
    gpu: { min: 5, max: 8 },
    storageType: { min: 6, max: 8 },
    screenSize: { min: 6, max: 8 },
    weight: { min: 3, max: 6 }
    // Add other components as needed
  },
  // Define other tasks as needed
};

// Function to calculate component score based on Euclidean distance
function calculateComponentScore(
  componentScore: number,
  idealRange: ComponentScoreRange
): number {
  const midpoint = (idealRange.min + idealRange.max) / 2;
  const distance = Math.abs(midpoint - componentScore);
  const maxDistance = Math.abs(idealRange.max - idealRange.min) / 2; // Half of the range is the maximum distance
  const normalizedScore = 100 - (distance / maxDistance) * 100; // Scale to 0-100
  return Math.max(0, normalizedScore); // Ensure score is at least 0
}

// Calculate Euclidean distance for laptop score
export function calculateLaptopScore(laptop: any, answers: any): number {
  const { tasks } = answers;

  // Aggregate ideal task requirements
  const combinedTaskRequirements: TaskRequirements = tasks.reduce(
    (acc: TaskRequirements, task: string) => {
      const requirements = taskRequirements[task];
      for (const key in requirements) {
        if (acc[key as keyof TaskRequirements].min < requirements[key as keyof TaskRequirements].min) {
          acc[key as keyof TaskRequirements].min = requirements[key as keyof TaskRequirements].min;
        }
        if (acc[key as keyof TaskRequirements].max < requirements[key as keyof TaskRequirements].max) {
          acc[key as keyof TaskRequirements].max = requirements[key as keyof TaskRequirements].max;
        }
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

  // Scores and weights for each component
  const weights = {
    cpu: 0.25,
    ram: 0.2,
    gpu: 0.2,
    storageType: 0.15,
    screenSize: 0.1,
    weight: 0.1
  };

  // Component scores (objectively scored out of 10)
  const cpuScore = cpuModelDetails[laptop.cpu] || 0;
  const ramScore = laptop.ram_size / 16 * 10; // Assume 16GB as full score of 10
  const gpuScore = laptop.gpu_score; // Assume this is scored 1-10 based on your data
  const storageTypeScore = laptop.storageType === "SSD" ? 8 : 5; // Example: SSD scores 8, HDD scores 5
  const screenSizeScore = laptop.screen_size >= 15 ? 8 : 5; // Example: larger screens get higher score
  const weightScore = laptop.weight <= 2.0 ? 8 : 5; // Example: lighter weight gets higher score

  // Calculate weighted sum of distances
  let totalDistance = 0;
  let maxDistance = 0;

  totalDistance += weights.cpu * Math.pow(calculateComponentScore(cpuScore, combinedTaskRequirements.cpu) - 100, 2);
  totalDistance += weights.ram * Math.pow(calculateComponentScore(ramScore, combinedTaskRequirements.ram) - 100, 2);
  totalDistance += weights.gpu * Math.pow(calculateComponentScore(gpuScore, combinedTaskRequirements.gpu) - 100, 2);
  totalDistance += weights.storageType * Math.pow(calculateComponentScore(storageTypeScore, combinedTaskRequirements.storageType) - 100, 2);
  totalDistance += weights.screenSize * Math.pow(calculateComponentScore(screenSizeScore, combinedTaskRequirements.screenSize) - 100, 2);
  totalDistance += weights.weight * Math.pow(calculateComponentScore(weightScore, combinedTaskRequirements.weight) - 100, 2);

  maxDistance += weights.cpu * Math.pow(100, 2); // max distance for each component
  maxDistance += weights.ram * Math.pow(100, 2);
  maxDistance += weights.gpu * Math.pow(100, 2);
  maxDistance += weights.storageType * Math.pow(100, 2);
  maxDistance += weights.screenSize * Math.pow(100, 2);
  maxDistance += weights.weight * Math.pow(100, 2);

  const finalScore = 100 - Math.sqrt(totalDistance) / Math.sqrt(maxDistance) * 100;

  return Math.max(0, Math.round(finalScore));
}
