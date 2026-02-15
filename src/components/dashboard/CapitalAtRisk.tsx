import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, TrendingDown, ShieldCheck, AlertTriangle } from "lucide-react";

const applicantRisk = [
  { name: "Vikram Mehta", amount: 250000, fpd: 0.87, tier: "high" },
  { name: "Anjali Gupta", amount: 180000, fpd: 0.72, tier: "high" },
  { name: "Rajesh Nair", amount: 95000, fpd: 0.54, tier: "medium" },
  { name: "Pooja Reddy", amount: 320000, fpd: 0.41, tier: "medium" },
  { name: "Suresh Iyer", amount: 150000, fpd: 0.23, tier: "low" },
];

export function CapitalAtRisk() {
  const totalAtRisk = applicantRisk.reduce((sum, a) => sum + a.amount * a.fpd, 0);
  const capitalProtected = 4850000;
  const fpdAvoided = 127;

  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <IndianRupee className="h-5 w-5 text-warning" />
          Capital at Risk Meter
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
            <p className="text-xs text-muted-foreground mb-1">At Risk Today</p>
            <p className="text-lg font-bold text-destructive font-mono">
              ₹{Math.round(totalAtRisk).toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
            <p className="text-xs text-muted-foreground mb-1">Protected This Month</p>
            <p className="text-lg font-bold text-success font-mono">
              ₹{capitalProtected.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
            <p className="text-xs text-muted-foreground mb-1">FPD Avoided</p>
            <p className="text-lg font-bold text-primary font-mono">{fpdAvoided}</p>
          </div>
        </div>

        {/* Per-Applicant Risk */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Top Applicants by Capital Exposure
          </p>
          {applicantRisk.map((applicant, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    applicant.tier === "high"
                      ? "bg-destructive"
                      : applicant.tier === "medium"
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                />
                <span className="text-sm font-medium">{applicant.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-muted-foreground">
                  ₹{applicant.amount.toLocaleString()}
                </span>
                <span
                  className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                    applicant.fpd > 0.7
                      ? "bg-destructive/20 text-destructive"
                      : applicant.fpd > 0.4
                      ? "bg-warning/20 text-warning"
                      : "bg-success/20 text-success"
                  }`}
                >
                  {(applicant.fpd * 100).toFixed(0)}% FPD
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
