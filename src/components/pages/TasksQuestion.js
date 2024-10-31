import React, { useState, useEffect } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent, Radio, RadioGroup } from "@nextui-org/react";
import { Info, Brush, Video, Music, Code, Globe, VideoIcon, Cpu, Edit3, Monitor, Bot } from "lucide-react";
import NavigationButtons from "../NavigationButtons";

const taskInfo = {
  "מידול/אנימציה": {
    recommended: true,
    description: "תוכנות כמו Maya, Blender או Cinema 4D ליצירת מודלים תלת-ממדיים ואנימציות",
    icon: <Cpu className="w-5 h-5" />
  },
  "עריכת תמונות": {
    recommended: true,
    description: "עריכה בתוכנות כמו Photoshop, GIMP או Lightroom",
    icon: <Brush className="w-5 h-5" />
  },
  "עריכת סרטונים": {
    recommended: true,
    description: "עריכת וידאו בתוכנות כמו Premiere Pro או DaVinci Resolve",
    icon: <Video className="w-5 h-5" />
  },
  "גיימינג": {
    recommended: true,
    description: "",
    icon: <Monitor className="w-5 h-5" />,
    levels: {
      כבד: " כולל משחקים עם גרפיקה תלת-ממדית מורכבת ודרישות מערכת גבוהות, כמו Cyberpunk 2077, Red Dead Redemption 2.",
      קל: " כולל משחקים שלא דורשים ביצועים גרפיים מתקדמים או מעבד חזק במיוחד, כמו League of Legends, Minecraft."
    }
  },
  "עריכת מוזיקה": {
    recommended: false,
    description: "הקלטה ועריכת מוזיקה בתוכנות כמו FL Studio או Ableton",
    icon: <Music className="w-5 h-5" />
  },
  "תכנות": {
    recommended: true,
    description: "פיתוח ברמות שונות, כולל קומפילציה של פרויקטים גדולים ועבודה עם מספר מכונות וירטואליות",
    icon: <Code className="w-5 h-5" />,
    levels: {
      כבד: "קומפילציה כבדה, מתאים למפתחים מנוסים  שעובדים על פרויקטים גדולים",
      קל: "תכנות בסיסי המתאים בעיקר לסטודנטים, מתחילים, או למי שעובד על פרויקטים קטנים."
    }
  },
  "שימוש בסיסי": {
    recommended: true,
    description: "גלישה באינטרנט, מיילים, ושימוש בכלים פשוטים כמו Google Docs",
    icon: <Globe className="w-5 h-5" />
  },
  "שימוש בכלי בינה מלאכותית": {
    recommended: true,
    description: "עיבוד כבד בתוכנות בינה מלאכותית כמו ChatGPT, Stable Diffusion או כלי עיבוד תמונה מבוססי AI",
    icon: <Bot className="w-5 h-5" />
  }
};

const TasksQuestion = ({ nextStep, prevStep, onAnswer, selectedTasks = [] }) => {
  // Initialize state with saved tasks and their levels
  const [localSelectedTasks, setLocalSelectedTasks] = useState([]);
  const [taskLevels, setTaskLevels] = useState({});

  // Update local state when selectedTasks prop changes
  useEffect(() => {
    if (Array.isArray(selectedTasks)) {
      // Handle array of simple tasks
      if (selectedTasks.length > 0 && typeof selectedTasks[0] === 'string') {
        setLocalSelectedTasks(selectedTasks);
      }
      // Handle array of task objects with levels
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
    if (localSelectedTasks.includes(task)) {
      // Remove task and its level if exists
      updatedTasks = localSelectedTasks.filter(t => t !== task);
      const updatedLevels = { ...taskLevels };
      delete updatedLevels[task];
      setTaskLevels(updatedLevels);
    } else {
      // Add task
      updatedTasks = [...localSelectedTasks, task];
    }
    setLocalSelectedTasks(updatedTasks);
    
    // Update parent with tasks and their levels
    const tasksWithLevels = updatedTasks.map(t => ({
      task: t,
      level: taskLevels[t] || null
    }));
    onAnswer(tasksWithLevels);
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
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center gap-6 mb-8">
        <h1 className="text-2xl font-bold text-center">
          באילו משימות תשתמש במחשב?
        </h1>
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
                  <span className="text-lg font-medium">{task}</span>
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
                  {Object.entries(info.levels).map(([level, description]) => (
                    <div key={level} className="flex items-start gap-2 mb-2">
                      <Radio value={level}>
                        <div className="flex flex-col">
                          <span className="font-medium">{level}</span>
                          <span className="text-sm text-gray-600">{description}</span>
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
  );
};

export default TasksQuestion;