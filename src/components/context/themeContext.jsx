import React, { createContext, useState } from "react";

export const themeContext = createContext();
export const ThemeWrapper = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "light" ? " " : "dark-mode"}>{children}</div>
    </themeContext.Provider>
  );
};
//