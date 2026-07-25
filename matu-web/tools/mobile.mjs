import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const OUT =
  'C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Videos-Matu/471366db-848b-4bd5-b206-5c837ff40ad2/scratchpad/shots'
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
for (const [w, h] of [
  [390, 844],
  [768, 1024],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
  await page.waitForTimeout(1800)
  await page.addStyleTag({
    content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
  })
  await page.evaluate(async () => {
    await document.fonts.ready
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 110)) }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(1200)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)

  const overflow = await page.evaluate(() => {
    const bad = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && (r.right > innerWidth + 2 || r.left < -2)) {
        bad.push(
          `${el.tagName}.${String(el.className).slice(0, 60)} -> ${Math.round(r.left)}..${Math.round(r.right)}`,
        )
      }
    }
    return {
      scrollW: document.documentElement.scrollWidth,
      innerW: innerWidth,
      docH: document.documentElement.scrollHeight,
      bad: bad.slice(0, 14),
    }
  })
  console.log(`--- ${w}x${h}`, JSON.stringify(overflow, null, 1))
  if (errors.length) console.log('ERRORS', errors)
  await page.screenshot({ path: path.join(OUT, `mobile-${w}.png`), fullPage: true })
  await page.close()
}
await browser.close()
