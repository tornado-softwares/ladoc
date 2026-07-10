import {
  DocumentationSidebar,
  DocumentationSidebarContent,
  DocumentationLayout,
  DocumentationHeader,
  DocumentationContent,
  DocumentationToc,
} from '@ladoc/react';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <DocumentationLayout>
      <DocumentationHeader />
      <DocumentationContent>
        <DocumentationSidebar />
        <DocumentationSidebarContent>
          <Outlet />
        </DocumentationSidebarContent>
        <DocumentationToc />
      </DocumentationContent>
    </DocumentationLayout>
  );
}
