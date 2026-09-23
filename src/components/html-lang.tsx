"use client";

import { useEffect } from "react";

/** Sincroniza `lang` en `<html>` cuando el layout de locale no puede envolver la raíz. */
export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
