"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  smoothScrollToId,
  smoothScrollToIdWhenReady,
  smoothScrollToTop,
  splitHref,
} from "@/lib/smooth-nav";
import type { ComponentProps, MouseEvent } from "react";

type SmoothNavLinkProps = ComponentProps<typeof Link> & {
  onAfterNavigate?: () => void;
};

export function SmoothNavLink({
  href,
  onClick,
  onAfterNavigate,
  ...props
}: SmoothNavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const hrefString = typeof href === "string" ? href : String(href);
  const { pathname: targetPath, hash } = splitHref(hrefString);
  const onHome = pathname === "/";

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const isHomeTarget = targetPath === "/";

    if (isHomeTarget && !hash) {
      if (onHome) {
        event.preventDefault();
        smoothScrollToTop();
        onAfterNavigate?.();
      }
      return;
    }

    if (isHomeTarget && hash) {
      if (onHome) {
        event.preventDefault();
        smoothScrollToId(hash);
        onAfterNavigate?.();
        return;
      }

      event.preventDefault();
      router.push(hrefString);
      smoothScrollToIdWhenReady(hash);
      onAfterNavigate?.();
    }
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
