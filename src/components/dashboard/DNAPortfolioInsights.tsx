import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dna, TrendingUp, TrendingDown } from "lucide-react";

const insights = [
  { label: "Stable Repayers", pct: 42, change: "-3%", positive: false, color: "bg-success" },
  { label: "Cashflow Volatile", pct: 28, change: "+2%", positive: false, color: "bg-warning" },
  { label: "Opportunistic Risk", pct: 19, change: "+4%", positive: false, color: "bg-accent" },
  { label: "High FPD Propensity", pct: 11, change: "+1%", positive: false, color: "bg-destructive" },
];

const anomalies = [
  { state: "Maharashtra", anomaly: "41% income instability", trend: "rising" },
  { state: "Delhi NCR", anomaly: "High velocity applicants 23%", trend: "rising" },
  { state: "Karnataka", anomaly: "Device switching spike", trend: "rising" },
  { state: "Kerala", anomaly: "Lowest DNA risk nationally", trend: "stable" },
];

export function DNAPortfolioInsights() {
  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <Dna className="h-5 w-5 text-primary" />
          Portfolio DNA Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Distribution */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">
            Behavioral Pattern Distribution
          </p>
          <div className="flex h-4 rounded-full overflow-hidden mb-2">
            {insights.map((item, i) => (
              <div key={i} className={`${item.color}`} style={{ width: `${item.pct}%` }} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {insights.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-secondary/30">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs">{item.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold font-mono">{item.pct}%</span>
                  <span className={`text-[10px] ${item.positive ? "text-success" : "text-destructive"}`}>{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State anomalies */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">
            State-wise Behavioral Anomalies
          </p>
          {anomalies.map((a, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 mb-1">
              <span className="text-sm font-medium">{a.state}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{a.anomaly}</span>
                {a.trend === "rising" ? (
                  <TrendingUp className="h-3 w-3 text-destructive" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-success" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
