import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AlertFeed } from "@/components/dashboard/AlertFeed";
import { CapitalAtRisk } from "@/components/dashboard/CapitalAtRisk";
import { ExplainableRisk } from "@/components/dashboard/ExplainableRisk";
import { RiskGrowthSimulator } from "@/components/dashboard/RiskGrowthSimulator";
import { PortfolioMetrics } from "@/components/dashboard/PortfolioMetrics";
import { IdentityGraph } from "@/components/dashboard/IdentityGraph";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { BorrowerDNA } from "@/components/dashboard/BorrowerDNA";
import { GeoRiskHeatmap } from "@/components/dashboard/GeoRiskHeatmap";
import { WhatIfSimulator } from "@/components/dashboard/WhatIfSimulator";
import { ModelPerformance } from "@/components/dashboard/ModelPerformance";
import { LiveScenarioMode } from "@/components/dashboard/LiveScenarioMode";
import { FPDEarlyWarning } from "@/components/dashboard/FPDEarlyWarning";
import { DNAPortfolioInsights } from "@/components/dashboard/DNAPortfolioInsights";
import {
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

const Index = () => {
  const [tick, setTick] = useState(0);

  // Auto-refresh metrics every 5 seconds with slight jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fpdRate = (6.0 + Math.sin(tick * 0.3) * 0.4).toFixed(1);
  const capitalAtRisk = (18.0 + Math.cos(tick * 0.2) * 1.5).toFixed(1);
  const accuracy = (94.5 + Math.sin(tick * 0.15) * 0.5).toFixed(1);
  const activeAlerts = 20 + Math.floor(Math.sin(tick * 0.4) * 5);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <Header />
        <main className="p-4 lg:p-6 space-y-6">
          {/* Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="FPD Rate" value={`${fpdRate}%`} change="-1.8% vs last month" changeType="positive" icon={TrendingDown} iconColor="text-success" delay={0} />
            <MetricCard title="Capital at Risk" value={`₹${capitalAtRisk}L`} change={`${Math.max(3, activeAlerts - 15)} high-risk applications`} changeType="negative" icon={IndianRupee} iconColor="text-warning" delay={100} />
            <MetricCard title="Detection Accuracy" value={`${accuracy}%`} change="Low false positives" changeType="positive" icon={TrendingUp} iconColor="text-primary" delay={200} />
            <MetricCard title="Active Alerts" value={`${activeAlerts}`} change={`${Math.max(5, Math.floor(activeAlerts * 0.35))} critical today`} changeType="negative" icon={ShieldAlert} iconColor="text-destructive" delay={300} />
          </div>

          {/* Live Scenario + FPD Early Warning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LiveScenarioMode />
            <FPDEarlyWarning />
          </div>

          {/* Capital at Risk + Explainable Risk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CapitalAtRisk />
            <ExplainableRisk />
          </div>

          {/* Borrower DNA + What-If Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BorrowerDNA />
            <div className="space-y-6">
              <WhatIfSimulator />
              <ModelPerformance />
            </div>
          </div>

          {/* Portfolio Metrics */}
          <PortfolioMetrics />

          {/* DNA Portfolio Insights + Geo Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DNAPortfolioInsights />
            <GeoRiskHeatmap />
          </div>

          {/* Simulator + Alert Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RiskGrowthSimulator />
            </div>
            <div className="lg:col-span-1">
              <AlertFeed />
            </div>
          </div>

          {/* Identity Graph + Transaction Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <IdentityGraph />
            </div>
            <div className="lg:col-span-2">
              <TransactionTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
