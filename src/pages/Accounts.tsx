import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Users,
  Eye,
  Flag,
  Ban,
  MessageSquare,
  Smartphone,
  CreditCard,
  Clock,
  AlertTriangle,
  MapPin,
  Store,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Account {
  id: string;
  name: string;
  type: "customer" | "merchant";
  status: "active" | "flagged" | "suspended";
  riskScore: number;
  accountAge: string;
  devices: string[];
  paymentMethods: string[];
  location: string;
  recentTransactions: number;
  failedAttempts: number;
}

const accountsData: Account[] = [
  {
    id: "USR-7823",
    name: "Ravi Kumar",
    type: "customer",
    status: "flagged",
    riskScore: 72,
    accountAge: "2 years",
    devices: ["iPhone 14 Pro", "MacBook Pro"],
    paymentMethods: ["HDFC Debit ****4521", "UPI - ravi@oksbi"],
    location: "Mumbai, IN",
    recentTransactions: 45,
    failedAttempts: 3,
  },
  {
    id: "USR-4521",
    name: "Priya Sharma",
    type: "customer",
    status: "active",
    riskScore: 25,
    accountAge: "3 years",
    devices: ["Samsung Galaxy S23"],
    paymentMethods: ["ICICI Credit ****8923", "UPI - priya@ybl"],
    location: "Delhi, IN",
    recentTransactions: 128,
    failedAttempts: 0,
  },
  {
    id: "MRC-9182",
    name: "TechMart Electronics",
    type: "merchant",
    status: "active",
    riskScore: 15,
    accountAge: "5 years",
    devices: ["POS Terminal x3"],
    paymentMethods: ["Bank Account ****7892"],
    location: "Bangalore, IN",
    recentTransactions: 2340,
    failedAttempts: 12,
  },
  {
    id: "USR-3847",
    name: "Amit Patel",
    type: "customer",
    status: "suspended",
    riskScore: 91,
    accountAge: "6 months",
    devices: ["Unknown Device", "OnePlus 11"],
    paymentMethods: ["SBI Debit ****3421"],
    location: "Chennai, IN",
    recentTransactions: 8,
    failedAttempts: 15,
  },
  {
    id: "MRC-6712",
    name: "QuickPay Services",
    type: "merchant",
    status: "flagged",
    riskScore: 68,
    accountAge: "1 year",
    devices: ["API Integration"],
    paymentMethods: ["Axis Bank ****5612"],
    location: "Hyderabad, IN",
    recentTransactions: 890,
    failedAttempts: 45,
  },
  {
    id: "USR-2938",
    name: "Sneha Reddy",
    type: "customer",
    status: "active",
    riskScore: 12,
    accountAge: "4 years",
    devices: ["Pixel 8", "iPad Pro"],
    paymentMethods: ["Kotak Credit ****1234", "UPI - sneha@paytm"],
    location: "Pune, IN",
    recentTransactions: 210,
    failedAttempts: 1,
  },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    active: "bg-success/20 text-success border-success/30",
    flagged: "bg-warning/20 text-warning border-warning/30",
    suspended: "bg-destructive/20 text-destructive border-destructive/30",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const getRiskColor = (score: number) => {
  if (score >= 70) return "text-critical";
  if (score >= 40) return "text-warning";
  return "text-success";
};

export default function Accounts() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `Account ${action}`,
      description: `Account ${selectedAccount?.id} has been ${action.toLowerCase()}.`,
    });
    setDialogOpen(false);
  };

  const customers = accountsData.filter((a) => a.type === "customer");
  const merchants = accountsData.filter((a) => a.type === "merchant");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="metric">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Accounts</p>
                    <p className="text-3xl font-bold">{accountsData.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card variant="metric">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customers</p>
                    <p className="text-3xl font-bold">{customers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-info" />
                </div>
              </CardContent>
            </Card>
            <Card variant="metric">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Merchants</p>
                    <p className="text-3xl font-bold">{merchants.length}</p>
                  </div>
                  <Store className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card variant="metric" className="border-l-4 border-l-warning">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Flagged</p>
                    <p className="text-3xl font-bold text-warning">
                      {accountsData.filter((a) => a.status === "flagged").length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Accounts</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="merchants">Merchants</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <AccountTable
                accounts={accountsData}
                onView={(account) => {
                  setSelectedAccount(account);
                  setDialogOpen(true);
                }}
              />
            </TabsContent>
            <TabsContent value="customers">
              <AccountTable
                accounts={customers}
                onView={(account) => {
                  setSelectedAccount(account);
                  setDialogOpen(true);
                }}
              />
            </TabsContent>
            <TabsContent value="merchants">
              <AccountTable
                accounts={merchants}
                onView={(account) => {
                  setSelectedAccount(account);
                  setDialogOpen(true);
                }}
              />
            </TabsContent>
            <TabsContent value="flagged">
              <AccountTable
                accounts={accountsData.filter((a) => a.status === "flagged")}
                onView={(account) => {
                  setSelectedAccount(account);
                  setDialogOpen(true);
                }}
              />
            </TabsContent>
          </Tabs>

          {/* Account Details Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedAccount?.type === "merchant" ? (
                    <Store className="h-5 w-5 text-accent" />
                  ) : (
                    <Users className="h-5 w-5 text-primary" />
                  )}
                  {selectedAccount?.name}
                  {selectedAccount && getStatusBadge(selectedAccount.status)}
                </DialogTitle>
                <DialogDescription>
                  Account ID: {selectedAccount?.id}
                </DialogDescription>
              </DialogHeader>
              {selectedAccount && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Account Age
                      </p>
                      <p className="font-medium">{selectedAccount.accountAge}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Risk Score</p>
                      <p className={`font-bold text-lg ${getRiskColor(selectedAccount.riskScore)}`}>
                        {selectedAccount.riskScore}/100
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Location
                      </p>
                      <p className="font-medium">{selectedAccount.location}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Smartphone className="h-3 w-3" /> Linked Devices
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAccount.devices.map((device, i) => (
                        <Badge key={i} variant="outline">
                          {device}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <CreditCard className="h-3 w-3" /> Payment Methods
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAccount.paymentMethods.map((method, i) => (
                        <Badge key={i} variant="secondary">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Recent Transactions</p>
                      <p className="text-xl font-bold">{selectedAccount.recentTransactions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Failed Attempts</p>
                      <p className={`text-xl font-bold ${selectedAccount.failedAttempts > 5 ? "text-critical" : ""}`}>
                        {selectedAccount.failedAttempts}
                      </p>
                    </div>
                  </div>

                  {(selectedAccount.riskScore > 60 || selectedAccount.failedAttempts > 10) && (
                    <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <p className="text-sm font-medium text-destructive flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Risk Indicators Detected
                      </p>
                      <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                        {selectedAccount.riskScore > 60 && <li>High risk score</li>}
                        {selectedAccount.failedAttempts > 10 && <li>Multiple failed login attempts</li>}
                        {selectedAccount.devices.includes("Unknown Device") && <li>Unknown device detected</li>}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              <DialogFooter className="flex gap-2 sm:gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleAction("Flagged")}
                  className="gap-1 border-warning text-warning hover:bg-warning/10"
                >
                  <Flag className="h-4 w-4" />
                  Flag Account
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleAction("Blocked")}
                  className="gap-1"
                >
                  <Ban className="h-4 w-4" />
                  Block Account
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleAction("Note Added")}
                  className="gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  Add Note
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}

function AccountTable({
  accounts,
  onView,
}: {
  accounts: Account[];
  onView: (account: Account) => void;
}) {
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Account List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-mono text-sm">{account.id}</TableCell>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>
                  <Badge variant={account.type === "merchant" ? "outline" : "secondary"}>
                    {account.type === "merchant" ? "Merchant" : "Customer"}
                  </Badge>
                </TableCell>
                <TableCell>{getStatusBadge(account.status)}</TableCell>
                <TableCell>
                  <span className={getRiskColor(account.riskScore)}>
                    {account.riskScore}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{account.location}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => onView(account)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
