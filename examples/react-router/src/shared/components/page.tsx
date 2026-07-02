import { use } from 'react';

export function PageContent({ language, path, page }: { language: string; path: string; page: Promise<MarkdownModule> }) {
  const value = use(page);
  return (
    <div className="flex flex-col items-start size-full gap-2">
      <div className="inline-flex gap-2">
        <p className="bg-emerald-600 rounded-sm text-white px-2 py-1 text-sm">{language}</p>
        <p className="bg-emerald-600 rounded-sm text-white px-2 py-1 text-sm">{path}</p>
      </div>
      <div className={'prose'} dangerouslySetInnerHTML={{ __html: value.default }} />
    </div>
  );
}
