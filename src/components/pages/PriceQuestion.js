import React from "react";
import NavigationButtons from "../NavigationButtons";
import { Slider, Button } from "@nextui-org/react";
import Container from "../Container";
import Header from "../Header";

function PriceQuestion({ nextStep, prevStep, onAnswer, savedBudget }) {
  const handleBudgetChange = (value) => {
    onAnswer({ value });
  };

  const handleNext = () => {
    onAnswer({ savedBudget });
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
          כמה מומלץ?
        </Button>
      </div>

      {/* Budget Slider */}
      <div className="flex flex-col items-center space-y-4 mt-6">
        <Slider
          aria-label="Set your budget"
          label=" "
          size="lg"
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
          value={savedBudget}
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
        disableNext={!savedBudget}
      />
    </Container>
  );
}

export default PriceQuestion;