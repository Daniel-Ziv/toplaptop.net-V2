import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import Container from "../Container";
import Header from "../Header";
import CustomCheckbox from "../CustomCheckbox";
import { RadioGroup } from "@nextui-org/react";
import CustomRadio from "../CustomRadiobox";

function PortabilityQuestion({ nextStep, prevStep, onAnswer, savedPortabilityChoices = [] }) {
  const [selectedPortability, setSelectedPortability] = useState(savedPortabilityChoices);

  // Update local state when props change
  useEffect(() => {
    setSelectedPortability(savedPortabilityChoices);
  }, [savedPortabilityChoices]);

  const portabilityOptions = [
    {
      value: 0.25,
      sizeName: {
        name: " מאוד חשוב (עד 1.5 קילו)",
        description: "מתאים למי שהלפטופ איתו תמיד ומשתמש בו לדברים פשוטים כמו גלישה באינטרנט, זום, מסמכים",
        isRecommended: "מומלץ!"
      }
    },
    {
      value: 0.125,
      sizeName: {
        name: "חשוב (עד 2 קילו)",
        description: "עד 2 קילו זה המשקל הסטנדרטי לרוב המחשבים",
        isRecommended: "מומלץ!"
      }
    },
    {
      value: 0,
      sizeName: {
        name: "לא חשוב (כל משקל)",
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
        text="מחשב נייד?"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      
      <div className="flex flex-col items-center space-y-6 mt-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold mb-2">כמה חשוב לכם המשקל?</h3>
          <p className="text-gray-600">
            המשקל משפיע על הניידות, אבל גם על הביצועים. בחר את האיזון המתאים לך.
            <br />
            אל דאגה - נתאים לך את המחשב הכי קרוב להעדפותיך!
          </p>
        </div>
        
        <RadioGroup
          value={selectedPortability}
          onValueChange={handlePortabilityChange}
          className="w-full max-w-lg space-y-4 items-center"
        >
          {portabilityOptions.map((option) => (
            <CustomRadio
              key={option.value}
              value={option.value}
              sizeName={option.sizeName}
              statusColor="success"
            />
          ))}
        </RadioGroup>
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