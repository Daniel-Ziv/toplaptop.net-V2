import React from "react";
import Container from "../Container.js";
import '../../styles/output.css';
import CountAnimation from '../CountAnimation.js';
import MovingTestimonials from '../MovingTestimonials.js'
import KspPartnershipBanner from '../KspPartnershipBanner.js';
import ImageGallery from '../ImageGallery.js'
import {Button, ButtonGroup} from "@nextui-org/button";



function Welcome({ onAnswer, nextStep }) {
 
 

  return (
    <Container>
      <div id="welcome" className="section-active">
        <h1 class="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display">הלפטופ <mark class="px-2 text-white bg-blue-500 rounded dark:bg-blue-500">המושלם</mark> לצרכים שלך</h1>
        <br></br>
        <p dir="rtl" class="text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-700 text-center"> כבר לא צריך להסתבך עם איזה מחשב נייד לקנות  </p>
        <p dir="rtl" class="text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-700 text-center">בנינו אלגוריתם חכם שיודע לחשב במדויק מה המחשב שמתאים לכם בול</p>
        <p dir="rtl" class="text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-700 text-center">רק כמה שאלות וסיימנו</p>
        <br></br>

        <CountAnimation></CountAnimation>
        <MovingTestimonials></MovingTestimonials>

        <div className="flex justify-center mt-4">

          <Button color="primary" variant="solid" size="lg"  dir="rtl" className="w-full max-w-md text-xl font-bold text-white text-center  bg-blue-500" onClick= { nextStep}   >
              בואו נתחיל!
          </Button>
  
        </div>

        <div className="hidden md:block">
          <ImageGallery/>
        </div>
        <div className="flex justify-center mt-4">
          <KspPartnershipBanner/>
        </div>

      </div>
    </Container>
    
  );
}

export default Welcome;
