import { createElement } from 'react';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { assetUrl } from '../lib/paths.js';
import { SiteLink } from './primitives.jsx';
import { ContactForm } from './ContactForm.jsx';

export function ContentRenderer({ nodes, filter = 'all', onFilter }) {
  const { t } = useLanguage();
  function render(node, key) {
    if (typeof node === 'string') return node;
    const { tag, attrs, children } = node;
    if (tag === 'contact-form') return <ContactForm key={key} />;
    if (attrs['data-cat'] && filter !== 'all' && attrs['data-cat'] !== filter) return null;
    const props = {};
    for (const [name, value] of Object.entries(attrs)) {
      if (name.startsWith('data-i18n')) continue;
      if (name === 'class') props.className = value;
      else if (name === 'tabindex') props.tabIndex = Number(value);
      else if (name === 'src') props.src = assetUrl(value);
      else props[name] = value;
    }
    if (attrs['data-i18n-aria-label']) props['aria-label'] = t(attrs['data-i18n-aria-label']);
    if (tag === 'img') { props.alt = attrs.alt || ''; return createElement(tag, { ...props, key }); }
    if (tag === 'br' || tag === 'hr') return createElement(tag, { ...props, key });
    if (attrs['data-filter'] && onFilter) {
      props.onClick = () => onFilter(attrs['data-filter']);
      props['aria-pressed'] = filter === attrs['data-filter'];
    }
    const content = attrs['data-i18n'] ? t(attrs['data-i18n']) : children.map((child, index) => render(child, key + '.' + index));
    if (tag === 'a') {
      if (props.target === '_blank') props.rel = 'noopener noreferrer';
      return <SiteLink key={key} {...props}>{content}</SiteLink>;
    }
    return createElement(tag, { ...props, key }, content);
  }
  return nodes.map((node, index) => render(node, String(index)));
}
