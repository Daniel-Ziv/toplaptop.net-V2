import React, { useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import { Slider, Button, ButtonGroup, Tooltip } from "@nextui-org/react";
import Container from "../Container";
import Header from "../Header";

function PriceQuestion({ nextStep, prevStep, onAnswer, savedBudget, savedFlexibility, savedFlexibilityPercent }) {


  useEffect(() => {
    if (savedFlexibilityPercent > 0 && !savedFlexibility) {
      onAnswer({ budget: savedBudget, isFlexible: true, flexibilityPercent: savedFlexibilityPercent });
    }
  }, [savedFlexibilityPercent, savedFlexibility, savedBudget, onAnswer]);


  const handleBudgetChange = (value) => {
    onAnswer({ budget: value, isFlexible: savedFlexibility, flexibilityPercent: savedFlexibilityPercent });
  };


  const handleFlexibilityPercentChange = (percent) => {
    const isCurrentlySelected = savedFlexibilityPercent === percent;
    onAnswer({
      budget: savedBudget,
      isFlexible: !isCurrentlySelected, // Toggle flexibility
      flexibilityPercent: isCurrentlySelected ? 0 : percent // Reset to 0 if deselecting
    });
  };

  const handleNext = () => {
    onAnswer({ budget: savedBudget, isFlexible: savedFlexibility, flexibilityPercent: savedFlexibilityPercent });
    nextStep(); 
  };

  return (
    <Container>
       <Header
        dir="rtl"
        text="מה התקציב?"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />


      <p dir="rtl" className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center">
        מה התקציב המיועד למחשב?
      </p>
      <div className="flex flex-col items-center ">
      <Button color="primary" variant="flat" dir="rtl" className=""
      >
          מה מומלץ?
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
        
        <p className="text-gray-800 dark:text-gray-700 text-center">בחרו תקציב בין 1000 ל-10000 ש"ח</p>
      </div>

      {/* Flexibility Buttons */}
      <div dir="rtl" className="flex flex-col items-center mt-6 space-y-4">
        <p className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center">
          גמישים בתקציב?
        </p>
        <ButtonGroup>
          <Button
            color={savedFlexibilityPercent === 0.1 ? "primary" : "default"}
            onClick={() => handleFlexibilityPercentChange(0.1)}
          >
            בקטנה (10%)
          </Button>
          <Button
            color={savedFlexibilityPercent === 0.25 ? "primary" : "default"}
            onClick={() => handleFlexibilityPercentChange(0.25)}
          >
            כן (25%)
          </Button>
          <Button
            color={savedFlexibilityPercent === 0.5 ? "primary" : "default"}
            onClick={() => handleFlexibilityPercentChange(0.5)}
          >
            מאוד (50%)
          </Button>
        </ButtonGroup>
      </div>

      <NavigationButtons 
        onNext={handleNext} 
        onBack={prevStep} 
        disableNext={!savedBudget} 
      />
    </Container>
  );
}

export default PriceQuestion;
