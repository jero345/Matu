import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const OUT =
  process.argv[2] ??
  'C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Videos-Matu/471366db-848b-4bd5-b206-5c837ff40ad2/scratchpad/shots'
const WIDTH = Number(process.argv[3] ?? 1920)
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: WIDTH, height: 1080 },
  deviceScaleFactor: 1,
})

const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

// let the intro curtain finish and the reveal observer come online
await page.waitForFunction(() => document.querySelector('.curtain')?.dataset.done === 'true', {
  timeout: 15000,
})
await page.waitForTimeout(400)

// walk the page so every IntersectionObserver fires, then freeze all motion
await page.evaluate(async () => {
  const step = window.innerHeight * 0.7
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    window.scrollTo({ top: y, behavior: 'instant' })
    await new Promise((r) => setTimeout(r, 120))
  }
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })
  await new Promise((r) => setTimeout(r, 300))
  window.scrollTo({ top: 0, behavior: 'instant' })
})
await page.waitForTimeout(1200)
await page.addStyleTag({
  content:
    '*, *::before, *::after { animation: none !important; transition: none !important; } .parallax { transform: none !important; } .marquee-skew { transform: none !important; }',
})
await page.waitForTimeout(500)

const stats = await page.evaluate(() => ({
  height: document.documentElement.scrollHeight,
  reveals: document.querySelectorAll('[data-reveal]').length,
  pending: [...document.querySelectorAll('[data-reveal]:not(.is-inview)')].map(
    (el) => `${el.tagName}.${String(el.className).slice(0, 50)}`,
  ),
}))
console.log('page height', stats.height, 'width', WIDTH)
console.log('reveal nodes', stats.reveals, 'still hidden:', stats.pending.length)
if (stats.pending.length) console.log(stats.pending.slice(0, 10).join('\n'))

await page.screenshot({ path: path.join(OUT, `full-${WIDTH}.png`), fullPage: true })

if (errors.length) console.log('CONSOLE ERRORS:\n' + errors.join('\n'))
await browser.close()
