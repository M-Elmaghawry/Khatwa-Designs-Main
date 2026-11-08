import pages from './pages.json' with { type: 'json' };
import projects from './projects.json' with { type: 'json' };

export function findNodes(node, predicate) {
  if (typeof node === 'string') return [];
  return [...(predicate(node) ? [node] : []), ...node.children.flatMap(child => findNodes(child, predicate))];
}
export function sourceText(node, t) {
  if (typeof node === 'string') return node;
  return node.attrs['data-i18n'] ? t(node.attrs['data-i18n']) : node.children.map(child => sourceText(child, t)).join('');
}
const blockTags = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'a', 'contact-form', 'aside', 'blockquote', 'figure', 'table']);
// Remove obsolete layout wrappers only. Complete semantic nodes (including
// inline spans/links, exact text, IDs and translation keys) stay source-backed.
export function sourceBlocks(node) {
  if (typeof node === 'string') return node.trim() ? [node] : [];
  return blockTags.has(node.tag) ? [node] : node.children.flatMap(sourceBlocks);
}
export function heroModel(file) {
  const blocks = sourceBlocks(pages[file].sections[0]);
  return { heading: blocks.find(node => node.tag === 'h1'),
    intro: blocks.filter(node => node.tag === 'p'), actions: blocks.filter(node => node.tag === 'a') };
}
export function sectionGroups(section) {
  const groups = [];
  for (const node of sourceBlocks(section)) {
    if (/^h[24]$/.test(node.tag)) groups.push({ heading: node, nodes: [] });
    else { if (!groups.length) groups.push({ heading: null, nodes: [] }); groups.at(-1).nodes.push(node); }
  }
  return groups;
}
export const galleryProjects = findNodes(pages['portfolio.html'].sections[1], node => node.tag === 'article').map(card => {
  const image = findNodes(card, node => node.tag === 'img')[0];
  const category = findNodes(card, node => node.tag === 'span' && node.attrs['data-i18n'])[0];
  const action = findNodes(card, node => node.tag === 'a').at(-1);
  return { ...projects.find(project => project.image === image.attrs.src), categoryKey: category.attrs['data-i18n'], ctaKey: action.attrs['data-i18n'] };
});

export const innerUi = {
  ar: { breadcrumb: 'مسار الصفحة', relatedServices: 'خدمات ذات صلة', relatedProjects: 'أعمال ذات صلة', covers: 'الأغلفة المعروضة مؤقتة؛ شاهد تفاصيل الأعمال الأصلية على Behance.', results: count => `عدد المشروعات: ${count}` },
  en: { breadcrumb: 'Breadcrumb', relatedServices: 'Related services', relatedProjects: 'Related work', covers: 'Temporary project covers; view the original work on Behance.', results: count => `${count} projects` }
};
