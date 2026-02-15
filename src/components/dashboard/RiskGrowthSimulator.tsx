import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, TrendingDown, IndianRupee, ShieldCheck } from "lucide-react";

export function RiskGrowthSimulator() {
  const [reductionPercent, setReductionPercent] = useState([15]);

  // Base metrics
  const baseApprovalRate = 78; // %
  const baseFPD = 8; // %
  const monthlyApplications = 100000;
  const avgLoanAmount = 45000;
  const monthlyDisbursement = monthlyApplications * (baseApprovalRate / 100) * avgLoanAmount;

  const newApprovalRate = baseApprovalRate - reductionPercent[0];
  const newFPD = baseFPD * (1 - reductionPercent[0] / 100 * 2.5); // aggressive FPD reduction
  const capitalProtected = monthlyDisbursement * (baseFPD / 100) * (reductionPercent[0] / 100) * 2.5;
  const revenueImpact = monthlyDisbursement * (reductionPercent[0] / 100) * 0.03; // 3% margin impact

  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <SlidersHorizontal className="h-5 w-5 text-accent" />
          Risk vs Growth Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Reduce Approval Rate by</span>
            <span className="text-lg font-bold font-mono text-primary">{reductionPercent[0]}%</span>
          </div>
          <Slider
            value={reductionPercent}
            onValueChange={setReductionPercent}
            max={30}
            min={0}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0% (No change)</span>
            <span>30% (Aggressive)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-1 mb-1">
              <TrendingDown className="h-3 w-3 text-destructive" />
              <span className="text-xs text-muted-foreground">New FPD Rate</span>
            </div>
            <p className="text-xl font-bold font-mono text-destructive">
              {Math.max(0, newFPD).toFixed(1)}%
            </p>
            <p className="text-[10px] text-muted-foreground">was {baseFPD}%</p>
          </div>
          <div className="p-3 rounded-lg bg-success/10 border border-success/20">
            <div className="flex items-center gap-1 mb-1">
              <ShieldCheck className="h-3 w-3 text-success" />
              <span className="text-xs text-muted-foreground">Capital Protected</span>
            </div>
            <p className="text-xl font-bold font-mono text-success">
              ₹{(capitalProtected / 10000000).toFixed(1)}Cr
            </p>
            <p className="text-[10px] text-muted-foreground">/month</p>
          </div>
          <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-center gap-1 mb-1">
              <IndianRupee className="h-3 w-3 text-warning" />
              <span className="text-xs text-muted-foreground">Revenue Impact</span>
            </div>
            <p className="text-xl font-bold font-mono text-warning">
              -₹{(revenueImpact / 100000).toFixed(1)}L
            </p>
            <p className="text-[10px] text-muted-foreground">/month (est.)</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs text-muted-foreground">Net Benefit</span>
            </div>
            <p className="text-xl font-bold font-mono text-primary">
              ₹{((capitalProtected - revenueImpact) / 10000000).toFixed(1)}Cr
            </p>
            <p className="text-[10px] text-muted-foreground">/month saved</p>
          </div>
        </div>

        <div className="text-center p-2 rounded-lg bg-secondary/30">
          <p className="text-xs text-muted-foreground">
            Approval Rate: <strong className="text-foreground">{baseApprovalRate}% → {newApprovalRate}%</strong>
            {" | "}
            Monthly Applications: <strong className="text-foreground">1L</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
