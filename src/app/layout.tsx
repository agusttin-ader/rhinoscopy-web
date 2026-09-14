import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Raíz sin locale; `<html>` vive en `app/[locale]/layout.tsx`. */
export default function RootLayout({ children }: Props) {
  return children;
}
