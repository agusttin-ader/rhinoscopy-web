/**
 * Certificados: desactivar con `NEXT_PUBLIC_CERTIFICADOS_PORTAL_ENABLED=false`
 * (pantalla “Próximamente”).
 */
export const certificadosPortalEnabled =
  process.env.NEXT_PUBLIC_CERTIFICADOS_PORTAL_ENABLED !== "false";
