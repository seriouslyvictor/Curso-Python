import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

test("falls back to index.html for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/index.html"]);
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});

test("serves seekable video ranges even when the asset server ignores Range", async () => {
  const response = await worker.fetch(new Request("https://example.test/media/lesson.mp4", {
    headers: { range: "bytes=2-5" },
  }), { ASSETS: { fetch: async request => {
    assert.equal(new URL(request.url).pathname, "/assets/lesson.mp4");
    return new Response("0123456789", { headers: { "content-type": "video/mp4" } });
  } } });
  assert.equal(response.status, 206);
  assert.equal(response.headers.get("content-range"), "bytes 2-5/10");
  assert.equal(response.headers.get("accept-ranges"), "bytes");
  assert.equal(await response.text(), "2345");
});

test("supports open and suffix ranges, rejects unsatisfiable ranges, and preserves HEAD", async () => {
  for (const [range, status, expected] of [["bytes=7-", 206, "789"], ["bytes=-3", 206, "789"], ["bytes=12-", 416, ""], ["bytes=5-2", 416, ""]]) {
    const response = await worker.fetch(new Request("https://example.test/media/lesson.mp4", { headers: { range } }), {
      ASSETS: { fetch: async () => new Response("0123456789", { headers: { "content-type": "video/mp4" } }) },
    });
    assert.equal(response.status, status);
    assert.equal(await response.text(), expected);
  }
  const response = await worker.fetch(new Request("https://example.test/media/lesson.mp4", { method: "HEAD" }), {
    ASSETS: { fetch: async request => {
      assert.equal(request.method, "HEAD");
      return new Response(null, { headers: { "content-length": "10" } });
    } },
  });
  assert.equal(response.headers.get("accept-ranges"), "bytes");
  assert.equal(await response.text(), "");
});
