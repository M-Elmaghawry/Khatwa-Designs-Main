// Composable patterns. Invoke inside useGsap's scoped context; it owns every
// tween/trigger. No global selectors, scroll listeners or persistent instances.
const entrance = { duration: 0.72, ease: 'power3.out' };
const trigger = element => ({ trigger: element, start: 'top 92%', once: true });

export function scrollReveal({ gsap }, element) {
  return gsap.from(element, { ...entrance, y: 18, opacity: 0.45, scrollTrigger: trigger(element) });
}
export function textReveal({ gsap }, heading) {
  return gsap.from(heading.querySelectorAll('[data-motion-word]'), {
    ...entrance, y: 12, opacity: 0.4, stagger: { amount: 0.22 }, scrollTrigger: trigger(heading)
  });
}
export function imageReveal({ gsap }, frame) {
  return gsap.from(frame, { ...entrance, duration: 0.9, clipPath: 'inset(0% 0% 100% 0%)', scrollTrigger: trigger(frame) });
}
export function imageParallax({ gsap }, image) {
  return gsap.fromTo(image, { yPercent: -2 }, { yPercent: 2, ease: 'none', scrollTrigger: {
    trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6
  } });
}
export function timelineReveal({ gsap }, list) {
  const items = list.querySelectorAll('[data-motion-step]');
  return Array.from(items, item => gsap.timeline({ scrollTrigger: trigger(item) })
    .from(item.querySelector('[data-step-number]'), { scale: 0.8, opacity: 0.4, duration: 0.5, ease: 'power3.out' })
    .from(item.querySelector('[data-step-copy]'), { y: 14, opacity: 0.45, ...entrance }, 0.08));
}
export function sectionTransition({ gsap }, rule) {
  return gsap.from(rule, { scaleX: 0.08, transformOrigin: 'center', ...entrance, scrollTrigger: trigger(rule) });
}
export function ctaEntrance({ gsap }, section) {
  return gsap.timeline({ scrollTrigger: trigger(section) })
    .from(section.querySelector('[data-cta-copy]'), { ...entrance, y: 24, opacity: 0.4 })
    .from(section.querySelector('[data-cta-glow]'), { scale: 0.7, opacity: 0, duration: 1.2, ease: 'power2.out' }, 0);
}

export function createSectionMotion(tools, element) {
  const tweens = [];
  const owned = selector => Array.from(element.querySelectorAll(selector)).filter(node => {
    const owner = node.closest('[data-motion-scope]');
    return !owner || owner === element;
  });
  const each = (selector, pattern) => owned(selector).forEach(node => {
    const result = pattern(tools, node);
    tweens.push(...(Array.isArray(result) ? result : [result]));
  });
  each('[data-motion-heading]', textReveal);
  each('[data-motion-reveal]', scrollReveal);
  each('[data-motion-image]', imageReveal);
  each('[data-motion-timeline]', timelineReveal);
  each('[data-motion-rule]', sectionTransition);
  if (element.matches('[data-motion-cta]')) tweens.push(ctaEntrance(tools, element));
  const media = tools.gsap.matchMedia();
  media.add('(min-width: 60rem) and (pointer: fine)', () => {
    owned('[data-motion-parallax]').forEach(image => imageParallax(tools, image));
  });
  // Focus never waits for choreography. Essential copy/links are never hidden;
  // finishing the local reveals also exposes the image of a focused project.
  const onFocus = () => tweens.forEach(tween => tween.progress(1));
  element.addEventListener('focusin', onFocus);
  let active = true;
  document.fonts?.ready.then(() => { if (active) tools.ScrollTrigger.refresh(); });
  return () => { active = false; element.removeEventListener('focusin', onFocus); media.revert(); };
}
