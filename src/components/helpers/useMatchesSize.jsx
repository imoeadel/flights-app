//custom hook to get the matches size of the screen to handle different screens
import { useEffect, useState } from 'react'

export const useMatchesSize = () => {
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1600px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1600px)");
    const handleChange = (e) => setMatches(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return matches;
};