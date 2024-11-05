import './styles/output.css';
import React, { useState } from "react";
import Progress from "./components/Progress";
import CustomNavbar from './components/CustomNavbar';
import { NextUIProvider } from "@nextui-org/system";
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Welcome from "./components/pages/Welcome";
import StudentQuestion from "./components/pages/StudentQuestion.js";
import TasksQuestion from "./components/pages/TasksQuestion";
import PriceQuestion from "./components/pages/PriceQuestion.js";
import ScreensizeQuestion from "./components/pages/ScreensizeQuestion.js";
import PortabilityQuestion from "./components/pages/PortabilityQuestion.js";
import Results from "./components/pages/Results";
import FeaturesQuestion from "./components/pages/FeaturesQuestion";
import { MantineProvider } from '@mantine/core';


function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    tasks: [],
    portability: "",
    features: [],
    student: {
      isStudent: "",
      selectedDegree: ""
    },
    budget:{
      price: 0,
      priceImportance: ""
    },
    screenSize: {
      selectedScreenSizes: [],
      wantsTouchscreen: false,
      screenSizeImprontace: ""
    }
  });
  
  const [laptopResults, setLaptopResults] = useState([]);


  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const handleAnswer = (question, answer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [question]: answer,
      };
      console.log("Updated Answers:", updatedAnswers);
      return updatedAnswers;
    });
  };


  const renderStep = () => {
    let component;
    switch(step) {
      case 0:
        component = <Welcome onAnswer={(answer) => handleAnswer('welcome', answer)} nextStep={nextStep} />;
        break;
      case 1:
        component = <StudentQuestion onAnswer={(answer) => handleAnswer('student', answer)} 
                                   prevStep={prevStep} 
                                   nextStep={nextStep} 
                                   isStudent={answers.student.isStudent} 
                                   selectedDegree={answers.student.selectedDegree}/>;
        break;
      case 2:
        component = <TasksQuestion onAnswer={(answer) => handleAnswer('tasks', answer)} 
                                 prevStep={prevStep} 
                                 nextStep={nextStep} 
                                 selectedTasks={answers.tasks}/>;
        break;
      case 3:
        component = <PortabilityQuestion onAnswer={(answer) => handleAnswer('portability', answer)} 
                                       prevStep={prevStep} 
                                       nextStep={nextStep} 
                                       savedPortabilityChoices={answers.portability} />;
        break;
      case 4:
        component = <ScreensizeQuestion onAnswer={(answer) => handleAnswer('screenSize', answer)} 
                                      prevStep={prevStep} 
                                      nextStep={nextStep} 
                                      selectedScreenSizes={answers.screenSize.selectedScreenSizes} 
                                      wantsTouchscreen={answers.screenSize.wantsTouchscreen}
                                      screenSizeImprontace={answers.screenSize.screenSizeImprontace}
                                       />;
        break;            
      case 5:
        component = <PriceQuestion onAnswer={(answer) => handleAnswer('budget', answer)} 
                                 prevStep={prevStep} 
                                 nextStep={nextStep} 
                                 savedBudget={answers.budget}
                                  />;
        break;
      case 6:
        component = <FeaturesQuestion onAnswer={(answer) => handleAnswer('features', answer)} 
                                    prevStep={prevStep} 
                                    nextStep={nextStep} 
                                    savedFeatures={answers.features} />;
        break;
      case 7:
        component = <Results answers={answers} prevStep={prevStep} />;
        break;
      default:
        component = <Welcome onNext={nextStep} />;
    }

    return (
      <div className="relative overflow-hidden">
        {component}
      </div>
    );
  };

  return (
    <Router>
      
        <NextUIProvider>
          <div className="App" dir="rtl">
            <CustomNavbar />
            {renderStep()}
          </div>
        </NextUIProvider>
     
    </Router>
  );
}

export default App;