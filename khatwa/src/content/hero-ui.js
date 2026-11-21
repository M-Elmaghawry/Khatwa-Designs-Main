// Interface labels only. Marketing text stays in the preserved source catalogs.
export const heroUi = {
  ar: { scroll: 'استكشف أعمالنا', identity: 'هوية خطوة للتصميمات الأصلية', since: 'منذ ٢٠٢١', board: 'الهوية البصرية', index: '٠١ / خطوة' },
  en: { scroll: 'Scroll to explore our work', identity: 'Original Khatwa Designs brand identity', since: 'Since 2021', board: 'Brand identity', index: '01 / KHATWA' }
};

export function headlineLines(text, language) {
  // Whole words/phrases preserve Arabic joining. Never split letters or glyphs.
  const words = text.trim().split(/\s+/u);
  const lengths = language === 'ar' ? [2, 2] : [2, 3];
  let offset = 0;
  return [...lengths.map(length => { const line = words.slice(offset, offset + length).join(' '); offset += length; return line; }), words.slice(offset).join(' ')].filter(Boolean);
}
