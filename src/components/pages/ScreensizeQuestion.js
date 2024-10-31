import React, { useEffect, useState } from "react";
import NavigationButtons from "../NavigationButtons";
import CustomCheckbox from "../CustomCheckbox";
import Container from "../Container";
import Header from "../Header";
import { CheckboxGroup, Button, Switch } from "@nextui-org/react";
import { Pointer } from "lucide-react";

function ScreensizeQuestion({
  nextStep,
  prevStep,
  onAnswer,
  selectedScreenSizes = [],
  wantsTouchscreen = false
}) {
  const [localScreenSizes, setLocalScreenSizes] = useState(selectedScreenSizes);
  const [localTouchscreen, setLocalTouchscreen] = useState(wantsTouchscreen);

  const handleScreenSizeChange = (values) => {
    setLocalScreenSizes(values);
    updateAnswer(values, localTouchscreen);
  };

  const handleTouchscreenToggle = (isSelected) => {
    setLocalTouchscreen(isSelected);
    updateAnswer(localScreenSizes, isSelected);
  };

  const updateAnswer = (sizes, touchscreen) => {
    onAnswer({
      selectedScreenSizes: sizes,
      wantsTouchscreen: touchscreen
    });
  };

  useEffect(() => {
    setLocalScreenSizes(selectedScreenSizes);
    setLocalTouchscreen(wantsTouchscreen);
  }, [selectedScreenSizes, wantsTouchscreen]);

  const handleSelectAll = () => {
    const allSizes = ["small", "medium", "large", "huge"];
    setLocalScreenSizes(allSizes);
    updateAnswer(allSizes, localTouchscreen);
  };

  return (
    <Container>
      <Header
        text="בחר גודל מסך"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      <div className="flex flex-col items-center space-y-6 mt-6">
        <Button
          color="primary"
          variant="flat"
          onClick={handleSelectAll}
        >
          אין לי מושג מה לבחור
        </Button>

        <CheckboxGroup
          value={localScreenSizes}
          onChange={handleScreenSizeChange}
          className="w-full max-w-lg space-y-4"
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

        {/* Touchscreen Toggle */}
        <div className="flex flex-col items-center gap-2 w-full max-w-lg p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <span className="text-lg font-medium">מסך מגע</span>
              <span className="text-sm text-gray-600">שליטה באמצעות מגע במסך</span>
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
        disableNext={localScreenSizes.length === 0}
      />
    </Container>
  );
}

export default ScreensizeQuestion;