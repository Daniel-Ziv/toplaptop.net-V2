import './styles/output.css';
import React, { useState } from "react";
import Progress from "./components/Progress";
import CustomNavbar from './components/CustomNavbar';
import {NextUIProvider} from "@nextui-org/system";
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


import Welcome from "./components/pages/Welcome.js";
import StudentQuestion from "./components/pages/StudentQuestion.js";
import TasksQuestion from "./components/pages/TasksQuestion.js";
import PriceQuestion from "./components/pages/PriceQuestion.js";
import ScreensizeQuestion from "./components/pages/ScreensizeQuestion.js";
import PortabilityQuestion from "./components/pages/PortabilityQuestion.js";
import Results from "./components/pages/Results.js";
import FeaturesQuestion from "./components/pages/FeaturesQuestion.js"


function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ 
    tasks:[],
    portability: [],
    features: [],
    student: {
      isStudent: "",
      selectedDegree: "" 
    }, 
    price: { 
      budget: 2000,           
      isFlexible: false,     
      flexibilityPercent: 0  
    },
    screenSize: {  
      selectedScreenSizes: [],
      wantsTouchscreen: false
    }
  });

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => Math.max(prevStep - 1, 0));

  const handleAnswer = (question, answer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [question]: answer,
      };
      console.log("Updated Answers:", updatedAnswers); // Debugging
      return updatedAnswers;
    });
  };



  const renderStep = () => {
    switch(step) {
      case 0:
        return <Welcome onAnswer={(answer) => handleAnswer('welcome', answer)} nextStep={nextStep} />
      case 1:
        return <StudentQuestion onAnswer={(answer) => handleAnswer('student', answer)} prevStep={prevStep} nextStep={nextStep}  isStudent={answers.student.isStudent} selectedDegree={answers.student.selectedDegree}/>;
      case 2:
        return <TasksQuestion onAnswer={(answer) => handleAnswer('tasks', answer)} prevStep={prevStep} nextStep={nextStep} selectedTasks={answers.tasks}/>;
      case 3:
        return <PriceQuestion onAnswer={(answer) => handleAnswer('price', answer)} prevStep={prevStep} nextStep={nextStep} savedBudget={answers.price.budget}  savedFlexibility={answers.price.isFlexible} savedFlexibilityPercent={answers.price.flexibilityPercent} />
      case 4:
        return <ScreensizeQuestion onAnswer={(answer) => handleAnswer('screenSize', answer)} prevStep={prevStep} nextStep={nextStep} selectedScreenSizes={answers.screenSize.selectedScreenSizes}   wantsTouchscreen={answers.screenSize.wantsTouchscreen}/>;
      case 5:
        return <PortabilityQuestion onAnswer={(answer) => handleAnswer('portability', answer)} prevStep={prevStep} nextStep={nextStep} savedPortabilityChoices={answers.portability} />;
      case 6:
        return <FeaturesQuestion onAnswer={(answer) => handleAnswer('features', answer)} prevStep={prevStep} nextStep={nextStep}  savedFeatures={answers.features} />;
      case 7:
        return <Results answers={answers} prevStep={prevStep} />;
      default:
        return <Welcome onNext={nextStep} />;
    }
  };

  return (
    <Router>
      <NextUIProvider dir="rtl">
        <div className="App">
          <CustomNavbar />
          {renderStep()}
        </div>
      </NextUIProvider>
    </Router>
  );
}

export default App;