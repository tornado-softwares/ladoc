import type { BaseHTMLAttributes } from 'react';
import styles from '@ladoc/styles/components/documentation/header.module.css';
import clsx from 'clsx';

export interface DocumentationHeaderProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function DocumentationHeader({ className, children, ...props }: DocumentationHeaderProps) {
  return <div className={clsx(styles['default'], className)} {...props}></div>;
}
