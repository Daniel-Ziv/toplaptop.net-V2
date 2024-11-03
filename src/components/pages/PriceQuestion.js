import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import { Slider, Button } from "@nextui-org/react";
import Container from "../Container";
import Header from "../Header";

function PriceQuestion({ nextStep, prevStep, onAnswer, savedBudget }) {
  // Local state to track the slider value
  const [sliderValue, setSliderValue] = useState(savedBudget?.value || 3000);

  // Update local state when savedBudget changes
  useEffect(() => {
    if (savedBudget?.value) {
      setSliderValue(savedBudget.value);
    }
  }, [savedBudget]);

  const handleBudgetChange = (value) => {
    setSliderValue(value);
    onAnswer({ value }); // Keep the object structure consistent
  };

  const handleNext = () => {
    onAnswer({ value: sliderValue }); // Use the current slider value
    nextStep();
  };

  return (
    <Container>
      <Header
        dir="rtl"
        text="כמה חשבתם להשקיע?"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      
      <div className="flex flex-col items-center">
        <Button color="primary" variant="flat" dir="rtl">
          תמליצו לי
        </Button>
      </div>

      <div className="flex flex-col items-center space-y-4 mt-6">
        <Slider
          aria-label="Set your budget"
          label=" "
          size="lg"
          color="success"
          showTooltip={true}
          formatOptions={{ style: 'currency', currency: 'ILS' }}
          tooltipValueFormatOptions={{ style: 'currency', currency: 'ILS' }}
          minValue={1000}
          maxValue={10000}
          marks={[
            {
              value: 3000,
              label: (
                <div dir="rtl" className="text-sm text-gray-700 dark:text-gray-600">
                  תקציב מומלץ!
                </div>
              ),
            },
          ]}
          step={100}
          dir="ltr"
          value={sliderValue}
          onChange={handleBudgetChange}
          className="max-w-md"
        />
      </div>

      <p dir="rtl" className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center">
        על סמך הבחירות שלך, כדי לקבל מחשב שהוא בול למה שאתה מחפש אנחנו ממליצים על
      </p>

      <NavigationButtons
        onNext={handleNext}
        onBack={prevStep}
        disableNext={!sliderValue}
      />
    </Container>
  );
}

export default PriceQuestion;