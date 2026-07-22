import { DocumentationLayout, ConnectedDocumentationHeader } from '@ladoc/react';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <DocumentationLayout>
      <ConnectedDocumentationHeader />
      <Outlet />
    </DocumentationLayout>
  );
}
