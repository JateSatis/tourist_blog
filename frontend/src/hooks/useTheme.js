import { useState, useLayoutEffect } from "react";

const useTheme = (initialTheme) => {
  const [theme, setTheme] = useState(initialTheme);

  useLayoutEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;