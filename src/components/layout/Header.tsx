import { useState } from "react";
import { Bell, Filter, RefreshCw, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "critical" | "high" | "medium" | "info";
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Critical Alert",
    message: "Synthetic identity pattern detected in USR-7823",
    time: "2 mins ago",
    read: false,
    type: "critical",
  },
  {
    id: "2",
    title: "High Risk Transaction",
    message: "Transaction of ₹1,25,000 flagged for review",
    time: "5 mins ago",
    read: false,
    type: "high",
  },
  {
    id: "3",
    title: "New Device Login",
    message: "Aman Verma logged in from a new device",
    time: "15 mins ago",
    read: false,
    type: "medium",
  },
  {
    id: "4",
    title: "Rule Triggered",
    message: "Velocity check rule triggered 5 times",
    time: "1 hour ago",
    read: true,
    type: "info",
  },
  {
    id: "5",
    title: "Account Flagged",
    message: "QuickPay Services marked for review",
    time: "2 hours ago",
    read: true,
    type: "high",
  },
];

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    critical: "bg-critical",
    high: "bg-high",
    medium: "bg-medium",
    info: "bg-info",
  };
  return colors[type] || "bg-muted";
};

export function Header() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const { toast } = useToast();

  // Filter state
  const [filters, setFilters] = useState({
    critical: true,
    high: true,
    medium: true,
    low: true,
    today: true,
    thisWeek: false,
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "All dashboard data has been updated.",
      });
    }, 1000);
  };

  const handleApplyFilters = () => {
    setFilterOpen(false);
    toast({
      title: "Filters Applied",
      description: "Dashboard data filtered successfully.",
    });
  };

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
    toast({
      title: "Notifications",
      description: "All notifications marked as read.",
    });
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

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
          {/* Filters Popover */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filter Options</h4>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFilterOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                  <div className="space-y-2">
                    {["critical", "high", "medium", "low"].map((level) => (
                      <div key={level} className="flex items-center gap-2">
                        <Checkbox
                          id={level}
                          checked={filters[level as keyof typeof filters] as boolean}
                          onCheckedChange={(checked) =>
                            setFilters({ ...filters, [level]: checked })
                          }
                        />
                        <Label htmlFor={level} className="text-sm capitalize">
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Time Range</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="today"
                        checked={filters.today}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, today: !!checked, thisWeek: false })
                        }
                      />
                      <Label htmlFor="today" className="text-sm">Today</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="thisWeek"
                        checked={filters.thisWeek}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, thisWeek: !!checked, today: false })
                        }
                      />
                      <Label htmlFor="thisWeek" className="text-sm">This Week</Label>
                    </div>
                  </div>
                </div>
                <Button className="w-full gap-2" onClick={handleApplyFilters}>
                  <Check className="h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>

          {/* Notifications Popover */}
          <Popover open={notifOpen} onOpenChange={setNotifOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                </Button>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-bold flex items-center justify-center text-destructive-foreground">
                    {unreadCount}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <h4 className="font-medium">Notifications</h4>
                <Button variant="ghost" size="sm" className="text-xs" onClick={markAllRead}>
                  Mark all read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifs.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 border-b border-border/50 hover:bg-muted/50 transition-colors ${
                      !notif.read ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${getTypeColor(notif.type)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{notif.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-border">
                <Button variant="ghost" className="w-full text-sm" onClick={() => setNotifOpen(false)}>
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}
