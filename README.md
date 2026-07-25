# MATU

Sitio web de MATU yerba mate, implementado a partir de `WEB MATU.pdf` y los assets de
`recursos/`.

```
matu-web/     el sitio (React + Vite + Tailwind) — ver matu-web/README.md
recursos/     assets originales entregados
WEB MATU.pdf  diseño de referencia
vercel.json   configuración de deploy
```

## Desarrollo

```bash
cd matu-web
npm install
npm run dev
```

## Deploy en Vercel

El proyecto vive en `matu-web/`, no en la raíz del repositorio. `vercel.json` se
encarga de eso:

```json
"installCommand": "cd matu-web && npm ci",
"buildCommand":   "cd matu-web && npm run build",
"outputDirectory": "matu-web/dist"
```

Con eso alcanza: al hacer push a `main`, Vercel construye y publica. **El
Root Directory del proyecto en Vercel debe quedar en la raíz** (vacío), porque si se
apunta a `matu-web` este `vercel.json` deja de leerse.

`.vercelignore` excluye el PDF y `recursos/` del subido, que son ~90 MB que el build
no necesita.
