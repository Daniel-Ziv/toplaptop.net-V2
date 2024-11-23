import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-black py-4">
      <div className="container mx-auto text-center">
        <p dir="rtl">© {new Date().getFullYear()} toplaptop.net</p>
        <p>
          <a href="/privacy-policy" className="text-blue-400 hover:underline">מדיניות פרטיות</a> | 
          <a href="/terms-of-service" className="text-blue-400 hover:underline"> תנאי שימוש</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
