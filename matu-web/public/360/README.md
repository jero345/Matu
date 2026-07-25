# Secuencias de giro 360

El visor (`src/components/Product360.jsx`) reproduce una secuencia de fotogramas
tomados alrededor del producto. Para activarlo:

1. Exportá el turntable desde el archivo 3D del envase: **24 a 36 fotogramas**,
   girando el producto de a 10° o 15°.
   - Mismo encuadre, misma distancia de cámara y misma iluminación en todos.
   - El producto centrado y del mismo tamaño en cada uno, o el giro va a bailar.
   - Fondo transparente (PNG/WebP con alfa), igual que el resto de los renders.
2. Guardalos acá como `can/001.webp`, `can/002.webp`, … en orden de giro.
3. Poné la cantidad en `src/lib/frames.js`:

   ```js
   const SEQUENCES = {
     can: { count: 36, ext: 'webp' },
   }
   ```

Con `count: 0` el visor muestra la imagen fija y la página se ve como antes.

## Por qué hace falta el turntable

El envase es un cilindro, así que la etiqueta se puede desenvolver
matemáticamente desde un render — y de hecho se recuperan bien la cara frontal
(sello, MATUA, banda YERBA MATE) y la trasera (HOW TO BREW, MATUA'S TOOLS).

El problema es la cobertura. Para dibujar el envase girado un ángulo φ hace falta
etiqueta desde φ−90° hasta φ+90°: **180° de vuelta para cada fotograma**. Un
render entrega como mucho ~170°, y los últimos grados de cada borde llegan
aplastados contra la silueta, inservibles. Además, en `TIN CAN.webp` la lata
trasera está tapada por la delantera de un tercio hacia abajo, así que de ese
lado falta el sector inferior de la etiqueta.

Resultado: con estos dos renders el giro fiel llega a unos ±10°, imperceptible.
Cualquier cosa más amplia implica inventar etiqueta que no existe.
