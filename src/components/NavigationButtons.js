import React from "react";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "lucide-react"; // Import the arrow icon


const NavigationButtons = ({ onNext, onBack, disableNext = false }) => {
  return (
    <div className="flex flex-col items-center  mt-6">
      <Button 
  color="default"  // Keep color as default for consistent hover and focus behavior
  size="lg" // Larger button size
  onClick={onNext} 
  disabled={disableNext} // Disables if `disableNext` is true
  className={`w-full max-w-md ${!disableNext ? 'bg-black text-white' : 'default-700 text-gray-500'}`} // Black when enabled, gray when disabled
>
  הבא
</Button>


      <Button 
        color="" 
        size="lg" // Make the button larger
        onClick={onBack}
        className="w-full max-w-md" // Center and limit button width
      >
                <ArrowRight size={20} className="" /> {/* Back arrow icon */}

        חזור
      </Button>
    </div>
  );
};

export default NavigationButtons;
