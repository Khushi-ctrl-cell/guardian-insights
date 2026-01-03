import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  LogIn,
  CreditCard,
  ShieldAlert,
  UserCheck,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "login" | "transaction" | "alert" | "verification" | "device";
  description: string;
  timestamp: string;
  status: "success" | "warning" | "danger" | "neutral";
  metadata?: string;
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "alert",
    description: "Synthetic identity pattern detected",
    timestamp: "14:32:15",
    status: "danger",
    metadata: "ACC-7829",
  },
  {
    id: "2",
    type: "transaction",
    description: "High-value transfer initiated",
    timestamp: "14:30:42",
    status: "warning",
    metadata: "$12,500",
  },
  {
    id: "3",
    type: "login",
    description: "New device login attempt",
    timestamp: "14:28:19",
    status: "warning",
    metadata: "Lagos, NG",
  },
  {
    id: "4",
    type: "verification",
    description: "MFA challenge completed",
    timestamp: "14:25:03",
    status: "success",
  },
  {
    id: "5",
    type: "device",
    description: "Device fingerprint registered",
    timestamp: "14:22:47",
    status: "neutral",
    metadata: "iPhone 15 Pro",
  },
  {
    id: "6",
    type: "transaction",
    description: "Payment processed successfully",
    timestamp: "14:18:33",
    status: "success",
    metadata: "$250.00",
  },
];

const getEventIcon = (type: TimelineEvent["type"]): LucideIcon => {
  switch (type) {
    case "login":
      return LogIn;
    case "transaction":
      return CreditCard;
    case "alert":
      return ShieldAlert;
    case "verification":
      return UserCheck;
    case "device":
      return Smartphone;
  }
};

export function ActivityTimeline() {
  return (
    <Card variant="glass" className="h-full">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[400px] overflow-y-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          {mockEvents.map((event, index) => {
            const Icon = getEventIcon(event.type);
            return (
              <div
                key={event.id}
                className="relative flex items-start gap-4 p-4 hover:bg-secondary/20 transition-colors opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={cn(
                    "relative z-10 p-2 rounded-full border",
                    event.status === "success" &&
                      "bg-success/20 border-success text-success",
                    event.status === "warning" &&
                      "bg-warning/20 border-warning text-warning",
                    event.status === "danger" &&
                      "bg-destructive/20 border-destructive text-destructive",
                    event.status === "neutral" &&
                      "bg-secondary border-border text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{event.description}</p>
                    {event.metadata && (
                      <Badge variant="secondary" className="text-xs font-mono">
                        {event.metadata}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    {event.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
