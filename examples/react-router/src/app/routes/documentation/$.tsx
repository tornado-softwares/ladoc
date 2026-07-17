import { data } from 'react-router';
import pages from 'virtual:ladoc:pages';
import type { Route } from './+types/$';
import { Suspense } from 'react';
import { Button, DocumentationSidebarContent, DocumentationToc, PageContent, PageHeader } from '@ladoc/react';

export async function loader({ params }: Route.LoaderArgs) {
  const { get_page } = await import('@ladoc/server');
  const page = await get_page('/' + params['*']);
  if (!page) throw data(null, { status: 404 });
  return { language: page.language, path: page.path };
}

export default function Page({ params, loaderData: { language, path } }: Route.ComponentProps) {
  const page = pages[language][path]();
  return (
    <>
      <DocumentationSidebarContent>
        <Suspense fallback={<p>Loading.</p>}>
          <PageHeader page={page} />
          <PageContent
            page={page}
            components={{
              Button: Button,
            }}
          />
        </Suspense>
      </DocumentationSidebarContent>
      <Suspense fallback={<p>Loading.</p>}>
        <DocumentationToc page={page} />
      </Suspense>
    </>
  );
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
