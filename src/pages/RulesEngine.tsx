import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Play,
  AlertTriangle,
  CheckCircle,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Rule {
  id: string;
  name: string;
  condition: string;
  behavior: string;
  action: string;
  priority: "low" | "medium" | "high";
  enabled: boolean;
  triggeredCount: number;
}

const initialRules: Rule[] = [
  {
    id: "RUL-001",
    name: "High Value Transaction Alert",
    condition: "Transaction amount > ₹50,000",
    behavior: "Any device",
    action: "Trigger high-priority alert",
    priority: "high",
    enabled: true,
    triggeredCount: 145,
  },
  {
    id: "RUL-002",
    name: "New Device + High Amount",
    condition: "Transaction amount > ₹25,000",
    behavior: "New device detected",
    action: "Request MFA verification",
    priority: "high",
    enabled: true,
    triggeredCount: 89,
  },
  {
    id: "RUL-003",
    name: "Velocity Check",
    condition: "More than 5 transactions",
    behavior: "Within 10 minutes",
    action: "Temporarily hold transactions",
    priority: "medium",
    enabled: true,
    triggeredCount: 234,
  },
  {
    id: "RUL-004",
    name: "Geographic Anomaly",
    condition: "Transaction from new location",
    behavior: "Different country than usual",
    action: "Send SMS verification",
    priority: "medium",
    enabled: true,
    triggeredCount: 56,
  },
  {
    id: "RUL-005",
    name: "Late Night Transaction",
    condition: "Transaction between 1 AM - 5 AM",
    behavior: "Amount > ₹10,000",
    action: "Flag for review",
    priority: "low",
    enabled: false,
    triggeredCount: 12,
  },
  {
    id: "RUL-006",
    name: "Multiple Failed Attempts",
    condition: "More than 3 failed logins",
    behavior: "Within 1 hour",
    action: "Lock account temporarily",
    priority: "high",
    enabled: true,
    triggeredCount: 178,
  },
];

const getPriorityBadge = (priority: string) => {
  const variants: Record<string, "critical" | "medium" | "low"> = {
    high: "critical",
    medium: "medium",
    low: "low",
  };
  return <Badge variant={variants[priority] || "low"}>{priority.toUpperCase()}</Badge>;
};

export default function RulesEngine() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    condition: "",
    behavior: "",
    action: "",
    priority: "medium" as "low" | "medium" | "high",
  });

  const handleToggle = (ruleId: string) => {
    setRules(rules.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r)));
    toast({
      title: "Rule Updated",
      description: `Rule has been ${rules.find((r) => r.id === ruleId)?.enabled ? "disabled" : "enabled"}.`,
    });
  };

  const handleDelete = (ruleId: string) => {
    setRules(rules.filter((r) => r.id !== ruleId));
    toast({
      title: "Rule Deleted",
      description: "The rule has been removed from the system.",
    });
  };

  const handleSave = () => {
    if (isEditing && selectedRule) {
      setRules(
        rules.map((r) =>
          r.id === selectedRule.id
            ? { ...r, ...formData }
            : r
        )
      );
      toast({ title: "Rule Updated", description: "Changes have been saved." });
    } else {
      const newRule: Rule = {
        id: `RUL-${String(rules.length + 1).padStart(3, "0")}`,
        ...formData,
        enabled: true,
        triggeredCount: 0,
      };
      setRules([...rules, newRule]);
      toast({ title: "Rule Created", description: "New rule has been added." });
    }
    setDialogOpen(false);
    resetForm();
  };

  const handleTest = () => {
    toast({
      title: "Rule Test Complete",
      description: `Rule "${selectedRule?.name}" would have triggered 23 times on historical data.`,
    });
    setTestDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({ name: "", condition: "", behavior: "", action: "", priority: "medium" });
    setSelectedRule(null);
    setIsEditing(false);
  };

  const openEditDialog = (rule: Rule) => {
    setSelectedRule(rule);
    setFormData({
      name: rule.name,
      condition: rule.condition,
      behavior: rule.behavior,
      action: rule.action,
      priority: rule.priority,
    });
    setIsEditing(true);
    setDialogOpen(true);
  };

  const activeRules = rules.filter((r) => r.enabled).length;
  const totalTriggers = rules.reduce((sum, r) => sum + r.triggeredCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="metric">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Rules</p>
                    <p className="text-3xl font-bold">{rules.length}</p>
                  </div>
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card variant="metric" className="border-l-4 border-l-success">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Rules</p>
                    <p className="text-3xl font-bold text-success">{activeRules}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card variant="metric">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Triggers</p>
                    <p className="text-3xl font-bold">{totalTriggers.toLocaleString()}</p>
                  </div>
                  <Zap className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card variant="metric" className="border-l-4 border-l-critical">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                    <p className="text-3xl font-bold text-critical">
                      {rules.filter((r) => r.priority === "high").length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-critical" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rules Table */}
          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Active Rules
              </CardTitle>
              <Button
                onClick={() => {
                  resetForm();
                  setDialogOpen(true);
                }}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Rule
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Triggers</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id} className={!rule.enabled ? "opacity-50" : ""}>
                      <TableCell>
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={() => handleToggle(rule.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {rule.condition} + {rule.behavior}
                      </TableCell>
                      <TableCell className="text-sm">{rule.action}</TableCell>
                      <TableCell>{getPriorityBadge(rule.priority)}</TableCell>
                      <TableCell className="font-mono">{rule.triggeredCount}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(rule)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedRule(rule);
                              setTestDialogOpen(true);
                            }}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(rule.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Create/Edit Rule Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Rule" : "Create New Rule"}</DialogTitle>
                <DialogDescription>
                  Configure the rule conditions, behavior, and actions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Rule Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., High Value Transaction Alert"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">IF Condition</Label>
                  <Input
                    id="condition"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    placeholder="e.g., Transaction amount > ₹50,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="behavior">AND Behavior</Label>
                  <Input
                    id="behavior"
                    value={formData.behavior}
                    onChange={(e) => setFormData({ ...formData, behavior: e.target.value })}
                    placeholder="e.g., New device detected"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action">THEN Action</Label>
                  <Input
                    id="action"
                    value={formData.action}
                    onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                    placeholder="e.g., Trigger alert, Block transaction"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(v) => setFormData({ ...formData, priority: v as "low" | "medium" | "high" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>{isEditing ? "Save Changes" : "Create Rule"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Test Rule Dialog */}
          <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Test Rule</DialogTitle>
                <DialogDescription>
                  Simulate this rule against historical transaction data.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground mb-2">Testing rule:</p>
                <p className="font-medium">{selectedRule?.name}</p>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
                  <p><strong>Condition:</strong> {selectedRule?.condition}</p>
                  <p><strong>Behavior:</strong> {selectedRule?.behavior}</p>
                  <p><strong>Action:</strong> {selectedRule?.action}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setTestDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleTest} className="gap-2">
                  <Play className="h-4 w-4" />
                  Run Test
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
