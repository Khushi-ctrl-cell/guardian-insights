import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, Eye, FileText, Clock, Download,
  History, CheckCircle, Lock, Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const auditLogs = [
  { time: "14:32:05", user: "Aman Verma", action: "Approved application APP-7823", entity: "loan_applications", ip: "103.21.58.12" },
  { time: "14:28:12", user: "Priya Singh", action: "Updated decision rule 'Velocity Check'", entity: "decision_rules", ip: "103.21.58.14" },
  { time: "14:15:43", user: "System", action: "Auto-rejected APP-8901 (CPS > 90)", entity: "loan_applications", ip: "—" },
  { time: "13:58:30", user: "Rahul Gupta", action: "Exported portfolio risk report", entity: "reports", ip: "103.21.58.16" },
  { time: "13:42:18", user: "System", action: "Model v2.4 scoring run completed (1,247 apps)", entity: "ml_model", ip: "—" },
  { time: "13:30:00", user: "Aman Verma", action: "Added user sneha@guardianinsights.com", entity: "users", ip: "103.21.58.12" },
  { time: "12:45:22", user: "System", action: "FPD early warning triggered — Karnataka", entity: "alerts", ip: "—" },
  { time: "12:10:05", user: "Sneha Patel", action: "Viewed applicant DNA profile — Vikram Mehta", entity: "loan_applications", ip: "103.21.58.18" },
];

const modelVersions = [
  { version: "v2.4", date: "2026-02-14", auc: "0.84", status: "Active", changes: "Added BNPL stacking features" },
  { version: "v2.3", date: "2026-01-28", auc: "0.82", status: "Archived", changes: "Income volatility detection" },
  { version: "v2.2", date: "2026-01-10", auc: "0.79", status: "Archived", changes: "Device fingerprint improvements" },
  { version: "v2.1", date: "2025-12-20", auc: "0.77", status: "Archived", changes: "Geo-behavior gene added" },
  { version: "v2.0", date: "2025-12-01", auc: "0.74", status: "Archived", changes: "Borrower DNA™ engine launch" },
];

const soc2Controls = [
  { control: "Access Control", status: "Implemented", detail: "RBAC with admin/analyst/auditor roles" },
  { control: "Data Encryption", status: "Implemented", detail: "AES-256 at rest, TLS 1.3 in transit" },
  { control: "Audit Logging", status: "Implemented", detail: "Full audit trail with IP, timestamp, user" },
  { control: "Incident Response", status: "Implemented", detail: "Automated alerting, <15 min MTTR target" },
  { control: "Vendor Management", status: "Implemented", detail: "All subprocessors documented and reviewed" },
  { control: "Change Management", status: "Implemented", detail: "All model updates versioned and tracked" },
  { control: "Data Retention", status: "Implemented", detail: "Configurable per org, default 2 years" },
  { control: "Backup & Recovery", status: "Implemented", detail: "Daily backups, 30-day retention, <4h RTO" },
];

export default function TrustCenter() {
  const { toast } = useToast();

  const exportCSV = () => {
    const csv = "Time,User,Action,Entity,IP\n" +
      auditLogs.map(l => `${l.time},${l.user},"${l.action}",${l.entity},${l.ip}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Audit logs exported as CSV." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Trust Center
            </h1>
            <p className="text-muted-foreground">Audit logs, model versioning, SOC2 controls & data retention.</p>
          </div>

          {/* Audit Log Viewer */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Eye className="h-5 w-5 text-primary" />
                Audit Log Viewer
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-2" onClick={exportCSV}>
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead className="w-32">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs">{log.time}</TableCell>
                      <TableCell className="text-sm">{log.user}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.action}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] font-mono">{log.entity}</Badge></TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Model Version History */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-base">
                <History className="h-5 w-5 text-primary" />
                Model Version History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Version</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>AUC-ROC</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Changes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modelVersions.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono font-bold">{v.version}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{v.date}</TableCell>
                      <TableCell className="font-mono text-primary">{v.auc}</TableCell>
                      <TableCell>
                        <Badge className={v.status === "Active" ? "bg-success/20 text-success border-success/30 border" : "bg-muted text-muted-foreground border-border border"}>
                          {v.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{v.changes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* SOC2 Controls */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-base">
                <Lock className="h-5 w-5 text-success" />
                SOC2-Ready Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {soc2Controls.map((c, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/30 flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{c.control}</p>
                      <p className="text-xs text-muted-foreground">{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-5 w-5 text-warning" />
                Data Retention Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { data: "Loan Applications", retention: "2 years", configurable: true },
                { data: "Audit Logs", retention: "5 years", configurable: false },
                { data: "Risk Scores", retention: "2 years", configurable: true },
                { data: "PII Data", retention: "Per RBI guidelines", configurable: false },
                { data: "Model Training Data", retention: "1 year (anonymized)", configurable: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <span className="text-sm font-medium">{item.data}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-muted-foreground">{item.retention}</span>
                    {item.configurable && (
                      <Badge variant="outline" className="text-[10px]">Configurable</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Architecture Note */}
          <Card variant="glass" className="border-primary/20">
            <CardContent className="p-6 text-center space-y-2">
              <Server className="h-8 w-8 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">
                Hosted on AWS (Mumbai Region) • Payment-ready via Stripe • SOC2 Type II audit in progress
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
