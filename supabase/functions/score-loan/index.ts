import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function calculateDNAScore(data: any) {
  // Device Stability Gene (0-20)
  let deviceScore = 20;
  if (data.device_fingerprint === 'unknown' || !data.device_fingerprint) deviceScore -= 8;
  if (data.emulator_detected) deviceScore -= 10;
  if (data.sim_changed) deviceScore -= 5;
  if (data.vpn_detected) deviceScore -= 5;
  deviceScore = Math.max(0, Math.min(20, deviceScore));

  // Income Stability Gene (0-20)
  let incomeScore = 20;
  const incomeMismatch = data.income_mismatch_pct || 0;
  if (incomeMismatch > 50) incomeScore -= 12;
  else if (incomeMismatch > 25) incomeScore -= 6;
  if (data.income_spike) incomeScore -= 5;
  incomeScore = Math.max(0, Math.min(20, incomeScore));

  // Application Velocity Gene (0-20)
  let velocityScore = 20;
  const appsIn30Days = data.apps_in_30_days || 0;
  if (appsIn30Days > 5) velocityScore -= 15;
  else if (appsIn30Days > 3) velocityScore -= 8;
  else if (appsIn30Days > 1) velocityScore -= 3;
  if (data.midnight_application) velocityScore -= 5;
  velocityScore = Math.max(0, Math.min(20, velocityScore));

  // Geo-Behavior Gene (0-20)
  let geoScore = 20;
  const addressDistanceKm = data.address_distance_km || 0;
  if (addressDistanceKm > 500) geoScore -= 12;
  else if (addressDistanceKm > 200) geoScore -= 6;
  if (data.gps_spoofing) geoScore -= 10;
  geoScore = Math.max(0, Math.min(20, geoScore));

  // Financial Discipline Gene (0-20)
  let financialScore = 20;
  if (data.upi_bounce_count > 5) financialScore -= 10;
  else if (data.upi_bounce_count > 2) financialScore -= 5;
  if (data.bnpl_stacking) financialScore -= 8;
  if (data.emi_delay_count > 3) financialScore -= 7;
  financialScore = Math.max(0, Math.min(20, financialScore));

  const totalDNA = deviceScore + incomeScore + velocityScore + geoScore + financialScore;
  
  let classification = "Stable Repayer";
  if (totalDNA > 75) classification = "High FPD Propensity";
  else if (totalDNA > 50) classification = "Opportunistic Risk Seeker";
  else if (totalDNA > 25) classification = "Cashflow Volatile";

  return {
    total: totalDNA,
    genes: { device: deviceScore, income: incomeScore, velocity: velocityScore, geo: geoScore, financial: financialScore },
    classification,
  };
}

function calculateFPDProbability(data: any, dnaScore: number) {
  let base = 0.05;
  base += (dnaScore / 100) * 0.6;
  if (data.stacking_score > 70) base += 0.15;
  if (data.identity_score && data.identity_score < 40) base += 0.1;
  if (data.loan_amount > 300000) base += 0.05;
  return Math.min(0.99, Math.max(0.01, base));
}

function calculateCPS(fpdProb: number, loanAmount: number) {
  return Math.round(fpdProb * 100);
}

function determineRiskTier(fpdProb: number) {
  if (fpdProb >= 0.7) return "critical";
  if (fpdProb >= 0.5) return "high";
  if (fpdProb >= 0.3) return "medium";
  return "low";
}

function determineDecision(fpdProb: number, riskTier: string) {
  if (riskTier === "critical") return "reject";
  if (riskTier === "high") return "manual_review";
  if (riskTier === "medium") return "manual_review";
  return "approve";
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { applicant_name, loan_amount, pan_number, phone, email, location, device_fingerprint, ip_address, loan_type, ...signals } = body;

    if (!applicant_name || !loan_amount) {
      return new Response(JSON.stringify({ error: "applicant_name and loan_amount are required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const dna = calculateDNAScore({ ...signals, device_fingerprint });
    const fpdProbability = calculateFPDProbability({ ...signals, loan_amount, stacking_score: signals.stacking_score || 0, identity_score: signals.identity_score || 100 }, dna.total);
    const cps = calculateCPS(fpdProbability, loan_amount);
    const riskTier = determineRiskTier(fpdProbability);
    const decision = determineDecision(fpdProbability, riskTier);
    const capitalAtRisk = Math.round(fpdProbability * loan_amount);

    const riskFactors: string[] = [];
    if (dna.genes.device < 10) riskFactors.push("Device instability detected");
    if (dna.genes.income < 10) riskFactors.push("Income inconsistency");
    if (dna.genes.velocity < 10) riskFactors.push("High application velocity");
    if (dna.genes.geo < 10) riskFactors.push("Geo-behavior anomaly");
    if (dna.genes.financial < 10) riskFactors.push("Financial discipline concerns");
    if (signals.stacking_score > 50) riskFactors.push("Loan stacking detected");

    const response = {
      scoring: {
        fpd_probability: parseFloat(fpdProbability.toFixed(4)),
        capital_protection_score: cps,
        risk_tier: riskTier,
        decision,
        capital_at_risk: capitalAtRisk,
      },
      dna: {
        total_score: dna.total,
        classification: dna.classification,
        genes: dna.genes,
      },
      risk_factors: riskFactors,
      applicant: { applicant_name, loan_amount, pan_number, location },
      timestamp: new Date().toISOString(),
      model_version: "v2.4",
    };

    return new Response(JSON.stringify(response), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
