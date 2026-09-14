/** Evita doble animación cuando el cambio de idioma usa View Transitions API. */
let pendingViewTransition = false;

export function markLocaleViewTransition(): void {
  pendingViewTransition = true;
}

export function consumeLocaleViewTransition(): boolean {
  if (!pendingViewTransition) return false;
  pendingViewTransition = false;
  return true;
}

export function runLocaleChange(navigate: () => void): void {
  if (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    typeof document.startViewTransition === "function"
  ) {
    markLocaleViewTransition();
    document.startViewTransition(() => {
      navigate();
    });
    return;
  }
  navigate();
}
