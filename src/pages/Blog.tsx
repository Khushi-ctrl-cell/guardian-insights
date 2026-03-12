import { Shield, Calendar, ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    title: "How Digital Lenders Can Reduce FPD by 54% Using Behavioral Intelligence",
    excerpt: "First Payment Default costs Indian NBFCs crores annually. Learn how Borrower Behavior DNA™ identifies at-risk applicants before disbursement.",
    date: "Mar 8, 2026",
    author: "Aman Verma",
    category: "Product",
    readTime: "5 min",
  },
  {
    title: "India Digital Lending Market: $350 Billion Opportunity & Rising FPD Challenge",
    excerpt: "The digital lending market is projected to cross $350 billion by 2028. But with growth comes increasing First Payment Default rates that threaten profitability.",
    date: "Mar 1, 2026",
    author: "Priya Singh",
    category: "Industry",
    readTime: "7 min",
  },
  {
    title: "Understanding Loan Stacking: Detection Strategies for Modern Lenders",
    excerpt: "Loan stacking — when applicants take multiple loans simultaneously — is one of the fastest-growing fraud patterns. Here's how to detect it.",
    date: "Feb 22, 2026",
    author: "Rahul Gupta",
    category: "Technical",
    readTime: "6 min",
  },
  {
    title: "RBI Digital Lending Guidelines: What NBFCs Need to Know in 2026",
    excerpt: "A comprehensive guide to the latest Reserve Bank of India regulations affecting digital lending platforms, data privacy, and risk management.",
    date: "Feb 15, 2026",
    author: "Sneha Patel",
    category: "Compliance",
    readTime: "8 min",
  },
  {
    title: "Building Explainable AI for Credit Risk: SHAP Values in Practice",
    excerpt: "Why regulators and auditors demand explainability in lending decisions, and how SHAP-style contribution graphs make AI transparent.",
    date: "Feb 8, 2026",
    author: "Aman Verma",
    category: "Technical",
    readTime: "10 min",
  },
  {
    title: "Case Study: FinQuick Reduced FPD from 6.8% to 3.1% in 90 Days",
    excerpt: "Learn how FinQuick, a mid-size digital lender, deployed Guardian Insights to protect ₹2.4 Cr in capital within the first quarter.",
    date: "Feb 1, 2026",
    author: "Priya Singh",
    category: "Case Study",
    readTime: "4 min",
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Product: "bg-primary/20 text-primary border-primary/30",
    Industry: "bg-success/20 text-success border-success/30",
    Technical: "bg-accent/20 text-accent border-accent/30",
    Compliance: "bg-warning/20 text-warning border-warning/30",
    "Case Study": "bg-destructive/20 text-destructive border-destructive/30",
  };
  return colors[category] || "bg-muted text-muted-foreground border-border";
};

export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/landing")}>
            <div className="p-2 rounded-xl bg-primary/20"><Shield className="h-5 w-5 text-primary" /></div>
            <span className="font-bold text-lg">Guardian Insights</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/landing")}>← Back</Button>
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          </div>
        </div>
      </nav>
      <main className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Insights & Resources</h1>
          <p className="text-muted-foreground text-lg">Expert analysis on FPD prevention, digital lending, and risk intelligence.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <Card key={i} variant="glass" className="hover:border-primary/30 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={getCategoryColor(post.category)}>{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime} read</span>
                </div>
                <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
