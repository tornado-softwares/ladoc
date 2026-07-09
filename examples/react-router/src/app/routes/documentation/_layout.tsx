import { DocumentationSidebar, DocumentationLayout, Button } from '@ladoc/react';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <DocumentationLayout>
      <DocumentationSidebar />
      <Outlet />
    </DocumentationLayout>
  );
}
