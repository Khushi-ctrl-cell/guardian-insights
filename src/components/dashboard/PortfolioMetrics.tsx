import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const metrics = [
  { label: "FPD Rate", value: "6.2%", change: "-1.8% from last month", positive: true },
  { label: "False Positive Rate", value: "3.4%", change: "-0.6%", positive: true },
  { label: "Auto-Approved", value: "72%", change: "+4% this week", positive: true },
  { label: "Flagged for Review", value: "18%", change: "-2%", positive: true },
  { label: "Auto-Rejected", value: "10%", change: "+1%", positive: false },
  { label: "Avg Decision Time", value: "1.2s", change: "-0.3s", positive: true },
];

export function PortfolioMetrics() {
  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-5 w-5 text-primary" />
          Portfolio Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {metrics.map((metric, i) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-xl font-bold font-mono">{metric.value}</p>
              <p className={`text-[11px] font-medium ${metric.positive ? "text-success" : "text-destructive"}`}>
                {metric.change}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
