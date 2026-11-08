import { useEffect } from 'react';

let registration;
export function loadGsap() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  registration ||= Promise.all([import('gsap'), import('gsap/ScrollTrigger.js')]).then(([module, plugin]) => {
    const gsap = module.gsap;
    gsap.registerPlugin(plugin.ScrollTrigger);
    return { gsap, ScrollTrigger: plugin.ScrollTrigger };
  });
  return registration;
}

// setup receives the registered tools and scoped selector context. No motion is
// enabled by default. Revert on unmount/dependency change/reduced-motion change.
export function useGsap(scope, setup, dependencies = []) {
  useEffect(() => {
    let disposed = false;
    let context;
    let revision = 0;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const run = async () => {
      const currentRevision = ++revision;
      context?.revert();
      context = undefined;
      if (preference.matches || disposed) return;
      const tools = await loadGsap();
      if (!disposed && currentRevision === revision && !preference.matches && scope.current) context = tools.gsap.context(() => setup(tools), scope.current);
    };
    run();
    preference.addEventListener('change', run);
    return () => { disposed = true; preference.removeEventListener('change', run); context?.revert(); };
  }, dependencies);
}
