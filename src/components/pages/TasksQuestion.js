import React, { useState, useEffect } from "react";
import { CheckboxGroup, Checkbox, Button} from "@nextui-org/react";
import Header from "../Header";
import NavigationButtons from "../NavigationButtons";
import Container from "../Container";

const TasksQuestion = ({ nextStep, prevStep, onAnswer, selectedTasks}) => {

  const tasks = [
    "מידול/אנימציה",
    "תכנות קל (סטודנטים)",
    "עריכת תמונות",
    "עריכת סרטונים",
    "כתיבת מסמכים",
    "גיימינג כבד",
    "עריכת מוזיקה",
    "תכנות כבד",
    "זום/צפייה בהרצאות"
  ];

  const handleSelectionChange = (values) => {
    onAnswer(values);
  };

  const handleNext = () => {
    onAnswer(selectedTasks);
    nextStep(); 
  };

  useEffect(() => {
  }, [selectedTasks]);

 

  return (
    <Container>
      <Header
        text="איזה משימות?"
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
      />
      <CheckboxGroup
        label="בחר משימות"
        value={selectedTasks}
        onChange={handleSelectionChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
          {tasks.map((task) => (
            <Checkbox key={task} value={task}>
              {task}
            </Checkbox>
          ))}
      </CheckboxGroup>

      <NavigationButtons onNext={handleNext} onBack={prevStep} disableNext={selectedTasks.length === 0}/>
    
     
      
    </Container>
  );
};

export default TasksQuestion;
