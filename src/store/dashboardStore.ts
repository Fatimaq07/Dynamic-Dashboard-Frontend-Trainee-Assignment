import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dashboardData, type Category, type Widget } from "@/data/dashboardData";

interface State {
  categories: Category[];
  widgets: Record<string, Widget>;
  search: string;
  setSearch: (q: string) => void;
  addWidget: (categoryId: string, name: string, text: string) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  setCategoryWidgets: (map: Record<string, string[]>) => void;
  addCategory: (name: string) => void;
  reset: () => void;
}

const clone = () => JSON.parse(JSON.stringify(dashboardData)) as typeof dashboardData;

export const useDashboard = create<State>()(
  persist(
    (set) => ({
      ...clone(),
      search: "",
      setSearch: (search) => set({ search }),
      addWidget: (categoryId, name, text) =>
        set((s) => {
          const id = `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
          return {
            widgets: { ...s.widgets, [id]: { id, name, text, viz: { type: "text" } } },
            categories: s.categories.map((c) => (c.id === categoryId ? { ...c, widgetIds: [...c.widgetIds, id] } : c)),
          };
        }),
      // Removes the widget from the category only; its global definition stays available.
      removeWidget: (categoryId, widgetId) =>
        set((s) => ({
          categories: s.categories.map((c) =>
            c.id === categoryId ? { ...c, widgetIds: c.widgetIds.filter((w) => w !== widgetId) } : c,
          ),
        })),
      setCategoryWidgets: (map) =>
        set((s) => ({ categories: s.categories.map((c) => { const ids = map[c.id]; return ids ? { ...c, widgetIds: ids } : c; }) })),
      addCategory: (name) =>
        set((s) => ({
          categories: [...s.categories, { id: `c-${Date.now().toString(36)}`, name, short: name.split(" ")[0] ?? name, widgetIds: [] }],
        })),
      reset: () => set({ ...clone() }),
    }),
    { name: "cnapp-dashboard", skipHydration: true, partialize: ({ categories, widgets }) => ({ categories, widgets }) },
  ),
);
