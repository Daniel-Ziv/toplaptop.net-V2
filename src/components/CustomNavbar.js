import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { Linkedin , ArrowRight} from 'lucide-react';

function CustomNavbar({ currentStep, prevStep }){
  return (
    <Navbar position="static">
    <NavbarContent justify="start">
     <NavbarItem>
       <Button
         onClick={currentStep === 7 ? prevStep : undefined}
         as={currentStep === 7 ? undefined : Link}
         color="primary"
         target={currentStep === 7 ? undefined : "_blank"}
         href={currentStep === 7 ? undefined : "https://www.linkedin.com/in/daniel-ziv/"}
         variant="flat"
         className={`flex items-center gap-0 ${currentStep === 7 ? 'bg-black text-white' : ''}`}       >
         {currentStep === 7 ? (
           <>
           <ArrowRight strokeWidth={1.3} />
              חזור
             
           </>
         ) : (
           <Linkedin color="#01348a" strokeWidth={1} />
         )}
       </Button>
     </NavbarItem>
    </NavbarContent>
    <NavbarBrand className="justify-end">
     <a href="/" className="flex items-center">
       <p className="font-bold text-inherit">
         <mark className="px-2 text-white bg-black rounded dark:bg-black mr-0.5">
           top
         </mark>
         laptop
       </p>
     </a>
    </NavbarBrand>
    </Navbar>
  );
}
export default CustomNavbar;
