export default function LoadingSkeleton({ className = "", rows = 3 }) {
  return (
    <div className={`space-y-3 animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-slate-200 rounded-lg" />
      ))}
    </div>
  );
}
