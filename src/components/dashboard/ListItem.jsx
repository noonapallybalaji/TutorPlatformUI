export default function ListItem({ title, subtitle, icon, onClick }) {
  const IconComponent = icon;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-3"
    >
      {IconComponent && (
        <span className="text-slate-500">
          <IconComponent className="w-4 h-4" />
        </span>
      )}
      <div>
        <p className="font-medium text-slate-800">{title}</p>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </button>
  );
}
