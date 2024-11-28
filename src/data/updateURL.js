const fs = require('fs');

// Load the JSON file
const fileName = './src/data/laptops.json'; 
const utmParams = '&utm_source=newsletter&utm_medium=lead&utm_campaign=Daniel&utm_content=Daniel';

// Read the file
fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    let laptops;
    try {
      // Parse the JSON file content
      laptops = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return;
    }
  
    // Append UTM parameters to every "url" field
    laptops = laptops.map(laptop => {
      if (laptop.url) {
        laptop.url = `${laptop.url}${utmParams}`; // Directly append utmParams
      }
      return laptop;
    });
  
    // Write updated JSON back to the file
    fs.writeFile(fileName, JSON.stringify(laptops, null, 2), 'utf8', writeErr => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
      } else {
        console.log('URLs updated successfully in', fileName);
      }
    });
  });