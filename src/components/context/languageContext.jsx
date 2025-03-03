import { createContext, useState } from "react";
import en from "../locales/en.json";
import vi from "../locales/vi.json";
export const languageContext = createContext();
const LanguageWrapper = ({ children }) => {
  const [isLanguage, setIsLanguage] = useState("VI");
  const translations = isLanguage === "VI" ? vi : en;
  const toggleLanguage = () => {
    setIsLanguage((item) => (item === "VI" ? "ENG" : "VI"));
  };
  return (
    <languageContext.Provider
      value={{ isLanguage, toggleLanguage, translations }}
    >
      {children}
    </languageContext.Provider>
  );
};

export default LanguageWrapper;
