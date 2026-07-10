import type { BaseHTMLAttributes } from 'react';
import styles from '@ladoc/styles/components/documentation/sidebar/index.module.css';
import clsx from 'clsx';

export interface DocumentationSidebarProps extends BaseHTMLAttributes<HTMLBaseElement> {}

export function DocumentationSidebar({ className, children, ...props }: DocumentationSidebarProps) {
  return <aside className={clsx(styles['default'], className)} {...props}></aside>;
}
