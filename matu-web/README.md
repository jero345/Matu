# MATU — sitio web

Implementación en **React 19 + Vite + Tailwind CSS v4** del diseño de `WEB MATU.pdf`,
usando los assets de la carpeta `recursos/`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview
```

## Cómo se logró la fidelidad al PDF

El artboard del PDF mide **1920 × 11833 px**. En escritorio (`≥1280px`) el CSS fija

```css
html { font-size: calc(100vw / 120); }   /* 1rem === 16 px del artboard */
```

de modo que **cada medida del diseño se escribe como `px_del_diseño / 16` en rem** y toda
la composición escala proporcionalmente con el viewport (hasta 1920 px, donde se fija en
16px y el contenido se centra). Por eso verás valores como `lg:top-[30.4729rem]`: no son
números arbitrarios, son coordenadas medidas sobre el PDF.

Las posiciones verticales se calcularon con la relación entre la caja de texto que reporta
el PDF y la caja de línea de CSS:

```
top_css = bbox_top_pdf − 0.107·font_size − (line_height − 1.2·font_size) / 2
```

La página renderizada mide 11837 px de alto contra los 11833 px del PDF, y los bloques de
texto caen dentro de ±3 px de sus posiciones originales.

## Responsive

Hay **dos composiciones**, no un continuo:

| rango | composición |
| --- | --- |
| `≥1280px` | el artboard: posiciones absolutas en rem sobre el lienzo de 1920 |
| `<1280px` | apilada y fluida (mobile-first), con menú hamburguesa |

El corte está en **1280px y no en 1024** porque el lienzo escala con el viewport: a 1024px
el `rem` raíz cae a 8,5px y la microtipografía del propio diseño (rieles verticales,
etiquetas de producto, texto dentro de los anillos — 14-17px sobre el artboard) aterrizaba
en 7-9px, ilegible. A 1280px lo más chico queda en ~10px y todos los anchos de portátil
habituales (1280/1366/1440/1536/1920) siguen viendo el diseño previsto. El breakpoint vive
en `--breakpoint-lg` (`@theme`, `index.css`), así que `lg:` **es** el artboard.

En el tramo fluido los titulares usan `clamp()` en vez de un tamaño fijo, y los bloques de
texto llevan un ancho máximo (~46rem) para no estirarse a 95 caracteres por línea en tablet.

Dos piezas se resuelven aparte:

- **Los anillos de beneficios** (`HealthBenefits`) miden su contenido con *container
  queries* (`cqw`) contra el propio anillo, usando las proporciones del artboard
  (24/276 y 14/276 del diámetro). Así la composición interna es idéntica a cualquier
  diámetro, en vez de depender del `rem` raíz.
- **La grilla de especies** revela el dato al pasar el mouse *y* al tocar, porque en
  pantalla táctil el `hover` no existe y el dato quedaba inalcanzable.

`--sbw` (medido en `main.jsx`) descuenta el ancho de la barra de scroll clásica: `100vw` la
cuenta pero la caja de contenido no, y sin ese ajuste el lienzo se maqueta ~15px más ancho
del espacio real y recorta el riel derecho.

Los controles de tamaño de texto (`Close`, nav del pie, puntos del carrusel) agrandan su
área táctil con la utilidad `tap` —un pseudo-elemento— para no mover la maqueta medida ni
desplazar el subrayado animado.

## Tipografía

| Uso | Fuente |
| --- | --- |
| Todo el texto editorial | **Cirka Regular** (`public/fonts/Cirka-Regular.woff2`) |
| Sellos y microtipografía geométrica (`PROTECT THE WILD`, `DRINK MATUA`) | **Poppins** (Google Fonts) |
| Pie de foto *Traditional mate ritual* | **Libre Baskerville Italic** (Google Fonts) |

> **Importante sobre Cirka.** El PDF trae la fuente incrustada en subconjuntos. Para que la
> web se vea idéntica se fusionaron esos subconjuntos en un único `.woff2`. Cubre todo el
> texto del diseño; para los caracteres que el PDF no usaba se eliminó la entrada del cmap,
> así el navegador cae limpiamente al siguiente tipo de la pila en vez de dibujar un hueco.
> **Cirka es una fuente de Pangram Pangram**: antes de publicar el sitio conviene sustituir
> ese archivo por una licencia web propia de la fundición.

## Assets

`public/img/` contiene los archivos de `recursos/` renombrados sin acentos ni espacios, más
dos piezas que no estaban en esa carpeta y se exportaron del PDF:

- `mate-ritual.jpg` — la foto del mate en el sector *Our Story*.
- `hero-jungle.webp` — la plancha de selva del hero. `FONDO1.webp` es un recorte más
  cerrado de la misma foto, así que el hero usa el encuadre original del diseño. El
  oscurecimiento del hero (`brightness .52`) también replica el del PDF.

El sello *PROTECT THE WILD* es `CRUZ MATU.svg` tal cual viene de `recursos/`
(`cruz-matu.svg`): vector puro, con el hueco crema entre el filete y el cuerpo
transparente, así toma el fondo de la sección.

`SOL.webp` se pinta con `mask-image` (componente `Star`) para poder teñir la estrella de
verde o lima según el fondo.

Los envases `TIN CAN.webp` / `TIN CAN_1.webp` de `recursos/` están encuadrados algo más
verticales que los del PDF; se escalaron para igualar la altura del diseño, por lo que
quedan unos píxeles más angostos que en el artboard.

## Estructura

```
src/
  App.jsx                 orden de las secciones + arranque de los hooks
  data.js                 copys, productos, especies, beneficios
  index.css               tokens (@theme), @font-face, escala rem, capa de animación
  hooks/
    useReveal.js          IntersectionObserver -> is-inview
    useScrollFx.js        parallax, progreso, skew de marquesina, cabecera
  context/
    CartContext.jsx       carrito (reducer + localStorage)
  lib/
    payment.js            hand-off al proveedor de pago
  components/
    Preloader.jsx         cortina de entrada
    ScrollProgress.jsx    barra de progreso de lectura
    SplitLines.jsx        titulares línea por línea con máscara
    CartButton.jsx        contador en la cabecera
    CartDrawer.jsx        cajón lateral del carrito
    Checkout.jsx          checkout en tres pasos
    checkout/             campos y resumen del pedido
    Header.jsx            nav + logo (menú hamburguesa en móvil)
    Hero.jsx              portada
    Marquee.jsx           bandas lima animadas
    CleanestSip.jsx       "The cleanest sip from soil to straw"
    Shop.jsx              "BUILD YOUR RITUAL" + 4 productos
    OurStory.jsx          historia, carrusel de gauchos, sello
    ProtectBadge.jsx      sello en cruz (SVG)
    WhyMatu.jsx           "A sacred spirit of sharing and belonging"
    HealthBenefits.jsx    "From the Guarani to the gauchos to you"
    GaugeCircle.jsx       anillos con arco de los 4 beneficios
    FounderFrame.jsx      marco con la historia de la fundadora
    GrownWithin.jsx       "Grown within the forest, not instead of it"
    Species.jsx           grilla de 9 especies con dato al pasar el mouse
    Newsletter.jsx        alta de correo
    Footer.jsx            panel "YOUR RITUAL IS WAITING" + pie
    Star.jsx, Rail.jsx, Lines.jsx
```

## Animaciones

Mismo lenguaje que **donmolinico.es** (split-text con máscara + `is-inview` por
IntersectionObserver + parallax), pero sin GSAP ni Lenis: todo es CSS y dos hooks
pequeños, así que no suma peso al bundle.

**Motor** (`src/hooks/`)

- `useReveal.js` — un único `IntersectionObserver` marca `is-inview` en cada
  `[data-reveal]` la primera vez que entra en pantalla. Arranca recién cuando la
  cortina de entrada se levanta.
- `useScrollFx.js` — un solo bucle `requestAnimationFrame` que alimenta el parallax
  (`--py`), la barra de progreso (`--progress`), la inclinación de las marquesinas
  según la velocidad de scroll (`--skew`) y el estado `is-scrolled` de la cabecera.

**Variantes de `data-reveal`**

| valor | efecto |
| --- | --- |
| `lines` | la línea sube desde su máscara, con retardo escalonado (`SplitLines`) |
| `up` | sube y aparece |
| `fade` | sólo aparece |
| `zoom` | entra desde una escala mayor |
| `clip` | cortina que se retrae dejando la foto, con push-in de la imagen |
| `grow` | la línea vertical se dibuja hacia abajo |
| `enter-right` / `enter-left` | el producto entra desde fuera de cuadro, girado y más grande, y se acomoda |

El escalonado se controla con `--d` por elemento.

**Detalle por sección**

- **Intro**: cortina verde con el wordmark enmascarado y una línea de progreso; al
  terminar se recorta hacia arriba y libera el scroll.
- **Hero**: la plancha de selva respira (ken burns) y hace parallax; el eyebrow, las
  tres líneas del titular y los botones entran escalonados al cargar; indicador
  "Scroll" animado.
- **Cabecera**: fija; al pasar 90px se pone verde translúcido con blur, reduce el
  logo y compacta el alto. Los enlaces tienen subrayado que barre de izquierda a
  derecha.
- **Marquesinas**: bucle infinito + inclinación según la velocidad de scroll; los
  soles giran lento.
- **Títulos**: todos entran línea por línea desde su máscara.
- **Productos**: entran escalonados; al pasar el mouse la imagen sube y crece, la
  esquina se redondea más y `ADD TO BAG` se rellena de abajo hacia arriba.
- **Fotos**: cortina + push-in de la imagen (mate, carrusel de gauchos, pampa).
- **Beneficios**: los cuatro anillos se dibujan solos (`stroke-dashoffset`) y giran
  al pasar el mouse.
- **Sellos**: el círculo *Cleanest sip* y los soles giran en bucle; el sello en cruz
  *PROTECT THE WILD* flota.
- **Especies**: la grilla entra en cascada y cada tarjeta revela su dato con
  degradado y zoom.
- **Newsletter**: la línea del campo se completa al enfocar o pasar el mouse.

**Accesibilidad**: con `prefers-reduced-motion: reduce` todo queda en su estado
final, sin transiciones, bucles ni parallax. Los estados ocultos viven bajo `.js`,
así que sin JavaScript la página se ve completa.

## Tienda: carrito y checkout

Estado en `src/context/CartContext.jsx` (reducer + `localStorage`, clave
`matu.cart.v1`). Al recargar se descartan las líneas cuyo producto ya no exista en
el catálogo, así un cambio en `data.js` no rompe carritos viejos.

- **ADD TO BAG** agrega el producto, la etiqueta gira a *ADDED* y se abre el cajón.
- **Cajón lateral** (`CartDrawer.jsx`): líneas con miniatura, control de cantidad,
  quitar, subtotal y medidor de envío gratis (a partir de **90 USD**, en
  `FREE_SHIPPING_FROM`). Cierra con `Esc` o tocando fuera; bloquea el scroll del
  fondo.
- **Contador** en la cabecera, a la derecha, fuera del nav medido para no mover ni
  un píxel de la maqueta original.
- **Checkout** (`Checkout.jsx`) en tres pasos — *Details · Delivery · Payment* —
  con resumen del pedido siempre visible, validación de campos obligatorios y de
  email, dos métodos de envío, y pantalla de confirmación con número de referencia.

### Cobrar de verdad

El checkout **no pide datos de tarjeta**: el comprador termina el pago en la página
del proveedor. Es la única forma de cobrar desde un front estático sin quedar a
cargo de datos sensibles de tarjetas.

Para activarlo hay que crear una función serverless que arme la sesión de pago con
tu clave secreta y devuelva su URL, y apuntar la variable de entorno:

```bash
VITE_CHECKOUT_ENDPOINT=/api/checkout
```

`src/lib/payment.js` tiene el ejemplo completo para Stripe Checkout (Mercado Pago
funciona igual con una Preference y su `init_point`). Sin esa variable el flujo
corre en modo demo: registra el pedido y avisa que no se cobró nada.

## Giro 360 del producto

`Product360.jsx` reproduce un turntable: se arrastra para girar, tiene inercia al
soltar, gira solo mientras está en pantalla y sin tocar, responde a las flechas
del teclado y se queda quieto con `prefers-reduced-motion`. Precarga la secuencia
completa antes de animar.

Está montado sobre las latas de *The cleanest sip*. **Sin secuencia cargada
muestra el render fijo**, con la animación de entrada descrita arriba. Para
activarlo hay que dejar los fotogramas en `public/360/can/` y anotar la cantidad
en `src/lib/frames.js` — el detalle está en [public/360/README.md](public/360/README.md),
junto con el motivo por el que no alcanza con los renders que ya tenemos.

Las latas usan tres envoltorios anidados a propósito: el parallax de scroll, la
entrada y la flotación en reposo necesitan cada uno su propio `transform`.

## Otras interacciones

El PDF es estático; estas piezas se resolvieron como corresponde en web:

- Carrusel de dos fotos en *Our Story* con los puntos del diseño.
- *"Hover a species to see a quick fact"*: cada tarjeta revela un dato al pasar el mouse.
  Los textos no venían en el PDF y se redactaron para la sección (`SPECIES` en `data.js`).
- Formulario de newsletter con estado de confirmación, `ADD TO BAG` y anclas del menú.
- Menú hamburguesa animado en móvil.

## Herramientas de verificación

`tools/` guarda los scripts usados para contrastar el resultado con el PDF. No son
parte del sitio, así que Playwright se instala aparte para no engordar el build de
producción:

```bash
npm install playwright --no-save && npx playwright install chromium
```

```bash
node tools/shot.mjs      # página completa a 1920px, con las animaciones ya resueltas
node tools/mobile.mjs    # 390 y 768px, reporta desbordes horizontales
node tools/probe.mjs     # rects reales del DOM para comparar con el artboard
node tools/anim.mjs      # fotogramas a mitad de animación de cada sección
node tools/hover.mjs     # estados hover
node tools/cart.mjs      # recorre agregar al carrito -> checkout -> confirmación
node tools/checkbuild.mjs # sirve dist/ y revisa que no falle ningún recurso
```

`shot.mjs` recorre la página para que se disparen todos los observers y luego
congela transiciones y parallax, así la captura se puede comparar píxel a píxel
con el PDF.
