export function Surface({ as: Tag = 'div', tone = 'light', className = '', ...props }) {
  return <Tag data-surface={tone} className={`ds-surface ds-surface--${tone} ${className}`} {...props} />;
}
export function Card({ as: Tag = 'div', className = '', ...props }) {
  return <Tag className={'ds-card ' + className} {...props} />;
}
export function EditorialHeading({ as: Tag = 'h2', className = '', ...props }) {
  return <Tag className={'ds-editorial-heading ' + className} {...props} />;
}
