import type MarkdownIt from 'markdown-it';
import { renderMermaidSVG } from 'beautiful-mermaid';

export function markdown_it_mermaid_plugin(md: MarkdownIt) {
  const defaultFenceRenderer = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const info = token.info ? token.info.trim() : '';

    const [language] = info.split(/\s+/);

    if (language === 'mermaid') {
      return renderMermaidSVG(token.content, {
        transparent: true,
        accent: 'var(--_ladoc-color-text-primary)',
        bg: 'var(--_ladoc-color-background)',
        fg: 'var(--_ladoc-color-text)',
      });
    }

    if (defaultFenceRenderer) {
      return defaultFenceRenderer(tokens, idx, options, env, self);
    }

    return self.renderToken(tokens, idx, options);
  };
}
