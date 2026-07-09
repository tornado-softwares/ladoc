import type { ReactNode } from 'react';

export function DocumentationLayout({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--ladoc-color-background)',
        display: 'flex',
      }}
    >
      {children}
    </main>
  );
}
