import React, {forwardRef} from 'react';

interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  required?: boolean;
  maxLength?: number;
  additionalLabel?: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField =  forwardRef<HTMLInputElement, InputFieldProps>(({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  className,
  required,
  maxLength,
  additionalLabel,
  onKeyDown,
}, ref) => {
  const handleCopyPasteCut = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault(); // Prevent copy, cut, and paste actions
  };
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block my-0.5 text-sm font-medium text-gray-700">
          {label} {additionalLabel}
        </label>
      )}
       <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}  // Adding maxLength to the input field
        required={required}
        onKeyDown={onKeyDown}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onCopy={handleCopyPasteCut}
        ref = {ref}
      />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

export default InputField;
