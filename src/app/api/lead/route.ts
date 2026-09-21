/*
 * Receives mission briefs and early access sign-ups.
 * TODO: forward to the client's inbox or CRM (e.g. Resend, HubSpot) once chosen.
 * Until then submissions are only written to the server log.
 */

const MAX_FIELD = 2000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const lead = Object.fromEntries(
    Object.entries(body as Record<string, unknown>)
      .filter(([, v]) => typeof v === "string" || Array.isArray(v))
      .map(([k, v]) => [k, Array.isArray(v) ? v.map(String).slice(0, 10) : String(v).slice(0, MAX_FIELD)]),
  );

  const email = typeof lead.email === "string" ? lead.email : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "A valid email is required" }, { status: 422 });
  }

  console.log("[lead]", new Date().toISOString(), JSON.stringify(lead));

  return Response.json({ ok: true });
}
