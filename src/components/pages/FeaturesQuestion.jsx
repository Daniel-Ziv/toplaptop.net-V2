import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons.js";
import FeatureSelector from "../FeatureSelector.jsx";
import Container from "../Container.js";
import Header from "../Header.js";
import { Spinner } from "@nextui-org/react";

function FeaturesQuestion({ nextStep, prevStep, onAnswer, savedFeatures = {}, setIsLoading, isLoading }) {
  const [selectedFeatures, setSelectedFeatures] = useState(savedFeatures);

  useEffect(() => {
    setSelectedFeatures(savedFeatures || {});
  }, [savedFeatures]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-50">
        <Spinner 
          size="lg"
          color="primary"
          className="w-20 h-20"
          label="טוען תוצאות..."
        />
      </div>
    );
  }

  const handleFeatureSelection = (features) => {
    setSelectedFeatures(features);
    onAnswer(features);
  };

  const handleNext = () => {
    setIsLoading(true); 
    nextStep();
  };

  

 

  return (
    <Container>
      <Header
        dir="rtl"
        text="משהו ספציפי?"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      <p dir="rtl" className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center">
        האם יש רכיב מסוים שאתם כבר יודעים שאתם צריכים?
        אם כן, בחרו אותו כאן וננסה למצוא לכם מחשב עם הרכיבים שאתם מחפשים.
      </p>
      <FeatureSelector
        selectedFeatures={selectedFeatures}
        onSelectionChange={handleFeatureSelection}
      />
      <NavigationButtons
        onNext={handleNext}
        onBack={prevStep}
        nextDisabled={isLoading}
      />
    </Container>
  );
}

export default FeaturesQuestion;