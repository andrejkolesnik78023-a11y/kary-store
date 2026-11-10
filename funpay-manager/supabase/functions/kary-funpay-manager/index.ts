import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (!["GET", "POST"].includes(req.method)) {
    return reply({ ok: false, error: "method_not_allowed" }, 405);
  }

  let action = "health";
  if (req.method === "POST") {
    try {
      const body = await req.json();
      action = typeof body?.action === "string" ? body.action : "health";
    } catch {
      return reply({ ok: false, error: "invalid_json" }, 400);
    }
  }

  if (action === "health") {
    return reply({
      ok: true,
      service: "KARY FUNPAY MANAGER",
      stage: "backend_scaffold",
      funpay_connected: false,
      publishing_enabled: false,
      message: "Backend is online; secure FunPay authorization is not configured.",
    });
  }

  if (action === "connection_status") {
    return reply({
      ok: true,
      connected: false,
      publishing_enabled: false,
      message: "No FunPay credentials are stored. Secure connection flow is pending.",
    });
  }

  if (action === "publish") {
    return reply({
      ok: false,
      error: "publishing_not_configured",
      message: "Live publishing remains disabled until the secure FunPay adapter and authorization flow are implemented.",
    }, 501);
  }

  return reply({ ok: false, error: "unsupported_action" }, 400);
});
