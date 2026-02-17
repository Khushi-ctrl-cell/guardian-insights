import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const stateRisk = [
  { state: "Maharashtra", fpdRate: 8.2, applications: 24500, capitalAtRisk: 4200000 },
  { state: "Karnataka", fpdRate: 7.1, applications: 18200, capitalAtRisk: 3100000 },
  { state: "Tamil Nadu", fpdRate: 5.4, applications: 15800, capitalAtRisk: 2100000 },
  { state: "Delhi NCR", fpdRate: 9.3, applications: 21000, capitalAtRisk: 5800000 },
  { state: "Gujarat", fpdRate: 4.8, applications: 12300, capitalAtRisk: 1400000 },
  { state: "Rajasthan", fpdRate: 6.7, applications: 9800, capitalAtRisk: 1900000 },
  { state: "Uttar Pradesh", fpdRate: 10.1, applications: 28000, capitalAtRisk: 7200000 },
  { state: "West Bengal", fpdRate: 7.8, applications: 11200, capitalAtRisk: 2800000 },
  { state: "Telangana", fpdRate: 5.9, applications: 13500, capitalAtRisk: 1800000 },
  { state: "Kerala", fpdRate: 3.2, applications: 8900, capitalAtRisk: 680000 },
];

function getRiskColor(fpdRate: number) {
  if (fpdRate >= 9) return "bg-destructive/80 text-destructive-foreground";
  if (fpdRate >= 7) return "bg-destructive/50 text-foreground";
  if (fpdRate >= 5) return "bg-warning/50 text-foreground";
  return "bg-success/40 text-foreground";
}

function getRiskDot(fpdRate: number) {
  if (fpdRate >= 9) return "bg-destructive";
  if (fpdRate >= 7) return "bg-warning";
  if (fpdRate >= 5) return "bg-accent";
  return "bg-success";
}

export function GeoRiskHeatmap() {
  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <MapPin className="h-5 w-5 text-warning" />
          Geo-Risk Heatmap — India
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-2">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" /> Critical (&gt;9%)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> High (7-9%)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" /> Medium (5-7%)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Low (&lt;5%)</span>
        </div>
        {stateRisk
          .sort((a, b) => b.fpdRate - a.fpdRate)
          .map((item, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${getRiskDot(item.fpdRate)}`} />
                <span className="text-sm font-medium">{item.state}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono">{item.applications.toLocaleString()} apps</span>
                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${getRiskColor(item.fpdRate)}`}>
                  {item.fpdRate}% FPD
                </span>
                <span className="text-xs font-mono text-muted-foreground">₹{(item.capitalAtRisk / 100000).toFixed(1)}L</span>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
