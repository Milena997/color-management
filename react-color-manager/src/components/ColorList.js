import React, { useEffect, useState } from "react";

import { useColor } from "../context/ColorContext";

import { useWebSocket } from "../hooks/useWebSocket";
import Color from "./Color";

const ColorList = () => {
  const { colors, dispatch } = useColor();
  const [newColor, setNewColor] = useState({ name: "", hex: "" });
  const [filterTerm, setFilterTerm] = useState("");
  const [inputError, setInputError] = useState("");
  const { sendMessage } = useWebSocket("wss://socketsbay.com/wss/v2/1/demo/");
  const handleAddColor = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!isValidColorName(newColor.name)) {
      setInputError("Invalid color name. It should be a non-empty string.");
      return;
    }

    if (!isValidHexValue(newColor.hex)) {
      setInputError(
        "Invalid hex value. It should be a valid 3, 6, or 8-digit hex code."
      );
      return;
    }

    // Dispatch the 'ADD_COLOR' action to add the new color
    dispatch({ type: "ADD_COLOR", payload: newColor });

    sendMessage(JSON.stringify({ newColor }));

    // Clear the form fields and error message after adding the color
    setNewColor({ name: "", hex: "" });
    setInputError("");
  };

  const isValidColorName = (name) => {
    return typeof name === "string" && name.trim() !== "";
  };

  const isValidHexValue = (hex) => {
    const hexRegex = /^(#)?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
    return hexRegex.test(hex);
  };

  const filteredColors = colors.filter(
    (color) =>
      color.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      color.hex.toLowerCase().includes(filterTerm.toLowerCase())
  );

  useEffect(() => {
    if (!colors.length) {
      setFilterTerm("");
    }
  }, [colors]);
  return (
    <div className="p-4 max-h-[100vh]">
      {/* Color Form */}
      <div className=" !max-w-[600px]">
        <form onSubmit={handleAddColor} className="pb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Color Name:
          </label>
          <input
            type="text"
            value={newColor.name}
            onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-700 text-sm font-bold py-2">
            Hex Value:
          </label>
          <input
            type="text"
            value={newColor.hex}
            onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex items-center pt-2">
            <button
              type="submit"
              className=" bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline"
            >
              Add Color
            </button>
            {/* Input error message */}
            {inputError && (
              <p className="text-red-500 pl-4 !m-0">{inputError}</p>
            )}
          </div>
        </form>

        {/* Filter input (conditionally rendered) */}
        {colors.length > 0 && (
          <input
            type="text"
            placeholder="Filter by name or hex"
            value={filterTerm || ""}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
        )}
      </div>
      <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
        {filteredColors.map((color) => (
          <Color key={color.id} {...color} />
        ))}
      </div>
    </div>
  );
};

export default ColorList;
