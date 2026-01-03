import { Bell, Filter, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-6">
        <div>
          <h2 className="text-xl font-semibold">Fraud Detection Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Real-time monitoring and threat analysis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <div className="relative">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
            </Button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-bold flex items-center justify-center text-destructive-foreground">
              5
            </span>
          </div>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}
