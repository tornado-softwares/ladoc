import { isRouteErrorResponse } from 'react-router';
import { useRouteError } from 'react-router';

export function ErrorBoundary() {
  const error = useRouteError();
  let message = 'Oops !';
  let details = "Une erreur inconnue s'est produite.";
  let stack: string | undefined;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? "La page demandée n'existe pas. " : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen p-8 space-y-2  bg-card w-full">
      <h1 className="text-2xl">{message}</h1>
      <p className="text-lg font-patrona">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
