import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDashboard } from "@/store/dashboardStore";

export function AddWidgetModal({ open, onOpenChange, defaultCategory }: { open: boolean; onOpenChange: (o: boolean) => void; defaultCategory?: string | undefined }) {
  const { categories, addWidget } = useDashboard();
  const [name, setName] = useState(""); const [text, setText] = useState(""); const [cat, setCat] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => { if (open) { setName(""); setText(""); setErrors({}); setCat(defaultCategory ?? categories[0]?.id ?? ""); } }, [open, defaultCategory, categories]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!name.trim()) er["name"] = "Widget name is required";
    if (!text.trim()) er["text"] = "Widget text is required";
    if (!cat) er["cat"] = "Choose a category";
    setErrors(er);
    if (Object.keys(er).length) return;
    addWidget(cat, name.trim(), text.trim());
    toast.success(`"${name.trim()}" added`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={submit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Widget</DialogTitle>
            <DialogDescription>Create a new widget and place it in a category.</DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="wname">Widget name</Label>
            <Input id="wname" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Compliance Score" />
            {errors["name"] && <p className="text-xs text-destructive">{errors["name"]}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="wtext">Widget text</Label>
            <Textarea id="wtext" rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Short description or content" />
            {errors["text"] && <p className="text-xs text-destructive">{errors["text"]}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            {errors["cat"] && <p className="text-xs text-destructive">{errors["cat"]}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Add Widget</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
