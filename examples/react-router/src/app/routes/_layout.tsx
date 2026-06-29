import type { Route } from './+types/_index';
import { Outlet } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Website' }, { name: 'description', content: 'This is a React Router website.' }];
}

export default function Layout() {
  return (
    <main className="min-h-screen relative">
      <Outlet />
    </main>
  );
}
