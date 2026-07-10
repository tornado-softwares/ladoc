import { useEffect, useState } from 'react';
import clsx from 'clsx';

const items = [
  'Introduction',
  'The Root Directory',
  'The app Directory',
  'The bootstrap Directory',
  'The config Directory',
  'The database Directory',
  'The public Directory',
  'The resources Directory',
  'The routes Directory',
  'The storage Directory',
];

export function OnThisPage1() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-72 rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      <h3 className="mb-5 text-sm font-semibold text-zinc-100">On this page</h3>

      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-px bg-zinc-800" />

        <ul className="space-y-1">
          {items.map((item, i) => {
            const focused = active === i;

            return (
              <li key={item}>
                <button
                  className={clsx(
                    '-ml-px group relative flex w-full items-center border-l-[3px] pl-4 py-1.5 text-left text-[13px] transition-all duration-300',
                    focused ? 'border-red-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  <span className={clsx('transition-transform duration-300', focused && 'translate-x-1')}>{item}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <div className="h-screen w-full grid place-items-center">
      <div className="-600 size-40">
        <OnThisPage1 />
      </div>
    </div>
  );
}
