import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Category, Widget } from "@/data/dashboardData";
import { useDashboard } from "@/store/dashboardStore";
import { WidgetCard } from "./WidgetCard";

export function CategorySection({ category, onAdd }: { category: Category; onAdd: (id: string) => void }) {
  const widgets = useDashboard((s) => s.widgets);
  const removeWidget = useDashboard((s) => s.removeWidget);
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-tight">{category.name}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {category.widgetIds.map((id) => widgets[id]).filter((w): w is Widget => Boolean(w)).map((w) => (
          <WidgetCard key={w.id} widget={w} onRemove={() => { removeWidget(category.id, w.id); toast.success(`"${w.name}" removed`); }} />
        ))}
        <button onClick={() => onAdd(category.id)} className="flex h-64 items-center justify-center rounded-xl border border-dashed bg-card shadow-card transition hover:border-primary/40 hover:bg-accent/40">
          <span className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground">
            <Plus className="h-4 w-4" /> Add Widget
          </span>
        </button>
      </div>
    </section>
  );
}
