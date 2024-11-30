import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import Container from "../Container";
import Header from "../Header";
import { RadioGroup } from "@nextui-org/react";
import CustomRadio from "../CustomRadiobox";
import { motion, AnimatePresence } from "framer-motion";

function PortabilityQuestion({ nextStep, prevStep, onAnswer, savedPortabilityChoices = [], tasks=[]}) {
  const [selectedPortability, setSelectedPortability] = useState(savedPortabilityChoices);
  const [recommendedPortability, setRecommendedPortability] = useState(null);
  const [recommendationMessage, setRecommendationMessage] = useState("");
  const [showRecommendation, setShowRecommendation] = useState(false);
  
  // Update local state when props change
  useEffect(() => {
    setSelectedPortability(savedPortabilityChoices);
  }, [savedPortabilityChoices]);

  useEffect(() => {
    if (tasks.length > 0) {
      const recommended = calculateRecommendedPortability(tasks);
      
      // Only show recommendation if we got a valid value
      if (recommended !== null) {
        setRecommendedPortability(recommended);
        setRecommendationMessage(recommendationReasons[recommended]);
        setShowRecommendation(true);
  
        setPortabilityOptions(prevOptions => 
          prevOptions.map(option => ({
            ...option,
            sizeName: {
              ...option.sizeName,
              isRecommended: option.value === recommended ? "מומלץ!" : ""
            }
          }))
        );
      }
    }
  }, [tasks]);

  const calculateRecommendedPortability = (tasks) => {
    let highestPriority = 0;
    let recommendedValue = null; // Start with null instead of default value
    
    tasks.forEach((taskObj) => {
      const taskName = taskObj.task;
      let priority;
      let portabilityValue;
  
      if (taskName === "gaming") {
        priority = taskPriority[taskName][taskObj.level];
        portabilityValue = taskPortabilityRecommendations[taskName][taskObj.level];
      } else {
        priority = taskPriority[taskName];
        portabilityValue = taskPortabilityRecommendations[taskName];
      }
  
      // Only consider tasks with priority > 0
      if (priority > highestPriority) {
        highestPriority = priority;
        recommendedValue = portabilityValue;
      }
    });
  
    // If no task had priority > 0, don't show recommendation
    if (highestPriority === 0) {
      setShowRecommendation(false);
      return null;
    }
  
    return recommendedValue;
  };

  const [portabilityOptions, setPortabilityOptions] = useState([
    {
      value: 0,
      sizeName: {
        name: "לא חשוב (כל משקל)",
        description: "אין לי בעיה עם מחשב כבד, רק שיעשה את העבודה",
        isRecommended: ""
      }
    },
    {
      value: 0.125,
      sizeName: {
        name: "חשוב (עד 2 קילו)",
        description: "עד 2 קילו זה המשקל הסטנדרטי לרוב המחשבים",
        isRecommended: ""
      }
    },
    
    {
      value: 0.25,
      sizeName: {
        name: " מאוד חשוב (עד 1.5 קילו)",
        description: "מתאים למי שהלפטופ איתו תמיד ומשתמש בו לדברים פשוטים כמו גלישה באינטרנט, זום, מסמכים",
        isRecommended: ""
      }
    }
  ]);

  //did it for the recommendations
  const taskPriority = {
    "basic-use": 0,
    "music-editing": 0,
    "gaming": {
      "light": 0,
      "heavy": 4
    },
    "programming": 0,
    "photo-editing": 0,
    "video-editing": 0,
    "modeling/animation": 0,
    "ai": 4
  };
  
  const taskPortabilityRecommendations = {
    "basic-use": 0.25,
    "music-editing": 0.125,
    "gaming": {
      "light": 0.125,
      "heavy": 0
    },
    "programming": 0.125,
    "photo-editing": 0.125,
    "video-editing": 0,
    "modeling/animation": 0,
    "ai": 0
  };
  
  const recommendationReasons = {
    0.25: "המשימות שבחרת מאפשרות שימוש במחשב קל משקל, מה שיקל עליך בניידות",
    0.125: "המשימות שבחרת דורשות איזון בין ביצועים לניידות",
    0: "על פי המשימות שבחרת, אנחנו ממליצים לא להגביל את המשקל כדי לאפשר ביצועים מקסימליים"
  };


  const handlePortabilityChange = (values) => {
    setSelectedPortability(values);
    onAnswer(values);
  };

  return (
    <Container>
      <Header
        text="כמה חשוב לכם המשקל?"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      
      <div className="flex flex-col items-center mt-6 ">
        
        <AnimatePresence>
          {showRecommendation && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-2 mb-4"
            >
              <p className="text-lg font-medium">{recommendationMessage}</p>
            </motion.div>
           )}
            </AnimatePresence>
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
            disableNext={selectedPortability < 0 || selectedPortability.length === 0}
          />
        </Container>
      );
    }

    export default PortabilityQuestion;