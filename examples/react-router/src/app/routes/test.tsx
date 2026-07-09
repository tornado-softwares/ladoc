import '@ladoc/styles/markdown.css';
import { Button } from '@ladoc/react';
import { DocumentationSidebar, DocumentationLayout } from '@ladoc/react';

function DocumentationContent() {
  return (
    <div className="ladoc-markdown">
      <div className="ladoc-markdown p-4">
        <h1>Hello !</h1>
        <p>Blablabla</p>
        <ul>
          <li>Step 1 </li>
          <li>Step 2 </li>
          <li>Step 3 </li>
        </ul>
        <div className=" no-ladoc-markdown">
          <h1>Hello !</h1>
          <p>Blablabla</p>
          <ul>
            <li>Step 1 </li>
            <li>Step 2 </li>
            <li>Step 3 </li>
          </ul>
        </div>
      </div>
      <div className="space-x-4">
        <Button>This is a primary Button</Button>
        <Button variant="secondary">This is a secondary Button</Button>
        <Button
          onClick={() => {
            alert('Hello !!');
          }}
          variant="secondary"
        >
          Click me !
        </Button>
      </div>
      <h1>Markdown: Syntax</h1>
      <h2>Overview</h2>
      <h3>Philosophy</h3>
      <p>Markdown is intended to be as easy-to-read and easy-to-write as is feasible.</p>
      <p>
        Readability, however, is emphasized above all else. A Markdown-formatted document should be publishable as-is, as plain text, without looking
        like it's been marked up with tags or formatting instructions. While Markdown's syntax has been influenced by several existing text-to-HTML
        filters -- including <a href="http://docutils.sourceforge.net/mirror/setext.html">Setext</a>,{' '}
        <a href="http://www.aaronsw.com/2002/atx/">atx</a>, <a href="http://textism.com/tools/textile/">Textile</a>,{' '}
        <a href="http://docutils.sourceforge.net/rst.html">reStructuredText</a>,<a href="http://www.triptico.com/software/grutatxt.html">Grutatext</a>
        , and <a href="http://ettext.taint.org/doc/">EtText</a> -- the single biggest source of inspiration for Markdown's syntax is the format of
        plain text email.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <DocumentationLayout>
      <DocumentationSidebar />
      <DocumentationContent />
    </DocumentationLayout>
  );
}
