import React, { useEffect, useState } from "react";
import NavigationButtons from "../NavigationButtons";
import CustomCheckbox from "../CustomCheckbox";
import Container from "../Container";
import Header from "../Header";
import { CheckboxGroup, Button, Switch, RadioGroup, cn} from "@nextui-org/react";
import { Pointer } from "lucide-react";
import CustomRadio from "../CustomRadiobox";
import { motion, AnimatePresence } from "framer-motion";

function ScreensizeQuestion({
  nextStep,
  prevStep,
  onAnswer,
  selectedScreenSizes = [],
  screenSizeImportance = 0,
  touchscreen = false,
  tasks = []
}) {
  const [localScreenSizes, setLocalScreenSizes] = useState(selectedScreenSizes);
  const [localTouchscreen, setLocalTouchscreen] = useState(touchscreen);
  const [sizeImportance, setSizeImportance] = useState(screenSizeImportance);
  const [recommendedSizes, setRecommendedSizes] = useState([]);
  const [showRecommendation, setShowRecommendation] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [reasonMessage, setReasonMessage] = useState("");

  const taskPriority = {
    "basic-use": 1,
    "music-editing": 2,
    "gaming": {
      "light": 2,
      "heavy": 4
    },
    "programming": 3,
    "photo-editing": 3,
    "video-editing": 4,
    "modeling/animation": 5,
    "ai": 4
  };

  const taskScreenSizes = {
    "programming": ["large", "huge"],
    "modeling/animation": ["huge"],
    "photo-editing": ["large", "huge"],
    "music-editing": ["medium", "large"],
    "video-editing": ["large", "huge"],
    "basic-use": ["medium"],
    "ai": ["large", "huge"],
    "gaming": {
      "light": ["medium", "large"],
      "heavy": ["large", "huge"]
    }
  };
  
  const taskTranslations = {
    "programming": "תכנות",
    "modeling/animation": "מידול ואנימציה",
    "photo-editing": "עריכת תמונה",
    "music-editing": "עריכת מוזיקה",
    "video-editing": "עריכת וידאו",
    "basic-use": "שימוש בסיסי",
    "ai": "בינה מלאכותית",
    "gaming": "משחקים"
  };

  const taskReasons = {
    "programming": {
      "large": "נוח לפיתוח ועבודה עם מספר חלונות",
      "huge": "אידיאלי לעבודה עם מספר רב של חלונות וקוד"
    },
    "modeling/animation": {
      "huge": "חיוני לעבודה מדויקת עם פרטים ותצוגה מלאה של הפרויקט"
    },
    "photo-editing": {
      "large": "מאפשר דיוק בעריכה ותצוגה טובה של התמונה",
      "huge": "אידיאלי לעבודה מקצועית עם תמונות גדולות"
    },
    "music-editing": {
      "medium": "מספיק למעקב אחר מספר ערוצי שמע",
      "large": "נוח לעבודה עם מספר רב של ערוצים וכלים"
    },
    "video-editing": {
      "large": "מאפשר תצוגה טובה של הווידאו והטיימליין",
      "huge": "אידיאלי לעריכה מקצועית ותצוגת פרטים"
    },
    "basic-use": {
      "medium": "מתאים לשימוש יומיומי ונוח לניידות"
    },
    "ai": {
      "large": "נוח לעבודה עם מודלים ונתונים",
      "huge": "אידיאלי לפיתוח ואימון מודלים מורכבים"
    },
    "gaming": {
      "light": {
        "medium": "מתאים למשחקים קלים ונוח לניידות",
        "large": "חוויית משחק טובה עם נוחות גבוהה"
      },
      "heavy": {
        "large": "מספק חוויית משחק מעולה",
        "huge": "חוויית משחק אולטימטיבית עם תצוגה מלאה"
      }
    }
  };


  const calculateRecommendedSizes = (tasks) => {
    // Find the most demanding task
    let highestPriority = 0;
    let primaryTask = null;
  
    tasks.forEach((taskObj) => {
      const taskName = taskObj.task;
      let priority;
      
      if (taskName === "gaming") {
        priority = taskPriority[taskName][taskObj.level];
      } else {
        priority = taskPriority[taskName];
      }
      
      if (priority > highestPriority) {
        highestPriority = priority;
        primaryTask = taskObj;
      }
    });
  
    // Get recommended sizes only for the most demanding task
    if (primaryTask) {
      const taskName = primaryTask.task;
      if (taskName === "gaming") {
        return taskScreenSizes[taskName][primaryTask.level];
      } else {
        return taskScreenSizes[taskName];
      }
    }
    
    return [];
  };

  

  const handleScreenSizeChange = (values) => {
    setLocalScreenSizes(values);
    updateAnswer(values, localTouchscreen, sizeImportance);
  };

  const handleTouchscreenToggle = (event) => {
    const isSelected = event.target.checked;
    setLocalTouchscreen(isSelected);
    updateAnswer(localScreenSizes, isSelected, sizeImportance);
  };
  

  const updateAnswer = (sizes, touchscreen, importance) => {
    onAnswer({
      screenSize: {
        selectedScreenSizes: sizes,
        sizeImportance: importance
      },
      features: {
        touchscreen: touchscreen
      }
    });
    console.log("touchscreen:", touchscreen);

  };

  const handleImportanceChange = (value) => {
    const numValue = Number(value);
    setSizeImportance(numValue);
    updateAnswer(localScreenSizes, localTouchscreen, numValue);
  };

  useEffect(() => {
    setLocalScreenSizes(selectedScreenSizes);
    setLocalTouchscreen(touchscreen);
    setSizeImportance(screenSizeImportance);
  }, [selectedScreenSizes, touchscreen, screenSizeImportance]);

  useEffect(() => {
    if (tasks.length > 0) {
      const recommended = calculateRecommendedSizes(tasks);
      setRecommendedSizes(recommended);
      setShowRecommendation(true);
      
      // Find primary task (most demanding)
      let highestPriority = 0;
      let primaryTask = null;
      
      tasks.forEach((taskObj) => {
        const taskName = taskObj.task;
        let priority;
        
        if (taskName === "gaming") {
          priority = taskPriority[taskName][taskObj.level];
        } else {
          priority = taskPriority[taskName];
        }
        
        if (priority > highestPriority) {
          highestPriority = priority;
          primaryTask = taskObj;
        }
      });
  
      if (primaryTask) {
        const taskName = taskTranslations[primaryTask.task];
        const sizeDesc = taskScreenSizes[primaryTask.task]?.[primaryTask.level] || taskScreenSizes[primaryTask.task];
        
       
        const sizeRecommendations = sizeDesc.map(size => {
          const sizeText = size === "huge" ? "גדול מאוד" :
                          size === "large" ? "גדול" :
                          size === "medium" ? "בינוני" : "קטן";
                          
          return `מסך ${sizeText}`;
        }).join(" או ");

        const reasons = sizeDesc.map(size => {
          let reason;
          if (primaryTask.task === "gaming") {
            reason = taskReasons[primaryTask.task][primaryTask.level][size];
          } else {
            reason = taskReasons[primaryTask.task]?.[size];
          }
          
          const sizeText = size === "huge" ? "מסך גדול מאוד" :
                          size === "large" ? "מסך גדול" :
                          size === "medium" ? "מסך בינוני" : "מסך קטן";
                          
          return reason;
        }).join("\n");

        setFeedbackMessage(`עבור המשימות שבחרת מומלץ ${sizeRecommendations}`);
        setReasonMessage(reasons);  
        setShowFeedback(true); 

              }
            }
  }, [tasks]);
 

  const importanceOptions = [
    {
      value: 0,
      sizeName: {
        name: "לא חשוב בכלל",
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
        text="לגביי המסך.."
        className="mb-3 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      <div className="flex flex-col items-center space-y-6 mt-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold mb-2">כמה חשוב לך גודל המסך?</h3>
          
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
              className="overflow-hidden w-full max-w-lg "
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex flex-col items-center mb-2">
                   
                  <h3 className="text-xl font-semibold mb-2">בחרו גדלים</h3>
                </div>

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
      isRecommended: recommendedSizes.includes("small") ? "מומלץ!" : ""
    }}
    statusColor="success"
    recommendationReason={recommendedSizes.includes("small") ? 
      reasonMessage.split('\n')[recommendedSizes.indexOf("small")] : null}
  />
  <CustomCheckbox
    value="medium"
    sizeName={{
      name: "בינוני",
      description: "בין 13 ל14 אינצ׳",
      isRecommended: recommendedSizes.includes("medium") ? "מומלץ!" : ""
    }}
    statusColor="success"
    recommendationReason={recommendedSizes.includes("medium") ? 
      reasonMessage.split('\n')[recommendedSizes.indexOf("medium")] : null}
  />
  <CustomCheckbox
    value="large"
    sizeName={{
      name: "גדול",
      description: "בין 14 ל16 אינצ׳",
      isRecommended: recommendedSizes.includes("large") ? "מומלץ!" : ""
    }}
    statusColor="success"
    recommendationReason={recommendedSizes.includes("large") ? 
      reasonMessage.split('\n')[recommendedSizes.indexOf("large")] : null}
  />
  <CustomCheckbox
    value="huge"
    sizeName={{
      name: "ענק",
      description: "מעל 16 אינצ׳",
      isRecommended: recommendedSizes.includes("huge") ? "מומלץ!" : ""
    }}
    statusColor="success"
    recommendationReason={recommendedSizes.includes("huge") ? 
      reasonMessage.split('\n')[recommendedSizes.indexOf("huge")] : null}
  />
                  </CheckboxGroup>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Touchscreen Toggle */}
        <div className="flex flex-col items-center gap-2 w-full max-w-lg p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center w-full">
           
            <Switch
            isSelected={localTouchscreen}
            onChange={handleTouchscreenToggle}
      classNames={{
        base: cn(
          "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
          "justify-between cursor-pointer rounded-lg gap-2 p-4 border-1 border-transparent",
          "data-[selected=true]:border-primary",
        ),
        wrapper: "p-0 h-4 overflow-visible",
        thumb: cn("w-7 h-6 border-2 shadow-lg",
          "group-data-[hover=true]:border-primary",
          //selected
          "group-data-[selected=true]:ml-6",
          // pressed
          "group-data-[pressed=true]:w-7",
          "group-data-[selected]:group-data-[pressed]:ml-6",
        ),
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-medium">בא לי מסך מגע</p>
        <p className="text-tiny text-default-400">
          לחצו כאן כדי לקבל התאמות עם מסך מגע בלבד
        </p>
      </div>
    </Switch>
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