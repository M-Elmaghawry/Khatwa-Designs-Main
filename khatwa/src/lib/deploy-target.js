// One build-time contract for Vite, prerender, Node tests and browser routing.
export function resolveDeployTarget(env = {}) {
  const target = env.DEPLOY_TARGET || 'github';
  if (!['github', 'cloudflare-preview', 'cloudflare-production'].includes(target)) {
    throw new Error(`Unknown DEPLOY_TARGET: ${target}`);
  }
  if (target === 'cloudflare-production' && env.KHATWA_PRODUCTION_VERIFIED !== 'true') {
    throw new Error('Production is locked. Purchase and verify khatwa-designs.com before setting KHATWA_PRODUCTION_VERIFIED=true.');
  }
  const preview = target === 'cloudflare-preview';
  const base = target === 'github' ? '/Khatwa-Designs-Main/' : '/';
  const origin = target === 'github' ? 'https://m-elmaghawry.github.io' : preview ? 'https://khatwa-designs-main.melmekawy2020.workers.dev' : 'https://khatwa-designs.com';
  return { target, base, origin, preview,
    seoBase: preview ? '/Khatwa-Designs-Main/' : base,
    seoOrigin: preview ? 'https://m-elmaghawry.github.io' : origin };
}

export const DEPLOY = typeof __KHATWA_DEPLOY__ !== 'undefined'
  ? __KHATWA_DEPLOY__
  : resolveDeployTarget(typeof process !== 'undefined' ? process.env : {});
