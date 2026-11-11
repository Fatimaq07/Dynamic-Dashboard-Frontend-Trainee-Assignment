export type Viz =
  | { type: "donut"; total: number; label: string; segments: { label: string; value: number; color: string }[] }
  | { type: "bar"; total: number; label: string; segments: { label: string; value: number; color: string }[] }
  | { type: "empty" }
  | { type: "text" };

export interface Widget { id: string; name: string; text: string; viz?: Viz }
export interface Category { id: string; name: string; short: string; widgetIds: string[] }
export interface DashboardData { categories: Category[]; widgets: Record<string, Widget> }

export const dashboardData: DashboardData = {
  categories: [
    { id: "cspm", name: "CSPM Executive Dashboard", short: "CSPM", widgetIds: ["w-cloud-accounts", "w-cloud-risk"] },
    { id: "cwpp", name: "CWPP Dashboard", short: "CWPP", widgetIds: ["w-ns-alerts", "w-workload-alerts"] },
    { id: "registry", name: "Registry Scan", short: "Image", widgetIds: ["w-image-risk", "w-image-security"] },
    { id: "tickets", name: "Ticket Management", short: "Ticket", widgetIds: ["w-open-tickets"] },
  ],
  widgets: {
    "w-cloud-accounts": {
      id: "w-cloud-accounts", name: "Cloud Accounts", text: "Total connected cloud accounts across providers.",
      viz: { type: "donut", total: 2, label: "Total", segments: [
        { label: "Connected", value: 1, color: "var(--chart-1)" },
        { label: "Not Connected", value: 1, color: "var(--chart-2)" } ] },
    },
    "w-cloud-risk": {
      id: "w-cloud-risk", name: "Cloud Account Risk Assessment", text: "Security risk assessment overview of all checks.",
      viz: { type: "donut", total: 9659, label: "Total", segments: [
        { label: "Failed", value: 1689, color: "var(--chart-6)" },
        { label: "Warning", value: 681, color: "var(--chart-4)" },
        { label: "Not available", value: 36, color: "var(--chart-2)" },
        { label: "Passed", value: 7253, color: "var(--chart-3)" } ] },
    },
    "w-ns-alerts": { id: "w-ns-alerts", name: "Top 5 Namespace Specific Alerts", text: "Namespaces with the most alerts.", viz: { type: "empty" } },
    "w-workload-alerts": { id: "w-workload-alerts", name: "Workload Alerts", text: "Runtime alerts raised by workloads.", viz: { type: "empty" } },
    "w-image-risk": {
      id: "w-image-risk", name: "Image Risk Assessment", text: "Vulnerabilities found across registry images.",
      viz: { type: "bar", total: 1470, label: "Total Vulnerabilities", segments: [
        { label: "Critical", value: 9, color: "var(--chart-6)" },
        { label: "High", value: 150, color: "var(--chart-5)" },
        { label: "Medium", value: 800, color: "var(--chart-7)" },
        { label: "Low", value: 511, color: "var(--chart-4)" } ] },
    },
    "w-image-security": {
      id: "w-image-security", name: "Image Security Issues", text: "Images with security issues by severity.",
      viz: { type: "bar", total: 2, label: "Total Images", segments: [
        { label: "Critical", value: 2, color: "var(--chart-6)" },
        { label: "High", value: 2, color: "var(--chart-5)" },
        { label: "Medium", value: 1, color: "var(--chart-7)" } ] },
    },
    "w-open-tickets": { id: "w-open-tickets", name: "Open Tickets", text: "14 open tickets · 3 due this week · avg. resolution 2.4 days.", viz: { type: "text" } },
    "w-compliance": { id: "w-compliance", name: "Compliance Score", text: "CIS benchmark compliance is at 82% across accounts.", viz: { type: "text" } },
  },
};
