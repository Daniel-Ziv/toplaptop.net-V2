import React, { useEffect, useState } from "react";
import NavigationButtons from "../NavigationButtons";
import CustomCheckbox from "../CustomCheckbox";
import Container from "../Container";
import Header from "../Header";
import { CheckboxGroup, Button, Switch, RadioGroup } from "@nextui-org/react";
import { Pointer } from "lucide-react";
import CustomRadio from "../CustomRadiobox";
import { motion, AnimatePresence } from "framer-motion";

function ScreensizeQuestion({
  nextStep,
  prevStep,
  onAnswer,
  selectedScreenSizes = [],
  screenSizeImportance = 0,
  wantsTouchscreen = false
}) {
  const [localScreenSizes, setLocalScreenSizes] = useState(selectedScreenSizes);
  const [localTouchscreen, setLocalTouchscreen] = useState(wantsTouchscreen);
  const [sizeImportance, setSizeImportance] = useState(screenSizeImportance);

  const handleScreenSizeChange = (values) => {
    setLocalScreenSizes(values);
    updateAnswer(values, localTouchscreen, sizeImportance);
  };

  const handleTouchscreenToggle = (isSelected) => {
    setLocalTouchscreen(isSelected);
    updateAnswer(localScreenSizes, isSelected, sizeImportance);
  };

  const updateAnswer = (sizes, touchscreen, importance) => {
    onAnswer({
      selectedScreenSizes: sizes,
      wantsTouchscreen: touchscreen,
      sizeImportance: importance
    });
  };

  const handleImportanceChange = (value) => {
    const numValue = Number(value);
    setSizeImportance(numValue);
    updateAnswer(localScreenSizes, localTouchscreen, numValue);
  };

  useEffect(() => {
    setLocalScreenSizes(selectedScreenSizes);
    setLocalTouchscreen(wantsTouchscreen);
    setSizeImportance(screenSizeImportance);
  }, [selectedScreenSizes, wantsTouchscreen, screenSizeImportance]);

  const handleSelectAll = () => {
    const allSizes = ["small", "medium", "large", "huge"];
    setLocalScreenSizes(allSizes);
    updateAnswer(allSizes, localTouchscreen, sizeImportance);
  };

  const importanceOptions = [
    {
      value: 0,
      sizeName: {
        name: "כל גודל מסך",
        description: "לא משנה לי גודל המסך",
        isRecommended: ""
      }
    },
    {
      value: 0.125,
      sizeName: {
        name: "חשוב טיפה",
        description: "יש לי העדפה קלה לגודל מסך מסוים",
        isRecommended: ""
      }
    },
    {
      value: 0.25,
      sizeName: {
        name: "חשוב לי מאוד",
        description: "גודל המסך הוא קריטי עבורי",
        isRecommended: ""
      }
    }
  ];

  return (
    <Container>
      <Header
        text="בחר גודל מסך"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      <div className="flex flex-col items-center space-y-6 mt-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold mb-2">כמה חשוב לך גודל המסך?</h3>
          <p className="text-gray-600">
            גודל המסך משפיע על הניידות ועל חווית השימוש. בחר את האפשרות המתאימה לך ביותר.
          </p>
        </div>

        <RadioGroup
          value={sizeImportance.toString()}
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

        <AnimatePresence>
          {sizeImportance !== 0 && (
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
                <Button
                  color="primary"
                  variant="flat"
                  onClick={handleSelectAll}
                  className="mb-4 w-full"
                >
                  אין לי מושג מה לבחור
                </Button>

                <CheckboxGroup
                  value={localScreenSizes}
                  onChange={handleScreenSizeChange}
                  className="space-y-4"
                >
                  <CustomCheckbox
                    value="small"
                    sizeName={{
                      name: "קטן",
                      description: "פחות מ13 אינצ׳",
                      isRecommended: "מומלץ!"
                    }}
                    statusColor="success"
                  />
                  <CustomCheckbox
                    value="medium"
                    sizeName={{
                      name: "בינוני",
                      description: "בין 13 ל14 אינצ׳",
                      isRecommended: "מומלץ!"
                    }}
                    statusColor="success"
                  />
                  <CustomCheckbox
                    value="large"
                    sizeName={{
                      name: "גדול",
                      description: "בין 14 ל16 אינצ׳",
                      isRecommended: "מומלץ!"
                    }}
                    statusColor="success"
                  />
                  <CustomCheckbox
                    value="huge"
                    sizeName={{
                      name: "ענק",
                      description: "מעל 16 אינצ׳",
                      isRecommended: "מומלץ!"
                    }}
                    statusColor="success"
                  />
                </CheckboxGroup>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Touchscreen Toggle */}
        <div className="flex flex-col items-center gap-2 w-full max-w-lg p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <span className="text-lg font-medium">מסך מגע</span>
              <span className="text-sm text-gray-600">בדרך כלל משפיע על המחיר</span>
            </div>
            <Switch
              isSelected={localTouchscreen}
              onValueChange={handleTouchscreenToggle}
              size="lg"
              color="success"
              startContent={<Pointer size={24} />}
              classNames={{
                wrapper: "p-0",
              }}
            />
          </div>
        </div>
      </div>

      <NavigationButtons
        onNext={nextStep}
        onBack={prevStep}
        disableNext={sizeImportance === 0 ? false : localScreenSizes.length === 0}
      />
    </Container>
  );
}

export default ScreensizeQuestion;