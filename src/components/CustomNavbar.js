import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { Linkedin , ArrowRight} from 'lucide-react';
import { useState, useEffect } from "react";

function CustomNavbar({ currentStep, prevStep, nextStep }){
  const [showNext, setShowNext] = useState(false);
  
  const handlePrevStep = () => {
    if (currentStep === 7) {
      setShowNext(true);
    }
    prevStep();
  };

  useEffect(() => {
    if (currentStep === 7 || currentStep === 1) {
      setShowNext(false);
    }
  }, [currentStep]);

  return (
    <Navbar position={currentStep != 1 ? 'sticky' : 'static'} className="h-12">
    <NavbarContent justify="start" >
     <NavbarItem>
     {currentStep != 1 ? (
      <Button 
        onClick={handlePrevStep}
        color="default"
        variant="flat"
        className="flex items-center gap-0 text-black mt-1 bg-gray-200 "
      >
        <ArrowRight strokeWidth={1.3} />
        חזור
      </Button>
    ) : (
      <Button
        as={Link}
        href="https://www.linkedin.com/in/daniel-ziv/"
        target="_blank"
        color="primary"
        variant="flat"
        className="flex items-center gap-0 mt-1"
      >
        <Linkedin color="#01348a" strokeWidth={1} />
      </Button>
)}
     </NavbarItem>
    </NavbarContent>
    {!showNext ? (
       <NavbarBrand className="justify-end ">
         <a href="/" className="flex items-center">
           <p className="font-bold text-inherit">
             <mark className="px-2 text-white bg-black rounded dark:bg-black mr-0.5">top</mark> laptop
           </p>
         </a>
       </NavbarBrand>
     ) : (
      <Button 
      onClick={nextStep}
      color="primary"
      variant="flat"
      className="flex items-center gap-0 bg-black text-white mt-1"
    >
      הבא
    </Button>
     )}
    </Navbar>
  );
}
export default CustomNavbar;
