import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, FileText, Scale, Lock, Globe } from "lucide-react";

const rbiGuidelines = [
  {
    title: "Digital Lending Guidelines 2022",
    status: "Compliant",
    description: "Full compliance with RBI's digital lending framework including disclosure norms, data privacy, and fair practices.",
    ref: "RBI/2022-23/111",
  },
  {
    title: "KYC Norms — PAN Validation",
    status: "Compliant",
    description: "Real-time PAN verification through NSDL/CDSL. Masked Aadhaar support for e-KYC flow.",
    ref: "RBI/2016-17/67",
  },
  {
    title: "Fair Practices Code",
    status: "Compliant",
    description: "Transparent risk scoring with explainable AI. Borrowers can request score explanation.",
    ref: "RBI/DOR/2024/01",
  },
  {
    title: "IT Framework for NBFC",
    status: "Compliant",
    description: "Data encryption at rest (AES-256) and in transit (TLS 1.3). Multi-tenant data isolation.",
    ref: "RBI/DPSS/2019",
  },
  {
    title: "Outsourcing Guidelines",
    status: "Compliant",
    description: "No direct lending. Guardian Insights operates as a technology service provider to regulated entities.",
    ref: "RBI/2023-24/115",
  },
];

const dataPrivacy = [
  { label: "Data Encrypted at Rest", detail: "AES-256 encryption", icon: Lock },
  { label: "Data Encrypted in Transit", detail: "TLS 1.3", icon: Shield },
  { label: "Org-Scoped Data Isolation", detail: "Row-level security", icon: Globe },
  { label: "PII Data Masking", detail: "PAN, Aadhaar masked in logs", icon: FileText },
  { label: "Data Retention", detail: "Configurable per org (default 2 years)", icon: Scale },
  { label: "Right to Erasure", detail: "GDPR-compliant data deletion", icon: CheckCircle },
];

export default function Compliance() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              RBI Compliance & Data Privacy
            </h1>
            <p className="text-muted-foreground">
              Built for Indian NBFCs & Digital Lending Platforms — aligned with Reserve Bank of India guidelines.
            </p>
          </div>

          {/* RBI Compliance */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-5 w-5 text-success" />
                RBI Regulatory Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {rbiGuidelines.map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{item.title}</span>
                    <Badge className="bg-success/20 text-success border-success/30 border text-xs gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.description}</p>
                  <p className="text-[10px] font-mono text-muted-foreground/60">Ref: {item.ref}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Data Privacy */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-base">
                <Lock className="h-5 w-5 text-primary" />
                Data Privacy & Security Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dataPrivacy.map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-secondary/30 flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* India-Specific */}
          <Card variant="glass">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe className="h-5 w-5 text-warning" />
                India-Specific Validation Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { signal: "PAN Validation Status", detail: "Real-time NSDL verification • Reuse detection across applications", status: "Active" },
                { signal: "Aadhaar Masked Verification", detail: "e-KYC with masked Aadhaar number • UIDAI compliance", status: "Active" },
                { signal: "UPI Fraud Pattern Detection", detail: "Bounce frequency analysis • Transaction pattern anomalies", status: "Active" },
                { signal: "Geo-Risk Scoring", detail: "State-level FPD heatmap • KYC vs device geolocation matching", status: "Active" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <span className="text-sm font-medium">{item.signal}</span>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30 border text-xs">{item.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
