import './styles/output.css';
import React, { useState, useEffect } from "react";
import Progress from "./components/Progress";
import CustomNavbar from './components/CustomNavbar';
import { NextUIProvider} from "@nextui-org/system";
import { Spinner } from "@nextui-org/react";
import { BrowserRouter as Router, Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import Welcome from "./components/pages/Welcome";
import TasksQuestion from "./components/pages/TasksQuestion";
import PriceQuestion from "./components/pages/PriceQuestion";
import ScreensizeQuestion from "./components/pages/ScreensizeQuestion";
import PortabilityQuestion from "./components/pages/PortabilityQuestion";
import Results from "./components/pages/Results";
import FeaturesQuestion from "./components/pages/FeaturesQuestion";
import { encodeParameters, decodeParameters } from './assets/utils/urlParams';
import Footer from './components/Footer';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';




function AppContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [hideFooter, sethideFooter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({
    tasks: [],
    weightImportance: -1,
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
      priceImportance: -1,
    },
    screenSize: {
      selectedScreenSizes: [],
      sizeImportance: -1
    }
  });

  // Handle initial URL parameters
  useEffect(() => {
    const encodedParams = searchParams.get('q');
    if (encodedParams) {
      setIsLoading(true); 
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

 
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [step]);

  
  const nextStep = () => {
    if (step === 6) {
      setIsLoading(true);
      // Small delay to ensure loading state is set before navigation
      setTimeout(() => {
        setStep(prevStep => prevStep + 1);
      }, 100);
    } else {
      setStep(prevStep => prevStep + 1);
    }
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
          tasks={answers.tasks}
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
          isLoading={isLoading}
          setIsLoading={setIsLoading}          
        />;
      case 7:
        
        return <Results 
          answers={answers} 
          prevStep={prevStep}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />;
      default:
        return <Welcome onNext={nextStep} />;
    }
  };

  return (
    <div className="App" dir="rtl">
      <CustomNavbar currentStep={step}  prevStep={step != 1 ? prevStep : undefined} nextStep={step != 1 && step != 7 ? nextStep : undefined}  />
      <Routes>
        <Route 
          path="/results" 
          element={<Results 
            answers={answers} 
            prevStep={prevStep}
            sethideFooter={sethideFooter} 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />} 
        />
        <Route 
          path="/" 
          element={renderStep()} 
        />
        <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
        />
        <Route path="/terms-of-service"
        element={<TermsOfService />} 
        />

              

      </Routes>
      
    {!isLoading && <Footer />}
    
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