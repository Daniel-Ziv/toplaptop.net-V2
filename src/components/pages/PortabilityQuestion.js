import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import Container from "../Container";
import Header from "../Header";
import CustomCheckbox from "../CustomCheckbox";
import { CheckboxGroup } from "@nextui-org/react";

function PortabilityQuestion({ nextStep, prevStep, onAnswer, savedPortabilityChoices = [] }) {
  const [selectedPortability, setSelectedPortability] = useState(savedPortabilityChoices);

  // Update local state when props change
  useEffect(() => {
    setSelectedPortability(savedPortabilityChoices);
  }, [savedPortabilityChoices]);

  const portabilityOptions = [
    {
      value: "lightweight",
      sizeName: {
        name: "משקל קל (עד 1.5 קילו)",
        description: "קל כמו בקבוק מים מלא - מושלם לניידות יומיומית",
        isRecommended: "מצוין לניידות!"
      }
    },
    {
      value: "medium_weight",
      sizeName: {
        name: "משקל בינוני (1.5-2 קילו)",
        description: "כמו 2 ספרים גדולים - איזון טוב בין ביצועים לניידות",
        isRecommended: "מאוזן!"
      }
    },
    {
      value: "performance",
      sizeName: {
        name: "ביצועים מעל משקל (מעל 2 קילו)",
        description: "דומה למחשב נייח - מתאים לשימוש נייח עם ניידות מזדמנת",
        isRecommended: "עוצמתי!"
      }
    }
  ];

  const handlePortabilityChange = (values) => {
    setSelectedPortability(values);
    onAnswer(values);
  };

  return (
    <Container>
      <Header
        text="ניידות המחשב"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      <div className="flex flex-col items-center space-y-6 mt-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold mb-2">העדפת משקל</h3>
          <p className="text-gray-600">
            המשקל משפיע על הניידות, אבל גם על הביצועים. בחר את האיזון המתאים לך.
            <br />
            אל דאגה - נתאים לך את המחשב הכי קרוב להעדפותיך!
          </p>
        </div>
        
        <CheckboxGroup
          value={selectedPortability}
          onChange={handlePortabilityChange}
          className="w-full max-w-lg space-y-4"
        >
          {portabilityOptions.map((option) => (
            <CustomCheckbox
              value={option.value}
              sizeName={option.sizeName}
              statusColor="success"
            />
          ))}
        </CheckboxGroup>
      </div>

      <NavigationButtons
        onNext={nextStep}
        onBack={prevStep}
        disableNext={selectedPortability.length === 0}
      />
    </Container>
  );
}

export default PortabilityQuestion;