// Set the <title> of each page to the command name
export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const filePath = path.join(process.cwd(), 'reference', ...params.slug) + '.yml';
  const file = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(file) as { name?: string };
  return {
    title: data?.name || 'Reference',
  };
}

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Handlebars from 'handlebars';


// Generate all possible slugs for static export
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  function walk(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : entry.name.endsWith('.yml')
        ? [path.relative('reference', path.join(dir, entry.name)).replace(/\\/g, '/').replace(/\.yml$/, '')]
        : []
    );
  }
  return walk('reference').map((slug: string) => ({ slug: slug.split('/') }));
}

export default async function ReferencePage({ params }: { params: { slug: string[] } }) {
  const filePath = path.join(process.cwd(), 'reference', ...params.slug) + '.yml';
  const file = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(file);

  const templatePath = path.join(process.cwd(), 'src', 'templates', 'reference.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = Handlebars.compile(templateSource);

  const html = template(data);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-4">
      <header className="mb-4 flex items-center">
        <a
          href="/"
          className="bg-slate-700 text-white rounded-full px-4 py-2 shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
          style={{ textDecoration: 'none' }}
          aria-label="Back to home"
        >
          ← Back
        </a>
      </header>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}