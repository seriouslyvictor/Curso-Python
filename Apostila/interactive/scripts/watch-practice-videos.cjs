// Monitor incoming videos and verify each stable file in the actual preview.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const directory = path.resolve(__dirname, '../../videos');
const catalog = require('../../praticas/catalogo.json');
const evidencePath = path.join(os.tmpdir(), 'fund-python-video-verification.json');
const verified = {};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log(JSON.stringify({ watching: directory, expected: catalog.challenges.length, evidencePath }));
  while (true) {
    for (const filename of fs.readdirSync(directory)) {
      const id = filename.match(/^video-\d+-(.+)\.mp4$/)?.[1];
      if (!catalog.challenges.some(item => item.id === id)) continue;
      const file = path.join(directory, filename);
      const stat = fs.statSync(file);
      if (!stat.size || Date.now() - stat.mtimeMs < 15000) continue;
      const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
      if (verified[id]?.sha256 === hash) continue;
      const test = spawnSync(process.execPath, [path.join(__dirname, 'verify-practice-videos.cjs'), process.argv[2] || 'http://127.0.0.1:5173', id], { encoding: 'utf8', timeout: 120000, windowsHide: true });
      if (test.status !== 0) { console.error(test.stderr || test.stdout || test.error); continue; }
      const result = JSON.parse(test.stdout.trim().split(/\r?\n/).at(-1));
      verified[id] = { filename, sha256: hash, checkedAt: new Date().toISOString(), result: result.results[0] };
      fs.writeFileSync(evidencePath, JSON.stringify({ expected: catalog.challenges.length, verified, complete: Object.keys(verified).length === catalog.challenges.length }, null, 2));
      console.log(JSON.stringify({ verified: id, total: Object.keys(verified).length, expected: catalog.challenges.length }));
    }
    if (catalog.challenges.every(item => verified[item.id])) { console.log('All practice videos verified; ready for final build and publication.'); return; }
    await sleep(15000);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
