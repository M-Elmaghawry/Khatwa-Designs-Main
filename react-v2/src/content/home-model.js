import pages from './pages.json';
import projects from './projects.json';

function descendants(node, predicate) {
  if (typeof node === 'string') return [];
  return [...(predicate(node) ? [node] : []), ...node.children.flatMap(child => descendants(child, predicate))];
}
// Read curated homepage choices from the preserved source, rather than creating
// a second project/category/attribution catalog that could silently diverge.
const sections = pages['index.html'].sections;
export const featuredProjects = descendants(sections[3], node => node.tag === 'article').map(card => {
  const image = descendants(card, node => node.tag === 'img')[0];
  const category = descendants(card, node => node.tag === 'span' && node.attrs['data-i18n'])[0];
  const project = projects.find(item => item.image === image.attrs.src);
  return { ...project, categoryKey: category.attrs['data-i18n'] };
});
export const homeReviews = descendants(sections[5], node => node.attrs['class']?.includes('bg-white')).map(card => ({
  quoteKey: descendants(card, node => node.tag === 'p')[0].attrs['data-i18n'],
  name: descendants(card, node => node.tag === 'span' && !node.attrs['data-i18n'])[0].children.join(''),
  dateKey: descendants(card, node => node.tag === 'span' && node.attrs['data-i18n'])[0].attrs['data-i18n']
}));
