/**
 * Certificados: `false` = pantalla “Próximamente” (temporal).
 * Para restaurar el buscador completo en Vercel: `NEXT_PUBLIC_CERTIFICADOS_PORTAL_ENABLED=true`
 */
export const certificadosPortalEnabled =
  process.env.NEXT_PUBLIC_CERTIFICADOS_PORTAL_ENABLED === "true";
