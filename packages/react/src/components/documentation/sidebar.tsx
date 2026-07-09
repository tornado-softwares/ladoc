import type { ButtonHTMLAttributes } from 'react';
import styles from '@ladoc/styles/components/documentation/sidebar.module.css';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLBaseElement> {}

export function DocumentationSidebar({ className, children, ...props }: ButtonProps) {
  return (
    <aside className={clsx(styles['default'], className)} {...props}>
      This is a sidebarr
    </aside>
  );
}
