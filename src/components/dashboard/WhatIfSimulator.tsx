import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { FlaskConical, TrendingDown } from "lucide-react";

export function WhatIfSimulator() {
  const [creditScoreIncrease, setCreditScoreIncrease] = useState([0]);
  const [incomeVerified, setIncomeVerified] = useState(false);
  const [deviceMismatchRemoved, setDeviceMismatchRemoved] = useState(false);

  const baseFPD = 72; // base FPD probability %
  let adjusted = baseFPD;
  adjusted -= creditScoreIncrease[0] * 0.8;
  if (incomeVerified) adjusted -= 15;
  if (deviceMismatchRemoved) adjusted -= 12;
  adjusted = Math.max(0, Math.min(100, adjusted));

  const riskReduction = baseFPD - adjusted;

  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <FlaskConical className="h-5 w-5 text-accent" />
          What-If Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <p className="text-xs text-muted-foreground">
          Simulate how changes to applicant signals affect FPD probability.
        </p>

        {/* Credit Score slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Credit Score Increase</span>
            <span className="font-mono text-sm font-bold text-primary">+{creditScoreIncrease[0]} pts</span>
          </div>
          <Slider value={creditScoreIncrease} onValueChange={setCreditScoreIncrease} max={50} min={0} step={5} />
        </div>

        {/* Toggles */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
          <span className="text-sm">Income Verified</span>
          <Switch checked={incomeVerified} onCheckedChange={setIncomeVerified} />
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
          <span className="text-sm">Device Mismatch Removed</span>
          <Switch checked={deviceMismatchRemoved} onCheckedChange={setDeviceMismatchRemoved} />
        </div>

        {/* Result */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
            <p className="text-xs text-muted-foreground mb-1">Original FPD</p>
            <p className="text-xl font-bold font-mono text-destructive">{baseFPD}%</p>
          </div>
          <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
            <p className="text-xs text-muted-foreground mb-1">Adjusted FPD</p>
            <p className="text-xl font-bold font-mono text-success">{adjusted.toFixed(1)}%</p>
          </div>
        </div>

        <div className="text-center p-2 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center justify-center gap-1">
            <TrendingDown className="h-3 w-3 text-primary" />
            <span className="text-sm font-bold text-primary font-mono">{riskReduction.toFixed(1)}%</span>
            <span className="text-xs text-muted-foreground">risk reduction</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
