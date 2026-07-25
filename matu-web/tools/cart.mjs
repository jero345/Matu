import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const OUT =
  'C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Videos-Matu/471366db-848b-4bd5-b206-5c837ff40ad2/scratchpad/cart'
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
const bad = []
page.on('pageerror', (e) => bad.push('JS: ' + e))
page.on('console', (m) => m.type() === 'error' && bad.push('CONSOLE: ' + m.text()))
page.on('response', (r) => r.status() >= 400 && bad.push(`${r.status()} ${r.url()}`))

const shot = (n) => page.screenshot({ path: path.join(OUT, `${n}.png`) })
const log = (...a) => console.log(...a)

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
await page.waitForTimeout(2000)

// --- add two different products -------------------------------------------
await page.evaluate(() => document.querySelector('#shop').scrollIntoView())
await page.waitForTimeout(1200)
await page.locator('#shop article').nth(0).getByRole('button').click()
await page.waitForTimeout(900)
await shot('01-drawer-after-add')
log('count after 1st add:', await page.locator('header button[aria-label^="Bag"] span').innerText())

// bump quantity from inside the drawer
await page.getByRole('button', { name: /Add one MATU 1.000g/ }).click()
await page.getByRole('button', { name: /Add one MATU 1.000g/ }).click()
await page.waitForTimeout(400)

await page.getByRole('button', { name: 'Close bag' }).click()
await page.waitForTimeout(700)
await page.locator('#shop article').nth(3).getByRole('button').click()
await page.waitForTimeout(900)
await shot('02-drawer-two-lines')

const readTotals = () =>
  page.evaluate(() => ({
    badge: document.querySelector('header button[aria-label^="Bag"] span:last-child')?.textContent,
    subtotal: [...document.querySelectorAll('aside footer *')]
      .map((n) => n.textContent)
      .find((t) => t?.includes('USD')),
    freeShip: document.querySelector('aside p')?.textContent?.trim(),
  }))
log('totals:', JSON.stringify(await readTotals()))

// --- persistence -----------------------------------------------------------
await page.reload({ waitUntil: 'networkidle' })
await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
await page.waitForTimeout(2200)
log(
  'badge after reload:',
  await page.locator('header button[aria-label^="Bag"] span').last().innerText(),
)

// --- checkout --------------------------------------------------------------
await page.locator('header button[aria-label^="Bag"]').click()
await page.waitForTimeout(800)
await page.getByRole('button', { name: 'Checkout', exact: true }).click()
await page.waitForTimeout(900)
await shot('03-checkout-details')

// submit empty -> validation
await page.getByRole('button', { name: /Continue to delivery/ }).click()
await page.waitForTimeout(500)
const errs = await page.locator('[aria-invalid="true"]').count()
log('validation errors shown:', errs)
await shot('04-checkout-validation')

// bad email
await page.fill('#co-email', 'nope')
await page.getByRole('button', { name: /Continue to delivery/ }).click()
await page.waitForTimeout(300)
log('email error:', await page.locator('#co-email-err').innerText())

for (const [id, v] of [
  ['co-email', 'jero@matu.com'],
  ['co-firstName', 'Jerónimo'],
  ['co-lastName', 'Pérez'],
  ['co-address', 'Av. Corrientes 1234'],
  ['co-city', 'Buenos Aires'],
  ['co-postcode', 'C1043'],
]) {
  await page.fill(`#${id}`, v)
}
await page.getByRole('button', { name: /Continue to delivery/ }).click()
await page.waitForTimeout(700)
await shot('05-checkout-delivery')

await page.getByText('Express').click()
await page.waitForTimeout(400)
log('summary after express:', await page.locator('aside dl').innerText())

await page.getByRole('button', { name: /Continue to payment/ }).click()
await page.waitForTimeout(700)
await shot('06-checkout-payment')

const placeLabel = await page.getByRole('button', { name: /Place order/ }).innerText()
log('place button:', placeLabel)
await page.getByRole('button', { name: /Place order/ }).click()
await page.waitForTimeout(1200)
await shot('07-confirmation')
log('confirmation:', (await page.locator('h1').first().innerText()).replace(/\n/g, ' '))
log(
  'badge after order:',
  await page.locator('header button[aria-label^="Bag"] span').last().innerText(),
)

console.log('failures:', bad.length ? bad.join('\n') : 'none')
await browser.close()
