// A separate route ensures video requests reach the worker instead of static hosting.
async function serveVideo(request, env) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = assetUrl.pathname.replace(/^\/media\//, "/assets/");
  assetUrl.search = "";
  const assetHeaders = new Headers(request.headers);
  assetHeaders.delete("range");
  const response = await env.ASSETS.fetch(new Request(assetUrl, {
    method: request.method, headers: assetHeaders,
  }));
  if (response.status !== 200) return response;
  const headers = new Headers(response.headers);
  headers.set("accept-ranges", "bytes");
  const range = request.headers.get("range");
  if (!range || request.method === "HEAD") {
    return new Response(response.body, { status: response.status, headers });
  }
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  // Ignore unsupported multipart or malformed ranges, as permitted by HTTP.
  if (!match || (!match[1] && !match[2])) return new Response(response.body, { headers });
  const data = await response.arrayBuffer();
  const size = data.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (start >= size || end < start || !Number.isSafeInteger(start) || !Number.isSafeInteger(end)) {
    headers.set("content-range", `bytes */${size}`);
    headers.set("content-length", "0");
    return new Response(null, { status: 416, headers });
  }
  headers.set("content-range", `bytes ${start}-${end}/${size}`);
  headers.set("content-length", String(end - start + 1));
  return new Response(data.slice(start, end + 1), { status: 206, headers });
}
export default {
  async fetch(request, env) {
    if (/^\/media\/[^/]+\.mp4$/.test(new URL(request.url).pathname) && ["GET", "HEAD"].includes(request.method)) {
      return serveVideo(request, env);
    }
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
