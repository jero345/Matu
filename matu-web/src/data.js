export const NAV = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Why Matu', href: '#why-matu' },
  { label: 'Shop', href: '#shop' },
]

export const CURRENCY = 'USD'

/** `30` -> `30 USD`, matching how prices are set on the artboard. */
export const money = (value) =>
  `${Number.isInteger(value) ? value : value.toFixed(2)} ${CURRENCY}`

/* `img` offsets are measured from the top-left of the product tile, in rem
   (1rem === 16 artboard px on desktop). */
export const PRODUCTS = [
  {
    id: 'matu-1000',
    image: '/img/box-can.webp?v=2',
    alt: 'MATU 1.000g yerba mate set box',
    img: { left: '5.7375rem', top: '2.3375rem', width: '14.3625rem' },
    category: 'YERBA MATE',
    kind: 'SET BOX',
    name: 'MATU 1.000g',
    price: 30,
  },
  {
    id: 'matu-800',
    image: '/img/tin-can-2.webp?v=2',
    alt: 'MATU 800g yerba mate tin can',
    img: { left: '1.675rem', top: '3.3375rem', width: '19.55rem' },
    category: 'YERBA MATE',
    kind: 'TIN CAN',
    name: 'MATU 800g Box',
    price: 30,
  },
  {
    id: 'bombilla',
    comingSoon: true,
    image: '/img/bombilla.webp',
    alt: 'Stainless steel bombilla filter straw',
    img: { left: '1.6rem', top: '1.125rem', width: '19.125rem' },
    category: 'YERBA MATE',
    kind: 'TEA DRINKING TOOLS',
    name: 'BOMBILLA FILTER STRAW',
    price: 30,
  },
  {
    id: 'french-press',
    comingSoon: true,
    image: '/img/prensa.webp',
    alt: 'Green glass french press',
    img: { left: '2.63rem', top: '2.2rem', width: '17.894rem' },
    category: 'YERBA MATE',
    kind: 'TEA DRINKING TOOLS',
    name: 'FRENCH PRESS',
    price: 30,
  },
]

export const FREE_SHIPPING_FROM = 90

export const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard', detail: '5–8 business days', price: 9 },
  { id: 'express', label: 'Express', detail: '2–3 business days', price: 19 },
]

/**
 * Hosted checkouts: the shopper is handed off to the provider's own page, so no
 * card details are ever typed into this site. See `startPayment` in
 * `src/lib/payment.js` for where to plug the real one in.
 */
export const PAYMENT_METHODS = [
  {
    id: 'card',
    label: 'Credit or debit card',
    detail: 'Secure hosted checkout — you finish the payment on the provider’s page.',
  },
  {
    id: 'mercadopago',
    label: 'Mercado Pago',
    detail: 'Pay in ARS, with local instalments.',
  },
]

/* `arc` is the start angle / sweep of the heavier segment on each gauge. */
export const HEALTH_CIRCLES = [
  {
    title: 'ENERGY',
    lines: [
      'Real cellular energy — from',
      'vitamins A, B1–B5, C and E,',
      'plus calcium, iron, zinc,',
      'magnesium, potassium,',
      'phosphoros, sulfur, selenium',
      'and manganese.',
    ],
    arc: { from: 0, sweep: 120 },
  },
  {
    title: 'RECOVERY',
    lines: [
      '15 amino acids, plus compounds',
      'that clear lactic acid from',
      'muscles after effort.',
    ],
    arc: { from: 120, sweep: 120 },
  },
  {
    title: 'ANTIOXIDANT',
    lines: [
      '90% more antioxidants than',
      'green tea — shielding cells',
      'from oxidative stress, sip',
      'after sip.',
    ],
    arc: { from: 240, sweep: 120 },
  },
]

export const ALKALOIDS = [
  {
    number: '01',
    title: 'CAFFEINE',
    lines: ['For sharper focus and steady energy.'],
  },
  {
    number: '02',
    title: 'THEOBROMINE',
    lines: [
      'The gentle stimulant found in',
      'chocolate. Boosts endorphins and',
      'focus — and guards teeth against',
      'cavities better than fluoride.',
    ],
  },
  {
    number: '03',
    title: 'THEOPHYLLINE',
    lines: [
      'A natural bronchodilator — it opens',
      'the airways and supports',
      'cardiovascular health.',
    ],
  },
]

/** Runs full width under the sub-headline, not as a numbered call-out. */
export const UNSMOKED = {
  title: 'UNSMOKED',
  lines: [
    'Unlike big commercial brands laden with carcinogens (PAHs), MATU is never',
    'chemically smoked — and it’s third-party tested in U.S. labs.',
  ],
}

export const FOREST_PILLARS = [
  {
    title: 'SOIL AS A CARBON SPONGE',
    lines: [
      'Dense vegetation stores carbon in trees, roots',
      'and soil while leaf litter continually returns',
      'nutrients to the ground.',
    ],
  },
  {
    title: 'HABITAT THAT STAYS STANDING',
    lines: [
      'Agroforestry supports biodiversity, retains water',
      'and produces a resilient crop without replacing',
      'the forest.',
    ],
  },
  {
    title: 'PROTECT THE WILD',
    lines: [
      'Choosing MATU supports farming systems that',
      'conserve habitat and maintain the ecological',
      'function of the Paraná forest.',
    ],
  },
]

/* `nameEs` is set in italics next to the English name. Where the Spanish name
   used to open the fact, it was lifted out so it is not said twice. */
export const SPECIES = [
  {
    image: '/img/mariposa.webp',
    photo: '/img/mariposa-foto.webp',
    name: 'Butterflies',
    nameEs: 'Mariposas',
    fact: 'Pollinators of the understory. Their numbers fall the moment a canopy is cleared.',
  },
  {
    image: '/img/colibri.webp',
    photo: '/img/colibri-foto.webp',
    name: 'Hummingbird',
    nameEs: 'Colibrí',
    fact: 'Works the small pale flowers yerba mate opens at the start of spring.',
  },
  {
    image: '/img/mantis.webp',
    photo: '/img/mantis-foto.webp',
    name: 'Praying mantis',
    nameEs: 'Mantis religiosa',
    fact: 'Pest control with no chemistry attached — one reason our farm never sprays.',
  },
  {
    image: '/img/pantera.webp',
    photo: '/img/pantera-foto.webp',
    name: 'Jaguar',
    nameEs: 'Yaguareté',
    fact: 'Barely 300 remain in the Atlantic Forest; shade-grown mate keeps their corridors open.',
  },
  {
    image: '/img/coati.webp',
    photo: '/img/coati-foto.webp',
    name: 'Coati',
    nameEs: 'Coatí',
    fact: 'Ground-level seed disperser, endlessly curious around the harvest trails.',
  },
  {
    image: '/img/tucan.webp',
    photo: '/img/tucan-foto.webp',
    name: 'Toucan',
    nameEs: 'Tucán',
    fact: 'Carries forest seeds kilometres away from the tree that grew them.',
  },
  {
    image: '/img/cocodrilo.webp',
    photo: '/img/cocodrilo-foto.webp',
    name: 'Broad-snouted caiman',
    nameEs: 'Yacaré',
    fact: 'Guards the slow streams that feed the Paraná basin all year round.',
  },
  {
    image: '/img/tapir.webp',
    photo: '/img/tapir-foto.webp',
    name: 'Tapir',
    nameEs: 'Anta',
    fact: "South America's largest land mammal, and the forest's most patient gardener.",
  },
  {
    image: '/img/mono.webp',
    photo: '/img/mono-foto.webp',
    name: 'Capuchin monkey',
    nameEs: 'Mono caí',
    fact: 'Travels the continuous canopy that agroforestry, and only agroforestry, leaves standing.',
  },
]
