import React, { useState } from "react";
import NavigationButtons from "../NavigationButtons";
import FeatureSelector from "../FeatureSelector";

function FeaturesQuestion({ nextStep, prevStep, onAnswer }) {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Handle feature selection from FeatureSelector component
  const handleFeatureSelection = (features) => {
    setSelectedFeatures(features);
    onAnswer(features); // Pass features to the parent component or state
  };

  const handleNext = () => {
    onAnswer(selectedFeatures);
    nextStep();
  };

  return (
    <div className="section">
      <h1 dir="rtl" className="text-4xl font-bold text-center leading-none tracking-tight text-gray-900 dark:text-black">
        מאפיינים מיוחדים
      </h1>
      <hr className="linebreak my-4" />
      <p dir="rtl" className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center">
        אילו מאפיינים מיוחדים אתם מחפשים במחשב?
      </p>

      {/* FeatureSelector Component */}
      <FeatureSelector 
        selectedFeatures={selectedFeatures} 
        onSelectionChange={handleFeatureSelection} 
      />

      <NavigationButtons onNext={handleNext} onBack={prevStep} disableNext={selectedFeatures.length === 0} />
    </div>
  );
}

export default FeaturesQuestion;
