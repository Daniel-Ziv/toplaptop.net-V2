const fs = require('fs');
const path = require('path');

console.log("Starting data cleaning..."); // Add this line

// Load the original JSON file
const laptops = require('./data/laptops.json');

// Function to clean each laptop item
const cleanLaptopsData = (laptops) => {
  return laptops.map((laptop) => ({
    ...laptop, // Spread to keep unchanged fields

    price: parseInt(laptop.price.replace(/[^\d]/g, '')) || 0,
    storage_space: laptop.storage_space.includes('+')
    ? laptop.storage_space
        .split('+') // Split by "+"
        .map(part => parseInt(part.replace(/[^\d]/g, ''))) // Convert each part to a number
        .reduce((acc, curr) => acc + curr, 0) // Sum the numbers
    : parseInt(laptop.storage_space.replace(/[^\d]/g, '')) || 0, // Single value case

    ram_size: parseInt(laptop.ram_size.replace(/[^\d]/g, '')) || 0,
    screen_size: parseFloat(laptop.screen_size.replace(/[^\d.]/g, '')) || 0,
    weight: parseFloat(laptop.weight.replace(/[^\d.]/g, '')) || 0,
    cpu_ghz: parseFloat(laptop.cpu_ghz.replace(/[A-Za-z\s]/g, '')) || 0,
    screenhz: parseInt(laptop.screenhz.replace(/[A-Za-z\s]/g, '')) || 0,
    cpuGen: parseInt(laptop.cpuGen.replace(/[^\d]/g, '')) || 0,

    flippingScreen: laptop.flippingScreen !== "ללא",
    touchscreen: laptop.touchscreen !== "ללא",
    for_gaming: laptop.for_gaming === "גיימינג",
    battery: laptop.battery || "N/A",
    kspWarranty: laptop.kspWarranty || "N/A",
  }));
};

// Clean the data
const cleanedLaptops = cleanLaptopsData(laptops);

// Write cleaned data to a new JSON file
fs.writeFileSync(
  path.join(__dirname, 'data', 'laptops_cleaned.json'),
  JSON.stringify(cleanedLaptops, null, 2)
);

console.log('Data cleaned and saved to data/laptops_cleaned.json'); // Add this line
