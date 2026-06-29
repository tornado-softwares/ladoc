import { Suspense, useEffect, useState } from 'react';
import { Await } from 'react-router';

import pages from 'virtual:ladoc:pages';

const keys = Object.keys(pages);
const values = Object.values(pages);

export default function Home() {
  return (
    <main className="max-w-337.5 w-full mx-auto mt-20 flex flex-col items-start gap-2">
      <p>Hello World :)</p>
      {JSON.stringify(keys)}
      {JSON.stringify(values)}
      <div className="grid gap-2 grid-cols-4 w-full">
        {keys.map((key) => {
          const page = pages[key]();
          return (
            <Suspense key={key} fallback={<p>Loading.</p>}>
              <Await resolve={page}>
                {(value) => {
                  return (
                    <div className="flex flex-col size-full">
                      <p className="bg-emerald-100 rounded-t-sm p-1 text-xs">{key}</p>
                      <pre className="size-full bg-black text-white w-auto rounded-b-sm font-mono p-2 text-xs">{value.default}</pre>
                    </div>
                  );
                }}
              </Await>
            </Suspense>
          );
        })}
      </div>
      <p>TODO: Choper l'arbre des pages</p>
      <p>TODO: Reload quand un fichier ajouté/delete au folder </p>
      <p>TODO: Generer un dict {'{ path : () => @import(virtual:ladoc:filepath) }'}</p>
    </main>
  );
}
