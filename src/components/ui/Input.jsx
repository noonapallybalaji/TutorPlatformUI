import { useState } from "react";

export default function Input({
  type = "text",
  label,
  icon: Icon,
  helperText,
  error,
  success,
  disabled,
  size = "md",
  value,
  onChange,
  placeholder,
  className = ""
}) {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-2.5 px-3.5 text-sm",
    lg: "py-3 px-4 text-base"
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full rounded-xl border transition-all ${sizeClasses[size]} ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200"
              : success
              ? "border-green-400 focus:border-green-500 focus:ring-1 focus:ring-green-200"
              : "border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          } ${Icon ? "pl-10" : "pl-3"} ${disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white"}`}
        />
      </div>
      {helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {success && <p className="mt-1 text-xs text-emerald-500">{success}</p>}
    </div>
  );
}
