import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Privacy() {
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
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-4">Last updated: March 12, 2026</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <p className="text-muted-foreground">We collect: (a) Account information (name, email, organization); (b) Loan application data submitted via API; (c) Device and usage analytics; (d) Audit trail data.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Data</h2>
        <p className="text-muted-foreground">Data is used to: generate FPD risk scores, detect loan stacking patterns, build behavioral DNA profiles, and improve model accuracy. We never sell personal data.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Data Isolation</h2>
        <p className="text-muted-foreground">Each organization's data is completely isolated through row-level security policies. No organization can access another's data.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Data Encryption</h2>
        <p className="text-muted-foreground">All data is encrypted at rest using AES-256 and in transit using TLS 1.3. PAN numbers and Aadhaar references are stored in masked format.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Data Retention</h2>
        <p className="text-muted-foreground">Loan application data: 2 years (configurable). Audit logs: 5 years. PII data: per RBI guidelines. Model training data: 1 year (anonymized).</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. RBI Compliance</h2>
        <p className="text-muted-foreground">We comply with Reserve Bank of India digital lending guidelines including data localization, consent management, and grievance redressal requirements.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Your Rights</h2>
        <p className="text-muted-foreground">You may request data export, deletion, or correction by contacting privacy@guardianinsights.com. Requests are processed within 30 days.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Cookies</h2>
        <p className="text-muted-foreground">We use essential cookies for authentication and session management. No third-party tracking cookies are used.</p>
      </main>
    </div>
  );
}
