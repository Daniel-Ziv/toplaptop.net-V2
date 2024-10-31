// FeaturesQuestion.js
import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import FeatureSelector from "../FeatureSelector";
import Container from "../Container";

function FeaturesQuestion({ nextStep, prevStep, onAnswer, savedFeatures = [] }) {
  const [selectedFeatures, setSelectedFeatures] = useState(savedFeatures);

  // Update local state when savedFeatures changes
  useEffect(() => {
    setSelectedFeatures(Array.isArray(savedFeatures) ? savedFeatures : []);
  }, [savedFeatures]);

  const handleFeatureSelection = (features) => {
    setSelectedFeatures(features);
    onAnswer(features);
  };

  return (
    <Container>
      <div className="section">
        <h1 dir="rtl" className="text-4xl font-bold text-center leading-none tracking-tight text-gray-900 dark:text-black">
          מאפיינים מיוחדים
        </h1>
        <hr className="linebreak my-4" />
        <p dir="rtl" className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center">
          אילו מאפיינים מיוחדים אתם מחפשים במחשב?
        </p>
        
        <FeatureSelector
          selectedFeatures={selectedFeatures}
          onSelectionChange={handleFeatureSelection}
        />

        <NavigationButtons 
          onNext={nextStep}
          onBack={prevStep} 
          disableNext={selectedFeatures.length === 0}
        />
      </div>
    </Container>
  );
}
export default FeaturesQuestion;