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
  508: 6,          // 500+8
  524: 6,          // 500+24
  640: 6,
  750: 7,
  774: 7,          // 750+24
  1000: 7,
  1008: 7,         // 1000+8
  1024: 7,         // 1000+24
  1032: 7,         // 1000+32
  1128: 8,         // 1000+128
  1256: 8,         // 1000+256
  1512: 8,         // 1000+512
  2000: 8,
  3000: 9,
  4000: 10,
  8000: 10
}


// Ideal ranges for each task
const taskRequirements: Record<string, TaskRequirements> = {
  "Heavy Programming": {
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
    storageType: { min: 6, max: 8, weight: 0.05 }    // Fast storage type improves access to large files.
  },
  "basic-use": {
    cpu: { min: 3, max: 5, weight: 0.15 },           // CPU is sufficient for basic tasks.
    ram: { min: 2, max: 4, weight: 0.2 },            // RAM for multitasking basic applications.
    ramType: { min: 2, max: 10, weight: 0.05 },      // RAM type is not a priority.
    gpu: { min: 2, max: 5, weight: 0.1 },            // Minimal GPU needed for simple graphics.
    storageSpace: { min: 3, max: 6, weight: 0.25 },  // Storage is important for general usage files.
    storageType: { min: 3, max: 6, weight: 0.25 }    // Storage type should be reliable, but speed is less crucial.
  },
  "ai": {
    cpu: { min: 8, max: 10, weight: 0.3 },           // High CPU power is crucial for AI processing.
    ram: { min: 16, max: 10, weight: 0.25 },         // Large RAM is essential for handling AI models.
    ramType: { min: 5, max: 10, weight: 0.1 },       // Fast RAM type improves performance.
    gpu: { min: 8, max: 10, weight: 0.25 },          // GPU is vital for processing models and data.
    storageSpace: { min: 6, max: 10, weight: 0.05 }, // Storage space is less important but needed for datasets.
    storageType: { min: 6, max: 10, weight: 0.05 }    // Storage type matters somewhat for loading data quickly.
  },
  "light-programming": {
    cpu: { min: 4, max: 7, weight: 0.2 },            // CPU is helpful but doesn’t need to be very high.
    ram: { min: 4, max: 6, weight: 0.25 },           // RAM is valuable for handling larger projects.
    ramType: { min: 3, max: 10, weight: 0.1 },       // RAM type matters moderately.
    gpu: { min: 3, max: 5, weight: 0.1 },            // GPU is less critical for light programming.
    storageSpace: { min: 4, max: 7, weight: 0.2 },   // Storage space is moderately important.
    storageType: { min: 5, max: 7, weight: 0.15 }    // Storage type has some impact on access speed.
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
    storageSpace: { min: 5, max: 8, weight: 0.15 },  // Moderate storage for game files.
    storageType: { min: 5, max: 7, weight: 0.15 }    // Storage type affects loading times.
  }
};




// Calculate component score based on Euclidean distance
function calculateComponentScore(
  componentScore: number,
  idealRange: ComponentScoreRange
): number {
  const midpoint = (idealRange.min + idealRange.max) / 2;
  const maxDistance = (idealRange.max - idealRange.min) / 2 || 1; // Avoid division by zero
  const distance = Math.abs(componentScore - midpoint);
  const normalizedScore = Math.max(0, 100 - (distance / maxDistance) * 100);
  return normalizedScore;
}

// Main function to calculate laptop score
export function calculateLaptopScore(laptop: any, answers: any): { finalScore: number; componentScores: { name: string; score: number; }[] } {
  const { tasks } = answers;

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
        taskKey = taskObj.level === "heavy" ? "Heavy Programming" : "light-programming";
        break;
      case "gaming":
        taskKey = taskObj.level === "heavy" ? "gaming-heavy" : "gaming-light";
        break;
      case "modeling/animation":
      case "photo-editing":
      case "music-editing":
      case "video-editing":
      case "basic-use":
      case "ai":

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
      combinedRequirement.max = Math.min(combinedRequirement.max, requirement.max);
      combinedRequirement.weight = Math.max(combinedRequirement.weight, requirement.weight);
    }
  });

  console.log("Combined Task Requirements:", combinedTaskRequirements);
  

  
  // Objective component scores (out of 10)
  const cpuScore = cpuModelScores[laptop.cpu] || 0;
  const ramScore = ramSizeScores[laptop.ram_size] || 0;
  const ramTypeScore = ramTypeScores[laptop.ram_type] || 0;
  const gpuScore = gpuModelScores[laptop.gpu] || 0;
  const storageSpaceScore = storageSpaceScores[laptop.storage_space] || 0;
  const storageTypeScore = storageTypeScores[laptop.storage_type] || 0;

  console.log("Component Scores:", {
    cpuScore,
    ramScore,
    ramTypeScore,
    gpuScore,
    storageSpaceScore,
    storageTypeScore,
  });
  const weightedScores = {
    cpu:
      combinedTaskRequirements.cpu.weight *
      calculateComponentScore(cpuScore, combinedTaskRequirements.cpu),
    ram:
      combinedTaskRequirements.ram.weight *
      calculateComponentScore(ramScore, combinedTaskRequirements.ram),
    ramType:
      combinedTaskRequirements.ramType.weight *
      calculateComponentScore(ramTypeScore, combinedTaskRequirements.ramType),
    gpu:
      combinedTaskRequirements.gpu.weight *
      calculateComponentScore(gpuScore, combinedTaskRequirements.gpu),
    storageSpace:
      combinedTaskRequirements.storageSpace.weight *
      calculateComponentScore(storageSpaceScore, combinedTaskRequirements.storageSpace),
    storageType:
      combinedTaskRequirements.storageType.weight *
      calculateComponentScore(storageTypeScore, combinedTaskRequirements.storageType),
  };
  if (!gpuModelScores[laptop.gpu]) {
    console.warn(`GPU model not found in scoring dictionary: "${laptop.gpu}"`);
  }

  // Check if RAM type exists in dictionary
  if (!ramTypeScores[laptop.ram_type]) {
    console.warn(`RAM type not found in scoring dictionary: "${laptop.ram_type}"`);
  }
  

  const totalWeight = Object.values(combinedTaskRequirements).reduce(
    (sum, component) => sum + component.weight,
    0
  );

  const finalScore =
    Object.values(weightedScores).reduce((sum, score) => sum + score, 0) / totalWeight;

    const componentScores =[
      { name: "מעבד", score: Math.round(cpuScore) },
      { name: "כרטיס מסך", score: Math.round(gpuScore) },
      { name: "זיכרון RAM", score: Math.round(ramScore) },
      { name: "סוג זיכרון", score: Math.round(ramTypeScore) },
      { name: "נפח אחסון", score: Math.round(storageSpaceScore) },
      { name: "סוג אחסון", score: Math.round(storageTypeScore) }
    ];

    console.log(componentScores)
  return {
    finalScore: Math.round(finalScore),
    componentScores: componentScores
  };
}