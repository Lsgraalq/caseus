/**
 * Calculates the exact coordinates of a character or element relative to a wrapper element.
 * This avoids scroll-dependent and pinning coordinate bugs associated with getBoundingClientRect.
 */
export function getRelativeCoords(element: HTMLElement, wrapper: HTMLElement) {
  let x = 0;
  let y = 0;
  let curr: HTMLElement | null = element;
  while (curr && curr !== wrapper) {
    x += curr.offsetLeft || 0;
    y += curr.offsetTop || 0;
    curr = curr.offsetParent as HTMLElement;
  }
  return { x, y };
}
