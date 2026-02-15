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
import {
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="FPD Rate"
              value="6.2%"
              change="-1.8% vs last month"
              changeType="positive"
              icon={TrendingDown}
              iconColor="text-success"
              delay={0}
            />
            <MetricCard
              title="Capital at Risk"
              value="₹18.4L"
              change="5 high-risk applications"
              changeType="negative"
              icon={IndianRupee}
              iconColor="text-warning"
              delay={100}
            />
            <MetricCard
              title="Detection Accuracy"
              value="94.7%"
              change="Low false positives"
              changeType="positive"
              icon={TrendingUp}
              iconColor="text-primary"
              delay={200}
            />
            <MetricCard
              title="Active Alerts"
              value="23"
              change="8 critical today"
              changeType="negative"
              icon={ShieldAlert}
              iconColor="text-destructive"
              delay={300}
            />
          </div>

          {/* Capital at Risk + Explainable Risk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CapitalAtRisk />
            <ExplainableRisk />
          </div>

          {/* Portfolio Metrics */}
          <PortfolioMetrics />

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
