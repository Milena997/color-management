import React from "react";
import ColorList from "./components/ColorList";
import { ColorProvider } from "./context/ColorContext";

const App = () => {
  return (
    <ColorProvider>
      <ColorList />
    </ColorProvider>
  );
};

export default App;
