export async function onRequest(context) {
  try {
    const { request } = context;
    const baseUrl = new URL(request.url).searchParams.get("url");
    if (!baseUrl) {
      return new Response(JSON.stringify({ ok: false, error: "Missing url param" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }
    const clean = baseUrl.replace(/\/$/, "");
    const imgUrl = clean + "/favicon.ico";
    const resp = await fetch(imgUrl);
    if (!resp.ok) {
      return new Response(JSON.stringify({ ok: false, error: "HTTP " + resp.status }), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  }
}
