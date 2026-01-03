import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AlertFeed } from "@/components/dashboard/AlertFeed";
import { RiskScoreGauge } from "@/components/dashboard/RiskScoreGauge";
import { IdentityGraph } from "@/components/dashboard/IdentityGraph";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import {
  ShieldAlert,
  Users,
  TrendingUp,
  Activity,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          {/* Metrics Row */}
          {/* Metrics from customer_data.csv and transaction_records.csv */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Fraud Indicators"
              value="89"
              change="+12 flagged today"
              changeType="negative"
              icon={ShieldAlert}
              iconColor="text-destructive"
              delay={0}
            />
            <MetricCard
              title="Customer Profiles"
              value="32.8K"
              change="+847 this week"
              changeType="positive"
              icon={Users}
              iconColor="text-primary"
              delay={100}
            />
            <MetricCard
              title="Detection Accuracy"
              value="99.2%"
              change="Low false positives"
              changeType="positive"
              icon={TrendingUp}
              iconColor="text-success"
              delay={200}
            />
            <MetricCard
              title="Transactions/sec"
              value="1,847"
              change="Peak: 3,241"
              changeType="neutral"
              icon={Activity}
              iconColor="text-warning"
              delay={300}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Alert Feed */}
            <div className="lg:col-span-1">
              <AlertFeed />
            </div>

            {/* Risk Gauges & Identity Graph */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RiskScoreGauge score={73} label="System Risk Score" />
                <RiskScoreGauge score={45} label="Transaction Risk" />
                <RiskScoreGauge score={89} label="Identity Risk" />
              </div>
              <IdentityGraph />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionTable />
            </div>
            <div className="lg:col-span-1">
              <ActivityTimeline />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
