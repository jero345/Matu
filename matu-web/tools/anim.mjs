import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const OUT =
  'C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Videos-Matu/471366db-848b-4bd5-b206-5c837ff40ad2/scratchpad/anim'
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 860 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
// smooth scrolling makes Playwright's stability checks never settle
await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })

// intro curtain
await page.waitForTimeout(420)
await page.screenshot({ path: path.join(OUT, '00-preloader.png') })
await page.waitForTimeout(950)
await page.screenshot({ path: path.join(OUT, '01-curtain-lift.png') })
await page.waitForTimeout(700)
await page.screenshot({ path: path.join(OUT, '02-hero.png') })

// scrolled header state
await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }))
await page.waitForTimeout(700)
await page.screenshot({ path: path.join(OUT, '03-header-scrolled.png') })

// catch a headline mid-reveal
const shots = [
  ['04-cleanest', 1500],
  ['05-shop', 2700],
  ['06-story', 4000],
  ['07-why', 5900],
  ['08-benefits', 7000],
  ['09-grown', 9100],
  ['10-species', 10200],
  ['11-footer', 11100],
]
for (const [name, y] of shots) {
  await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y)
  await page.waitForTimeout(260)
  await page.screenshot({ path: path.join(OUT, `${name}-mid.png`) })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(OUT, `${name}-done.png`) })
}

// hover states (dispatch directly so smooth-scroll stability checks stay out of it)
const hoverAt = async (selector, name, top) => {
  await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), top)
  await page.waitForTimeout(900)
  const box = await page.locator(selector).first().boundingBox()
  if (!box) return
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.waitForTimeout(700)
  await page.screenshot({ path: path.join(OUT, `${name}.png`) })
}

await hoverAt('#shop article button', '12-hover-product', 2700)
await hoverAt('figure.group', '13-hover-species', 10250)
await hoverAt('header nav a', '14-hover-nav', 400)

console.log('errors:', errors.length ? errors.join('\n') : 'none')
await browser.close()
