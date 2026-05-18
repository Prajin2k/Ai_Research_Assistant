import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext =
  createContext();

export const ThemeProvider = ({
  children,
}) => {

  const [darkMode, setDarkMode] =
    useState(() => {

      return (
        localStorage.getItem(
          "darkMode"
        ) === "true"
      );
    });

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode
    );

    if (darkMode) {

      document.body.style.background =
        "#111827";

      document.body.style.color =
        "white";

    } else {

      document.body.style.background =
        "#f3f4f6";

      document.body.style.color =
        "black";
    }

  }, [darkMode]);

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
};

export const useTheme = () =>
  useContext(ThemeContext);