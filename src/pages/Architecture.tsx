import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Database, Shield, Globe, Layers, Workflow, Server } from "lucide-react";

const layers = [
  {
    name: "Frontend",
    icon: Globe,
    tech: "React + TypeScript + Vite",
    color: "text-primary",
    components: ["Dashboard UI", "Borrower DNA™ Visualizer", "Risk Simulator", "Admin Console"],
  },
  {
    name: "API Gateway",
    icon: Workflow,
    tech: "Edge Functions (Deno)",
    color: "text-accent",
    components: ["POST /score-loan", "POST /validate-pan", "GET /portfolio-risk", "Webhooks"],
  },
  {
    name: "ML Scoring Service",
    icon: Cpu,
    tech: "Logistic Regression + Feature Engineering",
    color: "text-warning",
    components: ["FPD Prediction Engine", "Borrower DNA™ Scorer", "Capital Protection Score™", "What-If Engine"],
  },
  {
    name: "Database",
    icon: Database,
    tech: "PostgreSQL (Multi-Tenant)",
    color: "text-success",
    components: ["Org-scoped RLS", "loan_applications", "fraud_alerts", "decision_rules", "audit_logs"],
  },
  {
    name: "Security Layer",
    icon: Shield,
    tech: "Row-Level Security + RBAC",
    color: "text-destructive",
    components: ["JWT Authentication", "Role-based Access", "Data Encryption", "Audit Trail"],
  },
];

export default function Architecture() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <Header />
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <Server className="h-6 w-6 text-primary" />
              System Architecture
            </h1>
            <p className="text-muted-foreground">End-to-end architecture of Guardian Insights platform.</p>
          </div>

          {/* Architecture Diagram (Visual) */}
          <Card variant="glass" className="overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-3">
                {layers.map((layer, i) => (
                  <div key={i}>
                    <div className="flex items-stretch gap-3">
                      {/* Layer icon */}
                      <div className={`flex flex-col items-center justify-center w-12 ${layer.color}`}>
                        <layer.icon className="h-6 w-6" />
                        {i < layers.length - 1 && (
                          <div className="w-0.5 flex-1 bg-border/50 mt-2" />
                        )}
                      </div>

                      {/* Layer card */}
                      <div className="flex-1 p-4 rounded-lg bg-secondary/30 border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{layer.name}</h3>
                            <Badge variant="outline" className="text-[10px] font-mono">{layer.tech}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {layer.components.map((comp, j) => (
                            <span key={j} className="text-xs bg-background/50 px-2 py-1 rounded border border-border/30">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Flow */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-base">Data Flow — Loan Scoring Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {[
                  { label: "Loan Application", sub: "NBFC System" },
                  { label: "API Gateway", sub: "Validation" },
                  { label: "Feature Extraction", sub: "50+ signals" },
                  { label: "DNA Scoring", sub: "5 Behavioral Genes" },
                  { label: "FPD Prediction", sub: "ML Model v2.4" },
                  { label: "CPS™ Calculation", sub: "Capital at Risk" },
                  { label: "Decision", sub: "Approve/Review/Reject" },
                  { label: "Webhook", sub: "Real-time Alert" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 shrink-0">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center min-w-[120px]">
                      <p className="text-xs font-medium">{step.label}</p>
                      <p className="text-[10px] text-muted-foreground">{step.sub}</p>
                    </div>
                    {i < 7 && <span className="text-muted-foreground">→</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure */}
          <div className="grid grid-cols-3 gap-4">
            <Card variant="glass" className="p-4 text-center">
              <Globe className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold text-sm">Hosting</p>
              <p className="text-xs text-muted-foreground">AWS Mumbai (ap-south-1)</p>
            </Card>
            <Card variant="glass" className="p-4 text-center">
              <Database className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="font-semibold text-sm">Database</p>
              <p className="text-xs text-muted-foreground">PostgreSQL with RLS</p>
            </Card>
            <Card variant="glass" className="p-4 text-center">
              <Shield className="h-6 w-6 text-warning mx-auto mb-2" />
              <p className="font-semibold text-sm">Auth</p>
              <p className="text-xs text-muted-foreground">JWT + RBAC + MFA</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
