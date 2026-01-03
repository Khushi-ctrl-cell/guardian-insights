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

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "Synthetic Identity",
    severity: "critical",
    message: "Multiple accounts linked to same device fingerprint",
    timestamp: "2 min ago",
    device: "iPhone 15 Pro",
    accountId: "ACC-7829",
  },
  {
    id: "2",
    type: "Velocity Check",
    severity: "high",
    message: "15 transactions in 3 minutes from new account",
    timestamp: "8 min ago",
    location: "Lagos, Nigeria",
    accountId: "ACC-4521",
  },
  {
    id: "3",
    type: "Device Anomaly",
    severity: "medium",
    message: "Account accessed from 3 new devices in 24h",
    timestamp: "15 min ago",
    device: "Android 14",
    accountId: "ACC-9012",
  },
  {
    id: "4",
    type: "Location Risk",
    severity: "high",
    message: "Login attempt from high-risk jurisdiction",
    timestamp: "23 min ago",
    location: "Unknown VPN",
    accountId: "ACC-3345",
  },
  {
    id: "5",
    type: "Behavioral",
    severity: "low",
    message: "Unusual transaction pattern detected",
    timestamp: "45 min ago",
    accountId: "ACC-6678",
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
