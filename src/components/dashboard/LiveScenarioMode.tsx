import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, AlertTriangle, Dna, ShieldAlert, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const scenarios = [
  {
    name: "Vikram Mehta — Mumbai",
    dnaScore: 82,
    cps: 91,
    capitalAtRisk: 320000,
    fpdProb: 87,
    classification: "High FPD Propensity",
    flags: ["4 loans in 30 days", "Income mismatch 3x", "New device + SIM change"],
  },
  {
    name: "Anjali Gupta — Bangalore",
    dnaScore: 56,
    cps: 64,
    capitalAtRisk: 180000,
    fpdProb: 54,
    classification: "Opportunistic Risk Seeker",
    flags: ["Address mismatch 400km", "Midnight application", "BNPL stacking"],
  },
  {
    name: "Rajesh Nair — Delhi",
    dnaScore: 91,
    cps: 96,
    capitalAtRisk: 450000,
    fpdProb: 94,
    classification: "High FPD Propensity",
    flags: ["PAN reuse detected", "GPS spoofing", "5 rejections in 7 days", "Emulator flag"],
  },
];

export function LiveScenarioMode() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<number | null>(null);
  const { toast } = useToast();

  const runScenario = useCallback(() => {
    setIsRunning(true);
    let idx = 0;

    const interval = setInterval(() => {
      if (idx >= scenarios.length) {
        clearInterval(interval);
        setIsRunning(false);
        setCurrentScenario(null);
        return;
      }
      setCurrentScenario(idx);
      const s = scenarios[idx];
      toast({
        title: `⚠️ High-Risk Alert: ${s.name}`,
        description: `DNA Score: ${s.dnaScore}/100 • CPS™: ${s.cps} • Capital at Risk: ₹${s.capitalAtRisk.toLocaleString()}`,
        variant: "destructive",
      });
      idx++;
    }, 2500);

    return () => clearInterval(interval);
  }, [toast]);

  const scenario = currentScenario !== null ? scenarios[currentScenario] : null;

  return (
    <Card variant="glass" className="border-primary/30">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <Play className="h-5 w-5 text-primary" />
          Live Scenario Mode
          {isRunning && (
            <Badge className="ml-auto bg-destructive/20 text-destructive border-destructive/30 animate-pulse">
              SIMULATING
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {!isRunning && !scenario && (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-4">
              Click to simulate a high-risk borrower flowing through the system in real-time.
            </p>
            <Button onClick={runScenario} className="gap-2">
              <Play className="h-4 w-4" />
              Simulate High-Risk Borrower
            </Button>
          </div>
        )}

        {scenario && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{scenario.name}</span>
              <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                {scenario.classification}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                <Dna className="h-3 w-3 mx-auto text-destructive mb-1" />
                <p className="text-[10px] text-muted-foreground">DNA Score</p>
                <p className="text-lg font-bold font-mono text-destructive">{scenario.dnaScore}</p>
              </div>
              <div className="p-2 rounded-lg bg-warning/10 border border-warning/20 text-center">
                <ShieldAlert className="h-3 w-3 mx-auto text-warning mb-1" />
                <p className="text-[10px] text-muted-foreground">CPS™</p>
                <p className="text-lg font-bold font-mono text-warning">{scenario.cps}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <IndianRupee className="h-3 w-3 mx-auto text-primary mb-1" />
                <p className="text-[10px] text-muted-foreground">At Risk</p>
                <p className="text-lg font-bold font-mono text-primary">₹{(scenario.capitalAtRisk / 100000).toFixed(1)}L</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Red Flags</p>
              {scenario.flags.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-destructive">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
