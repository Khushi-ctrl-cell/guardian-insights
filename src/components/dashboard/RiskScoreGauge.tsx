import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RiskScoreGaugeProps {
  score: number;
  label: string;
}

export function RiskScoreGauge({ score, label }: RiskScoreGaugeProps) {
  const percentage = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 75) return "text-destructive";
    if (score >= 50) return "text-warning";
    if (score >= 25) return "text-primary";
    return "text-success";
  };

  const getGlow = (score: number) => {
    if (score >= 75) return "glow-danger";
    if (score >= 50) return "glow-warning";
    if (score >= 25) return "glow-primary";
    return "glow-success";
  };

  const getRiskLevel = (score: number) => {
    if (score >= 75) return "Critical";
    if (score >= 50) return "High";
    if (score >= 25) return "Medium";
    return "Low";
  };

  return (
    <Card variant="glass" className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-6">
        <div className={cn("relative", getGlow(score))}>
          <svg className="w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-secondary"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={cn("transition-all duration-1000", getColor(score))}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-3xl font-bold font-mono", getColor(score))}>
              {score}
            </span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span
            className={cn(
              "text-sm font-semibold px-3 py-1 rounded-full",
              score >= 75 && "bg-destructive/20 text-destructive",
              score >= 50 && score < 75 && "bg-warning/20 text-warning",
              score >= 25 && score < 50 && "bg-primary/20 text-primary",
              score < 25 && "bg-success/20 text-success"
            )}
          >
            {getRiskLevel(score)} Risk
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
