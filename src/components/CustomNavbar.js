import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { Linkedin } from 'lucide-react';

function CustomNavbar() {
  return (
    <Navbar position="static">
     <NavbarBrand>
     <a href="/" className="flex items-center">
        <p className="font-bold text-inherit">
          <mark className="px-2 text-white bg-black rounded dark:bg-black mr-0.5">
            top
          </mark>
          laptop
        </p>
      </a>
    </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
       
       
      </NavbarContent>
      <NavbarContent justify="end">
        
        <NavbarItem>
          <Button as={Link} color="primary" target="_blank" href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.linkedin.com/in/daniel-ziv&ved=2ahUKEwjgkPGK-PKJAxUZSvEDHZXEDY0QFnoECBwQAQ&usg=AOvVaw253MXdEAe5MQ8qwYq4fcfm" variant="flat">
          <Linkedin strokeWidth={1} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
export default CustomNavbar;
