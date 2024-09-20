import React from 'react';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: 'submit' | 'button';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, type, className, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      data-testid="button-element"
      className={`px-4 py-2 rounded-md font-semibold transition-transform transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
