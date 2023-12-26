import React from "react";

export default function Input({
  name = "",
  label = "",
  type = "text",
  placeholder = "Placeholder",
  value = "",
  onChange = () => null,
  isRequired = true,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 text-sm font-bold mb-2" for={name}>
        {label}
      </label>
      <input
        className=" shadow appearance-none  border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
    </div>
  );
}
