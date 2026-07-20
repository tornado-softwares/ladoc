/*
  AI Generated :(
  Needs more testing
*/

import type { BaseHTMLAttributes, ReactNode } from 'react';
import { useMemo, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from '@ladoc/styles/components/documentation/sidebar/index.module.css';
import type { TreeObject, Page, Category, Data } from '@ladoc/core/routing';

export interface DocumentationSidebarProps extends BaseHTMLAttributes<HTMLBaseElement> {
  tree: TreeObject[];
  currentPath?: string;
  hrefBuilder?: (path: string) => string;
  iconResolver?: (icon?: string) => ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const defaultHrefBuilder = (path: string) => path;
const defaultIconResolver = (): ReactNode => null;

export function DocumentationSidebar({
  className,
  children,
  tree,
  currentPath,
  hrefBuilder = defaultHrefBuilder,
  iconResolver = defaultIconResolver,
  isOpen = false,
  onClose,
  ...props
}: DocumentationSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className={styles['overlay']} onClick={onClose} />}
      <aside className={clsx(styles['sidebar'], isOpen && styles['sidebar-open'], className)} {...props}>
        <nav className={styles['nav']}>
          <SidebarTree nodes={tree} depth={1} currentPath={currentPath} hrefBuilder={hrefBuilder} iconResolver={iconResolver} onLinkClick={onClose} />
        </nav>
        {children}
      </aside>
    </>
  );
}

function getCategoryData(category: Category): Data | undefined {
  return category.children.find((c): c is Data => c.type === 'data' && c.id === '_data');
}

function getCategoryIndex(category: Category): Page | undefined {
  return category.children.find((c): c is Page => c.type === 'page' && c.index === true);
}

function getOrder(node: TreeObject): number {
  if (node.type === 'category') {
    const data = getCategoryData(node);
    return data?.frontmatter?.order ?? Number.POSITIVE_INFINITY;
  }
  if (node.type === 'page') {
    return (node.frontmatter as { order?: number }).order ?? Number.POSITIVE_INFINITY;
  }
  return Number.POSITIVE_INFINITY;
}

function sortNodes(nodes: TreeObject[]): TreeObject[] {
  return nodes
    .map((node, index) => ({ node, index }))
    .filter(({ node }) => node.type !== 'data')
    .sort((a, b) => {
      const diff = getOrder(a.node) - getOrder(b.node);
      return diff !== 0 ? diff : a.index - b.index;
    })
    .map(({ node }) => node);
}

function resolveTitle(title: string, fallbackId: string): string {
  return title && title !== 'No title.' ? title : fallbackId;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(styles['chevron'], open && styles['chevron-open'])}
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

interface HrefContext {
  currentPath?: string;
  hrefBuilder: (path: string) => string;
  iconResolver: (icon?: string) => ReactNode;
  onLinkClick?: () => void;
}

interface SidebarTreeProps extends HrefContext {
  nodes: TreeObject[];
  depth: number;
}

function SidebarTree({ nodes, depth, currentPath, hrefBuilder, iconResolver, onLinkClick }: SidebarTreeProps) {
  const sorted = useMemo(() => sortNodes(nodes), [nodes]);

  return (
    <ul className={styles['list']} data-depth={depth}>
      {sorted.map((node) => {
        if (node.type === 'page') {
          if (node.index) return null;

          const isActive = node.path === currentPath;
          const icon = iconResolver(node.frontmatter.icon);

          return (
            <li key={node.id} className={styles['item']}>
              <a
                href={hrefBuilder(node.path)}
                className={clsx(styles['link'], isActive && styles['active'])}
                style={{ '--depth': depth } as React.CSSProperties}
                onClick={onLinkClick}
              >
                {icon && <span className={styles['icon']}>{icon}</span>}
                <span className={styles['label']}>{resolveTitle(node.frontmatter.title, node.id)}</span>
              </a>
            </li>
          );
        }

        if (node.type === 'category') {
          return (
            <CategoryItem
              key={node.id}
              category={node}
              depth={depth}
              currentPath={currentPath}
              hrefBuilder={hrefBuilder}
              iconResolver={iconResolver}
              onLinkClick={onLinkClick}
            />
          );
        }

        return null;
      })}
    </ul>
  );
}

interface CategoryItemProps extends HrefContext {
  category: Category;
  depth: number;
}

function CategoryItem({ category, depth, currentPath, hrefBuilder, iconResolver, onLinkClick }: CategoryItemProps) {
  const indexPage = getCategoryIndex(category);
  const data = getCategoryData(category);

  const title = data?.frontmatter?.title ?? (indexPage ? resolveTitle(indexPage.frontmatter.title, category.id) : category.id);

  const iconName = data?.frontmatter?.icon ?? indexPage?.frontmatter?.icon;
  const icon = iconResolver(iconName);

  const childNodes = category.children.filter((c) => c.type !== 'data' && !(c.type === 'page' && c.index === true));

  const hasChildren = childNodes.length > 0;
  const isIndexActive = indexPage ? indexPage.path === currentPath : false;

  const [open, setOpen] = useState(true);

  return (
    <li className={styles['item']}>
      <div className={styles['row']}>
        {indexPage ? (
          <a
            href={hrefBuilder(indexPage.path)}
            className={clsx(styles['link'], styles['category-link'], isIndexActive && styles['active'])}
            style={{ '--depth': depth } as React.CSSProperties}
            onClick={onLinkClick}
          >
            {icon && <span className={styles['icon']}>{icon}</span>}
            <span className={styles['label']}>{title}</span>
          </a>
        ) : (
          <button
            type="button"
            className={clsx(styles['link'], styles['category-label'])}
            style={{ '--depth': depth } as React.CSSProperties}
            onClick={() => hasChildren && setOpen((o) => !o)}
          >
            {icon && <span className={styles['icon']}>{icon}</span>}
            <span className={styles['label']}>{title}</span>
          </button>
        )}

        {hasChildren && (
          <button
            type="button"
            className={styles['toggle']}
            aria-label={open ? 'Collapse' : 'Expand'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Chevron open={open} />
          </button>
        )}
      </div>

      {hasChildren && open && (
        <SidebarTree
          nodes={childNodes}
          depth={depth + 1}
          currentPath={currentPath}
          hrefBuilder={hrefBuilder}
          iconResolver={iconResolver}
          onLinkClick={onLinkClick}
        />
      )}
    </li>
  );
}
