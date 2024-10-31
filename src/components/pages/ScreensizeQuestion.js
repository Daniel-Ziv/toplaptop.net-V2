import React, { useEffect, useState } from "react";
import NavigationButtons from "../NavigationButtons";
import CustomCheckbox from "../CustomCheckbox";
import Container from "../Container";
import Header from "../Header";
import { CheckboxGroup, Button } from "@nextui-org/react";

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
    onAnswer({
      selectedScreenSizes: values,
      wantsTouchscreen: localTouchscreen
    });
  };

  const handleTouchscreenToggle = () => {
    const newTouchscreenValue = !localTouchscreen;
    setLocalTouchscreen(newTouchscreenValue);
    onAnswer({
      selectedScreenSizes: localScreenSizes,
      wantsTouchscreen: newTouchscreenValue
    });
  };

  // Initialize state on mount or when props change
  useEffect(() => {
    setLocalScreenSizes(selectedScreenSizes);
    setLocalTouchscreen(wantsTouchscreen);
  }, [selectedScreenSizes, wantsTouchscreen]);

  const handleSelectAll = () => {
    const allSizes = ["small", "medium", "large", "huge"];
    setLocalScreenSizes(allSizes);
    onAnswer({
      selectedScreenSizes: allSizes,
      wantsTouchscreen: localTouchscreen
    });
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