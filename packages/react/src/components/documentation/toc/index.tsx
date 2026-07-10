import type { BaseHTMLAttributes } from 'react';
import styles from '@ladoc/styles/components/documentation/toc/index.module.css';
import clsx from 'clsx';

export interface DocumentationTocProps extends BaseHTMLAttributes<HTMLBaseElement> {}

export function DocumentationToc({ className, children, ...props }: DocumentationTocProps) {
  return <aside className={clsx(styles['default'], className)} {...props}></aside>;
}
