import React from "react";
import Container from "../Container.js";
import '../../styles/output.css';
import CountAnimation from '../CountAnimation.js';
import MovingTestimonials from '../MovingTestimonials.js'
import ZapStatement from '../ZapStatement.js';
import {Button, ButtonGroup} from "@nextui-org/button";
import { MousePointerClick } from 'lucide-react';
import Stepper from "../StepperWelcomePage.jsx";



function Welcome({ onAnswer, nextStep }) {
 
 

  return (
    <Container>
      <div id="welcome" className="section-active">
        <h1 class="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display">מחשב נייד בהתאמה אישית</h1>
        <br></br>
        <p dir="rtl" class="text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-700 text-center">
          הצטרפו ל-1,400+ משתמשים שכבר מצאו את הלפטופ המושלם באתר המוביל בישראל להשוואת לפטופים.
        </p>



        
        <div className="text-2xl  text-black text-center mt-3 font-display" dir="rtl">אז איך זה עובד?</div>

        <br></br>
        <Stepper/>
        {/*<CountAnimation></CountAnimation>*/}
        {/*<MovingTestimonials></MovingTestimonials>*/}

        <div className="flex flex-col items-center mt-4">
  <Button
    color="default"
    variant="solid"
    size="lg"
    dir="rtl"
    endContent={<MousePointerClick />}
    className="w-full max-w-md text-xl font-bold text-white text-center bg-black"
    onClick={nextStep}
    
  >
    בואו נתחיל!
  </Button>
  
</div>


        
        <div className="flex justify-center mt-4">
          <ZapStatement/>
        </div>

      </div>
    </Container>
    
  );
}

export default Welcome;
