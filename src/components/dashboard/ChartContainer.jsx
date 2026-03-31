import LoadingSkeleton from "../ui/LoadingSkeleton";

export default function ChartContainer({ title, children, height = "h-72", loading = false }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
      </div>
      <div
        className={`${height} w-full min-h-[260px] min-w-0`}
        style={{ minHeight: 260 }}
      >
        {loading ? <LoadingSkeleton rows={4} /> : children}
      </div>
    </div>
  );
}
