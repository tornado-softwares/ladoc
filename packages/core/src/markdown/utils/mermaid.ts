import { renderMermaidSVG } from 'beautiful-mermaid';

export const get_mermaid_svg = (content: string) =>
  renderMermaidSVG(content, {
    transparent: true,
    accent: 'var(--_ladoc-color-text-primary)',
    bg: 'var(--_ladoc-color-background)',
    fg: 'var(--_ladoc-color-text)',
  })
    .replace(/-?\d+\.\d+/g, (n) =>
      Number(n)
        .toFixed(2)
        .replace(/\.?0+$/, '')
    )
    .replace(/@import\s+url\([^)]*\);\s*/g, '')
    .replace(/font-family:[^;]+;/, 'font-family: var(--_ladoc-font-base), system-ui, sans-serif;');
