import { Shield, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  { name: "API Gateway", status: "operational", uptime: "99.98%", latency: "45ms" },
  { name: "Scoring Engine", status: "operational", uptime: "99.95%", latency: "120ms" },
  { name: "Dashboard", status: "operational", uptime: "99.99%", latency: "32ms" },
  { name: "Database Cluster", status: "operational", uptime: "99.99%", latency: "8ms" },
  { name: "Identity Graph Service", status: "operational", uptime: "99.92%", latency: "180ms" },
  { name: "Webhook Delivery", status: "operational", uptime: "99.97%", latency: "95ms" },
  { name: "ML Training Pipeline", status: "maintenance", uptime: "99.85%", latency: "—" },
];

const incidents = [
  { date: "Mar 10, 2026", title: "Scheduled maintenance — ML pipeline upgrade", status: "resolved", duration: "45 min" },
  { date: "Mar 3, 2026", title: "Elevated API latency in ap-south-1", status: "resolved", duration: "12 min" },
  { date: "Feb 25, 2026", title: "Dashboard intermittent errors", status: "resolved", duration: "8 min" },
];

export default function Status() {
  const navigate = useNavigate();
  const allOperational = services.filter(s => s.status !== "operational").length === 0;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/landing")}>
            <div className="p-2 rounded-xl bg-primary/20"><Shield className="h-5 w-5 text-primary" /></div>
            <span className="font-bold text-lg">Guardian Insights</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/landing")}>← Back</Button>
        </div>
      </nav>
      <main className="pt-24 pb-16 px-6 max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">System Status</h1>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${allOperational ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
            {allOperational ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            <span className="font-medium">{allOperational ? "All Systems Operational" : "Partial Degradation"}</span>
          </div>
        </div>

        <Card variant="glass">
          <CardHeader><CardTitle className="text-base">Services</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {services.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.status === "operational" ? "bg-success" : "bg-warning"}`} />
                  <span className="font-medium text-sm">{s.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-mono">{s.uptime}</span>
                  <span className="font-mono">{s.latency}</span>
                  <Badge variant={s.status === "operational" ? "outline" : "secondary"} className={s.status === "operational" ? "text-success border-success/30" : "text-warning border-warning/30"}>
                    {s.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader><CardTitle className="text-base">Recent Incidents</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {incidents.map((inc, i) => (
              <div key={i} className="p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{inc.title}</span>
                  <Badge variant="outline" className="text-success border-success/30">{inc.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{inc.date}</span>
                  <span>Duration: {inc.duration}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Hosted on AWS (Mumbai Region) • 99.95% SLA guarantee</p>
          <p className="mt-1">Last checked: {new Date().toLocaleString()}</p>
        </div>
      </main>
    </div>
  );
}
