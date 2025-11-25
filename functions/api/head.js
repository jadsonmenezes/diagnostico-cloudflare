export async function onRequest(context) {
  try {
    const { request } = context;
    const url = new URL(request.url).searchParams.get("url");
    if (!url) {
      return new Response(JSON.stringify({ ok: false, error: "Missing url param" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }
    const resp = await fetch(url, { method: "HEAD" });
    return new Response(JSON.stringify({ ok: true, status: resp.status }), {
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
