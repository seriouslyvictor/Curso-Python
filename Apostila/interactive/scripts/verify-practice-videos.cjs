// Run against the local preview or published Site using an installed Playwright.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const base = process.argv[2] || 'http://localhost:5173';
  const requested = new Set(process.argv.slice(3));
  const files = fs.readdirSync(path.resolve(__dirname, '../../videos')).filter(name => /^video-\d+-.+\.mp4$/.test(name) && (!requested.size || requested.has(name.match(/^video-\d+-(.+)\.mp4$/)[1])));
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  const results = [];
  try {
    for (const file of files) {
      const id = file.match(/^video-\d+-(.+)\.mp4$/)[1];
      await page.goto(`${base}/#/praticas/${id}`);
      const player = page.locator('video');
      await player.waitFor();
      await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2, null, { timeout: 60000 });
      const duration = await player.evaluate(video => video.duration);
      if (!(duration > 20)) throw new Error(`${id}: missing duration`);
      await player.evaluate(async video => { video.muted = true; await video.play(); });
      await page.waitForFunction(() => document.querySelector('video').currentTime > 1);
      await player.evaluate(video => video.pause());
      const frames = await player.evaluate(video => video.getVideoPlaybackQuality().totalVideoFrames);
      if (!(frames > 0)) throw new Error(`${id}: no video frames decoded`);
      const before = await player.evaluate(video => video.currentTime);
      await page.getByRole('button', { name: 'Avançar 10 segundos', exact: true }).click();
      await page.waitForFunction(time => { const v = document.querySelector('video'); return !v.seeking && v.currentTime >= time + 9; }, before);
      const forward = await player.evaluate(video => video.currentTime);
      await page.getByRole('button', { name: 'Retroceder 10 segundos', exact: true }).click();
      await page.waitForFunction(time => { const v = document.querySelector('video'); return !v.seeking && Math.abs(v.currentTime - time) < 1; }, before);
      await player.evaluate(async video => { await video.play(); });
      const resumed = await player.evaluate(video => video.currentTime);
      await page.waitForFunction(time => document.querySelector('video').currentTime > time + .5, resumed);
      await player.evaluate(video => video.pause());
      const src = await player.evaluate(video => video.currentSrc);
      const range = await page.request.get(src, { headers: { Range: 'bytes=0-1023' } });
      if (range.status() !== 206 || !range.headers()['content-type']?.includes('video/mp4')) throw new Error(`${id}: range request failed (${range.status()})`);
      results.push({ id, duration, frames, before, forward, played: true, resumed: true, backward: true, range: range.status() });
      console.log(JSON.stringify(results.at(-1)));
    }
    if (!results.length) throw new Error('No videos tested');
    console.log(JSON.stringify({ base, verified: results.length, results }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
