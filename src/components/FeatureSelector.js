import React from "react";
import { Cpu, MemoryStick, Microchip, MonitorCheck ,HardDrive, Cable ,Fingerprint, MonitorCog, Laptop, Battery, Wifi, Monitor } from 'lucide-react';

const features = [
  { name: 'מעבד', icon: <Cpu className="w-6 h-6" /> },
  { name: 'ראם', icon: <MemoryStick className="w-6 h-6" /> },
  { name: 'סוג זכרון', icon: <Microchip  className="w-6 h-6" /> },
  { name: 'נפח-אחסון', icon: <HardDrive className="w-6 h-6" /> },
  { name: 'כרטיס מסך', icon: <MonitorCog className="w-6 h-6" /> },
  { name: 'יצרן', icon: <Laptop className="w-6 h-6" /> },
  { name: 'חיי-סוללה', icon: <Battery className="w-6 h-6" /> },
  { name: 'חיבורים', icon: <Cable className="w-6 h-6" /> },
  { name: 'אחריות', icon: <Monitor className="w-6 h-6" /> },
  { name: 'טביעת אצבע', icon: <Fingerprint className="w-6 h-6" /> },
  { name: 'רזולוציית מסך', icon: <MonitorCheck className="w-6 h-6" /> },

];

export default function FeatureSelector({ selectedFeatures, onSelectionChange }) {
  const toggleFeature = (feature) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];
    
    onSelectionChange(newFeatures);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <button
            key={feature.name}
            onClick={() => toggleFeature(feature.name)}
            className={`h-24 p-2 border rounded-lg flex flex-col items-center justify-center transition-colors
              ${selectedFeatures.includes(feature.name) 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-blue-400 hover:text-white'}`}
          >
            <div>{feature.icon}</div>
            <span className="mt-2">{feature.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}