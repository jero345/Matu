import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const URL = process.env.URL || 'http://localhost:5177/'
const OUT = process.env.OUT || 'C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Videos-Matu/f260a59b-a076-45b1-a95b-ae0b5ec26c47/scratchpad/shots'
fs.mkdirSync(OUT, { recursive: true })

const SIZES = (process.env.SIZES || '360x800,390x844,430x932,768x1024,1024x800,1280x800')
  .split(',')
  .map((s) => s.split('x').map(Number))

const browser = await chromium.launch()
for (const [w, h] of SIZES) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
  await page.waitForTimeout(1800)
  await page.addStyleTag({
    content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
  })
  await page.evaluate(async () => {
    await document.fonts.ready
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(1000)

  const report = await page.evaluate(() => {
    const label = (el) => {
      const cls = String(el.className?.baseVal ?? el.className ?? '').trim().slice(0, 70)
      return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${cls ? '.' + cls.split(/\s+/).slice(0, 4).join('.') : ''}`
    }
    const bad = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && (r.right > innerWidth + 1 || r.left < -1)) {
        bad.push(`${label(el)} :: ${Math.round(r.left)}..${Math.round(r.right)} (w${Math.round(r.width)})`)
      }
    }
    // sections with their heights
    const sections = [...document.querySelectorAll('main > section, footer, header')].map((s) => {
      const r = s.getBoundingClientRect()
      return `${label(s)} h=${Math.round(r.height)}`
    })
    // tiny text
    const tiny = []
    for (const el of document.querySelectorAll('p,span,h1,h2,h3,a,button,li,figcaption')) {
      if (!el.textContent.trim()) continue
      if (el.children.length) continue
      const fs = parseFloat(getComputedStyle(el).fontSize)
      if (fs > 0 && fs < 11) tiny.push(`${label(el)} ${fs.toFixed(1)}px "${el.textContent.trim().slice(0, 28)}"`)
    }
    // small tap targets
    const taps = []
    for (const el of document.querySelectorAll('a[href],button')) {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && (r.height < 32 || r.width < 32)) {
        taps.push(`${label(el)} ${Math.round(r.width)}x${Math.round(r.height)}`)
      }
    }
    return {
      scrollW: document.documentElement.scrollWidth,
      innerW: innerWidth,
      docH: document.documentElement.scrollHeight,
      overflow: [...new Set(bad)].slice(0, 25),
      sections,
      tiny: [...new Set(tiny)].slice(0, 20),
      taps: [...new Set(taps)].slice(0, 20),
    }
  })

  console.log(`\n=== ${w}x${h} ===`)
  console.log(`scrollW=${report.scrollW} innerW=${report.innerW} docH=${report.docH}`)
  console.log('sections:', report.sections.join(' | '))
  if (report.overflow.length) console.log('OVERFLOW:\n  ' + report.overflow.join('\n  '))
  if (report.tiny.length) console.log('TINY TEXT:\n  ' + report.tiny.join('\n  '))
  if (report.taps.length) console.log('SMALL TAPS:\n  ' + report.taps.join('\n  '))
  if (errors.length) console.log('JS ERRORS', errors)

  await page.screenshot({ path: path.join(OUT, `w${w}.png`), fullPage: true })
  await page.close()
}
await browser.close()
