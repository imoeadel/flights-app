//custom hook to get the matches size of the screen to handle different screens
import { useEffect, useState } from 'react'

export const useMobileSize = () => {
  const [mobileSize, setMobileSize] = useState(
    window.matchMedia("(max-width: 450px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 450px)");
    const handleChange = (e) => setMobileSize(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return mobileSize;
};