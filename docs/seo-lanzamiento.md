# SEO — lanzamiento con www.rhinoscopy.com.ar

Estado actual del proyecto: **metadata, sitemap, robots, hreflang (es/en/pt), Open Graph, Twitter y JSON-LD** ya están en el código. Hasta que el dominio no apunte al hosting, los buscadores **no indexan** (robots + `noindex` en metadata).

## Antes del dominio (ahora)

- Desarrollo local: `NEXT_PUBLIC_SITE_URL` opcional; canonicals usan `http://localhost:3000`.
- Preview en Vercel: sin `NEXT_PUBLIC_SITE_URL`, la base puede ser la URL `*.vercel.app` y **no** se indexa.
- El **logo del header** sigue siendo `logo-RHINOSCOPY-1.png` (favicon = logo sombra).

## Checklist al conectar el dominio

1. **DNS**  
   - `www.rhinoscopy.com.ar` → hosting (recomendado como principal).  
   - Opcional: redirigir `rhinoscopy.com.ar` → `https://www.rhinoscopy.com.ar`.

2. **Variables de entorno (producción)**  
   ```env
   NEXT_PUBLIC_SITE_URL=https://www.rhinoscopy.com.ar
   SEO_ALLOW_INDEXING=true
   ```

3. **Deploy** y verificar:
   - [ ] `https://www.rhinoscopy.com.ar/robots.txt` → `Allow: /` y `Sitemap: …/sitemap.xml`
   - [ ] `https://www.rhinoscopy.com.ar/sitemap.xml` → URLs con dominio correcto (/, /constancias, /en, /pt…)
   - [ ] Vista previa de enlace (WhatsApp/LinkedIn) con título y descripción
   - [ ] `<html lang="es">` / `en` / `pt` según ruta
   - [ ] Canonical y `hreflang` en el código fuente de home y `/constancias`

4. **Google Search Console**  
   - Propiedad: `https://www.rhinoscopy.com.ar`  
   - Enviar sitemap: `https://www.rhinoscopy.com.ar/sitemap.xml`  
   - Revisar indexación de `/`, `/constancias`, `/en`, `/pt`.

5. **Opcional después**  
   - Imagen OG dedicada 1200×630 (hoy usa el logo sombra).  
   - `google-site-verification` en metadata cuando tengas el código de Search Console.  
   - Analytics (GA4) aparte del SEO.

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `src/lib/site-url.ts` | URL base, dominio producción, reglas de indexación |
| `src/lib/seo.ts` | Metadata por idioma, OG, hreflang, JSON-LD |
| `src/app/sitemap.ts` | Sitemap multilenguaje |
| `src/app/robots.ts` | robots.txt dinámico |
| `src/data/locales/*.ts` | Títulos y descripciones por página |

## Forzar indexación en staging (solo pruebas)

```env
SEO_ALLOW_INDEXING=true
NEXT_PUBLIC_SITE_URL=https://tu-preview.vercel.app
```

No usar en producción final salvo que quieras indexar un preview.
