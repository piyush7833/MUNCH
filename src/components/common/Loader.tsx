import React from 'react';
import ImgContainer from './ImgContainer';

const Loader = ({ message }: { message?: string }) => {
  // const [dots, setDots] = useState('');

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDots((prevDots) => (prevDots === '...' ? '' : `${prevDots}.`));
  //   }, 500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 dark:bg-darkGradient1 dark:bg-opacity-60 dark:backdrop-blur-xl text-main bg-opacity-40 backdrop-blur-lg z-10">
      <div className="">
        <ImgContainer alt="loader" type="loader" imgUrl="/images/loader.gif" />
        <p className="text-lg">{message}
          {/* <span>{dots}</span> */}
        </p>
      </div>
    </div>
  );
};

export default Loader;
