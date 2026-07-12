import { data } from 'react-router';
import pages from 'virtual:ladoc:pages';
import type { Route } from './+types/$';
import { get_page } from '@ladoc/server';
import { Suspense } from 'react';
import { DocumentationSidebarContent, DocumentationToc, PageContent, PageHeader } from '@ladoc/react';

export async function loader({ params }: Route.LoaderArgs) {
  const page = await get_page('/' + params['*']);
  if (!page) throw data(null, { status: 404 });
  return { language: page.language, path: page.path };
}

export default function Page({ loaderData: { language, path } }: Route.ComponentProps) {
  const page = pages[language][path]();
  return (
    <>
      <DocumentationSidebarContent>
        <Suspense fallback={<p>Loading.</p>}>
          <PageHeader page={page} />
          <PageContent page={page} />
        </Suspense>
      </DocumentationSidebarContent>
      <DocumentationToc page={page} />
    </>
   );
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
