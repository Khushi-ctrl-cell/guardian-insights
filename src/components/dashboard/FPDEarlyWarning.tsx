import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radar, TrendingUp, AlertTriangle } from "lucide-react";

const warnings = [
  {
    signal: "FPD rising in Karnataka",
    change: "+2.3%",
    severity: "high",
    detail: "Spike in loan stacking from Bangalore metro area",
    time: "2 hours ago",
  },
  {
    signal: "Income mismatch pattern increasing",
    change: "+18%",
    severity: "critical",
    detail: "38% of Delhi NCR applicants show 3x income overstatement",
    time: "45 mins ago",
  },
  {
    signal: "Device anomaly cluster — UP East",
    change: "+31%",
    severity: "critical",
    detail: "Emulator usage detected in 12% of applications",
    time: "20 mins ago",
  },
  {
    signal: "Midnight application surge",
    change: "+45%",
    severity: "high",
    detail: "Unusual 2-4 AM application volume in Gujarat",
    time: "1 hour ago",
  },
  {
    signal: "PAN reuse pattern detected",
    change: "+8 cases",
    severity: "medium",
    detail: "Same PAN used across 3+ platforms in Maharashtra",
    time: "3 hours ago",
  },
];

function getSeverityColor(severity: string) {
  if (severity === "critical") return "bg-destructive/20 text-destructive border-destructive/30";
  if (severity === "high") return "bg-warning/20 text-warning border-warning/30";
  return "bg-accent/20 text-accent border-accent/30";
}

export function FPDEarlyWarning() {
  return (
    <Card variant="glass" className="border-warning/20">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <Radar className="h-5 w-5 text-warning" />
          FPD Early Warning Radar
          <Badge className="ml-auto bg-warning/20 text-warning border-warning/30 animate-pulse text-[10px]">
            5 Active Signals
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {warnings.map((w, i) => (
          <div key={i} className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0" />
                <span className="text-sm font-medium">{w.signal}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-destructive flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  {w.change}
                </span>
                <Badge className={`text-[10px] border ${getSeverityColor(w.severity)}`}>
                  {w.severity}
                </Badge>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground pl-5">{w.detail}</p>
            <p className="text-[10px] text-muted-foreground/60 pl-5">{w.time}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
