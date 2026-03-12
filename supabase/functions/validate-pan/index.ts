const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pan_number, applicant_name } = await req.json();

    if (!pan_number) {
      return new Response(JSON.stringify({ error: "pan_number is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const isValidFormat = panRegex.test(pan_number.toUpperCase());

    // Simulated validation logic
    const knownFraudPANs = ["ABCDE1234F", "ZZZZZ9999Z"];
    const isFlagged = knownFraudPANs.includes(pan_number.toUpperCase());

    // Simulate reuse detection
    const reuseCount = Math.floor(Math.random() * 3);
    const isReused = reuseCount > 0;

    const response = {
      pan_number: pan_number.toUpperCase(),
      valid_format: isValidFormat,
      verification_status: isValidFormat ? (isFlagged ? "flagged" : "verified") : "invalid",
      name_match: applicant_name ? (Math.random() > 0.2 ? "match" : "mismatch") : "not_checked",
      reuse_detection: {
        is_reused: isReused,
        reuse_count: reuseCount,
        platforms: isReused ? ["Platform A", "Platform B"].slice(0, reuseCount) : [],
      },
      fraud_flags: isFlagged ? ["Known fraud PAN", "Previously blocked"] : [],
      aadhaar_linked: Math.random() > 0.3,
      timestamp: new Date().toISOString(),
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
