# Rhinoscopy — sitio web

Sitio oficial de **Rhinoscopy**: educación médica en rinología y endoscopía nasal (español, inglés y portugués).

**Producción:** [https://www.rhinoscopy.com.ar](https://www.rhinoscopy.com.ar)

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Scripts útiles

| Comando | Descripción |
|---------|-------------|
| `npm run build` | Build de producción |
| `npm run start` | Servidor tras el build |
| `npm run lint` | ESLint |
| `npm run constancia:meet` | Generar una constancia Meet (PDF) |

## Despliegue

El proyecto se publica en **Vercel** conectado al repositorio. Las variables de entorno de producción se configuran en el panel de Vercel (URL del sitio, indexación, verificación de Google, etc.).

## Estructura

- `src/app/` — rutas Next.js (App Router), sitemap y robots
- `src/components/` — UI del sitio
- `src/data/` — contenidos y traducciones
- `public/images/` — imágenes y certificados PDF
- `docs/seo.md` — referencia SEO e indexación
