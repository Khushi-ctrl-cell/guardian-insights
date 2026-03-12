import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, IndianRupee, CheckCircle, Quote, BarChart3 } from "lucide-react";

export default function CaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <Header />
        <main className="p-6 space-y-6">
          <div>
            <Badge variant="outline" className="mb-2 text-primary border-primary/30">Case Study</Badge>
            <h1 className="text-2xl font-bold mb-1">
              FinQuick reduced FPD from 6.8% to 3.1% in 90 days
            </h1>
            <p className="text-muted-foreground">
              How a mid-size digital lender saved ₹4.2 Crore annually using Guardian Insights.
            </p>
          </div>

          {/* Key Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card variant="metric" className="p-4 text-center">
              <TrendingDown className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold font-mono text-success">54%</p>
              <p className="text-xs text-muted-foreground">FPD Reduction</p>
            </Card>
            <Card variant="metric" className="p-4 text-center">
              <IndianRupee className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold font-mono text-primary">₹4.2Cr</p>
              <p className="text-xs text-muted-foreground">Annual Savings</p>
            </Card>
            <Card variant="metric" className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold font-mono text-warning">312%</p>
              <p className="text-xs text-muted-foreground">ROI</p>
            </Card>
            <Card variant="metric" className="p-4 text-center">
              <BarChart3 className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold font-mono text-accent">90 days</p>
              <p className="text-xs text-muted-foreground">Time to Value</p>
            </Card>
          </div>

          {/* Before vs After */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-base">Before vs After Guardian Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-destructive" />
                    Before (Manual Process)
                  </h4>
                  {[
                    "FPD Rate: 6.8%",
                    "Capital lost monthly: ₹58L",
                    "Detection: Post-disbursement only",
                    "Decision time: 4-6 hours",
                    "Loan stacking: Undetected",
                    "False positive rate: 12%",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-success flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-success" />
                    After (Guardian Insights)
                  </h4>
                  {[
                    "FPD Rate: 3.1%",
                    "Capital protected monthly: ₹42L",
                    "Detection: Pre-disbursement AI scoring",
                    "Decision time: 1.2 seconds",
                    "Loan stacking: Real-time detection",
                    "False positive rate: 3.4%",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-base">Implementation Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {[
                  { week: "Week 1-2", title: "Integration & Setup", detail: "API integration, historical data import, model calibration" },
                  { week: "Week 3-4", title: "Advisory Mode", detail: "Running in parallel with existing system, tuning thresholds" },
                  { week: "Week 5-8", title: "Decision Mode", detail: "Automated approve/review/reject with 94.7% accuracy" },
                  { week: "Week 9-12", title: "Full Production", detail: "Complete replacement of manual review for low/medium risk" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      {i < 3 && <div className="w-0.5 flex-1 bg-primary/30" />}
                    </div>
                    <div className="pb-4">
                      <span className="text-xs font-mono text-primary">{item.week}</span>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quote */}
          <Card variant="glass" className="border-primary/30">
            <CardContent className="p-6">
              <Quote className="h-8 w-8 text-primary/30 mb-3" />
              <p className="text-lg italic text-foreground/90 mb-4">
                "Guardian Insights didn't just reduce our FPD rate — it changed how we think about lending risk.
                The Borrower DNA™ feature alone caught patterns our team of 15 analysts missed for months."
              </p>
              <div>
                <p className="font-semibold">Rahul Sharma</p>
                <p className="text-sm text-muted-foreground">CRO, FinQuick Digital Lending</p>
              </div>
            </CardContent>
          </Card>

          {/* Market context */}
          <Card variant="glass">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">India Digital Lending Market</p>
              <p className="text-3xl font-bold text-primary mb-1">$350 Billion</p>
              <p className="text-sm text-muted-foreground">Projected market size by 2030 (Source: BCG-FICCI Report)</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
