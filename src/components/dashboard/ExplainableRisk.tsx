import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Info } from "lucide-react";

const riskFactors = [
  { factor: "Loan Stacking Score", contribution: 28, description: "3 active loan applications across platforms in last 30 days" },
  { factor: "Device Anomaly", contribution: 22, description: "New device fingerprint, never seen on this account before" },
  { factor: "Application Velocity", contribution: 19, description: "2nd application within 48 hours from same PAN" },
  { factor: "Address Mismatch", contribution: 17, description: "KYC address doesn't match device geolocation (400km gap)" },
  { factor: "Income Inconsistency", contribution: 14, description: "Declared income 3x higher than bureau-reported average" },
];

export function ExplainableRisk() {
  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <Brain className="h-5 w-5 text-primary" />
          Explainable Risk Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <p className="text-xs text-muted-foreground">
          Top 5 risk factors contributing to the latest high-risk applicant score
        </p>
        {riskFactors.map((item, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.factor}</span>
              <span className="text-sm font-mono font-bold text-primary">{item.contribution}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-secondary/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000"
                style={{ width: `${item.contribution}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">{item.description}</p>
          </div>
        ))}
        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <Info className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Human-readable:</strong> This applicant shows strong loan stacking patterns 
              with a new device and address mismatch. Recommend manual review before disbursement.
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
