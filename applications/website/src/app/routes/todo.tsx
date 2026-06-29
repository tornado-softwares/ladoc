import type { Route } from './+types/_index';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Ma todo de clochard' }, { name: 'description', content: 'Aller bibi' }];
}

export default function Home() {
  return (
    <div className="flex flex-col p-4 gap-2 text-2xl">
      <p>KNN MINST Image predict</p>
      <p>Rust GGUF Metadata</p>
      <p>BPE Tokenizer</p>

      <br />
      <br />

      <p> Sleetch (Chat ,API ,CLI ,ImageGen ,Workflows) </p>

      <br />
      <br />

      <p>Tech Stack</p>

      <br />
      <br />

      <p>SWS</p>
      <p>chatbot nuit info</p>
      <p>snake nuit info / snake.ts</p>
      <br />
      <br />

      <p>OS</p>
    </div>
  );
}
