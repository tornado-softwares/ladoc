import type { Route } from './+types/_index';
import { Outlet } from 'react-router';
import { NoiseOverlay } from '@/shared/components/noise';
import { LandingHeader } from '@/features/landing/components/header';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Portfolio' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Layout() {
  return (
    <main className="min-h-screen relative">
      <LandingHeader />
      <NoiseOverlay size={250} opacity={1} />
      <Outlet />
    </main>
  );
}
