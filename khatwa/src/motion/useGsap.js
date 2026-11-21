import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

let registered = false;
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
export function getGsap() {
  if (typeof window === 'undefined') return null;
  if (!registered) { gsap.registerPlugin(ScrollTrigger); registered = true; }
  return { gsap, ScrollTrigger };
}
export function loadGsap() {
  return Promise.resolve(getGsap());
}

// Run synchronously before browser paint so entrance states never flash after
// an asynchronous plugin download. Static HTML/CSS remains visible without JS.
export function useGsap(scope, setup, dependencies = []) {
  useBrowserLayoutEffect(() => {
    let disposed = false;
    let context;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const run = () => {
      context?.revert();
      context = undefined;
      if (preference.matches || disposed) return;
      const tools = getGsap();
      if (scope.current) context = tools.gsap.context(() => setup(tools), scope.current);
    };
    run();
    preference.addEventListener('change', run);
    return () => { disposed = true; preference.removeEventListener('change', run); context?.revert(); };
  }, dependencies);
}
