// This setup runs inside useGsap's scoped context. Its cleanup is registered with
// the context, including matchMedia-created parallax and background lifecycles.
export function createHeroMotion({ gsap, ScrollTrigger }, element) {
  const select = selector => element.querySelectorAll(selector);
  const reveal = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } });
  reveal
    .from(select('[data-hero-line]'), { yPercent: 110, stagger: 0.13, duration: 1.05 }, 0)
    .from(select('[data-hero-reveal]'), { y: 18, autoAlpha: 0, stagger: 0.09 }, 0.28)
    .from(select('[data-hero-visual]'), { y: 32, autoAlpha: 0, rotation: -3, duration: 1.2 }, 0.16);

  const ambience = gsap.timeline({ paused: true, repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 9 } })
    .to(select('[data-hero-glow="one"]'), { x: 24, y: -18 }, 0)
    .to(select('[data-hero-glow="two"]'), { x: -18, y: 14 }, 0);
  const indicator = gsap.to(select('[data-hero-scroll-mark]'), { y: 5, duration: 1.3, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true });
  const playAmbience = active => { if (active && !document.hidden) { ambience.play(); indicator.play(); } else { ambience.pause(); indicator.pause(); } };
  const visibility = ScrollTrigger.create({ trigger: element, start: 'top bottom', end: 'bottom top', onToggle: state => playAmbience(state.isActive) });
  playAmbience(visibility.isActive);
  const onVisibility = () => playAmbience(visibility.isActive);
  document.addEventListener('visibilitychange', onVisibility);

  const media = gsap.matchMedia();
  media.add('(min-width: 60rem)', () => {
    gsap.to(select('[data-hero-depth]'), { y: 36, ease: 'none', scrollTrigger: { trigger: element, start: 'top top', end: 'bottom top', scrub: 0.7 } });
  });
  let active = true;
  document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
  return () => { active = false; document.removeEventListener('visibilitychange', onVisibility); media.revert(); };
}
