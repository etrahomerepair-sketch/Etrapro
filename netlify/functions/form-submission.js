// netlify/functions/form-submission.js
// This function is triggered automatically by Netlify when a form is submitted.
// It writes the lead into the Supabase `requests` table.
//
// SETUP: In your Netlify dashboard → Site configuration → Environment variables, add:
//   SUPABASE_URL  = <set in Netlify dashboard>
//   SUPABASE_ANON_KEY = <set in Netlify dashboard>

exports.handler = async (event) => {
  // Netlify sends form submissions as application/x-www-form-urlencoded POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the form payload
    const params = new URLSearchParams(event.body);
    const payload = Object.fromEntries(params.entries());

    // Map form fields → our schema
    // Netlify wraps submission data under `payload` key for background functions,
    // but for the form-triggered function it comes directly in the body.
    const firstName  = payload["first-name"]  || payload["first_name"]  || payload["firstName"]  || "";
    const lastName   = payload["last-name"]   || payload["last_name"]   || payload["lastName"]   || "";
    const phone      = payload["phone"]       || "";
    const email      = payload["email"]       || "";
    const service    = payload["service"]     || payload["service-needed"] || payload["service_needed"] || "";
    const location   = payload["location"]    || payload["project-location"] || payload["project_location"] || "";
    const message    = payload["message"]     || payload["tell-us"]     || "";

    const name = `${firstName} ${lastName}`.trim() || "Unknown";
    const id   = `req-${Date.now()}`;
    const date = new Date().toISOString().slice(0, 10);

    const SUPABASE_URL      = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error("Missing Supabase env vars");
      return { statusCode: 500, body: "Server config error" };
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        id,
        date,
        name,
        phone,
        email,
        service,
        location,
        message,
        status: "new",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Supabase insert failed:", err);
      return { statusCode: 500, body: "DB insert failed" };
    }

    console.log(`✅ New request saved: ${name} — ${service}`);
    return { statusCode: 200, body: "OK" };

  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, body: "Internal error" };
  }
};
