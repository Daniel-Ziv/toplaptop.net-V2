import React, { useState, useEffect } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent, Radio, RadioGroup } from "@nextui-org/react";
import { Info, Brush, Video, Music, Code, Globe, VideoIcon, Cpu, Edit3, Monitor, Bot } from "lucide-react";
import NavigationButtons from "../NavigationButtons";
import Container from "../Container"
import Header from "../Header";


const taskInfo = {
  "modeling/animation": {
    displayName: "מידול ואנימציה",
    recommended: true,
    description: "תוכנות כמו Maya, Blender או Cinema 4D ליצירת מודלים תלת-ממדיים ואנימציות",
    icon: <Cpu className="w-5 h-5" />
  },
  "photo-editing": {
    displayName: "עריכת תמונות",
    recommended: true,
    description: "עריכה בתוכנות כמו Photoshop, GIMP או Lightroom",
    icon: <Brush className="w-5 h-5" />
  },
  
  "music-editing": {
    displayName: "עריכת ויצירת מוזיקה",
    recommended: false,
    description: "הקלטה ועריכת מוזיקה בתוכנות כמו FL Studio או Ableton",
    icon: <Music className="w-5 h-5" />
  },
  "video-editing": {
    displayName: "עריכת סרטונים",
    recommended: true,
    description: "עריכת וידאו בתוכנות כמו Premiere Pro או DaVinci Resolve",
    icon: <Video className="w-5 h-5" />
  },
  "basic-use": {
    displayName: "לימודים, שימוש בסיסי",
    recommended: true,
    description: "גלישה באינטרנט, מיילים, ושימוש בכלים פשוטים כמו Google Docs",
    icon: <Globe className="w-5 h-5" />
  },
  "ai": {
    displayName: "בינה מלאכותית",
    recommended: true,
    description:" מתאים למי שעובד עם תוכנות ליצירת תמונות, עיבוד נתונים, או אימון מודלים כמו Stable Diffusion או TensorFlow.",
    icon: <Bot className="w-5 h-5" />
  },
  "programming": {
    displayName: "תכנות",
    recommended: true,
    description: "לחיצה על האפשרות, תפתח שאלון ״איזה סוג תכנות״ ובו תוכלו לבחור במדויק לפי הצורך שלכם",
    icon: <Code className="w-5 h-5" />,
    levels: {
      heavy: {
        displayName: "כבד",
        description: "קומפילציה כבדה, מתאים למפתחים מנוסים  שעובדים על פרויקטים גדולים כמו פיתוח משחקים, מודלים של בינה מלאכותית, וניתוח נתונים מאסיבי" ,
        recommended: true
      },
      light: {
        displayName: "קל",
        description: "תכנות בסיסי המתאים בעיקר לסטודנטים, מתחילים, או למי שעובד על פרויקטים קטנים.",
        recommended: false
      }
    }
  },
  "gaming": {
    displayName: "גיימינג",
    recommended: true,
    description: "לחיצה על האפשרות, תפתח שאלון ״איזה סוג גיימינג״ ובו תוכלו לבחור במדויק לפי הצורך שלכם",
    
    icon: <Monitor className="w-5 h-5" />,
    levels: {
      heavy: {
        displayName: "כבד",
        description: "כולל משחקים עם גרפיקה תלת-ממדית מורכבת ודרישות מערכת גבוהות, כמו Cyberpunk 2077, Red Dead Redemption 2.",
        recommended: true
      },
      light: {
        displayName: "קל",
        description: "כולל משחקים שלא דורשים ביצועים גרפיים מתקדמים או מעבד חזק במיוחד, כמו League of Legends, Minecraft.",
        recommended: false
      }
    }
  }
};

const TasksQuestion = ({ nextStep, prevStep, onAnswer, selectedTasks = [] }) => {

  const [localSelectedTasks, setLocalSelectedTasks] = useState([]);
  const [taskLevels, setTaskLevels] = useState({});


  useEffect(() => {
    if (Array.isArray(selectedTasks)) {

      if (selectedTasks.length > 0 && typeof selectedTasks[0] === 'string') {
        setLocalSelectedTasks(selectedTasks);
      }

      else if (selectedTasks.length > 0 && typeof selectedTasks[0] === 'object') {
        const tasks = selectedTasks.map(t => t.task);
        const levels = selectedTasks.reduce((acc, t) => {
          if (t.level) {
            acc[t.task] = t.level;
          }
          return acc;
        }, {});
        setLocalSelectedTasks(tasks);
        setTaskLevels(levels);
      }
    }
  }, [selectedTasks]);

 const handleSelectionChange = (task) => {
  let updatedTasks;
  if (localSelectedTasks.some(t => t.includes(task))) {
    updatedTasks = localSelectedTasks.filter(t => !t.includes(task)); // Remove all levels of this task
  } else {
    updatedTasks = [...localSelectedTasks, task];
  }
  setLocalSelectedTasks(updatedTasks);
  onAnswer(updatedTasks);
};

  const handleLevelSelect = (task, level) => {
    const updatedLevels = {
      ...taskLevels,
      [task]: level
    };
    setTaskLevels(updatedLevels);

    // Update parent with current tasks and their levels
    const tasksWithLevels = localSelectedTasks.map(t => ({
      task: t,
      level: updatedLevels[t] || null
    }));
    onAnswer(tasksWithLevels);
  };

  const handleNext = () => {
    // Combine selected tasks with their levels
    const tasksWithLevels = localSelectedTasks.map(task => ({
      task,
      level: taskLevels[task] || null
    }));
    onAnswer(tasksWithLevels);
    nextStep();
  };

  // Check if next should be disabled
  const isNextDisabled = () => {
    if (localSelectedTasks.length === 0) return true;
    return localSelectedTasks.some(task => taskInfo[task]?.levels && !taskLevels[task]);
  };

  return (
    <Container>
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center gap-6 mb-8">
        <Header 
        text="באילו משימות תשתמש במחשב?"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display" 
      />
        <p className="text-gray-600 text-center">
          בחר את כל המשימות שאתה מתכנן לבצע במחשב
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(taskInfo).map(([task, info]) => (
          <div key={task} className="flex flex-col gap-2">
            <Button
              className={`h-auto min-h-24 p-4 flex flex-col items-start justify-between w-full ${
                localSelectedTasks.includes(task) ? 'bg-primary-100' : ''
              }`}
              variant={localSelectedTasks.includes(task) ? "flat" : "bordered"}
              onClick={() => handleSelectionChange(task)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {info.icon}
                  <span className="text-lg font-medium">{info.displayName}</span>
                  {info.recommended && (
                    <span className="px-2 py-1 text-xs bg-success-100 text-success-600 rounded-full">
                      מומלץ
                    </span>
                  )}
                </div>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="p-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2 text-right max-w-xs" dir="rtl">
                      <p className="text-sm text-default-700">
                        {info.description}
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </Button>
            
            {localSelectedTasks.includes(task) && info.levels && (
              <div className="mr-8 p-4 border rounded-lg bg-gray-50">
                <RadioGroup
                  dir="rtl"
                  value={taskLevels[task] || ""}
                  onValueChange={(value) => handleLevelSelect(task, value)}
                >
                  {Object.entries(info.levels).map(([level, levelInfo]) => (
                    <div key={level} className="flex items-start gap-2 mb-2">
                      <Radio value={level}>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{levelInfo.displayName}</span>
                            {levelInfo.recommended && (
                              <span className="px-2 py-1 text-xs bg-success-100 text-success-600 rounded-full">
                                מומלץ
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">{levelInfo.description}</span>
                        </div>
                      </Radio>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

          </div>
        ))}
      </div>

      <NavigationButtons 
        onNext={handleNext} 
        onBack={prevStep} 
        disableNext={isNextDisabled()}
      />
    </div>
    </Container>
  );
};

export default TasksQuestion;