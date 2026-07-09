import { data } from 'react-router';
import pages from 'virtual:ladoc:pages';
import type { Route } from './+types/$';
import { get_page } from '@ladoc/server';
import { Suspense } from 'react';
import { DocumentationContent } from '@ladoc/react';

export async function loader({ params }: Route.LoaderArgs) {
  const page = await get_page('/' + params['*'], params.lang);
  if (!page) throw data(null, { status: 404 });
  return { language: params.lang, path: page.path };
}

export default function Page({ loaderData: { language, path } }: Route.ComponentProps) {
  const page = pages[language][path]();
  return (
    <Suspense fallback={<p>Loading.</p>}>
      <DocumentationContent page={page} />
    </Suspense>
  );
}
export { ErrorBoundary } from '@/shared/components/error-boundary';
