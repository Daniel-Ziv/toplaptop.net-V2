import React from "react";
import { Button } from "@nextui-org/react";

const NavigationButtons = ({ onNext, onBack, disableNext = false }) => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      <Button 
        color="primary" 
        size="lg" // Make the button larger
        onClick={onNext} 
        disabled={disableNext} // Disable if `disableNext` is true
        className="w-full max-w-md" // Center and limit button width
      >
        הבא
      </Button>

      <Button 
        color="black" 
        size="lg" // Make the button larger
        onClick={onBack}
        className="w-full max-w-md" // Center and limit button width
      >
        חזור
      </Button>
    </div>
  );
};

export default NavigationButtons;
