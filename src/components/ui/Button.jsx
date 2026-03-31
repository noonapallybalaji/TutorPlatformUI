import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon: Icon,
  className = "",
  ...props
}) {
  // Button variant styles
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    gradient: "btn-gradient",
    error: "btn-primary bg-red-600 hover:bg-red-700",
    success: "btn-primary bg-green-600 hover:bg-green-700",
  };

  // Button size styles
  const sizes = {
    sm: "btn-primary-sm",
    md: "btn-primary-md",
    lg: "btn-primary-lg",
  };

  // Apply correct size class based on variant
  const sizeClass =
    variant === "primary" || variant === "error" || variant === "success"
      ? sizes[size]
      : `px-4 py-2 text-${size === "lg" ? "base" : size === "sm" ? "xs" : "sm"}`;

  const buttonClass = `${variants[variant]} ${sizeClass} ${className}`;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={buttonClass}
      {...props}
    >
      <div className="flex items-center gap-2">
        {loading && <Loader2 size={18} className="animate-spin" />}
        {Icon && !loading && <Icon size={18} />}
        {children}
      </div>
    </motion.button>
  );
}
