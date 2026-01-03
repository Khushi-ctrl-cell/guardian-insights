import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Shield,
  Eye,
  Ban,
  CheckCircle,
  ArrowUpRight,
  MapPin,
  Smartphone,
  Clock,
  IndianRupee,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  riskLevel: "critical" | "high" | "medium" | "low";
  type: string;
  userId: string;
  timestamp: string;
  status: "open" | "under_review" | "resolved";
  amount: number;
  riskScore: number;
  reason: string;
  location: string;
  device: string;
}

const alertsData: Alert[] = [
  {
    id: "ALT-001",
    riskLevel: "critical",
    type: "Anomaly Detection",
    userId: "USR-7823",
    timestamp: "2024-01-15 14:32:18",
    status: "open",
    amount: 125000,
    riskScore: 94,
    reason: "Transaction amount 15x higher than average spending pattern",
    location: "Mumbai, IN",
    device: "iPhone 14 Pro",
  },
  {
    id: "ALT-002",
    riskLevel: "high",
    type: "Login Pattern",
    userId: "USR-4521",
    timestamp: "2024-01-15 14:28:45",
    status: "open",
    amount: 45000,
    riskScore: 78,
    reason: "Multiple failed login attempts from new device",
    location: "Delhi, IN",
    device: "Samsung Galaxy S23",
  },
  {
    id: "ALT-003",
    riskLevel: "high",
    type: "Device Fingerprint",
    userId: "USR-9182",
    timestamp: "2024-01-15 14:15:32",
    status: "under_review",
    amount: 78500,
    riskScore: 72,
    reason: "Device linked to 3 different accounts",
    location: "Bangalore, IN",
    device: "Chrome/Windows",
  },
  {
    id: "ALT-004",
    riskLevel: "medium",
    type: "Velocity Check",
    userId: "USR-3847",
    timestamp: "2024-01-15 13:58:21",
    status: "open",
    amount: 32000,
    riskScore: 58,
    reason: "5 transactions within 10 minutes",
    location: "Chennai, IN",
    device: "OnePlus 11",
  },
  {
    id: "ALT-005",
    riskLevel: "critical",
    type: "Synthetic Identity",
    userId: "USR-6712",
    timestamp: "2024-01-15 13:45:09",
    status: "open",
    amount: 250000,
    riskScore: 91,
    reason: "Identity graph shows synthetic pattern clusters",
    location: "Hyderabad, IN",
    device: "Unknown Device",
  },
  {
    id: "ALT-006",
    riskLevel: "medium",
    type: "Geo Anomaly",
    userId: "USR-2938",
    timestamp: "2024-01-15 13:32:44",
    status: "resolved",
    amount: 18500,
    riskScore: 45,
    reason: "Transaction from unusual location",
    location: "Pune, IN",
    device: "Pixel 8",
  },
];

const getRiskBadge = (level: string) => {
  const variants: Record<string, "critical" | "high" | "medium" | "low"> = {
    critical: "critical",
    high: "high",
    medium: "medium",
    low: "low",
  };
  return <Badge variant={variants[level] || "low"}>{level.toUpperCase()}</Badge>;
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    open: "bg-destructive/20 text-destructive border-destructive/30",
    under_review: "bg-warning/20 text-warning border-warning/30",
    resolved: "bg-success/20 text-success border-success/30",
  };
  const labels: Record<string, string> = {
    open: "Open",
    under_review: "Under Review",
    resolved: "Resolved",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const criticalCount = alertsData.filter((a) => a.riskLevel === "critical").length;
  const highCount = alertsData.filter((a) => a.riskLevel === "high").length;
  const mediumCount = alertsData.filter((a) => a.riskLevel === "medium").length;

  const handleAction = (action: string) => {
    toast({
      title: `Alert ${action}`,
      description: `Alert ${selectedAlert?.id} has been marked as ${action.toLowerCase()}.`,
    });
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          {/* Alerts Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="metric">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Alerts Today</p>
                    <p className="text-3xl font-bold">{alertsData.length}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card variant="metric" className="border-l-4 border-l-critical">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Critical</p>
                    <p className="text-3xl font-bold text-critical">{criticalCount}</p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-critical animate-pulse" />
                </div>
              </CardContent>
            </Card>
            <Card variant="metric" className="border-l-4 border-l-high">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High Risk</p>
                    <p className="text-3xl font-bold text-high">{highCount}</p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-high" />
                </div>
              </CardContent>
            </Card>
            <Card variant="metric" className="border-l-4 border-l-medium">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Medium Risk</p>
                    <p className="text-3xl font-bold text-medium">{mediumCount}</p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-medium" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Alerts Table */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Live Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert ID</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertsData.map((alert) => (
                    <TableRow key={alert.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">{alert.id}</TableCell>
                      <TableCell>{getRiskBadge(alert.riskLevel)}</TableCell>
                      <TableCell>{alert.type}</TableCell>
                      <TableCell className="font-mono text-sm">{alert.userId}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {alert.timestamp}
                      </TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAlert(alert);
                            setDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Alert Details Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Alert Details - {selectedAlert?.id}
                  {selectedAlert && getRiskBadge(selectedAlert.riskLevel)}
                </DialogTitle>
                <DialogDescription>
                  Review alert information and take appropriate action.
                </DialogDescription>
              </DialogHeader>
              {selectedAlert && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" /> Transaction Amount
                      </p>
                      <p className="text-lg font-semibold">
                        ₹{selectedAlert.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Risk Score</p>
                      <p className="text-lg font-semibold text-critical">
                        {selectedAlert.riskScore}/100
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Reason for Alert</p>
                    <p className="text-sm bg-muted/50 p-2 rounded-md">{selectedAlert.reason}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Location
                      </p>
                      <p className="text-sm">{selectedAlert.location}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Smartphone className="h-3 w-3" /> Device
                      </p>
                      <p className="text-sm">{selectedAlert.device}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Timestamp
                    </p>
                    <p className="text-sm">{selectedAlert.timestamp}</p>
                  </div>
                </div>
              )}
              <DialogFooter className="flex gap-2 sm:gap-2">
                <Button
                  variant="destructive"
                  onClick={() => handleAction("Fraud")}
                  className="gap-1"
                >
                  <Ban className="h-4 w-4" />
                  Mark as Fraud
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAction("Safe")}
                  className="gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark as Safe
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAction("Frozen")}
                  className="gap-1 border-warning text-warning hover:bg-warning/10"
                >
                  <Shield className="h-4 w-4" />
                  Freeze Account
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleAction("Escalated")}
                  className="gap-1"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Escalate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
