import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  message: string;
  timestamp: string;
  location?: string;
  device?: string;
  accountId: string;
}

// Data from fraud_indicators.csv and suspicious_activity.csv
const mockAlerts: Alert[] = [
  {
    id: "FRD-001",
    type: "Anomaly Score Alert",
    severity: "critical",
    message: "Transaction amount exceeds average spending by 450%",
    timestamp: "2 min ago",
    device: "MacBook Pro",
    accountId: "CUST-2847",
  },
  {
    id: "FRD-002",
    type: "High-Risk Merchant",
    severity: "high",
    message: "Payment to flagged merchant category detected",
    timestamp: "8 min ago",
    location: "Mumbai, India",
    accountId: "CUST-1523",
  },
  {
    id: "FRD-003",
    type: "Device Fingerprint",
    severity: "medium",
    message: "New device registered during transaction attempt",
    timestamp: "15 min ago",
    device: "Android 14",
    accountId: "CUST-9284",
  },
  {
    id: "FRD-004",
    type: "Login Pattern",
    severity: "high",
    message: "Unusual login frequency - 8 attempts in 2 hours",
    timestamp: "23 min ago",
    location: "Delhi, India",
    accountId: "CUST-4421",
  },
  {
    id: "FRD-005",
    type: "Behavioral Risk",
    severity: "low",
    message: "Minor deviation from typical transaction pattern",
    timestamp: "45 min ago",
    accountId: "CUST-7736",
  },
];

export function AlertFeed() {
  return (
    <Card variant="glass" className="h-full">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Live Alerts
          </CardTitle>
          <Badge variant="destructive" className="animate-pulse">
            {mockAlerts.filter((a) => a.severity === "critical").length} Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-[500px] overflow-y-auto">
        <div className="divide-y divide-border/30">
          {mockAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className={cn(
                "p-4 hover:bg-secondary/30 transition-colors cursor-pointer opacity-0 animate-slide-in-right",
                alert.severity === "critical" && "border-l-4 border-l-destructive bg-destructive/5"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={alert.severity}>{alert.severity}</Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      {alert.accountId}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{alert.type}</p>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <div className="flex items-center gap-4 pt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp}
                    </span>
                    {alert.location && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </span>
                    )}
                    {alert.device && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        {alert.device}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
