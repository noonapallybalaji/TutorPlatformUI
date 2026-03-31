export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  // Badge variant styles
  const variants = {
    primary: "badge-primary",
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
  };

  // Badge size styles
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const badgeClass = `${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
}
