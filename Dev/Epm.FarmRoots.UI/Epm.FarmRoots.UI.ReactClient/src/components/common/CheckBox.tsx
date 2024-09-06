import React from 'react';

interface CheckBoxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  value?: string;
  className?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ 
    checked,
    onChange,
    value,
    label, 
    className,
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
        className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded-lg focus:ring-indigo-500"
        id={label}
      />
      <label 
        htmlFor={label}
        className={`ml-2 cursor-pointer px-2 py-1 text-sm sm:px-4 sm:py-2 border rounded-md ${
          checked ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
