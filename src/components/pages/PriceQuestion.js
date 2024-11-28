import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import { Slider, Button, RadioGroup } from "@nextui-org/react";
import Container from "../Container";
import Header from "../Header";
import CustomRadio from "../CustomRadiobox";
import { motion, AnimatePresence } from "framer-motion";

function PriceQuestion({ nextStep, prevStep, onAnswer, savedBudget = { price: 3000, priceImportance: 0, tasks: [] } }) {
  const [sliderValue, setSliderValue] = useState(savedBudget?.price || 3000);
  const [localImportance, setImportance] = useState(savedBudget?.priceImportance || 0);
  const [recommendedBudget, setRecommendedBudget] = useState(3000);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Feedback message for budget
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

console.log('tasks:', savedBudget.tasks);


  // First useEffect: Initialize recommended budget, slider value, and importance
  useEffect(() => {
    const maxBudget = calculateMaxRecommendedBudget(savedBudget.tasks || []);
    setRecommendedBudget(maxBudget);
   }, [savedBudget.tasks]);
   
   useEffect(() => {
    if (savedBudget.price) setSliderValue(savedBudget.price);
    if (savedBudget.priceImportance !== undefined) setImportance(savedBudget.priceImportance);
   }, [savedBudget.price, savedBudget.priceImportance]);

  // Second useEffect: Update feedback message based on slider value and recommended budget
  useEffect(() => {
    if (hasInteracted || showRecommendation) {
      setShowFeedback(true);
      if (hasInteracted && sliderValue < recommendedBudget) {  // Only check slider position if user has interacted
        setShowRecommendation(false);
        setFeedbackMessage(
          <motion.span 
            key="red-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ color: '#ff0000' }}
          >
            שימו לב! לפי ההעדפות שלכם, מומלץ לשקול להעלות את התקציב  לתוצאות טובות יותר
          </motion.span>
        );
      } else if (showRecommendation) {
        setFeedbackMessage(
          <motion.span 
            key="green-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ color: '#198754' }}
          >
            המחיר בשוק עבור המחשב שאתם מחפשים מתחיל בסביבות {recommendedBudget}₪, לכן קחו זאת בחשבון
          </motion.span>
        );
      } else {
        setFeedbackMessage("");
      }
    }
  }, [sliderValue, recommendedBudget, showRecommendation, hasInteracted]);

const handleRecommendedBudget = () => {
  setShowRecommendation(true);
  setHasInteracted(false); // Reset interaction state when showing recommendation
  setShowFeedback(true);
  setFeedbackMessage(
    <motion.span 
      key="green-message"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{ color: '#198754' }}
    >
      המחיר בשוק עבור המחשב שאתם מחפשים מתחיל בסביבות {recommendedBudget}₪, לכן קחו זאת בחשבון
    </motion.span>
  );
};


  const handleBudgetChange = (value) => {
    setHasInteracted(true);
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
        name: "אין לי תקציב",
        description: "אני מחפש את המחשב הכי טוב שיש, ללא הגבלת תקציב",

      }
    },
    {
      value: 0.125,
      sizeName: {
        name: "קצת חשוב",
        description: "יש לי תקציב, ואם יש מחשב שמתאים לי יותר אבל יחרוג ממנו קצת, אוכל  לשקול את זה",
        isRecommended: true

      }
    },
    {
      value: 0.25,
      sizeName: {
        name: "חשוב",
        description: "אני לא רוצה שיחרוג בכלל מהתקציב",

      }
    }
  ];

 

  // handle the budget for each task for the recommendation
  const taskBudgets = {
    "programming": {
      "light": 3000,
      "heavy": 4000
    },
    "modeling/animation": 4000,
    "photo-editing": 4000,
    "music-editing": 4000,
    "video-editing": 4000,
    "basic-use": 2500,
    "ai": 5500,
    "gaming": {
      "light": 3500,
      "heavy": 4500
    }
  };
  const calculateMaxRecommendedBudget = (tasks) => {
    let maxBudget = 0;
    tasks.forEach((taskObj) => {
      const taskName = taskObj.task;
      const taskLevel = taskObj.level;
      
      // Get the budget based on whether the task has levels or not
      let taskBudget;
      if (typeof taskBudgets[taskName] === 'object') {
        // Task has levels (like programming or gaming)
        taskBudget = taskBudgets[taskName][taskLevel] || 0;
      } else {
        // Task doesn't have levels (like photo-editing)
        taskBudget = taskBudgets[taskName] || 0;
      }
      
      if (taskBudget > maxBudget) {
        maxBudget = taskBudget;
      }
    });
    
    const additionalTasks = tasks.length - 1; // Subtract 1 to not count the highest budget task
    const additionalBudget = additionalTasks * 500;
    
    const finalBudget = Math.min(maxBudget + additionalBudget, 20000); // Changed to 20000 to match your slider max
    console.log('Final calculated budget:', finalBudget);
    return finalBudget;
  };
  


  return (
    <Container>
      <Header
        dir="rtl"
        text="כמה חשבתם להשקיע?"
        className="text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      
      

      <div className="flex flex-col items-center space-y-4 mt-6">
        <div className="w-full max-w-lg mx-auto mb-3">
          <p className="text-lg text-center mb-4" dir="rtl">
            במידה ויש לכם תקציב, בחרו כמה חשוב לכם שלא יחרוג ממנו
          </p>
          <RadioGroup
            value={localImportance.toString()}
            onValueChange={handleImportanceChange}
            className="w-full max-w-lg space-y-4 items-center"
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
          {localImportance > 0 && (
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
                <div className="flex flex-col items-center mb-4">
                <Button color="default" variant="flat"  dir="rtl" onClick={handleRecommendedBudget}>
                    כמה כדאי?
                  </Button>
                </div>
                <Slider
                  aria-label="Set your budget"
                  label=" "
                  size="lg"
                  color="foreground"
                  showTooltip={true}
                  tooltipValueFormatOptions={{ 
                    style: 'currency', 
                    currency: 'ILS',
                    minimumFractionDigits: 0,  // Add this
                    maximumFractionDigits: 0   // Add this
                  }}                  minValue={1000}
                  maxValue={20000}
                  hideValue={true}  // Add this

                 
                  step={100}
                  dir="ltr"
                  value={sliderValue}
                  onChange={handleBudgetChange}
                  className="max-w-lg"
                />
                <p className="text-lg text-center mt-4" dir="rtl">התקציב שנבחר: {sliderValue} ₪</p>
                <AnimatePresence>
                  {showFeedback && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-lg text-center mt-2"
                      dir="rtl"
                    >
                      {feedbackMessage}
                    </motion.p>
                  )}
    </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

     

      <NavigationButtons
        onNext={handleNext}
        onBack={prevStep}
        disableNext={savedBudget.priceImportance < 0 || !sliderValue}
      />
    </Container>
  );
}

export default PriceQuestion;