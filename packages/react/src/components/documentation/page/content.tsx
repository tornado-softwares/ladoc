import { use } from 'react';
import '@ladoc/styles/markdown.css';
import { run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import type { MDXComponents } from 'mdx/types';

function compileMDX(code: string) {
  return run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });
}

export function PageContent({ page, components }: { page: Promise<MarkdownModule>; components?: MDXComponents }) {
  const value = use(page);

  if (value.default.engine_output.type == 'html') {
    return (
      <div className="ladoc-markdown">
        <div dangerouslySetInnerHTML={{ __html: value.default.engine_output.html }} />
      </div>
    );
  }

  const compiled = use(compileMDX(value.default.engine_output.code));
  const Content = compiled.default;

  return (
    <div className="ladoc-markdown">
      <Content components={components} />
    </div>
  );
}
