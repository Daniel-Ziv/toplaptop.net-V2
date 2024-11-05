import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import { Slider, Button } from "@nextui-org/react";
import Container from "../Container";
import Header from "../Header";

function PriceQuestion({ nextStep, prevStep, onAnswer ,savedBudget = { price: 3000, priceImportance: "" }, }) {
  // Local state to track the slider value
  const [sliderValue, setSliderValue] = useState(savedBudget?.value || 3000);
  const [localImportance, setImportance] = useState(savedBudget?.priceImportance || "");


  // Update local state when savedBudget changes
  useEffect(() => {
    if (savedBudget?.value) {
      setSliderValue(savedBudget.value);
    }
  }, [savedBudget]);

  const handleBudgetChange = (value) => {
    setSliderValue(value);
    updateAnswer(value, localImportance)
  };

  const handleImportanceChange = (value) => {
    setImportance(value);
    updateAnswer(sliderValue, value);
  };

  const handleNext = () => {
    onAnswer({ 
      price: sliderValue,
      priceImportance: localImportance 
    });
    nextStep();
  };

  const updateAnswer = (value, importance) => {
    onAnswer({ 
      price: value,
      priceImportance: importance || localImportance
    });
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

         {/* Add Radio Group for Importance */}
      <div className="w-full max-w-lg mx-auto mb-6">
        <p className="text-lg text-center mb-4" dir="rtl">
          במידה ויש לכם תקציב, כמה חשוב לכם שהמחשב יהיה בתקציב
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-4 border rounded-lg hover:bg-gray-50">
            <input
              type="radio"
              value="not-important"
              checked={localImportance === "not-important"}
              onChange={(e) => handleImportanceChange(e.target.value)}
              className="w-4 h-4"
            />
            <label className="text-lg" dir="rtl">לא חשוב</label>
          </div>
          
          <div className="flex items-center gap-2 p-4 border rounded-lg hover:bg-gray-50">
            <input
              type="radio"
              value="somewhat-important"
              checked={localImportance === "somewhat-important"}
              onChange={(e) => handleImportanceChange(e.target.value)}
              className="w-4 h-4"
            />
            <label className="text-lg" dir="rtl">קצת חשוב</label>
          </div>
          
          <div className="flex items-center gap-2 p-4 border rounded-lg hover:bg-gray-50">
            <input
              type="radio"
              value="important"
              checked={localImportance === "important"}
              onChange={(e) => handleImportanceChange(e.target.value)}
              className="w-4 h-4"
            />
            <label className="text-lg" dir="rtl">חשוב</label>
          </div>
        </div>
      </div>


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