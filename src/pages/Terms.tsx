import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Terms() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/landing")}>
            <div className="p-2 rounded-xl bg-primary/20"><Shield className="h-5 w-5 text-primary" /></div>
            <span className="font-bold text-lg">Guardian Insights</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/landing")}>← Back</Button>
        </div>
      </nav>
      <main className="pt-24 pb-16 px-6 max-w-4xl mx-auto prose prose-invert">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-4">Last updated: March 12, 2026</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground">By accessing or using Guardian Insights ("Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Service Description</h2>
        <p className="text-muted-foreground">Guardian Insights provides AI-powered pre-disbursement intelligence for digital lenders, including FPD prediction, loan stacking detection, and capital risk optimization.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. User Accounts</h2>
        <p className="text-muted-foreground">You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and all activities under your account.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Acceptable Use</h2>
        <p className="text-muted-foreground">You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to gain unauthorized access; (c) interfere with the Service's operation; (d) reverse engineer the scoring algorithms.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Data Processing</h2>
        <p className="text-muted-foreground">Data is processed in accordance with RBI digital lending guidelines. Organization data is isolated using multi-tenant architecture with row-level security.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Billing & Subscriptions</h2>
        <p className="text-muted-foreground">Paid plans are billed monthly. You may cancel at any time. Refunds are provided pro-rata for unused portions of the billing period.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Limitation of Liability</h2>
        <p className="text-muted-foreground">Guardian Insights provides risk intelligence as a decision-support tool. Final lending decisions remain the responsibility of the lender. We are not liable for lending losses.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Contact</h2>
        <p className="text-muted-foreground">For questions, contact legal@guardianinsights.com</p>
      </main>
    </div>
  );
}
