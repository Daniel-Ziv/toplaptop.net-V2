import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import FeatureSelector from "../FeatureSelector";
import Container from "../Container";
import Header from "../Header";

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
        text="לפני שנסיים.."
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      <p dir="rtl" className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center">
        אם יש משהו ספציפי שחשוב לכם שיהיה בלפטופ, לחצו עליו
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