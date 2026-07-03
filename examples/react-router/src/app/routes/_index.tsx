import { Suspense, useEffect, useState } from 'react';
import { Await } from 'react-router';
import '@/assets/styles/markdown.css';
import pages from 'virtual:ladoc:pages';
const languages = Object.keys(pages);

export default function Home() {
  return (
    <main className="max-w-337.5 w-full mx-auto mt-20 flex flex-col items-start gap-2">
      <p>Hello World :)</p>
      {languages.map((language) => {
        const language_pages = Object.keys(pages[language]);
        return (
          <div key={language} className="space-y-3">
            <h1 className="text-xl">{language}</h1>
            <div className="grid gap-2 grid-cols-4 w-full">
              {language_pages.map((language_page) => {
                const page = pages[language][language_page]();
                return (
                  <Suspense key={language_page} fallback={<p>Loading.</p>}>
                    <Await resolve={page}>
                      {(value) => {
                        return (
                          <div className="flex flex-col size-full">
                            <p className="bg-emerald-100 rounded-t-sm p-1 text-xs">{language_page}</p>
                            <div dangerouslySetInnerHTML={{ __html: value.default }} className="p-4 ladoc-markdown" />
                          </div>
                        );
                      }}
                    </Await>
                  </Suspense>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}
