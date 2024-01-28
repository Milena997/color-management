import { createContext, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const ColorContext = createContext();

const colorReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COLOR":
      const newColor = { ...action.payload, id: uuidv4() };
      return [...state, newColor];
    case "DELETE_COLOR":
      return state.filter((color) => color.id !== action.payload);
    default:
      return state;
  }
};

const ColorProvider = ({ children }) => {
  const storedColors = JSON.parse(localStorage.getItem("colors")) || [];
  const [colors, dispatch] = useReducer(colorReducer, storedColors);

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  return (
    <ColorContext.Provider value={{ colors, dispatch }}>
      {children}
    </ColorContext.Provider>
  );
};

const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
};

export { ColorProvider, useColor };
