import React, { useState, useEffect } from "react";
import Logo from '../../assets/logo.svg'

const SplashLogo = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showLogo2, setShowLogo2] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogo(true);
    }, 700); // wait 500ms before showing the logo
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => {
        setShowLogo2(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showLogo]);


  return (
    <>
      {
        showLogo2 && (
          <div className={`flex items-center justify-center flex-col gap-y-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-0 transition-all duration-1000 ${showLogo ? "bottom-1/2 opacity-100" : ""}` }>
            <img src={Logo} alt="logo" loading="lazy" className="w-[170px] h-[170px]"/>
            <span className="text-white font-bold text-6xl" style={{fontFamily:'none'}}>FlyMe</span>
          </div>
        )
      }
    </>
  );
};

export default SplashLogo;