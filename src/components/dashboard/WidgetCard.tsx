import { X } from "lucide-react";
import type { Widget } from "@/data/dashboardData";
import { WidgetViz } from "./WidgetViz";

export function WidgetCard({ widget, onRemove }: { widget: Widget; onRemove: () => void }) {
  return (
    <article className="group relative flex h-64 flex-col rounded-xl border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <header className="mb-4 flex items-start justify-between gap-3">
        <h3 className="min-w-0 truncate text-sm font-semibold">{widget.name}</h3>
        <button onClick={onRemove} aria-label={`Remove ${widget.name}`} className="shrink-0 rounded-md p-1 text-muted-foreground opacity-60 transition hover:bg-muted hover:text-destructive group-hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
      </header>
      <div className="min-h-0 flex-1"><WidgetViz viz={widget.viz} text={widget.text} /></div>
    </article>
  );
}
