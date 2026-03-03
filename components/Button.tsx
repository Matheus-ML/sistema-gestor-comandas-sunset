
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "sunset-gradient text-white hover:brightness-110 shadow-lg shadow-orange-200 focus:ring-orange-400",
    navy: "bg-[#0c4a6e] text-white hover:bg-[#075985] shadow-lg shadow-blue-200 focus:ring-blue-400",
    secondary: "bg-slate-100 text-[#0c4a6e] hover:bg-slate-200 focus:ring-slate-300",
    danger: "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-400 shadow-md",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 shadow-md",
    ghost: "bg-transparent text-[#0c4a6e] hover:bg-orange-50 focus:ring-orange-200"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <i className={`fa-solid ${icon} ${children ? 'mr-2' : ''}`}></i>}
      {children}
    </button>
  );
};
