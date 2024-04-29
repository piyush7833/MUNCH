import React from 'react';
import ImgContainer from './ImgContainer';

// const dots = (dots: string) => {
//   return dots.length === 3 ? "." : dots.length === 1 ? ".." : "...";
// }

// // Update the dots value over time
// let dotsValue = ".";
// setInterval(() => {
//   dotsValue = dots(dotsValue);
// }, 1000);

// Use the updated dots value in the component
const ContainerLoader = ({ message }: { message?: string }) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <ImgContainer alt="loader" type="loader" imgUrl="/images/loader.gif" />
        <p className="text-lg">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ContainerLoader;
