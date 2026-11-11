import { BarChart3 } from "lucide-react";
import type { Viz } from "@/data/dashboardData";

export function WidgetViz({ viz, text }: { viz?: Viz | undefined; text: string }) {
  if (!viz || viz.type === "text")
    return <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>;
  if (viz.type === "empty")
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <BarChart3 className="h-10 w-10 opacity-40" strokeWidth={1.25} />
        <span className="text-sm">No Graph data available!</span>
      </div>
    );
  const sum = viz.segments.reduce((a, b) => a + b.value, 0) || 1;
  const legend = (
    <ul className="grid gap-1.5 text-xs">
      {viz.segments.map((s) => (
        <li key={s.label} className="flex items-center gap-2 text-foreground/80">
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: s.color }} />
          {s.label} ({s.value.toLocaleString()})
        </li>
      ))}
    </ul>
  );
  if (viz.type === "bar")
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <p className="text-sm"><span className="text-lg font-semibold">{viz.total.toLocaleString()}</span> <span className="text-muted-foreground">{viz.label}</span></p>
        <div className="flex h-3 overflow-hidden rounded-full bg-muted">
          {viz.segments.map((s) => <div key={s.label} style={{ width: `${(s.value / sum) * 100}%`, background: s.color }} />)}
        </div>
        <div className="[&_ul]:grid-cols-2">{legend}</div>
      </div>
    );
  const r = 42, c = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="flex h-full items-center gap-6">
      <svg viewBox="0 0 120 120" className="h-32 w-32 shrink-0 -rotate-90">
        {viz.segments.map((s) => {
          const len = (s.value / sum) * c;
          const el = <circle key={s.label} cx="60" cy="60" r={r} fill="none" stroke={s.color} strokeWidth="16" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off} />;
          off += len;
          return el;
        })}
        <g className="rotate-90 origin-center">
          <text x="60" y="58" textAnchor="middle" className="fill-foreground text-[15px] font-bold">{viz.total.toLocaleString()}</text>
          <text x="60" y="73" textAnchor="middle" className="fill-muted-foreground text-[9px]">{viz.label}</text>
        </g>
      </svg>
      {legend}
    </div>
  );
}
