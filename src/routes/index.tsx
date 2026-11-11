import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, EllipsisVertical, Plus, RefreshCw, RotateCcw, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Header } from "@/components/dashboard/Header";
import { CategorySection } from "@/components/dashboard/CategorySection";
import { AddWidgetModal } from "@/components/dashboard/AddWidgetModal";
import { ManageWidgetsPanel } from "@/components/dashboard/ManageWidgetsPanel";
import { SearchResults } from "@/components/dashboard/SearchResults";
import { useDashboard } from "@/store/dashboardStore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CNAPP Dashboard — Widget Manager" },
      { name: "description", content: "Customise your CNAPP security dashboard with dynamic widgets and categories." },
      { property: "og:title", content: "CNAPP Dashboard — Widget Manager" },
      { property: "og:description", content: "Customise your CNAPP security dashboard with dynamic widgets and categories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { categories, search, reset } = useDashboard();
  const [addOpen, setAddOpen] = useState(false);
  const [addCat, setAddCat] = useState<string>();
  const [manageOpen, setManageOpen] = useState(false);
  const [updated, setUpdated] = useState<Date | null>(null);
  useEffect(() => { useDashboard.persist.rehydrate(); setUpdated(new Date()); }, []);
  const openAdd = (id?: string) => { setAddCat(id); setAddOpen(true); };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">CNAPP Dashboard</h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Last updated {updated ? updated.toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "—"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => openAdd()}><Plus /> Add Widget</Button>
            <Button variant="outline" size="sm" onClick={() => setManageOpen(true)}><Settings2 /> Manage Categories</Button>
            <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Refresh" onClick={() => { setUpdated(new Date()); toast.success("Dashboard refreshed"); }}><RefreshCw /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline" size="icon" className="h-8 w-8" aria-label="More options"><EllipsisVertical /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { reset(); toast.success("Dashboard reset to defaults"); }}><RotateCcw /> Reset to defaults</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {search.trim() ? <SearchResults /> : categories.map((c) => <CategorySection key={c.id} category={c} onAdd={openAdd} />)}
      </main>
      <AddWidgetModal open={addOpen} onOpenChange={setAddOpen} defaultCategory={addCat} />
      <ManageWidgetsPanel open={manageOpen} onOpenChange={setManageOpen} />
    </div>
  );
}
