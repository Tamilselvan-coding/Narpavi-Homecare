export function scrollToAnchor(hash: string): boolean {
  let id: string;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    return false;
  }
  if (!id) return false;

  if (id.startsWith('package-') && typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    const pkgId = id.slice(8);
    window.dispatchEvent(new CustomEvent('narpavi:select-package-tab', { detail: { packageId: pkgId } }));
  }

  const target = document.getElementById(id)
    || (id.startsWith('package-') ? document.getElementById('baby-care-packages') || document.getElementById('elder-packages') || document.getElementById('basic-care-packages') : null);
  if (!target) return false;
  const header = document.getElementById('site-header');
  target.style.scrollMarginTop = `${Math.ceil(header?.getBoundingClientRect().height ?? 0) + 16}px`;
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  });

  // Only focus CTA form name input if the target is explicitly a form or CTA section
  const isFormTarget = id.includes('form') || id.includes('cta') || target.closest?.('.cta-form') || target.querySelector?.('.cta-form');
  if (isFormTarget) {
    const focusNameInput = () => {
      // 1. Look inside the scrolled-to element
      let nameInput = target.querySelector<HTMLInputElement>('input[name="name"]');
      // 2. Look inside the closest section/container parent
      if (!nameInput) {
        nameInput = target.closest('section')?.querySelector<HTMLInputElement>('input[name="name"]') ?? null;
      }
      // 3. Fallback: first CTA form name input on the page
      if (!nameInput) {
        nameInput = document.querySelector<HTMLInputElement>('.cta-form input[name="name"]');
      }

      if (nameInput) {
        nameInput.focus({ preventScroll: true });
      }
    };

    // Retry several times to handle smooth-scroll timing and hydration delays
    window.setTimeout(focusNameInput, 150);
    window.setTimeout(focusNameInput, 450);
    window.setTimeout(focusNameInput, 800);
  }

  return true;
}


// Capture before Next Link handles an already-active URL, so every click scrolls and focuses the form.
export function handleAnchorClick(event: MouseEvent): void {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (!(event.target instanceof Element)) return;
  const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
  if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
  const url = new URL(anchor.href, window.location.href);
  const current = new URL(window.location.href);
  if (url.origin !== current.origin || url.pathname !== current.pathname || url.search !== current.search || !url.hash) return;
  if (!scrollToAnchor(url.hash)) return;
  event.preventDefault();
  if (current.hash !== url.hash) window.history.pushState(null, '', url.href);
}

