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
        <h1 class="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display">הלפטופ <mark class="px-2 text-white bg-black rounded dark:bg-black">המושלם</mark> לצרכים שלך</h1>
        <br></br>
        <p dir="rtl" class="text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-700 text-center">שאלון חדשני ומהיר שעוזר לכם למצוא מחשב נייד שמתאים לכם בול!</p>
        <div className="text-2xl  text-black text-center mt-3 font-display" dir="rtl">אז איך זה עובד?</div>

        <br></br>
        <CountAnimation></CountAnimation>
        {/*<MovingTestimonials></MovingTestimonials>*/}

        <div className="flex flex-col items-center mt-4">
  <Button
    color="primary"
    variant="solid"
    size="lg"
    dir="rtl"
    className="w-full max-w-md text-xl font-bold text-white text-center bg-blue-500"
    onClick={nextStep}
  >
    בואו נתחיל!
  </Button>
  <p
    dir="rtl"
    className="text-sm text-gray-600 text-center mt-2"
  >
    בלחיצה על <b>"בואו נתחיל!"</b>, אתם מאשרים שקראתם והסכמתם ל
    <a
      href="/terms-of-service"
      className="text-blue-600 underline"
    >
      תנאי השימוש
    </a> ול
    <a
      href="/privacy-policy"
      className="text-blue-600 underline"
    >
      מדיניות הפרטיות
    </a>.
  </p>
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
