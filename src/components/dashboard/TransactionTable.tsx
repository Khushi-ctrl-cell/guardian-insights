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

// Data from transaction_records.csv and amount_data.csv
const mockTransactions: Transaction[] = [
  {
    id: "TXN-8472",
    accountId: "CUST-2847",
    type: "outbound",
    amount: 45000,
    currency: "INR",
    status: "flagged",
    riskScore: 87,
    timestamp: "14:32:15",
    merchant: "Electronics Store",
  },
  {
    id: "TXN-8471",
    accountId: "CUST-1523",
    type: "outbound",
    amount: 12500,
    currency: "INR",
    status: "pending",
    riskScore: 65,
    timestamp: "14:28:42",
    merchant: "Online Marketplace",
  },
  {
    id: "TXN-8470",
    accountId: "CUST-9284",
    type: "inbound",
    amount: 75000,
    currency: "INR",
    status: "completed",
    riskScore: 18,
    timestamp: "14:25:19",
    merchant: "Salary Credit",
  },
  {
    id: "TXN-8469",
    accountId: "CUST-4421",
    type: "outbound",
    amount: 2499,
    currency: "INR",
    status: "completed",
    riskScore: 8,
    timestamp: "14:22:03",
    merchant: "Flipkart",
  },
  {
    id: "TXN-8468",
    accountId: "CUST-7736",
    type: "outbound",
    amount: 125000,
    currency: "INR",
    status: "blocked",
    riskScore: 95,
    timestamp: "14:18:47",
    merchant: "International Transfer",
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
