import React, { useState } from "react";
import { Cpu, MemoryStick, HardDrive, MonitorCog , Laptop, Battery, Wifi, Monitor } from 'lucide-react';

const features = [
  { name: 'CPU', icon: <Cpu className="w-6 h-6" /> },
  { name: 'RAM', icon: <MemoryStick  className="w-6 h-6" /> },
  { name: 'Storage', icon: <HardDrive className="w-6 h-6" /> },
  { name: 'GPU', icon: <MonitorCog  className="w-6 h-6" /> },
  { name: 'Brand', icon: <Laptop className="w-6 h-6" /> },
  { name: 'Battery', icon: <Battery className="w-6 h-6" /> },
  { name: 'Wi-Fi', icon: <Wifi className="w-6 h-6" /> },
  { name: 'Screen', icon: <Monitor className="w-6 h-6" /> },
];

export default function FeatureSelector() {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="text-2xl font-bold text-center mb-4">Select Laptop Features</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {features.map((feature) => (
          <button
            key={feature.name}
            onClick={() => toggleFeature(feature.name)}
            className={`h-24 p-2 border rounded-lg flex flex-col items-center justify-center transition-colors
              ${selectedFeatures.includes(feature.name) ? 'bg-blue-500 text-white' : 'bg-gray-200'}
              hover:bg-blue-400 hover:text-white`}
          >
            <div>{feature.icon}</div>
            <span>{feature.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
