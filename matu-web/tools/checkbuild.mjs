import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1600, height: 900 } })
const bad = []
p.on('response', (r) => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`) })
p.on('pageerror', (e) => bad.push('JS: ' + e))
p.on('console', (m) => m.type() === 'error' && bad.push('CONSOLE: ' + m.text()))
await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await p.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
await p.waitForTimeout(2200)
await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 110)) } })
await p.waitForTimeout(1200)
const info = await p.evaluate(() => ({
  h: document.documentElement.scrollHeight,
  hidden: document.querySelectorAll('[data-reveal]:not(.is-inview)').length,
  cirka: document.fonts.check('62px Cirka'),
  imgs: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src),
}))
console.log(JSON.stringify(info, null, 1))
console.log('failures:', bad.length ? bad.join('\n') : 'none')
await b.close()
