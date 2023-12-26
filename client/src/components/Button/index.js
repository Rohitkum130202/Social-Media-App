import React from "react";

export default function Button({ label = "", className = "", onClick }) {
  return (
    <button
      className={`bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
