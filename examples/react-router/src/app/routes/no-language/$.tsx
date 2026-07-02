import { data } from 'react-router';
import pages from 'virtual:ladoc:pages';
import type { Route } from './+types/$';
import { get_page } from '@ladoc/server';
import { Suspense } from 'react';
import { PageContent } from '@/shared/components/page';

export async function loader({ params }: Route.LoaderArgs) {
  const page = await get_page('/' + params['*']);
  if (!page) throw data(null, { status: 404 });
  return { language: page.language, path: page.path };
}

export default function Page({ loaderData: { language, path } }: Route.ComponentProps) {
  const page = pages[language][path]();
  return (
    <div className="max-w-337.5 w-full mx-auto mt-20 flex flex-col items-start gap-2">
      <Suspense fallback={<p>Loading.</p>}>
        <PageContent language={language} page={page} path={path} />
      </Suspense>
    </div>
  );
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
