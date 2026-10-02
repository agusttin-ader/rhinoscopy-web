# SEO — Rhinoscopy

Sitio principal: **https://www.rhinoscopy.com.ar**

## URLs indexables

- `https://www.rhinoscopy.com.ar/`
- `https://www.rhinoscopy.com.ar/en`
- `https://www.rhinoscopy.com.ar/pt`
- `https://www.rhinoscopy.com.ar/constancias`
- `https://www.rhinoscopy.com.ar/en/constancias`
- `https://www.rhinoscopy.com.ar/pt/constancias`

**Sitemap:** `https://www.rhinoscopy.com.ar/sitemap.xml`

## Google Search Console

1. Propiedad con prefijo `https://www.rhinoscopy.com.ar`
2. Enviar el sitemap (URL arriba)
3. Solicitar indexación de la home y `/constancias` si hace falta acelerar

## Variables en Vercel (producción)

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_SITE_URL` | `https://www.rhinoscopy.com.ar` |
| `SEO_ALLOW_INDEXING` | `true` en producción |
| `GOOGLE_SITE_VERIFICATION` | Código de verificación Search Console |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | **Google Analytics 4** — ID `G-…` (Admin → Flujos de datos). Sin esta variable, Analytics no carga. |

Tras cambiar variables, redeploy en Vercel.

### Google Analytics

1. En [Google Analytics](https://analytics.google.com/), crear o abrir la propiedad del sitio.
2. **Admin → Flujos de datos → Web** → copiar el **ID de medición** (`G-XXXXXXXXXX`).
3. En Vercel: **Settings → Environment Variables** → `NEXT_PUBLIC_GA_MEASUREMENT_ID` = ese ID (Production).
4. Redeploy. En GA, pestaña **Informes → Tiempo real** deberías ver visitas al abrir www.rhinoscopy.com.ar.
