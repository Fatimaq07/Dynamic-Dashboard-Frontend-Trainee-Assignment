import type { Widget } from "@/data/dashboardData";
import { SearchX } from "lucide-react";
import { useDashboard } from "@/store/dashboardStore";
import { WidgetCard } from "./WidgetCard";
import { toast } from "sonner";

export function SearchResults() {
  const { categories, widgets, search, removeWidget } = useDashboard();
  const q = search.toLowerCase().trim();
  const hits = categories.flatMap((c) => c.widgetIds.map((id) => widgets[id]).filter((w): w is Widget => Boolean(w))
    .filter((w) => [w.name, w.text, c.name].some((s) => s.toLowerCase().includes(q))).map((w) => ({ c, w })));
  if (!hits.length) return (
    <div className="flex flex-col items-center rounded-xl border bg-card py-16 text-center shadow-card">
      <SearchX className="mb-3 h-10 w-10 text-muted-foreground/50" strokeWidth={1.25} />
      <p className="font-medium">No results found</p>
      <p className="text-sm text-muted-foreground">Nothing matches "{search}".</p>
    </div>
  );
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{hits.length} result{hits.length > 1 && "s"} for "{search}"</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {hits.map(({ c, w }) => (
          <div key={c.id + w.id} className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{c.name}</span>
            <WidgetCard widget={w} onRemove={() => { removeWidget(c.id, w.id); toast.success(`"${w.name}" removed`); }} />
          </div>
        ))}
      </div>
    </div>
  );
}
