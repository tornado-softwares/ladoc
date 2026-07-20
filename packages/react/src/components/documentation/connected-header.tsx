import type { BaseHTMLAttributes } from 'react';
import { DocumentationHeader } from './header';
import { useDocumentationLayout } from './layout';

export interface ConnectedDocumentationHeaderProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function ConnectedDocumentationHeader(props: ConnectedDocumentationHeaderProps) {
  const { toggleSidebar } = useDocumentationLayout();

  return <DocumentationHeader onMenuToggle={toggleSidebar} {...props} />;
}
