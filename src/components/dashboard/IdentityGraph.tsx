import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, User, Smartphone, CreditCard, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  type: "account" | "device" | "card" | "location";
  label: string;
  risk: "high" | "medium" | "low";
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
}

const mockNodes: Node[] = [
  { id: "acc1", type: "account", label: "ACC-7829", risk: "high", x: 50, y: 50 },
  { id: "acc2", type: "account", label: "ACC-4521", risk: "high", x: 80, y: 30 },
  { id: "acc3", type: "account", label: "ACC-9012", risk: "medium", x: 20, y: 35 },
  { id: "dev1", type: "device", label: "iPhone 15", risk: "high", x: 50, y: 20 },
  { id: "dev2", type: "device", label: "Android", risk: "low", x: 15, y: 65 },
  { id: "card1", type: "card", label: "****4829", risk: "medium", x: 75, y: 70 },
  { id: "loc1", type: "location", label: "Lagos", risk: "high", x: 35, y: 75 },
];

const mockConnections: Connection[] = [
  { from: "acc1", to: "dev1", strength: 1 },
  { from: "acc2", to: "dev1", strength: 1 },
  { from: "acc3", to: "dev2", strength: 0.7 },
  { from: "acc1", to: "card1", strength: 0.8 },
  { from: "acc2", to: "card1", strength: 0.6 },
  { from: "acc1", to: "loc1", strength: 1 },
  { from: "acc2", to: "loc1", strength: 1 },
];

const getNodeIcon = (type: Node["type"]) => {
  switch (type) {
    case "account":
      return User;
    case "device":
      return Smartphone;
    case "card":
      return CreditCard;
    case "location":
      return MapPin;
  }
};

export function IdentityGraph() {
  return (
    <Card variant="glass" className="h-full">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            Identity Graph
          </CardTitle>
          <Badge variant="warning">3 Linked Accounts</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative h-[300px] bg-secondary/20 rounded-lg overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {mockConnections.map((conn, i) => {
              const fromNode = mockNodes.find((n) => n.id === conn.from);
              const toNode = mockNodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <line
                  key={i}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="hsl(var(--primary))"
                  strokeWidth={conn.strength * 2}
                  strokeOpacity={0.4}
                  className="animate-pulse-slow"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {mockNodes.map((node, index) => {
            const Icon = getNodeIcon(node.type);
            return (
              <div
                key={node.id}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 opacity-0 animate-scale-in",
                  "flex flex-col items-center gap-1"
                )}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={cn(
                    "p-2 rounded-full border-2 transition-all hover:scale-110 cursor-pointer",
                    node.risk === "high" &&
                      "bg-destructive/20 border-destructive text-destructive",
                    node.risk === "medium" &&
                      "bg-warning/20 border-warning text-warning",
                    node.risk === "low" &&
                      "bg-success/20 border-success text-success"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground bg-background/80 px-1 rounded">
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/50 border border-destructive" />
            <span className="text-xs text-muted-foreground">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning/50 border border-warning" />
            <span className="text-xs text-muted-foreground">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success/50 border border-success" />
            <span className="text-xs text-muted-foreground">Low Risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
