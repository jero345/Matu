export const NAV = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Why Matu', href: '#why-matu' },
  { label: 'Shop', href: '#shop' },
]

/* `img` offsets are measured from the top-left of the product tile, in rem
   (1rem === 16 artboard px on desktop). */
export const PRODUCTS = [
  {
    image: '/img/box-can.webp',
    alt: 'MATU 1.000g yerba mate set box',
    img: { left: '5.7375rem', top: '2.3375rem', width: '14.3625rem' },
    category: 'YERBA MATE',
    kind: 'SET BOX',
    name: 'MATU 1.000g',
    price: '30 USD',
  },
  {
    image: '/img/tin-can-2.webp',
    alt: 'MATU 800g yerba mate tin can',
    img: { left: '1.675rem', top: '3.3375rem', width: '19.55rem' },
    category: 'YERBA MATE',
    kind: 'TIN CAN',
    name: 'MATU 800g Box',
    price: '30 USD',
  },
  {
    image: '/img/bombilla.webp',
    alt: 'Stainless steel bombilla filter straw',
    img: { left: '1.6rem', top: '1.125rem', width: '19.125rem' },
    category: 'YERBA MATE',
    kind: 'TEA DRINKING TOOLS',
    name: 'BOMBILLA FILTER STRAW',
    price: '30 USD',
  },
  {
    image: '/img/prensa.webp',
    alt: 'Green glass french press',
    img: { left: '2.63rem', top: '2.2rem', width: '17.894rem' },
    category: 'YERBA MATE',
    kind: 'TEA DRINKING TOOLS',
    name: 'FRENCH PRESS',
    price: '30 USD',
  },
]

/* `arc` is the start angle / sweep of the heavier segment on each gauge. */
export const HEALTH_CIRCLES = [
  {
    title: 'ENERGIZER',
    lines: [
      'Feeds cells real energy. Rich in',
      'vitamins A, B1, B2, B3, B5, C and E,',
      'plus calcium, manganese, iron,',
      'phosphorous, zinc, sulfur, selenium,',
      'magnesium and potassium.',
    ],
    arc: { from: 108, sweep: 96 },
  },
  {
    title: 'RECOVERY',
    lines: [
      'Contains 15 amino acids, plus',
      'compounds that reduce lactic acid',
      'accumulation in muscles after effort.',
    ],
    arc: { from: 288, sweep: 84 },
  },
  {
    title: 'ANTIOXIDANTS',
    lines: [
      '90% more antioxidants than your',
      'average green tea protecting cells',
      'from oxidative stress, sip after sip.',
    ],
    arc: { from: 140, sweep: 92 },
  },
  {
    title: 'PSYCHOACTIVE',
    lines: [
      'Rich in the alkaloids caffeine,',
      'theobromine and theophylline',
      'increasing cognitive function and',
      'steady energy.',
    ],
    arc: { from: 282, sweep: 84 },
  },
]

export const ALKALOIDS = [
  {
    number: '01',
    title: 'THEOBROMINE',
    lines: [
      'The same alkaloid found in chocolate a gentle stimulant',
      'that boosts endorphins and cognitive function, and',
      'protects teeth more effectively against cavities than',
      'fluoride.',
    ],
  },
  {
    number: '02',
    title: 'THEOPHYLLINE',
    lines: [
      'A natural bronchodilator: it relaxes pulmonary blood',
      'vessels and the smooth muscle along bronchial airways,',
      'opening the passage of air and benefiting cardiovascular',
      'health.',
    ],
  },
  {
    number: '03',
    title: 'NEVER SMOKED',
    lines: [
      'Unlike many carcinogen-laden (PAH) large commercial',
      'mate brands, MATUA is never dried or smoked by',
      'chemical means  and is third-party quality tested in',
      'USA labs.',
    ],
  },
]

export const FOREST_PILLARS = [
  {
    title: 'SOIL AS A CARBON SPONGE',
    lines: [
      'Soil as a carbon sponge Dense vegetation stores',
      'carbon in trees, roots and soil while leaf litter',
      'continually returns nutrients to the ground.',
    ],
  },
  {
    title: 'HABITAT THAT STAYS STANDING',
    lines: [
      'Habitat that stays standing Agroforestry supports',
      'biodiversity, retains water and produces a resilient',
      'crop without replacing the forest.',
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

export const SPECIES = [
  {
    image: '/img/mariposa.webp',
    name: 'Butterflies',
    fact: 'Pollinators of the understory. Their numbers fall the moment a canopy is cleared.',
  },
  {
    image: '/img/colibri.webp',
    name: 'Hummingbird',
    fact: 'Picaflor. Works the small pale flowers yerba mate opens at the start of spring.',
  },
  {
    image: '/img/mantis.webp',
    name: 'Praying mantis',
    fact: 'Pest control with no chemistry attached — one reason our farm never sprays.',
  },
  {
    image: '/img/pantera.webp',
    name: 'Jaguar',
    fact: 'Yaguareté. Barely 300 remain in the Atlantic Forest; shade-grown mate keeps their corridors open.',
  },
  {
    image: '/img/coati.webp',
    name: 'Coati',
    fact: 'Ground-level seed disperser, endlessly curious around the harvest trails.',
  },
  {
    image: '/img/tucan.webp',
    name: 'Toucan',
    fact: 'Carries forest seeds kilometres away from the tree that grew them.',
  },
  {
    image: '/img/cocodrilo.webp',
    name: 'Yacaré',
    fact: 'Guards the slow streams that feed the Paraná basin all year round.',
  },
  {
    image: '/img/tapir.webp',
    name: 'Tapir',
    fact: "Anta. South America's largest land mammal, and the forest's most patient gardener.",
  },
  {
    image: '/img/mono.webp',
    name: 'Capuchin monkey',
    fact: 'Travels the continuous canopy that agroforestry, and only agroforestry, leaves standing.',
  },
]
