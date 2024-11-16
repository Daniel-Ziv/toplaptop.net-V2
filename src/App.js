import './styles/output.css';
import React, { useState, useEffect } from "react";
import Progress from "./components/Progress";
import CustomNavbar from './components/CustomNavbar';
import { NextUIProvider } from "@nextui-org/system";
import { BrowserRouter as Router, Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import Welcome from "./components/pages/Welcome";
import TasksQuestion from "./components/pages/TasksQuestion";
import PriceQuestion from "./components/pages/PriceQuestion";
import ScreensizeQuestion from "./components/pages/ScreensizeQuestion";
import PortabilityQuestion from "./components/pages/PortabilityQuestion";
import Results from "./components/pages/Results";
import FeaturesQuestion from "./components/pages/FeaturesQuestion";
import { encodeParameters, decodeParameters } from './assets/utils/urlParams';

function AppContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    tasks: [],
    weightImportance: 0,
    features: {
      cpu: [],
      ram_size: [],
      ram_type: [],
      storage_space: [],
      screenRes: [],
      screenhz: [],
      manufacturer: [],
      gpu: [],
      security: [],
      connections: [],  
      flippingScreen: false,
      screenType: [],
      touchscreen: false
    },
    budget: {
      price: 0,
      priceImportance: 0
    },
    screenSize: {
      selectedScreenSizes: [],
      sizeImportance: 0
    }
  });

  // Handle initial URL parameters
  useEffect(() => {
    const encodedParams = searchParams.get('q');
    if (encodedParams) {
      try {
        const decodedAnswers = decodeParameters(encodedParams);
        if (decodedAnswers) {
          setAnswers(decodedAnswers);
          setStep(7);
        }
      } catch (error) {
        console.error('Failed to decode parameters:', error);
      }
    }
  }, [searchParams]);

  // Update URL whenever answers change and we're on the results page
  useEffect(() => {
    if (step === 7) {
      const encodedParams = encodeParameters(answers);
      navigate(`/results?q=${encodedParams}`, { replace: true });
    }
  }, [answers, step, navigate]);

  const nextStep = () => {
    setStep(prevStep => {
      const newStep = prevStep + 1;
      if (newStep === 7) {
        const encodedParams = encodeParameters(answers);
        navigate(`/results?q=${encodedParams}`, { replace: true });
      }
      return newStep;
    });
  };

  const prevStep = () => {
    setStep(prevStep => {
      const newStep = Math.max(prevStep - 1, 0);
      if (newStep < 7) {
        navigate('/', { replace: true });
      }
      return newStep;
    });
  };

  const handleAnswer = (question, answer) => {
    setAnswers((prevAnswers) => {
      let updatedAnswers = { ...prevAnswers };
      
      if (answer.screenSize && answer.features) {
        updatedAnswers = {
          ...updatedAnswers,
          screenSize: answer.screenSize,
          features: {
            ...updatedAnswers.features,
            ...answer.features
          }
        };
      } else {
        updatedAnswers[question] = answer;
      }
      
      // If we're on the results page, this will trigger the useEffect to update the URL
      return updatedAnswers;
    });
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return <Welcome 
          onAnswer={(answer) => handleAnswer('welcome', answer)} 
          nextStep={nextStep} 
        />;
      case 2:
        return <TasksQuestion 
          onAnswer={(answer) => handleAnswer('tasks', answer)} 
          prevStep={prevStep} 
          nextStep={nextStep} 
          selectedTasks={answers.tasks}
        />;
      case 3:
        return <PortabilityQuestion 
          onAnswer={(answer) => handleAnswer('weightImportance', answer)} 
          prevStep={prevStep} 
          nextStep={nextStep} 
          savedPortabilityChoices={answers.weightImportance} 
        />;
      case 4:
        return <ScreensizeQuestion 
          onAnswer={(answer) => handleAnswer('screenSize', answer)} 
          prevStep={prevStep} 
          nextStep={nextStep} 
          selectedScreenSizes={answers.screenSize.selectedScreenSizes} 
          touchscreen={answers.features.touchscreen}
          screenSizeImportance={answers.screenSize.sizeImportance}
          tasks={answers.tasks}

        />;
      case 5:
        return <PriceQuestion 
          onAnswer={(answer) => handleAnswer('budget', answer)} 
          prevStep={prevStep} 
          nextStep={nextStep} 
          savedBudget={{
            ...answers.budget,
            tasks: answers.tasks  
          }}
        />;
      case 6:
        return <FeaturesQuestion 
          onAnswer={(answer) => handleAnswer('features', answer)} 
          prevStep={prevStep} 
          nextStep={nextStep} 
          savedFeatures={answers.features} 
        />;
      case 7:
        return <Results 
          answers={answers} 
          prevStep={prevStep}
          onAnswerUpdate={handleAnswer}  // Add this prop if Results can update answers
        />;
      default:
        return <Welcome onNext={nextStep} />;
    }
  };

  return (
    <div className="App" dir="rtl">
      <CustomNavbar />
      <Routes>
        <Route 
          path="/results" 
          element={<Results 
            answers={answers} 
            prevStep={prevStep}
            onAnswerUpdate={handleAnswer}  // Add this prop if Results can update answers
          />} 
        />
        <Route 
          path="/" 
          element={renderStep()} 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NextUIProvider>
        <AppContent />
      </NextUIProvider>
    </Router>
  );
}

export default App;