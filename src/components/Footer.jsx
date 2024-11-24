import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-black py-4">
      <div className="container mx-auto text-center">
        <p dir="rtl">© {new Date().getFullYear()} toplaptop.net | פותח ע״י דניאל זיו</p>
        
      </div>
    </footer>
  );
}

export default Footer;
