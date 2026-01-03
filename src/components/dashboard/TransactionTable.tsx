import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  accountId: string;
  type: "inbound" | "outbound";
  amount: number;
  currency: string;
  status: "completed" | "pending" | "flagged" | "blocked";
  riskScore: number;
  timestamp: string;
  merchant?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    accountId: "ACC-7829",
    type: "outbound",
    amount: 12500,
    currency: "USD",
    status: "flagged",
    riskScore: 87,
    timestamp: "14:32:15",
    merchant: "Wire Transfer",
  },
  {
    id: "TXN-002",
    accountId: "ACC-4521",
    type: "outbound",
    amount: 3200,
    currency: "USD",
    status: "pending",
    riskScore: 65,
    timestamp: "14:28:42",
    merchant: "Crypto Exchange",
  },
  {
    id: "TXN-003",
    accountId: "ACC-9012",
    type: "inbound",
    amount: 5000,
    currency: "USD",
    status: "completed",
    riskScore: 23,
    timestamp: "14:25:19",
    merchant: "ACH Deposit",
  },
  {
    id: "TXN-004",
    accountId: "ACC-3345",
    type: "outbound",
    amount: 890,
    currency: "USD",
    status: "completed",
    riskScore: 12,
    timestamp: "14:22:03",
    merchant: "Amazon",
  },
  {
    id: "TXN-005",
    accountId: "ACC-6678",
    type: "outbound",
    amount: 15000,
    currency: "USD",
    status: "blocked",
    riskScore: 95,
    timestamp: "14:18:47",
    merchant: "International Wire",
  },
];

export function TransactionTable() {
  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Badge variant="secondary">Last 24 hours</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-muted-foreground">Transaction</TableHead>
              <TableHead className="text-muted-foreground">Account</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">Risk</TableHead>
              <TableHead className="text-muted-foreground w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((txn, index) => (
              <TableRow
                key={txn.id}
                className="border-border/30 hover:bg-secondary/30 cursor-pointer opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        txn.type === "outbound"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-success/10 text-success"
                      )}
                    >
                      {txn.type === "outbound" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-mono text-sm">{txn.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {txn.merchant} • {txn.timestamp}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{txn.accountId}</span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-semibold font-mono",
                      txn.type === "outbound" ? "text-foreground" : "text-success"
                    )}
                  >
                    {txn.type === "outbound" ? "-" : "+"}${txn.amount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      txn.status === "completed"
                        ? "success"
                        : txn.status === "pending"
                        ? "warning"
                        : txn.status === "flagged"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div
                      className={cn(
                        "h-2 w-16 rounded-full bg-secondary overflow-hidden"
                      )}
                    >
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          txn.riskScore >= 75 && "bg-destructive",
                          txn.riskScore >= 50 && txn.riskScore < 75 && "bg-warning",
                          txn.riskScore >= 25 && txn.riskScore < 50 && "bg-primary",
                          txn.riskScore < 25 && "bg-success"
                        )}
                        style={{ width: `${txn.riskScore}%` }}
                      />
                    </div>
                    <span className="font-mono text-sm w-8">{txn.riskScore}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <button className="p-1 hover:bg-secondary rounded">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
