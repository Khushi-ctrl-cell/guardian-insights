import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Network,
  Users,
  Smartphone,
  CreditCard,
  Store,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Filter,
  Eye,
} from "lucide-react";

interface GraphNode {
  id: string;
  type: "user" | "device" | "card" | "merchant";
  label: string;
  riskLevel: "low" | "medium" | "high";
  connections: number;
}

interface GraphCluster {
  id: string;
  name: string;
  riskLevel: "low" | "medium" | "high";
  nodeCount: number;
  sharedSignals: string[];
  description: string;
}

const graphNodes: GraphNode[] = [
  { id: "USR-7823", type: "user", label: "Ravi Kumar", riskLevel: "high", connections: 5 },
  { id: "USR-4521", type: "user", label: "Priya Sharma", riskLevel: "low", connections: 2 },
  { id: "USR-3847", type: "user", label: "Amit Patel", riskLevel: "high", connections: 4 },
  { id: "DEV-001", type: "device", label: "iPhone 14 Pro", riskLevel: "medium", connections: 3 },
  { id: "DEV-002", type: "device", label: "Unknown Device", riskLevel: "high", connections: 5 },
  { id: "DEV-003", type: "device", label: "Chrome/Windows", riskLevel: "low", connections: 1 },
  { id: "CRD-001", type: "card", label: "HDFC ****4521", riskLevel: "medium", connections: 2 },
  { id: "CRD-002", type: "card", label: "SBI ****3421", riskLevel: "high", connections: 4 },
  { id: "MRC-001", type: "merchant", label: "TechMart", riskLevel: "low", connections: 8 },
  { id: "MRC-002", type: "merchant", label: "QuickPay", riskLevel: "high", connections: 6 },
];

const fraudClusters: GraphCluster[] = [
  {
    id: "CLT-001",
    name: "Synthetic Identity Ring",
    riskLevel: "high",
    nodeCount: 12,
    sharedSignals: ["Same Device ID", "Similar IP Range", "Linked Cards"],
    description: "Multiple accounts created from same device with synthetic identity patterns.",
  },
  {
    id: "CLT-002",
    name: "Device Sharing Network",
    riskLevel: "medium",
    nodeCount: 8,
    sharedSignals: ["Shared Device", "Common Location"],
    description: "Single device accessed by multiple accounts within short time windows.",
  },
  {
    id: "CLT-003",
    name: "Merchant Collusion Cluster",
    riskLevel: "high",
    nodeCount: 15,
    sharedSignals: ["Same Beneficiary", "Circular Transactions", "High Velocity"],
    description: "Merchant accounts with suspicious transaction patterns indicating potential collusion.",
  },
];

const getNodeIcon = (type: string) => {
  const icons: Record<string, React.ReactNode> = {
    user: <Users className="h-4 w-4" />,
    device: <Smartphone className="h-4 w-4" />,
    card: <CreditCard className="h-4 w-4" />,
    merchant: <Store className="h-4 w-4" />,
  };
  return icons[type];
};

const getRiskColor = (level: string) => {
  const colors: Record<string, string> = {
    low: "bg-success/20 border-success text-success",
    medium: "bg-warning/20 border-warning text-warning",
    high: "bg-critical/20 border-critical text-critical",
  };
  return colors[level];
};

export default function IdentityGraphPage() {
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [entityFilter, setEntityFilter] = useState<string>("all");
  const [zoom, setZoom] = useState([50]);

  const filteredNodes = graphNodes.filter((node) => {
    if (riskFilter !== "all" && node.riskLevel !== riskFilter) return false;
    if (entityFilter !== "all" && node.type !== entityFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          {/* Filters */}
          <Card variant="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={entityFilter} onValueChange={setEntityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Entity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Entities</SelectItem>
                    <SelectItem value="user">Users</SelectItem>
                    <SelectItem value="device">Devices</SelectItem>
                    <SelectItem value="card">Cards</SelectItem>
                    <SelectItem value="merchant">Merchants</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 ml-auto">
                  <ZoomOut className="h-4 w-4 text-muted-foreground" />
                  <Slider value={zoom} onValueChange={setZoom} max={100} step={1} className="w-32" />
                  <ZoomIn className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Graph Visualization */}
            <div className="lg:col-span-2">
              <Card variant="glass" className="h-[600px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    Identity Graph Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative h-[520px] overflow-hidden">
                  {/* Simulated Graph View */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `scale(${0.5 + zoom[0] / 100})` }}
                  >
                    <div className="relative w-full h-full">
                      {/* Center node */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-16 h-16 rounded-full bg-primary/30 border-2 border-primary flex items-center justify-center animate-pulse">
                          <Network className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      
                      {/* Orbiting nodes */}
                      {filteredNodes.map((node, index) => {
                        const angle = (index * 360) / filteredNodes.length;
                        const radius = 150 + (index % 2) * 60;
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;
                        
                        return (
                          <div
                            key={node.id}
                            className="absolute top-1/2 left-1/2 transition-all duration-500"
                            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                          >
                            {/* Connection line */}
                            <svg
                              className="absolute pointer-events-none"
                              style={{
                                width: `${Math.abs(x) + 20}px`,
                                height: `${Math.abs(y) + 20}px`,
                                left: x > 0 ? "-20px" : `${x - 20}px`,
                                top: y > 0 ? "-20px" : `${y - 20}px`,
                              }}
                            >
                              <line
                                x1={x > 0 ? 20 : Math.abs(x)}
                                y1={y > 0 ? 20 : Math.abs(y)}
                                x2={x > 0 ? Math.abs(x) : 20}
                                y2={y > 0 ? Math.abs(y) : 20}
                                stroke="hsl(var(--muted-foreground))"
                                strokeWidth="1"
                                strokeOpacity="0.3"
                              />
                            </svg>
                            
                            {/* Node */}
                            <div
                              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ${getRiskColor(node.riskLevel)}`}
                              title={`${node.label} (${node.connections} connections)`}
                            >
                              {getNodeIcon(node.type)}
                            </div>
                            <p className="text-xs text-center mt-1 max-w-[60px] truncate text-muted-foreground">
                              {node.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border">
                    <p className="text-xs font-medium mb-2">Legend</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-primary" /> User
                      </div>
                      <div className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3 text-info" /> Device
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3 text-accent" /> Card
                      </div>
                      <div className="flex items-center gap-1">
                        <Store className="h-3 w-3 text-warning" /> Merchant
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights Panel */}
            <div className="space-y-6">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Fraud Clusters Detected
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fraudClusters.map((cluster) => (
                    <div
                      key={cluster.id}
                      className={`p-3 rounded-lg border ${getRiskColor(cluster.riskLevel)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{cluster.name}</span>
                        <Badge variant={cluster.riskLevel === "high" ? "critical" : cluster.riskLevel === "medium" ? "medium" : "low"}>
                          {cluster.nodeCount} nodes
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{cluster.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {cluster.sharedSignals.map((signal, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-background/50">
                            {signal}
                          </span>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-2 gap-1">
                        <Eye className="h-3 w-3" />
                        Investigate
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card variant="metric">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Graph Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Nodes</span>
                      <span className="font-medium">{graphNodes.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Clusters</span>
                      <span className="font-medium">{fraudClusters.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">High Risk Entities</span>
                      <span className="font-medium text-critical">
                        {graphNodes.filter((n) => n.riskLevel === "high").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shared Devices</span>
                      <span className="font-medium text-warning">4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
