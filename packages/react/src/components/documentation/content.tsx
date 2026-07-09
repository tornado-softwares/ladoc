import { use } from 'react';
import '@ladoc/styles/markdown.css';

export function DocumentationContent({ page }: { page: Promise<MarkdownModule> }) {
  const value = use(page);
  return (
    <div className="ladoc-markdown">
      <pre className=" p-4 ">{JSON.stringify(value.default.frontmatter, null, 2)}</pre>
      <div dangerouslySetInnerHTML={{ __html: value.default.html }} />
    </div>
  );
}
