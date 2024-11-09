import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import { Slider, Button, RadioGroup } from "@nextui-org/react";
import Container from "../Container";
import Header from "../Header";
import CustomRadio from "../CustomRadiobox";
import { motion, AnimatePresence } from "framer-motion";

function PriceQuestion({ nextStep, prevStep, onAnswer, savedBudget = { price: 3000, priceImportance: 0 } }) {
  const [sliderValue, setSliderValue] = useState(savedBudget?.price || 3000);
  const [localImportance, setImportance] = useState(savedBudget?.priceImportance || 0);

  useEffect(() => {
    if (savedBudget?.price) {
      setSliderValue(savedBudget.price);
    }
    if (savedBudget?.priceImportance !== undefined) {
      setImportance(savedBudget.priceImportance);
    }
  }, [savedBudget]);

  const handleBudgetChange = (value) => {
    setSliderValue(value);
    updateAnswer(value, localImportance);
  };

  const handleImportanceChange = (value) => {
    const numValue = Number(value);
    setImportance(numValue);
    updateAnswer(sliderValue, numValue);
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
      priceImportance: importance
    });
  };

  const importanceOptions = [
    {
      value: 0,
      sizeName: {
        name: "לא חשוב",
        description: "המחיר לא משפיע על הבחירה שלי",
        isRecommended: ""
      }
    },
    {
      value: 0.125,
      sizeName: {
        name: "קצת חשוב",
        description: "אני מוכן להתגמש במחיר, אבל יש לי העדפה",
        isRecommended: ""
      }
    },
    {
      value: 0.25,
      sizeName: {
        name: "חשוב",
        description: "המחיר הוא גורם משמעותי בהחלטה שלי",
        isRecommended: ""
      }
    }
  ];

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
        <div className="w-full max-w-lg mx-auto mb-6">
          <p className="text-lg text-center mb-4" dir="rtl">
            במידה ויש לכם תקציב, כמה חשוב לכם שהמחשב יהיה בתקציב
          </p>
          <RadioGroup
            value={localImportance.toString()}
            onValueChange={handleImportanceChange}
            className="w-full max-w-lg space-y-4"
          >
            {importanceOptions.map((option) => (
              <CustomRadio
                key={option.value}
                value={option.value.toString()}
                sizeName={option.sizeName}
                statusColor="success"
              />
            ))}
          </RadioGroup>
        </div>

        <AnimatePresence>
          {localImportance !== 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden w-full max-w-lg"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p dir="rtl" className="text-lg font-normal text-gray-800 dark:text-gray-700 text-center mt-6">
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