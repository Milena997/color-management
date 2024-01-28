import React from "react";
import { useColor } from "../context/ColorContext";

const Color = ({ id, name, hex }) => {
  const { dispatch } = useColor();

  const handleDelete = () => {
    dispatch({ type: "DELETE_COLOR", payload: id });
  };

  const handleCopyHex = () => {
    navigator.clipboard.writeText(hex);
  };

  return (
    <div className={`border rounded p-4 m-2 flex items-center`}>
      {/* Color Circle */}
      <div
        className="w-10 h-10 rounded-full mr-4"
        style={{ backgroundColor: hex }}
      ></div>

      {/* Color Information */}
      <div>
        {name && <p className="text-xl font-bold">{name}</p>}
        {hex && <p className="text-gray-600">{hex}</p>}
      </div>

      {/* Action Buttons */}
      <div className="ml-auto flex items-center">
        <button
          onClick={handleCopyHex}
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
        >
          Copy Hex
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Color;
