import React from "react";
import Container from "../Container.js";
import '../../styles/output.css';
import CountAnimation from '../CountAnimation.js';
import MovingTestimonials from '../MovingTestimonials.js'
import ZapStatement from '../ZapStatement.js';
import {Button, ButtonGroup} from "@nextui-org/button";
import { MousePointerClick } from 'lucide-react';
import Stepper from "../StepperWelcomePage.jsx";
import stackedImgWelcomePage from '../../assets/stackedImgWelcomePage.png';



function Welcome({ onAnswer, nextStep }) {
 
 

  return (
    <Container>
      <div id="welcome" className="section-active">
<h1 className="mb-4 font-bold text-center leading-none tracking-tight text-gray-900 dark:text-black font-display" 
   style={{ 
     fontSize: window.innerWidth >= 1024 ? "4rem" : window.innerWidth >= 768 ? "2.5rem" : "2.5rem" 
   }}>
 מחשב נייד בהתאמה אישית
</h1>        <p style={{
          direction: "rtl",
          fontSize: window.innerWidth >= 768 ? "1.5rem" : "1.25rem",
          fontWeight: 400,
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? "#374151" : "#1f2937",
          textAlign: "center"
        }}>
          האתר הראשון בישראל שעוזר לך לבחור את המחשב הנייד המתאים לך – חכם, פשוט, ובחינם.
        </p>


        {/*<img src={stackedImgWelcomePage} alt="מחשבים ניידים" className="w-full h-auto mt-4" width={50} height={50} />8*/}
        
        <div style={{
          fontSize: window.innerWidth >= 768 ? "1.5rem" : "1.25rem",
          color: "black",
          textAlign: "center",
          marginTop: "0.75rem",
          direction: "rtl"
          }}>
            איך זה עובד?
          </div>

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
