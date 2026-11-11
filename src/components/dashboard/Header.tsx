import { Bell, ChevronRight, Search, ShieldCheck, X } from "lucide-react";
import { useDashboard } from "@/store/dashboardStore";

export function Header() {
  const search = useDashboard((s) => s.search);
  const setSearch = useDashboard((s) => s.setSearch);
  return (
    <header className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 md:grid-cols-[auto_minmax(0,1fr)_auto]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><ShieldCheck className="h-4 w-4" /></div>
          <nav className="flex min-w-0 items-center gap-1 text-sm">
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate font-semibold text-primary">Dashboard V2</span>
          </nav>
        </div>
        <div className="relative col-span-2 row-start-2 md:col-span-1 md:row-start-auto md:mx-auto md:w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anything..." className="h-9 w-full rounded-lg border bg-muted/60 pl-9 pr-8 text-sm outline-none transition focus:border-ring focus:bg-card" />
          {search && <button onClick={() => setSearch("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"><X className="h-3.5 w-3.5" /></button>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button aria-label="Notifications" className="relative rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">FQ</div>
        </div>
      </div>
    </header>
  );
}
