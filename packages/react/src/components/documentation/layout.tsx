import type { ReactNode, BaseHTMLAttributes } from 'react';
import styles from '@ladoc/styles/components/documentation/layout.module.css';
import clsx from 'clsx';

export interface DocumentationLayoutProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function DocumentationLayout({ children, className, ...props }: DocumentationLayoutProps) {
  return (
    <main className={clsx(styles['default'], className)} {...props}>
      {children}
    </main>
  );
}
