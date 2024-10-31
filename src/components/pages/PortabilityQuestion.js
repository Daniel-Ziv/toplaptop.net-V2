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
      value: "lightWeight",
      sizeName: {
        name: " מאוד נייד (עד 1.5 קילו)",
        description: "אם אתם צריכים מחשב לדברים בסיסיים ולא רוצים להתעסק עם משקל מיותר, זה בשבילכם.",
        isRecommended: "מומלץ!"
      }
    },
    {
      value: "mediumWeight",
      sizeName: {
        name: "משקל סטנדרטי (1.5-2 קילו)",
        description: "אם אתם מחפשים את האיזון המושלם - גם שיהיה נוח לסחוב מסביב אבל גם שיוכל להריץ משימות בכיף, זאת אופציה מצוינת.",
        isRecommended: "מומלץ!"
      }
    },
    {
      value: "heavyWeight",
      sizeName: {
        name: "לנשיאה מדי פעם (מעל 2 קילו)",
        description: "אם אתם מריצים פרויקטים כבדים ומורכבים, ולא יכולים להרשות לעצמכם פחות ממחשב עוצמתי לידכם, זה הפתרון המושלם. גם אם הוא פחות נייד.",
        isRecommended: "מומלץ!"
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
          className="w-full max-w-lg space-y-4 items-center"
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