import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


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
          <Button as={Link} color="primary" href="#" variant="flat">
            צור קשר
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
export default CustomNavbar;
