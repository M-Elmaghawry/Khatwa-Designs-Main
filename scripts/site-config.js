'use strict';

// Keep old URLs reachable without advertising retired services.
const redirects = {
  'logo-design.html': 'brand-identity.html',
  'services-details.html': 'services.html',
  'social-media-management.html': 'services.html',
  'video-presentations.html': 'services.html',
  'n8n-ai-automations.html': 'services.html'
};
const excludedPages = new Set([
  'blog.html', 'blog-single-clean.html', 'coming-soon.html',
  'maintenance.html', 'search-result.html'
]);

module.exports = { redirects, excludedPages };
