import { use } from 'react';
import '@ladoc/styles/markdown.css';

export function PageContent({ page }: { page: Promise<MarkdownModule> }) {
  const value = use(page);
  return (
    <div className="ladoc-markdown">
      <div dangerouslySetInnerHTML={{ __html: value.default.html }} />
    </div>
  );
}
