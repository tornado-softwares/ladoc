import type { Route } from './+types/_index';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Portfolio' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
  return (
    <main className="max-w-337.5 w-full mx-auto mt-20 ">
      <section className="space-y-3">
        <p>The best documentation framework</p>
      </section>
      <section className="space-y-3">
        <h1>Features</h1>
      </section>
      <div className="hidden absolute top-0 right-0">
        <ThemeToggle />
      </div>
    </main>
  );
}
