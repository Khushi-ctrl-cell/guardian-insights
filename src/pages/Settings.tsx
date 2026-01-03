import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Settings as SettingsIcon,
  Bell,
  Link,
  Plus,
  Trash2,
  Key,
  Mail,
  Smartphone,
  Globe,
  IndianRupee,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "viewer";
  lastActive: string;
}

const users: User[] = [
  { id: "1", name: "Aman Verma", email: "aman@fraudshield.com", role: "admin", lastActive: "Now" },
  { id: "2", name: "Priya Singh", email: "priya@fraudshield.com", role: "analyst", lastActive: "2 hours ago" },
  { id: "3", name: "Rahul Gupta", email: "rahul@fraudshield.com", role: "analyst", lastActive: "1 day ago" },
  { id: "4", name: "Sneha Patel", email: "sneha@fraudshield.com", role: "viewer", lastActive: "3 hours ago" },
];

const integrations = [
  { name: "HDFC Bank API", status: "connected", lastSync: "5 mins ago" },
  { name: "Razorpay Gateway", status: "connected", lastSync: "2 mins ago" },
  { name: "PayTM Integration", status: "connected", lastSync: "10 mins ago" },
  { name: "PhonePe API", status: "pending", lastSync: "Never" },
];

const getRoleBadge = (role: string) => {
  const styles: Record<string, string> = {
    admin: "bg-primary/20 text-primary border-primary/30",
    analyst: "bg-info/20 text-info border-info/30",
    viewer: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${styles[role]}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

export default function Settings() {
  const { toast } = useToast();
  
  // Settings state
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [riskThreshold, setRiskThreshold] = useState([70]);
  const [currency, setCurrency] = useState("INR");
  const [region, setRegion] = useState("IN");

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">
          <Tabs defaultValue="security" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="system" className="gap-2">
                <SettingsIcon className="h-4 w-4" />
                System
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="integrations" className="gap-2">
                <Link className="h-4 w-4" />
                Integrations
              </TabsTrigger>
            </TabsList>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Configure authentication and access control settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Session Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Session Timeout (minutes)</Label>
                        <Input type="number" defaultValue="30" />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Login Attempts</Label>
                        <Input type="number" defaultValue="5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Password Policy</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Minimum Password Length</Label>
                        <Input type="number" defaultValue="12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Password Expiry (days)</Label>
                        <Input type="number" defaultValue="90" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => handleSave("Security")}>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Management */}
            <TabsContent value="users">
              <Card variant="glass">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      User Management
                    </CardTitle>
                    <CardDescription>
                      Manage team members and their permissions.
                    </CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add User
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="system">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5 text-primary" />
                    System Settings
                  </CardTitle>
                  <CardDescription>
                    Configure alert thresholds and regional settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Risk Score Alert Threshold</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={riskThreshold}
                          onValueChange={setRiskThreshold}
                          max={100}
                          step={5}
                          className="flex-1"
                        />
                        <span className="font-mono text-lg font-bold w-12">{riskThreshold}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Transactions with risk scores above this threshold will trigger alerts.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" /> Currency
                      </Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        <Globe className="h-3 w-3" /> Region
                      </Label>
                      <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IN">India</SelectItem>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="EU">European Union</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={() => handleSave("System")}>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how you receive alerts and notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Receive fraud alerts via email
                        </p>
                      </div>
                    </div>
                    <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">SMS Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Receive critical alerts via SMS
                        </p>
                      </div>
                    </div>
                    <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">In-App Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Show notifications within the dashboard
                        </p>
                      </div>
                    </div>
                    <Switch checked={inAppAlerts} onCheckedChange={setInAppAlerts} />
                  </div>

                  <Button onClick={() => handleSave("Notification")}>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrations */}
            <TabsContent value="integrations">
              <Card variant="glass">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Link className="h-5 w-5 text-primary" />
                      Integrations
                    </CardTitle>
                    <CardDescription>
                      Connect to banks, payment gateways, and third-party services.
                    </CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Integration
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {integrations.map((integration, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${integration.status === "connected" ? "bg-success" : "bg-warning"}`} />
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Last sync: {integration.lastSync}
                            </p>
                          </div>
                        </div>
                        <Badge variant={integration.status === "connected" ? "low" : "medium"}>
                          {integration.status === "connected" ? "Connected" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
