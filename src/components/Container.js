import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="bg-white max-w-full sm:max-w-md md:max-w-2xl xl:max-w-5xl p-5 text-right mx-auto mt-[2vw] flex flex-col shadow-lg rounded-xl">
      {children}
    </div>
  );
};

export default Container;
