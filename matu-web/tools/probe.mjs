import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(400)

const out = await page.evaluate(() => {
  const res = {}
  const rect = (el) => {
    const r = el.getBoundingClientRect()
    return [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width)]
  }
  const line2 = document.querySelector('#benefits h2 > span')
  res.line2 = rect(line2)
  res.line2parts = [...line2.children].map((c) => [c.tagName, ...rect(c)])
  res.line2style = getComputedStyle(line2).gap + ' / ' + getComputedStyle(line2).fontSize

  const sub = document.querySelector('#benefits ~ * p') // not used
  // canopy sub
  const canopy = [...document.querySelectorAll('p')].find((p) =>
    p.textContent.startsWith('Hover a species'),
  )
  const r = document.createRange()
  r.selectNodeContents(canopy)
  res.canopyRects = [...r.getClientRects()].map((x) => [Math.round(x.x), Math.round(x.width)])
  res.canopyFont = getComputedStyle(canopy).fontSize

  const signup = [...document.querySelectorAll('p')].find((p) =>
    p.textContent.startsWith('Sign up for early'),
  )
  const r2 = document.createRange()
  r2.selectNodeContents(signup)
  res.signupRects = [...r2.getClientRects()].map((x) => [Math.round(x.x), Math.round(x.width)])
  res.signupFont = getComputedStyle(signup).fontSize

  const eyebrow = document.querySelector('h1').previousElementSibling
  const r3 = document.createRange()
  r3.selectNodeContents(eyebrow)
  res.eyebrow = [...r3.getClientRects()].map((x) => [Math.round(x.x), Math.round(x.width)])

  return res
})

console.log(JSON.stringify(out, null, 1))
await browser.close()
