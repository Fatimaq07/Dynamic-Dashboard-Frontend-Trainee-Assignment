import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useDashboard } from "@/store/dashboardStore";
import { cn } from "@/lib/utils";

export function ManageWidgetsPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { categories, widgets, setCategoryWidgets, addCategory } = useDashboard();
  const [tab, setTab] = useState(""); const [q, setQ] = useState(""); const [newCat, setNewCat] = useState("");
  const [draft, setDraft] = useState<Record<string, string[]>>({});
  useEffect(() => {
    if (open) { setDraft(Object.fromEntries(categories.map((c) => [c.id, [...c.widgetIds]]))); setTab((t) => t || categories[0]?.id || ""); setQ(""); }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setDraft((d) => { const n = { ...d }; categories.forEach((c) => { if (!n[c.id]) n[c.id] = [...c.widgetIds]; }); return n; }); }, [categories]);

  const list = useMemo(() => Object.values(widgets).filter((w) => (w.name + " " + w.text).toLowerCase().includes(q.toLowerCase())), [widgets, q]);
  const selected = draft[tab] ?? [];
  const toggle = (id: string) => setDraft((d) => ({ ...d, [tab]: selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id] }));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-lg [&>button]:text-primary-foreground">
        <SheetHeader className="bg-primary px-5 py-3.5 text-primary-foreground">
          <SheetTitle className="text-sm font-semibold text-primary-foreground">Add Widget</SheetTitle>
          <SheetDescription className="sr-only">Manage category widgets</SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col px-5 pt-4">
          <p className="mb-3 text-sm">Personalise your dashboard by adding the following widget</p>
          <div className="flex gap-1 overflow-x-auto border-b">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setTab(c.id)} className={cn("-mb-px shrink-0 border-b-2 px-4 py-2 text-sm font-medium transition", tab === c.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>{c.short}</button>
            ))}
          </div>
          <div className="relative my-3">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search widgets" className="h-9 pl-8" />
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pb-4">
            {list.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No results found</p>}
            {list.map((w) => (
              <label key={w.id} className="flex cursor-pointer items-center gap-3 rounded-md border bg-card px-3 py-2.5 text-sm transition hover:bg-muted/60">
                <Checkbox checked={selected.includes(w.id)} onCheckedChange={() => toggle(w.id)} />
                <span className="min-w-0 truncate">{w.name}</span>
              </label>
            ))}
          </div>
          <form className="flex gap-2 border-t py-3" onSubmit={(e) => { e.preventDefault(); if (!newCat.trim()) return; addCategory(newCat.trim()); toast.success(`Category "${newCat.trim()}" created`); setNewCat(""); }}>
            <Input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category name" className="h-9" />
            <Button type="submit" variant="outline" size="sm" className="h-9">Add Category</Button>
          </form>
        </div>
        <div className="flex justify-end gap-2 border-t px-5 py-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => { setCategoryWidgets(draft); toast.success("Dashboard updated"); onOpenChange(false); }}>Confirm</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
