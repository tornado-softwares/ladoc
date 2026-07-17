import { renderMermaidSVG } from 'beautiful-mermaid';
import type { MarkedExtension } from 'marked';

export const marked_mermaid_plugin: MarkedExtension = {
  renderer: {
    code({ text, lang }) {
      const [language] = lang?.split(' ') ?? [];
      if (language === 'mermaid') {
        return renderMermaidSVG(text, {
          transparent: true,
          accent: 'var(--_ladoc-color-text-primary)',
          bg: 'var(--_ladoc-color-background)',
          fg: 'var(--_ladoc-color-text)',
        });
      }
      return false;
    },
  },
};
