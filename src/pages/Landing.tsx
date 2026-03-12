import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  TrendingDown,
  Brain,
  Network,
  Layers,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  IndianRupee,
  BarChart3,
  Lock,
  Zap,
  Users,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "FPD Prediction Engine",
    description: "Binary AI model predicts First Payment Default probability before disbursement with 94.7% accuracy.",
  },
  {
    icon: Layers,
    title: "Loan Stacking Detection",
    description: "Detects application velocity, same-device multi-accounts, and PAN reuse within configurable time windows.",
  },
  {
    icon: Network,
    title: "Synthetic Identity Detection",
    description: "Name similarity clustering, phone reuse anomaly detection, and address linking with graph visualization.",
  },
  {
    icon: BarChart3,
    title: "Capital at Risk Intelligence",
    description: "Real-time capital exposure tracking per applicant with monthly FPD avoidance metrics.",
  },
  {
    icon: Lock,
    title: "Decision Engine",
    description: "Auto-approve, manual review, or reject with configurable Advisory and Decision modes.",
  },
  {
    icon: Zap,
    title: "Real-Time Rescoring API",
    description: "POST /rescore-applicant endpoint for live risk recalculation as new signals arrive.",
  },
];

const comparisonData = [
  { feature: "Pre-disbursement FPD prediction", guardian: true, generic: false },
  { feature: "Capital at Risk quantification", guardian: true, generic: false },
  { feature: "Loan stacking detection", guardian: true, generic: false },
  { feature: "Synthetic identity graphs", guardian: true, generic: true },
  { feature: "Explainable risk factors", guardian: true, generic: false },
  { feature: "India-specific signals (PAN, UPI, Aadhaar)", guardian: true, generic: false },
  { feature: "Multi-tenant SaaS architecture", guardian: true, generic: true },
  { feature: "Decision engine (Advisory + Auto)", guardian: true, generic: false },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "₹40,000",
    period: "/month",
    description: "For early-stage lenders",
    limit: "Up to 40K applications/month",
    features: [
      "FPD prediction engine",
      "Basic loan stacking detection",
      "Email alerts",
      "5 team members",
      "Standard API access",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    price: "₹1,00,000",
    period: "/month",
    description: "For scaling lending platforms",
    limit: "Up to 2L applications/month",
    features: [
      "Everything in Starter",
      "Synthetic identity detection",
      "Capital at Risk dashboard",
      "Decision engine (Advisory + Auto)",
      "Graph visualization",
      "Unlimited team members",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale lenders & NBFCs",
    limit: "Unlimited applications",
    features: [
      "Everything in Growth",
      "Custom model training",
      "Dedicated instance",
      "SLA guarantee",
      "On-premise deployment option",
      "Custom integrations",
      "24/7 support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

function ROICalculator() {
  const [monthlyApps, setMonthlyApps] = useState([100000]);
  const [avgLoanAmt, setAvgLoanAmt] = useState([45000]);
  const [currentFPD, setCurrentFPD] = useState([8]);

  const fpdReduction = 0.54; // 54% reduction
  const monthlySaved = monthlyApps[0] * (currentFPD[0] / 100) * fpdReduction * avgLoanAmt[0] * 0.01;
  const annualSaved = monthlySaved * 12;
  const roi = ((annualSaved - 1200000) / 1200000) * 100; // assuming Growth plan cost

  return (
    <section className="py-20 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">ROI Calculator</h2>
          <p className="text-muted-foreground">See how much capital you can protect with Guardian Insights.</p>
        </div>
        <Card variant="glass" className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Applications</span>
                <span className="font-mono font-bold text-primary">{(monthlyApps[0] / 1000).toFixed(0)}K</span>
              </div>
              <Slider value={monthlyApps} onValueChange={setMonthlyApps} min={10000} max={500000} step={10000} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Avg Loan Amount</span>
                <span className="font-mono font-bold text-primary">₹{avgLoanAmt[0].toLocaleString()}</span>
              </div>
              <Slider value={avgLoanAmt} onValueChange={setAvgLoanAmt} min={10000} max={200000} step={5000} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Current FPD Rate</span>
                <span className="font-mono font-bold text-primary">{currentFPD[0]}%</span>
              </div>
              <Slider value={currentFPD} onValueChange={setCurrentFPD} min={2} max={15} step={0.5} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center">
              <p className="text-xs text-muted-foreground mb-1">Annual Capital Protected</p>
              <p className="text-2xl font-bold font-mono text-success">₹{(annualSaved / 10000000).toFixed(1)}Cr</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
              <p className="text-xs text-muted-foreground mb-1">ROI</p>
              <p className="text-2xl font-bold font-mono text-primary">{Math.max(0, roi).toFixed(0)}%</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 text-center">
              <p className="text-xs text-muted-foreground mb-1">New FPD Rate</p>
              <p className="text-2xl font-bold font-mono text-warning">{(currentFPD[0] * (1 - fpdReduction)).toFixed(1)}%</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 glow-primary">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg">Guardian Insights</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#comparison" className="hover:text-foreground transition-colors">Why Us</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#roadmap" className="hover:text-foreground transition-colors">Roadmap</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/auth")}>Sign In</Button>
            <Button onClick={() => navigate("/auth")}>
              Start Free Trial
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/30 text-primary">
            AI Pre-Disbursement Intelligence for Digital Lending
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Prevent First Payment Defaults{" "}
            <span className="text-gradient">Before Disbursement</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Guardian Insights helps digital lending platforms predict FPD probability, detect loan stacking, 
            and identify synthetic identities — protecting capital before money leaves the system.
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button size="lg" onClick={() => navigate("/auth")} className="gap-2 text-base px-8">
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/")} className="gap-2 text-base px-8">
              View Live Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-card/60 border border-border/50">
              <p className="text-3xl font-bold text-primary">94.7%</p>
              <p className="text-sm text-muted-foreground">FPD Detection Accuracy</p>
            </div>
            <div className="p-4 rounded-xl bg-card/60 border border-border/50">
              <p className="text-3xl font-bold text-success">₹5Cr+</p>
              <p className="text-sm text-muted-foreground">Capital Protected Monthly</p>
            </div>
            <div className="p-4 rounded-xl bg-card/60 border border-border/50">
              <p className="text-3xl font-bold text-warning">&lt;200ms</p>
              <p className="text-sm text-muted-foreground">API Response Time</p>
            </div>
            <div className="p-4 rounded-xl bg-card/60 border border-border/50">
              <p className="text-3xl font-bold text-accent">15%</p>
              <p className="text-sm text-muted-foreground">FPD Reduction Avg</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">The ₹3–5 Crore Problem</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            If a lender processes 1 lakh loans/month with 8% FPD, reducing it by just 15% 
            saves <span className="text-primary font-semibold">₹3–5 crore annually</span>. 
            Most lenders discover defaults only after disbursement — when the money is already gone.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="glass" className="p-6 text-left">
              <TrendingDown className="h-8 w-8 text-destructive mb-3" />
              <h3 className="font-semibold mb-2">Post-Disbursement Detection</h3>
              <p className="text-sm text-muted-foreground">
                Traditional systems detect fraud after money is disbursed. By then, recovery rates are below 12%.
              </p>
            </Card>
            <Card variant="glass" className="p-6 text-left">
              <Users className="h-8 w-8 text-warning mb-3" />
              <h3 className="font-semibold mb-2">Synthetic Identity Fraud</h3>
              <p className="text-sm text-muted-foreground">
                Fraudsters create synthetic identities mixing real + fake data. Generic tools miss these patterns.
              </p>
            </Card>
            <Card variant="glass" className="p-6 text-left">
              <Layers className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Loan Stacking</h3>
              <p className="text-sm text-muted-foreground">
                Applicants take multiple loans simultaneously across platforms. Without cross-signal analysis, it's invisible.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pre-Disbursement Intelligence Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Purpose-built for digital lending in India. Not a generic fraud dashboard.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} variant="glass" className="p-6 hover:border-primary/30 transition-all">
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="py-20 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Not a Generic Fraud Tool?</h2>
            <p className="text-muted-foreground">Guardian Insights vs traditional fraud detection platforms</p>
          </div>
          <Card variant="glass" className="overflow-hidden">
            <div className="grid grid-cols-3 gap-0">
              <div className="p-4 font-semibold border-b border-border/50">Feature</div>
              <div className="p-4 font-semibold text-center border-b border-border/50 bg-primary/10 text-primary">Guardian Insights</div>
              <div className="p-4 font-semibold text-center border-b border-border/50 text-muted-foreground">Generic Tools</div>
              {comparisonData.map((row, i) => (
                <>
                  <div key={`f-${i}`} className="p-4 text-sm border-b border-border/20">{row.feature}</div>
                  <div key={`g-${i}`} className="p-4 text-center border-b border-border/20 bg-primary/5">
                    <CheckCircle className="h-5 w-5 text-success mx-auto" />
                  </div>
                  <div key={`x-${i}`} className="p-4 text-center border-b border-border/20">
                    {row.generic ? (
                      <CheckCircle className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground/30">—</span>
                    )}
                  </div>
                </>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Start protecting capital in minutes. No setup fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <Card
                key={i}
                variant="glass"
                className={`p-6 relative ${tier.popular ? "border-primary/50 ring-1 ring-primary/20" : ""}`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">{tier.limit}</p>
                <Button
                  className="w-full mb-6"
                  variant={tier.popular ? "default" : "outline"}
                  onClick={() => navigate("/auth")}
                >
                  {tier.cta}
                </Button>
                <ul className="space-y-2">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Product Roadmap</h2>
          </div>
          <div className="space-y-6">
            {[
              { phase: "Phase 1", title: "FPD Prediction Engine", status: "Live", color: "bg-success" },
              { phase: "Phase 2", title: "Lending Decision Infrastructure", status: "In Progress", color: "bg-primary" },
              { phase: "Phase 3", title: "Fraud Intelligence Network", status: "Planned", color: "bg-muted-foreground" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <div className="flex-1 p-4 rounded-lg bg-card/60 border border-border/50 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">{item.phase}</span>
                    <p className="font-semibold">{item.title}</p>
                  </div>
                  <Badge variant="outline">{item.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <ROICalculator />

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stop Losing Capital to First Payment Defaults</h2>
          <p className="text-muted-foreground mb-8">
            Join leading digital lenders who protect their portfolio with Guardian Insights.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/auth")} className="gap-2 text-base px-8">
              Start Your Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="gap-2 text-base px-8">
              Book Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Guardian Insights © 2026</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => navigate("/privacy")}>Privacy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => navigate("/terms")}>Terms</span>
            <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => navigate("/status")}>Status</span>
            <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => navigate("/blog")}>Blog</span>
            <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => navigate("/api-docs")}>API Docs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
