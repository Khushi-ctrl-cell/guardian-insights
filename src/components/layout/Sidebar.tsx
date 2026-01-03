import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Shield,
  Users,
  AlertTriangle,
  Network,
  Settings,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: AlertTriangle, label: "Alerts", badge: 12 },
  { icon: Users, label: "Accounts" },
  { icon: Network, label: "Identity Graph" },
  { icon: Shield, label: "Rules Engine" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20 glow-primary">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-lg">FraudShield</h1>
            <p className="text-xs text-muted-foreground">Detection Platform</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent text-muted-foreground">
          <Search className="h-4 w-4" />
          <span className="text-sm">Search...</span>
          <kbd className="ml-auto text-xs bg-background/50 px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            {item.badge && (
              <Badge variant="destructive" className="ml-auto text-xs px-1.5">
                {item.badge}
              </Badge>
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
            JD
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Fraud Analyst</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}
