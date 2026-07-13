import { data } from 'react-router';
import pages from 'virtual:ladoc:pages';
import type { Route } from './+types/$';
import { get_page, get_tree } from '@ladoc/server';
import { Suspense } from 'react';
import { DocumentationSidebar, DocumentationSidebarContent, DocumentationToc, PageContent, PageHeader } from '@ladoc/react';
import * as LucideIcons from 'lucide-react';
export async function loader({ params }: Route.LoaderArgs) {
  const page = await get_page('/' + params['*']);
  if (!page) throw data(null, { status: 404 });
  const {tree} = await get_tree()
  return { language: page.language, path: page.path, tree };
}

export default function Page({ loaderData: { language, path, tree } }: Route.ComponentProps) {
  const page = pages[language][path]();
  return (
    <>
      <DocumentationSidebar tree={tree} hrefBuilder={(href) => '/documentation' + href} currentPath={path} iconResolver={(icon) => {
          if(!icon) return null
          const key = (icon ? icon.charAt(0).toUpperCase() + icon.slice(1) : "ScrollText") as keyof typeof LucideIcons;
          const Icon = LucideIcons[key] as React.ComponentType<{ size?: number }> | undefined;
          return Icon ? <Icon size={15}  /> : null;
      }} />
      <DocumentationSidebarContent>
        <Suspense fallback={<p>Loading.</p>}>
          <PageHeader page={page} />
          <PageContent page={page} />
        </Suspense>
      </DocumentationSidebarContent>
      <Suspense fallback={<p>Loading.</p>}>
        <DocumentationToc page={page} />
      </Suspense>
    </>
   );
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
