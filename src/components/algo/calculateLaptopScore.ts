interface ComponentScoreRange {
  min: number;
  max: number;
  weight: number;
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
const cpuModelScores: Record<string, number> = {

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

 // RAM scores: mapping GB size to an objective score out of 10
const ramSizeScores: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  6: 5,
  8: 6,
  12: 7,
  16: 8,
  18: 8,
  24: 8,
  32: 9,
  36: 9,
  48: 9,
  64: 10,
  93: 10,
  96: 10,
  128: 10,
};

const ramTypeScores: Record<string, number> = {
  "DDR2": 2,
  "DDR3": 3,
  "DDR4": 4,
  "DDR5": 5,
  "DDR6": 6,
  "DDRAM": 1
}

// GPU scores: mapping specific models to objective scores
const gpuModelScores: Record<string, number> = {
  "NVIDIA GTX 1650": 6,
  "NVIDIA GTX 1650 Ti": 6,
  "NVIDIA GeForce GTX 1060": 6,
  "NVIDIA GeForce GTX 1660Ti": 7,
  "NVIDIA GeForce GTX 960M": 5,
  "NVIDIA RTX 2060": 7,
  "NVIDIA RTX 3050": 7,
  "NVIDIA GeForce RTX 2060 Max-Q": 7,
  "NVIDIA GeForce RTX 3050 Ti": 7,
  "NVIDIA RTX 3060": 8,
  "NVIDIA GeForce RTX 3060": 8,
  "NVIDIA GeForce RTX 3070": 9,
  "NVIDIA GeForce RTX 3070 Ti": 9,
  "NVIDIA RTX 3070": 9,
  "NVIDIA GeForce RTX 3080": 10,
  "NVIDIA GeForce RTX 3080 Ti": 10,
  "NVIDIA RTX 3080": 10,
  "NVIDIA RTX 4060": 9,
  "NVIDIA RTX 4070": 9,
  "NVIDIA RTX 4080": 10,
  "NVIDIA RTX 4090": 10,
  "Intel UHD Graphics": 4,
  "Intel Iris Xe": 5,
  "Intel Iris Xe Graphics": 5,
  "Intel UHD Graphics 600": 3,
  "Intel UHD Graphics 605": 3,
  "Intel Iris Plus": 4,
  "Intel HD Graphics 620": 3,
  "Intel HD Graphics 520": 3,
  "Intel HD Graphics 4000": 3,
  "Intel HD Graphics 530": 3,
  "Intel HD Graphics": 2,
  "Intel UHD 600": 3,
  "Intel Iris Xe Max": 5,
  "Integrated Intel Iris Xe Graphics": 5,
  "Integrated Intel UHD Graphics": 4,
  "Intel Iris Plus Graphics": 4,
  "AMD Radeon RX 5600M": 7,
  "AMD Radeon RX 6800M": 9,
  "AMD Radeon RX 6800S": 9,
  "AMD Radeon RX 6500M": 6,
  "AMD Radeon RX Vega": 6,
  "AMD Radeon RX Vega 8": 5,
  "AMD Radeon Vega 7 Graphics": 5,
  "AMD Radeon 880M": 5,
  "AMD Radeon Pro 560": 5,
  "Integrated AMD Radeon 780M": 5,
  "AMD Radeon RX 890M": 6,
  "AMD Radeon Graphics": 5,
  "AMD Radeon R5": 2,
  "Integrated AMD Radeon": 4,
  "NVIDIA Quadro RTX 3000": 6,
  "NVIDIA Quadro RTX 4000": 7,
  "NVIDIA Quadro RTX 5000": 8,
  "NVIDIA Quadro T500": 4,
  "NVIDIA Quadro T2000": 5,
  "NVIDIA T1200": 5,
  "NVIDIA T600": 5,
  "NVIDIA RTX A500": 6,
  "NVIDIA RTX A1000": 7,
  "NVIDIA RTX A2000": 7,
  "NVIDIA RTX A3000": 8,
  "NVIDIA RTX A4000": 8,
  "NVIDIA RTX A5000": 9,
  "Intel Arc A370M": 6,
  "Intel Arc Graphics": 5,
  "Integrated Intel Arc Graphics": 5,
  "NVIDIA GeForce MX330": 4,
  "NVIDIA GeForce MX350": 5,
  "NVIDIA GeForce MX450": 5,
  "NVIDIA GeForce MX550": 6,
  "NVIDIA GeForce MX570": 6,
  "NVIDIA GeForce 940MX": 4,
  "Integrated Intel HD Graphics": 3,
  "Intel UHD Graphics 620": 4,
  "NVIDIA RTX 2000": 6,
  "NVIDIA RTX 2000 Ada": 7,
  "Intel Integrated Graphics": 3,
  "Intel Iris X Graphics": 5,
  "Core GPU-8": 6,
  "Core GPU-10": 7,
  "Core GPU-14": 8,
  "Core GPU-16": 8,
  "Core GPU-24": 9,
  "Core GPU-30": 9,
  "Core GPU-38": 10,
  "Core GPU-40": 10,
  "Qualcomm Adreno": 3,
  "Integrated Qualcomm Adreno GPU": 3,
  "NVIDIA RTX 5000 Ada": 9,
  "NVIDIA RTX 4000 Ada": 8,
  "NVIDIA RTX 3000 Ada": 7,
  "Intel GMA HD": 2,
  "Intel HD Graphics 400": 2,
  "NVIDIA GeForce GT 740M": 2,
  "NVIDIA GeForce GT 750M": 3,
  "NVIDIA GeForce GT 840M": 3,
  "NVIDIA GeForce GT 920M": 2,
  "NVIDIA GeForce GT 930M": 3,
  "NVIDIA GeForce GT 820M": 2,
  "NVIDIA GeForce GTX1070": 8,
  "NVIDIA GeForce GTX 950M": 4,
  "AMD Radeon R2": 1,
  "AMD Radeon R3": 2,
  "Intel Iris Graphics": 3,
  "Intel HD Graphics 3000": 2,
  "Intel HD Graphics 4400": 3,
  "Intel HD Graphics 5500": 3,
  "NVIDIA RTX 4000": 8,
  "NVIDIA Quadro T550": 5,
  "AMD Radeon RX 6850M": 8,
  "ATI Radeon hd3450": 1,
  "Intel HD Graphics 4200": 2,
  "Intel HD Graphics 515": 3,
  "NVIDIA GeForce GT 710M": 2,
  "NVIDIA GeForce GT 525M": 2,
  "NVIDIA GeForce GT 610M": 2,
  "NVIDIA GeForce RTX 4050": 8,  
  "7-Core GPU": 6,            
  "Intel Graphics": 3,        
  "10-Core GPU": 7,             
  "Integrated AMD Radeon 610M": 4,
  "NVIDIA Geforce RTX 2050": 6, 
  "Intel UMA": 3,               
  "Integrated AMD Radeon 680M Graphics": 5,
  "Integrated Intel UHD GRAPHICS 600": 3,
  "NVIDIA GeFORCE 920MX": 3,
  "NVIDIA RTX 500 ADA": 6,      
  "Nvidia RTX 3000 Ada": 7,     
  "GPU-618": 3,                  
  "AMD Radeon": 4,               
  "Integrated graphics": 3,    
  "AMD Radeon 610": 4,
  "AMD Radeon R7 M445": 4,
  "NVIDIA GeForce MX570 A": 6,   
  "Intel Premium UHD Graphics": 4,
  "Core GPU-19": 8,            
  "NVIDIA RTX A4500": 8,         
  "NVIDIA GeForce GTX1060": 6,  
  "Intel Iris Xe Graphics Eligible": 5, 
  "Integrated Intel UHD GRAPHICS 605": 3, 
  "NVIDIA RTX 3500": 7,
  "NVIDIA RTX 3500 Ada": 7,
  "Nvidia RTX 1000 Ada": 6,
  "Core GPU-32": 9,           
  "AMD Radeon 520": 3,
  "Intel HD Graphics 500": 2,
  "Intel HD Graphics 5000": 3,
  "Nvidia GeForce GTX 850M": 4,
  "AMD FirePro W4170M": 5,
  "NAVIDIA GeForce GTX970M": 6,
  "NVIDIA RTX A5500": 9,
  "Nvidia Quadro T1000": 5,
  "Integrated Qualcomm Adreno 680 GPU": 3,
  "ATI JET LE R5 M230": 2,
  "AMD FirePro W5130M": 5,
  "NVIDIA GeForce MX250": 4,
  "NVIDIA GeForce GTX1660": 7, 
  "NVIDIA GeForce RTX3000": 7,   
  "AMD Radeon R5 M335": 3,
  "Intel HD graphics 2000": 2,
  "AMD Radeon R9 M265X": 5,
  "NVIDIA Quardro RTX 3000": 6,  
  "AMD Radeon Pro 555X": 5,
  "Core GPU-20": 8,
  "Intel Graphic Media Accelerator": 2,
  "NVidia GeForce GT 525M": 2,   
  "NVIDIA GeForce GT 420M": 2,
  "NVIDIA GeForce GT 635M": 3,
  "Intel GMA 950": 1,
  "AMD Radeon HD 7730M": 4,
  "AMD Radeon HD7570M": 3,
  "Intel GMA X4500": 1,
  "NVIDIA GeForce GTX880M": 5,
  "AMD Radeon HD 8870M": 4,
  "ATI Radeon HD 5145": 2,
  "ATI Radeon HD 5650": 3,
  "ATI JET LE R5": 2,
  "16-Core GPU": 8,             
  "AMD Radeon R5 M230": 2,
  "AMD Radeon R3 Graphics": 2,   
  "Intel HD Graphics 630": 3,
  "Intel HD Graphics 600": 3,     
  "NVIDIA GeForce RTX 4090": 10, 
  "NVIDIA GeForce RTX 4080": 10, 
  "NVIDIA GeForce RTX 4070": 9,   
  "NVIDIA GeForce RTX 4060": 9,   
  "NVIDIA GeForce RTX 3050": 7,   
  "NVIDIA Geforce RTX 2060": 7,   
  "Intel Arc A350M": 5,
  "NVIDIA GeForce MX130": 3,
  "NVIDIA GeForce MX150": 3,
  "NVIDIA GeForce RTX 2070": 8,
  "NVIDIA GeForce RTX 2080": 9,
  "NVIDIA Quadro P520": 4,
  "NVIDIA Quadro P2000": 5,
  "AMD Radeon 890M": 5,
  "AMD Radeon R5 M430": 3,
  "Integrated AMD Radeon 660M": 4,
  "Integrated Intel Iris Plus Graphics": 4,
  "Core GPU-18": 8,
};

// Storage type scores: objective scores for storage types
const storageTypeScores: Record<string, number> = {
  "HDD": 4,
  "SSD": 8,
  "NVMe SSD": 10,
};

const storageSpaceScores: Record<number, number> = {
  16: 1,
  32: 2,
  64: 3,
  128: 4,
  160: 4,
  250: 5,
  256: 5,
  320: 6,
  500: 6,
  508: 6,         
  524: 6,          
  640: 6,
  750: 7,
  774: 7,          
  1000: 7,
  1008: 7,       
  1024: 7,        
  1032: 7,        
  1128: 8,         
  1256: 8,        
  1512: 8,        
  2000: 8,
  3000: 9,
  4000: 10,
  8000: 10
}


// Ideal ranges for each task
const taskRequirements: Record<string, TaskRequirements> = {
  "heavy-programming": {
    cpu: { min: 7, max: 10, weight: 0.3 },           // Heavy programming benefits from a strong CPU.
    ram: { min: 8, max: 10, weight: 0.25 },          // RAM is also crucial for compiling large projects.
    ramType: { min: 2, max: 10, weight: 0.1 },       // RAM type matters but less than RAM size and CPU.
    gpu: { min: 5, max: 10, weight: 0.1 },            // GPU is relevant but less critical for coding.
    storageSpace: { min: 5, max: 10, weight: 0.1 },  // Storage is somewhat important for large projects.
    storageType: { min: 6, max: 10, weight: 0.15 }    // Fast storage type is useful for loading large files.
  },
  "modeling/animation": {
    cpu: { min: 8, max: 10, weight: 0.25 },          // CPU is essential for rendering and processing.
    ram: { min: 8, max: 10, weight: 0.2 },           // Large RAM is needed for handling big files.
    ramType: { min: 4, max: 10, weight: 0.1 },       // RAM type is relevant for performance.
    gpu: { min: 7, max: 10, weight: 0.25 },          // GPU is critical for rendering 3D models.
    storageSpace: { min: 5, max: 10, weight: 0.1 },  // Decent storage is necessary for large projects.
    storageType: { min: 6, max: 10, weight: 0.1 }     // Fast storage type can improve load times.
  },
  "photo-editing": {
    cpu: { min: 6, max: 10, weight: 0.2 },            // CPU helps with rendering and editing speed.
    ram: { min: 4, max: 10, weight: 0.25 },           // RAM is important to handle high-res images.
    ramType: { min: 3, max: 10, weight: 0.15 },      // RAM type contributes to performance.
    gpu: { min: 5, max: 10, weight: 0.2 },            // GPU can enhance processing for effects.
    storageSpace: { min: 4, max: 10, weight: 0.1 },   // Some storage is necessary for large files.
    storageType: { min: 5, max: 10, weight: 0.1 }     // Storage type moderately impacts file handling.
  },
  "music-editing": {
    cpu: { min: 4, max: 10, weight: 0.25 },           // CPU is important for processing audio effects.
    ram: { min: 4, max: 10, weight: 0.2 },            // RAM allows handling multiple tracks.
    ramType: { min: 3, max: 10, weight: 0.1 },       // RAM type matters, but not as much as size.
    gpu: { min: 3, max: 10, weight: 0.1 },            // GPU is less important for audio editing.
    storageSpace: { min: 4, max: 10, weight: 0.15 },  // Storage is important for large audio libraries.
    storageType: { min: 5, max: 10, weight: 0.2 }     // Fast storage type can aid in managing audio files.
  },
  "video-editing": {
    cpu: { min: 7, max: 10, weight: 0.3 },           // CPU is critical for video rendering.
    ram: { min: 8, max: 10, weight: 0.2 },           // RAM is necessary for handling high-res footage.
    ramType: { min: 4, max: 10, weight: 0.1 },       // RAM type helps with performance.
    gpu: { min: 7, max: 10, weight: 0.25 },          // GPU is essential for rendering and playback.
    storageSpace: { min: 6, max: 10, weight: 0.1 },  // Storage is important for large video files.
    storageType: { min: 6, max: 10, weight: 0.05 }    // Fast storage type improves access to large files.
  },
  "basic-use": {
    cpu: { min: 3, max: 5, weight: 0.15 },           // CPU is sufficient for basic tasks.
    ram: { min: 5, max: 6, weight: 0.2 },            // RAM for multitasking basic applications.
    ramType: { min: 2, max: 10, weight: 0.05 },      // RAM type is not a priority.
    gpu: { min: 2, max: 5, weight: 0.1 },            // Minimal GPU needed for simple graphics.
    storageSpace: { min: 3, max: 6, weight: 0.25 },  // Storage is important for general usage files.
    storageType: { min: 3, max: 10, weight: 0.25 }    // Storage type should be reliable, but speed is less crucial.
  },
  "ai": {
    cpu: { min: 8, max: 10, weight: 0.3 },           // High CPU power is crucial for AI processing.
    ram: { min: 8, max: 10, weight: 0.25 },         // Large RAM is essential for handling AI models.
    ramType: { min: 5, max: 10, weight: 0.1 },       // Fast RAM type improves performance.
    gpu: { min: 8, max: 10, weight: 0.25 },          // GPU is vital for processing models and data.
    storageSpace: { min: 6, max: 10, weight: 0.05 }, // Storage space is less important but needed for datasets.
    storageType: { min: 6, max: 10, weight: 0.05 }    // Storage type matters somewhat for loading data quickly.
  },
  "light-programming": {
    cpu: { min: 5, max: 8, weight: 0.2 },            // CPU is helpful but doesn’t need to be very high.
    ram: { min: 4, max: 8, weight: 0.25 },           // RAM is valuable for handling larger projects.
    ramType: { min: 3, max: 10, weight: 0.1 },       // RAM type matters moderately.
    gpu: { min: 3, max: 10, weight: 0.1 },            // GPU is less critical for light programming.
    storageSpace: { min: 4, max: 10, weight: 0.2 },   // Storage space is moderately important.
    storageType: { min: 5, max: 10, weight: 0.15 }    // Storage type has some impact on access speed.
  },
  "gaming-heavy": {
    cpu: { min: 7, max: 10, weight: 0.25 },          // CPU is essential for gaming performance.
    ram: { min: 8, max: 10, weight: 0.2 },           // RAM is critical for running high-end games smoothly.
    ramType: { min: 4, max: 10, weight: 0.1 },       // Fast RAM type improves performance.
    gpu: { min: 8, max: 10, weight: 0.3 },           // GPU is crucial for rendering high-quality graphics.
    storageSpace: { min: 6, max: 10, weight: 0.1 },  // Storage for game files.
    storageType: { min: 6, max: 10, weight: 0.05 }    // Fast storage type helps load times.
  },
  "gaming-light": {
    cpu: { min: 5, max: 8, weight: 0.2 },            // CPU is helpful but less critical than in heavy gaming.
    ram: { min: 4, max: 8, weight: 0.2 },            // Moderate RAM for light games.
    ramType: { min: 3, max: 10, weight: 0.05 },      // RAM type is less critical.
    gpu: { min: 5, max: 8, weight: 0.25 },           // GPU is still important for smooth graphics.
    storageSpace: { min: 5, max: 10, weight: 0.15 },  // Moderate storage for game files.
    storageType: { min: 5, max: 10, weight: 0.15 }    // Storage type affects loading times.
  }
};



// Calculate component score based on Euclidean distance
function calculateComponentScore(
  componentScore: number,
  idealRange: ComponentScoreRange
): number {
  if (componentScore >= idealRange.min && componentScore <= idealRange.max) {
    return 100; // Perfect score within ideal range
  } else {
    const distance = componentScore < idealRange.min
      ? idealRange.min - componentScore
      : componentScore - idealRange.max;
    const maxDistance = 10; // Maximum possible score difference
    const penalty = Math.min(100, (distance / maxDistance) * 150);
    const normalizedScore = Math.max(0, 100 - penalty);
    return normalizedScore;
  }
}


function calculatePriceScore(laptopPrice: number, userBudget: number, priceImportance: number): number {
  if (laptopPrice <= userBudget) {
    return 100; // Perfect score within budget
  }
  
  if (priceImportance === 0.25) {
    return 0; // Strict rule: if over budget by even 1, score is 0
  }

  // Calculate over-budget percentage
  const overBudgetPercentage = (laptopPrice - userBudget) / userBudget;

  // Penalize based on importance
  const penaltyMultiplier = priceImportance === 0.125 ? 5 : 2; // Adjust penalty based on importance
  const penalty = Math.min(100, Math.pow(overBudgetPercentage * penaltyMultiplier, 2) * 100);

  // Calculate final score
  const score = Math.max(0, 100 - penalty);
  return score;
}


function calculateWeightScore(laptopWeight: number | undefined, weightImportance: number): number {
  // Assume laptopWeight is in kg; default weight if undefined
  const weight = laptopWeight ?? 2; // Assume 2 kg if weight is undefined

  // Determine maximum acceptable weight based on weight importance
  let maxAcceptableWeight: number;

  if (weightImportance === 0) {
    return 100; // All weights are acceptable, full score
  } else if (weightImportance === 0.125) {
    maxAcceptableWeight = 2; // Accept up to 2 kg
  } else if (weightImportance === 0.25) {
    maxAcceptableWeight = 1.5; // Accept up to 1.5 kg
  } else {
    maxAcceptableWeight = 100; // Adjust dynamically for other values
  }

  // Calculate penalty for weights above maxAcceptableWeight
  if (weight <= maxAcceptableWeight) {
    return 100; // Full score for weights within the acceptable range
  } else {
    const excessWeight = weight - maxAcceptableWeight;

    // Apply stronger penalty for weights exceeding acceptable range
    const penaltyMultiplier = 5; // Adjust this multiplier as needed
    const adjustedPenaltyFactor = Math.pow((0.7 + excessWeight / maxAcceptableWeight), penaltyMultiplier); // Amplifies penalty
    const penalty = Math.min(100, adjustedPenaltyFactor * 10); // Scale appropriately to avoid overshoot
  return Math.max(0, 100 - penalty); // Ensure score is within 0-100
  }
}

function calculateScreenSizeScore(
  laptopScreenSize: number,
  selectedScreenSizes: string[],
  screenSizeImportance: number
): number {
  // Define screen size ranges for each category
  const screenSizeRanges = {
    small: { min: 0, max: 13 },
    medium: { min: 13, max: 14 },
    large: { min: 14, max: 16 },
    huge: { min: 16, max: 50 },
  };

  // Determine laptop's screen size category
  let laptopCategory = "";
  if (laptopScreenSize < 13) {
    laptopCategory = "small";
  } else if (laptopScreenSize >= 13 && laptopScreenSize < 14) {
    laptopCategory = "medium";
  } else if (laptopScreenSize >= 14 && laptopScreenSize <= 16) {
    laptopCategory = "large";
  } else if (laptopScreenSize > 16) {
    laptopCategory = "huge";
  }

  // If laptop's category is one of the selected sizes, score is 100
  if (selectedScreenSizes.includes(laptopCategory)) {
    return 100;
  }

  // Calculate penalty if not within selected categories
  // Penalty increases the further the screen size is from selected preferences
  let minPenalty = 100; // Start with the max penalty
  const importanceMultiplier = screenSizeImportance === 0.25 ? 5 : 1; // Stronger penalty for high importance

  for (const selectedSize of selectedScreenSizes) {
    const { min, max } = screenSizeRanges[selectedSize as keyof typeof screenSizeRanges];
    const distanceToCategory =
      laptopScreenSize < min ? min - laptopScreenSize : laptopScreenSize - max;

    // Amplify penalty: Include the importance multiplier
    const penalty = Math.min(100, Math.pow(distanceToCategory / 5, 2) * 150 * importanceMultiplier); // Amplified penalty
    minPenalty = Math.min(minPenalty, penalty);
  }

  const score = Math.max(0, Math.min(100, 100 - minPenalty));
  // Ensure score stays within 0-100
  return score;
}




// Main function to calculate laptop score
export function calculateLaptopScore(laptop: any, answers: any): { finalScore: number; componentScores: { name: string; score: number; }[]; cpuScore?: number; } {

  //we dont want any laptops that are over the budget when its important to him
  
  if (answers.budget.priceImportance === 0.25 && laptop.price > answers.budget.price) {
    console.log("YES!")
    return {
      finalScore: 0,
      componentScores: [
        { name: "מעבד", score: 0 },
        { name: "כרטיס מסך", score: 0 },
        { name: "זיכרון RAM", score: 0 },
        { name: "סוג זיכרון", score: 0 },
        { name: "נפח אחסון", score: 0 },
        { name: "סוג אחסון", score: 0 },
        { name: "מחיר", score: 0 },
        { name: "משקל", score: 0 },
        { name: "גודל מסך", score: 0 },
      ],
      cpuScore: 0,
    };
  }

  // Check screen size constraint - return 0 if size doesn't match with high importance
  if (answers.screenSize.sizeImportance === 0.25) {
    let laptopCategory = "";
    if (laptop.screen_size < 13) {
      laptopCategory = "small";
    } else if (laptop.screen_size >= 13 && laptop.screen_size < 14) {
      laptopCategory = "medium";
    } else if (laptop.screen_size >= 14 && laptop.screen_size <= 16) {
      laptopCategory = "large";
    } else if (laptop.screen_size > 16) {
      laptopCategory = "huge";
    }

    if (!answers.screenSize.selectedScreenSizes.includes(laptopCategory)) {
      return {
        finalScore: 0,
        componentScores: [
          { name: "מעבד", score: 0 },
          { name: "כרטיס מסך", score: 0 },
          { name: "זיכרון RAM", score: 0 },
          { name: "סוג זיכרון", score: 0 },
          { name: "נפח אחסון", score: 0 },
          { name: "סוג אחסון", score: 0 },
          { name: "מחיר", score: 0 },
          { name: "משקל", score: 0 },
          { name: "גודל מסך", score: 0 },
        ],
        cpuScore: 0,
      };
    }
  }

  
  const { tasks, features } = answers;

for (const [feature, selectedValue] of Object.entries(features)) {
    // Skip if the selected value is empty (e.g., no CPUs were selected)
    if (Array.isArray(selectedValue) && selectedValue.length === 0) {
        continue; // No selection for this feature, so proceed without filtering
    }

    const laptopFeatureValue = laptop[feature]; // Value from laptop JSON data

    // Check if feature is an array (like `cpu`, `gpu`, etc.)
    if (Array.isArray(selectedValue)) {
        const normalizedSelectedValue = selectedValue.map(val =>
            typeof val === "string"
                ? val.trim().toLowerCase()
                : val
        );
        
        const normalizedLaptopValue = typeof laptopFeatureValue === "string"
            ? laptopFeatureValue.trim().toLowerCase()
            : laptopFeatureValue;

        if (!normalizedSelectedValue.includes(normalizedLaptopValue)) {
            console.log(`Mismatch for feature ${feature}: Selected ${normalizedSelectedValue} vs Laptop ${normalizedLaptopValue}`);
            return { finalScore: 0, componentScores: [] };
        }
    }
    // Check for boolean fields (like `flippingScreen`)
    else if (typeof selectedValue === "boolean") {
        if (laptopFeatureValue !== selectedValue && laptopFeatureValue !== true) {
            console.log(`Boolean mismatch for feature ${feature}: Selected ${selectedValue} vs Laptop ${laptopFeatureValue}`);
            return { finalScore: 0, componentScores: [] };
        }
    }
    // Check for direct value comparisons (e.g., `manufacturer`)
    else {
        const normalizedSelectedValue = typeof selectedValue === "string"
            ? selectedValue.trim().toLowerCase()
            : selectedValue;

        const normalizedLaptopValue = typeof laptopFeatureValue === "string"
            ? laptopFeatureValue.trim().toLowerCase()
            : laptopFeatureValue;

        if (normalizedLaptopValue !== normalizedSelectedValue) {
            console.log(`Direct mismatch for feature ${feature}: Selected ${normalizedSelectedValue} vs Laptop ${normalizedLaptopValue}`);
            return { finalScore: 0, componentScores: [] };
        }
    }
}





  // Initialize combined requirements with default values
  const combinedTaskRequirements: TaskRequirements = {
    cpu: { min: 0, max: 10, weight: 0 },
    ram: { min: 0, max: 10, weight: 0 },
    ramType: { min: 0, max: 10, weight: 0 },
    gpu: { min: 0, max: 10, weight: 0 },
    storageSpace: { min: 0, max: 10, weight: 0 },
    storageType: { min: 0, max: 10, weight: 0 },
  };

  // Aggregate requirements from selected tasks
  tasks.forEach((taskObj: any) => {
    let taskKey = taskObj.task; // Get the task name from the task property
    
    // Map task names to match taskRequirements keys
    switch(taskKey) {
      case "programming":
        taskKey = taskObj.level === "heavy" ? "heavy-programming" : "light-programming";
        break;
      case "gaming":
        taskKey = taskObj.level === "heavy" ? "gaming-heavy" : "gaming-light";
        break;
      case "modeling/animation":
        taskKey = "modeling/animation";  // Assuming this is the key in taskRequirements
        break;
      case "photo-editing":
        taskKey = "photo-editing";
        break;
      case "music-editing":
        taskKey = "music-editing";
        break;
      case "video-editing":
        taskKey = "video-editing";
        break;
      case "basic-use":
        taskKey = "basic-use";
        break;
      case "ai":
        taskKey = "ai";
        break;
      default:
        console.warn(`Unknown task: ${taskKey}`);
        return;
    }

    const requirements = taskRequirements[taskKey];
    if (!requirements) {
      console.warn(`No requirements found for task: ${taskKey}`);
      return;
    }

    for (const componentKey of Object.keys(requirements) as Array<keyof TaskRequirements>) {
      const requirement = requirements[componentKey];
      const combinedRequirement = combinedTaskRequirements[componentKey];

      combinedRequirement.min = Math.max(combinedRequirement.min, requirement.min);
      combinedRequirement.max = Math.max(combinedRequirement.max, requirement.max);
      combinedRequirement.weight = Math.max(combinedRequirement.weight, requirement.weight);
    }
  });

  console.log("Combined Task Requirements:", combinedTaskRequirements);
  


// Objective component scores (out of 10)
const cpuScore = cpuModelScores[laptop.cpu] || 0;
const ramScore = laptop.manufacturer === "Apple" ? Math.min((ramSizeScores[laptop.ram_size] || 0) + 1, 10) : ramSizeScores[laptop.ram_size] || 0;
const ramTypeScore = laptop.manufacturer === "Apple" ? 10 : ramTypeScores[laptop.ram_type] || 0;
const gpuScore = laptop.manufacturer === "Apple" ? Math.min((gpuModelScores[laptop.gpu] || 0) + 1, 10) : gpuModelScores[laptop.gpu] || 0;
const storageSpaceScore = storageSpaceScores[laptop.storage_space] || 0;
const storageTypeScore = storageTypeScores[laptop.storage_type] || 0;



  // Normalize component scores to out of 100
const normalizedCpuScore = (cpuScore / 10) * 100;
const normalizedRamScore = (ramScore / 10) * 100;
const normalizedRamTypeScore = (ramTypeScore / 10) * 100;
const normalizedGpuScore = (gpuScore / 10) * 100;
const normalizedStorageSpaceScore = (storageSpaceScore / 10) * 100;
const normalizedStorageTypeScore = (storageTypeScore / 10) * 100;

  console.log("Component Scores:", {
    normalizedCpuScore,
    normalizedRamScore,
    normalizedRamTypeScore,
    normalizedGpuScore,
    normalizedStorageSpaceScore,
    normalizedStorageTypeScore,
  });

  // Calculate individual component scores based on requirements
  const componentScoresMap = {
    cpu: calculateComponentScore(normalizedCpuScore / 10, combinedTaskRequirements.cpu),
    ram: calculateComponentScore(normalizedRamScore / 10, combinedTaskRequirements.ram),
    ramType: calculateComponentScore(normalizedRamTypeScore / 10, combinedTaskRequirements.ramType),
    gpu: calculateComponentScore(normalizedGpuScore / 10, combinedTaskRequirements.gpu),
    storageSpace: calculateComponentScore(
      normalizedStorageSpaceScore / 10,
      combinedTaskRequirements.storageSpace
    ),
    storageType: calculateComponentScore(
      normalizedStorageTypeScore / 10,
      combinedTaskRequirements.storageType
    ),
  };

  // Multiply by weights
  const weightedScores = {
    cpu: componentScoresMap.cpu * combinedTaskRequirements.cpu.weight,
    ram: componentScoresMap.ram * combinedTaskRequirements.ram.weight,
    ramType: componentScoresMap.ramType * combinedTaskRequirements.ramType.weight,
    gpu: componentScoresMap.gpu * combinedTaskRequirements.gpu.weight,
    storageSpace: componentScoresMap.storageSpace * combinedTaskRequirements.storageSpace.weight,
    storageType: componentScoresMap.storageType * combinedTaskRequirements.storageType.weight,
  };

  const taskComponentTotalWeight = Object.values(combinedTaskRequirements).reduce(
    (sum, component) => sum + component.weight,
    0
  );

  // Calculate the task final score
  const taskFinalScore =
    Object.values(weightedScores).reduce((sum, score) => sum + score, 0) / taskComponentTotalWeight;

   // New price, weight, and screen size scores based on answers format
   const priceScore = calculatePriceScore(laptop.price, answers.budget.price, answers.budget.priceImportance);
   const weightScore = calculateWeightScore(laptop.weight, answers.weightImportance);
   const screenSizeScore = calculateScreenSizeScore(
    laptop.screen_size,
    answers.screenSize.selectedScreenSizes,
    answers.screenSize.sizeImportance
  );

  console.log("screen size importance", answers.screenSize.sizeImportance);
   // Normalize importance weights
   const totalImportance =
     answers.budget.priceImportance +
     answers.weightImportance +
     answers.screenSize.sizeImportance;
 
   const taskImportance = 1 - totalImportance;
   console.log("Importance Weights:", {
      taskImportance,
      priceImportance: answers.budget.priceImportance,
      weightImportance: answers.weightImportance,
      sizeImportance: answers.screenSize.sizeImportance,
    });
    
    

   // Compute the final score
   const finalScore =
     taskFinalScore * taskImportance +
     priceScore * answers.budget.priceImportance +
     weightScore * answers.weightImportance +
     screenSizeScore * answers.screenSize.sizeImportance;

    
 
   const componentScores = [
     { name: "מעבד", score: Math.round(componentScoresMap.cpu) },
     { name: "כרטיס מסך", score: Math.round(componentScoresMap.gpu) },
     { name: "זיכרון RAM", score: Math.round(componentScoresMap.ram) },
     { name: "סוג זיכרון", score: Math.round(componentScoresMap.ramType) },
     { name: "נפח אחסון", score: Math.round(componentScoresMap.storageSpace) },
     { name: "סוג אחסון", score: Math.round(componentScoresMap.storageType) },
     { name: "מחיר", score: Math.round(priceScore) },
     { name: "משקל", score: Math.round(weightScore) },
     { name: "גודל מסך", score: Math.round(screenSizeScore) },
   ];
 
   console.log("Scores Breakdown:", {
    taskFinalScore,
    priceScore,
    weightScore,
    screenSizeScore,
    taskImportance,
    finalScore,
    componentScores
  }); 
   return {
     finalScore: Math.round(finalScore),
     componentScores: componentScores,
     cpuScore: cpuModelScores[laptop.cpu]
   };
 }