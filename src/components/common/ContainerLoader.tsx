import React, { useEffect, useState } from 'react';
import ImgContainer from './ImgContainer';

const ContainerLoader = ({ message }: { message?: string }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === '...' ? '' : `${prevDots}.`));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <ImgContainer alt="loader" type="loader" imgUrl="/images/loader.gif" />
        <p className="text-lg">{message}
          <span>{dots}</span>
        </p>
      </div>
    </div>
  );
};

export default ContainerLoader;
