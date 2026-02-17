import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const endpoints = [
  {
    method: "POST",
    path: "/score-loan",
    description: "Score a loan application for FPD probability, DNA analysis, and Capital Protection Score.",
    request: `{
  "applicant_name": "Vikram Mehta",
  "pan_number": "ABCDE1234F",
  "loan_amount": 250000,
  "loan_type": "personal",
  "income_declared": 85000,
  "device_fingerprint": "fp_abc123",
  "ip_address": "103.21.58.12",
  "location": "Mumbai, Maharashtra"
}`,
    response: `{
  "application_id": "APP-7823",
  "fpd_probability": 0.87,
  "risk_tier": "high",
  "cps_score": 91,
  "dna_score": 82,
  "dna_classification": "High FPD Propensity",
  "capital_at_risk": 217500,
  "decision": "reject",
  "risk_factors": [
    { "factor": "Loan Stacking", "contribution": 28 },
    { "factor": "Device Anomaly", "contribution": 22 },
    { "factor": "Income Mismatch", "contribution": 19 }
  ],
  "behavioral_genes": {
    "device_stability": 16,
    "income_stability": 8,
    "application_velocity": 17,
    "geo_consistency": 12,
    "financial_discipline": 14
  }
}`,
  },
  {
    method: "POST",
    path: "/validate-pan",
    description: "Validate PAN number and check for reuse across applications.",
    request: `{
  "pan_number": "ABCDE1234F",
  "org_id": "org_xxx"
}`,
    response: `{
  "valid": true,
  "reuse_count": 3,
  "reuse_platforms": 2,
  "last_seen": "2026-02-15T10:30:00Z",
  "risk_flag": "high_reuse"
}`,
  },
  {
    method: "GET",
    path: "/portfolio-risk",
    description: "Get aggregated portfolio risk metrics for your organization.",
    request: `// Query params:
?period=30d&group_by=state`,
    response: `{
  "total_applications": 128450,
  "avg_fpd_rate": 6.2,
  "capital_at_risk": 18400000,
  "capital_protected": 48500000,
  "by_state": [
    { "state": "Maharashtra", "fpd_rate": 8.2, "apps": 24500 },
    { "state": "Karnataka", "fpd_rate": 7.1, "apps": 18200 }
  ],
  "dna_distribution": {
    "stable_repayer": 42,
    "cashflow_volatile": 28,
    "opportunistic": 19,
    "high_fpd": 11
  }
}`,
  },
  {
    method: "POST",
    path: "/webhooks/high-risk-alert",
    description: "Webhook endpoint configuration for receiving high-risk alerts in real-time.",
    request: `// Configure webhook URL:
{
  "webhook_url": "https://your-app.com/webhooks/guardian",
  "events": ["high_risk_detected", "fpd_warning", "pan_reuse"],
  "threshold": 0.7
}`,
    response: `// Webhook payload:
{
  "event": "high_risk_detected",
  "timestamp": "2026-02-17T14:30:00Z",
  "data": {
    "application_id": "APP-7823",
    "applicant_name": "Vikram Mehta",
    "fpd_probability": 0.87,
    "cps_score": 91,
    "action_required": "manual_review"
  }
}`,
  },
];

function getMethodColor(method: string) {
  if (method === "POST") return "bg-success/20 text-success border-success/30";
  if (method === "GET") return "bg-primary/20 text-primary border-primary/30";
  return "bg-warning/20 text-warning border-warning/30";
}

export default function ApiDocs() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: "Code copied to clipboard." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">API Documentation</h1>
            <p className="text-muted-foreground">
              Base URL: <code className="text-primary font-mono text-sm">https://api.guardianinsights.in/v1</code>
            </p>
          </div>

          <Card variant="glass" className="p-4">
            <h3 className="font-semibold mb-2">Authentication</h3>
            <p className="text-sm text-muted-foreground mb-2">
              All API requests require a Bearer token in the Authorization header.
            </p>
            <div className="bg-background/50 rounded-lg p-3 font-mono text-sm">
              Authorization: Bearer {"<your_api_key>"}
            </div>
          </Card>

          {endpoints.map((ep, i) => (
            <Card key={i} variant="glass">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-3 text-base">
                  <Badge className={`border font-mono text-xs ${getMethodColor(ep.method)}`}>
                    {ep.method}
                  </Badge>
                  <code className="font-mono text-sm">{ep.path}</code>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{ep.description}</p>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">Request</span>
                    <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs" onClick={() => copyToClipboard(ep.request)}>
                      <Copy className="h-3 w-3" /> Copy
                    </Button>
                  </div>
                  <pre className="bg-background/50 rounded-lg p-3 text-xs font-mono overflow-x-auto whitespace-pre text-muted-foreground">
                    {ep.request}
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">Response</span>
                    <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs" onClick={() => copyToClipboard(ep.response)}>
                      <Copy className="h-3 w-3" /> Copy
                    </Button>
                  </div>
                  <pre className="bg-background/50 rounded-lg p-3 text-xs font-mono overflow-x-auto whitespace-pre text-success/80">
                    {ep.response}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </main>
      </div>
    </div>
  );
}
