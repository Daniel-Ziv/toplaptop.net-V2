import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons.js";
import FeatureSelector from "../FeatureSelector.tsx";
import Container from "../Container.js";
import Header from "../Header.js";

function FeaturesQuestion({ nextStep, prevStep, onAnswer, savedFeatures = {} }) {
  const [selectedFeatures, setSelectedFeatures] = useState(savedFeatures);

  useEffect(() => {
    setSelectedFeatures(savedFeatures || {});
  }, [savedFeatures]);

  const handleFeatureSelection = (features) => {
    setSelectedFeatures(features);
    onAnswer(features);
  };

  const hasSelectedFeatures = Object.values(selectedFeatures).some(value => 
    value === true || (Array.isArray(value) && value.length > 0)
  );

  return (
    <Container>
      <Header
        dir="rtl"
        text="לפני שנתחיל..."
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      <p dir="rtl" className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center">
        האם יש רכיב מסוים שאתם כבר יודעים שאתם צריכים?
        בתוך כל מעבד, למיין חזק חלש וכו גם ראם סטנדרטי ונחשב הרבה
      </p>
      <FeatureSelector
        selectedFeatures={selectedFeatures}
        onSelectionChange={handleFeatureSelection}
      />
      <NavigationButtons
        onNext={nextStep}
        onBack={prevStep}
      />
    </Container>
  );
}

export default FeaturesQuestion;