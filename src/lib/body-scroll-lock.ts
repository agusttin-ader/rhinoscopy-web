let lockCount = 0;
let savedScrollY = 0;

function restoreScrollPosition() {
  const html = document.documentElement;
  const previousScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, savedScrollY);
  html.style.scrollBehavior = previousScrollBehavior;
}

/** Bloquea scroll de fondo (p. ej. modales). Devuelve función para restaurar. */
export function lockBodyScroll(): () => void {
  if (typeof document === "undefined") return () => {};

  const html = document.documentElement;
  const body = document.body;

  if (lockCount === 0) {
    savedScrollY = window.scrollY;

    const scrollbarGap = window.innerWidth - html.clientWidth;

    html.classList.add("scroll-locked");
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";

    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }
  }

  lockCount += 1;

  return () => {
    if (lockCount <= 0) return;

    lockCount -= 1;
    if (lockCount > 0) return;

    lockCount = 0;
    html.classList.remove("scroll-locked");
    html.style.overflow = "";
    html.style.overscrollBehavior = "";
    body.style.overflow = "";
    body.style.paddingRight = "";

    restoreScrollPosition();
  };
}
