import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, RefreshCw } from "lucide-react";

const metrics = [
  { label: "AUC-ROC", value: "0.84", status: "good" },
  { label: "Precision", value: "82%", status: "good" },
  { label: "Recall", value: "76%", status: "medium" },
  { label: "F1-Score", value: "0.79", status: "good" },
  { label: "Gini Coefficient", value: "0.68", status: "good" },
  { label: "KS Statistic", value: "0.41", status: "medium" },
];

function getStatusColor(status: string) {
  if (status === "good") return "text-success";
  if (status === "medium") return "text-warning";
  return "text-destructive";
}

export function ModelPerformance() {
  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <Brain className="h-5 w-5 text-primary" />
          Model Performance
          <Badge variant="outline" className="ml-auto text-[10px] border-warning/30 text-warning gap-1">
            <RefreshCw className="h-2.5 w-2.5" />
            Retraining Pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/30 text-center">
              <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
              <p className={`text-xl font-bold font-mono ${getStatusColor(m.status)}`}>{m.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 p-2 rounded-lg bg-secondary/20 text-center">
          <p className="text-[11px] text-muted-foreground">
            Model: Logistic Regression v2.4 • Training Data: 128K applications • Last trained: 3 days ago
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
