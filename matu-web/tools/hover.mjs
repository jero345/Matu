import { chromium } from 'playwright'
const OUT = 'C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Videos-Matu/471366db-848b-4bd5-b206-5c837ff40ad2/scratchpad/anim'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1920, height: 1000 } })
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await p.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
await p.waitForTimeout(1800)
const shot = async (sel, name, top) => {
  await p.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), top)
  await p.waitForTimeout(1400)
  const box = await p.locator(sel).first().boundingBox()
  if (box) { await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await p.waitForTimeout(800) }
  await p.screenshot({ path: `${OUT}/${name}.png` })
}
await shot('figure.group:nth-child(5)', 'hv-species', 10100)
await shot('#shop article button', 'hv-product', 2650)
await shot('header nav a', 'hv-nav', 500)
await b.close()
