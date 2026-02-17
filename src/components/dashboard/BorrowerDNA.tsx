import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dna, ShieldAlert, Smartphone, IndianRupee, MapPin, Wallet, Info } from "lucide-react";

interface BorrowerGene {
  name: string;
  score: number;
  maxScore: number;
  icon: React.ElementType;
  factors: string[];
}

const genes: BorrowerGene[] = [
  {
    name: "Device Stability",
    score: 16,
    maxScore: 20,
    icon: Smartphone,
    factors: ["Device switching: 3 devices/30d", "SIM change detected", "IP geo variance: High"],
  },
  {
    name: "Income Stability",
    score: 8,
    maxScore: 20,
    icon: IndianRupee,
    factors: ["Salary consistency: 62%", "Income mismatch: 38%", "Sudden spike detected"],
  },
  {
    name: "Application Velocity",
    score: 17,
    maxScore: 20,
    icon: ShieldAlert,
    factors: ["4 loan apps in 30 days", "Midnight activity: 45%", "Re-application pattern"],
  },
  {
    name: "Geo Consistency",
    score: 12,
    maxScore: 20,
    icon: MapPin,
    factors: ["KYC vs IP: 380km gap", "State hopping: 2 states", "Urban→Rural flip"],
  },
  {
    name: "Financial Discipline",
    score: 14,
    maxScore: 20,
    icon: Wallet,
    factors: ["UPI bounce: 3/month", "EMI timing irregular", "BNPL stacking: 2 active"],
  },
];

const totalScore = genes.reduce((sum, g) => sum + g.score, 0);

function getClassification(score: number) {
  if (score <= 25) return { label: "Stable Repayer", color: "bg-success/20 text-success border-success/30", dot: "bg-success" };
  if (score <= 50) return { label: "Cashflow Volatile", color: "bg-warning/20 text-warning border-warning/30", dot: "bg-warning" };
  if (score <= 75) return { label: "Opportunistic Risk Seeker", color: "bg-accent/20 text-accent border-accent/30", dot: "bg-accent" };
  return { label: "High FPD Propensity", color: "bg-destructive/20 text-destructive border-destructive/30", dot: "bg-destructive" };
}

export function BorrowerDNA() {
  const classification = getClassification(totalScore);

  // Radar chart dimensions
  const cx = 120, cy = 120, r = 90;
  const angles = genes.map((_, i) => (Math.PI * 2 * i) / genes.length - Math.PI / 2);
  const points = genes.map((g, i) => {
    const ratio = g.score / g.maxScore;
    return {
      x: cx + r * ratio * Math.cos(angles[i]),
      y: cy + r * ratio * Math.sin(angles[i]),
    };
  });
  const outerPoints = angles.map((a) => ({
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  }));
  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");
  const outerPolygon = outerPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <Dna className="h-5 w-5 text-primary" />
          Borrower Behavior DNA™
          <Badge className={`ml-auto text-xs border ${classification.color}`}>
            <span className={`w-2 h-2 rounded-full mr-1.5 ${classification.dot}`} />
            {classification.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Radar Chart */}
        <div className="flex justify-center">
          <svg width="240" height="240" viewBox="0 0 240 240">
            {/* Grid circles */}
            {[0.25, 0.5, 0.75, 1].map((scale) => (
              <polygon
                key={scale}
                points={angles
                  .map((a) => `${cx + r * scale * Math.cos(a)},${cy + r * scale * Math.sin(a)}`)
                  .join(" ")}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                opacity={0.4}
              />
            ))}
            {/* Axis lines */}
            {outerPoints.map((p, i) => (
              <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity={0.3} />
            ))}
            {/* Data polygon */}
            <polygon points={polygon} fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2" />
            {/* Data points */}
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="hsl(var(--primary))" />
            ))}
            {/* Labels */}
            {genes.map((g, i) => {
              const lx = cx + (r + 28) * Math.cos(angles[i]);
              const ly = cy + (r + 28) * Math.sin(angles[i]);
              return (
                <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[9px]">
                  {g.name.split(" ")[0]}
                </text>
              );
            })}
          </svg>
        </div>

        {/* DNA Score */}
        <div className="text-center p-3 rounded-lg bg-secondary/30">
          <p className="text-xs text-muted-foreground">Total DNA Score</p>
          <p className="text-3xl font-bold font-mono text-primary">{totalScore}/100</p>
        </div>

        {/* Gene breakdown */}
        <div className="space-y-2">
          {genes.map((gene, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <gene.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm font-medium">{gene.name}</span>
                </div>
                <span className="text-sm font-bold font-mono text-primary">{gene.score}/{gene.maxScore}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                  style={{ width: `${(gene.score / gene.maxScore) * 100}%` }}
                />
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {gene.factors.map((f, j) => (
                  <span key={j} className="text-[10px] text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <Info className="h-3 w-3 mt-0.5 shrink-0 text-destructive" />
            <span>
              <strong className="text-foreground">Top Red Flag:</strong> High application velocity combined with
              income instability and device switching indicates opportunistic borrowing behavior.
              Recommend manual review before disbursement.
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
