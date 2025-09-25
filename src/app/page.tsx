
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

type ReferencePage = {
  name: string;
  description: string;
  slug: string;
};

function getReferencePages(): ReferencePage[] {
  const root = path.join(process.cwd(), 'reference');
  const files: string[] = [];
  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(path.join(dir, entry.name));
      else if (entry.name.endsWith('.yml')) files.push(path.join(dir, entry.name));
    }
  }
  walk(root);
  return files.map(file => {
    const data = yaml.load(fs.readFileSync(file, 'utf8')) as any;
    const slug = path.relative(root, file).replace(/\\/g, '/').replace(/\.yml$/, '');
    return {
      name: data.name || slug,
      description: data.description || '',
      slug,
    };
  });
}

export default function Home() {
  const pages = getReferencePages();
  return (
    <main className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow mt-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Reference Pages</h1>
      <table className="min-w-full border border-gray-800 rounded overflow-hidden mb-8">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Description</th>
            <th className="px-4 py-2 text-left text-gray-900">Link</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(page => (
            <tr key={page.slug} className="border-t border-gray-800 bg-white hover:bg-gray-50">
              <td className="px-4 py-2 font-semibold text-gray-900">{page.name}</td>
              <td className="px-4 py-2 text-gray-900">{page.description}</td>
              <td className="px-4 py-2 text-center">
                <a className="text-blue-800 underline font-bold" href={`/reference/${page.slug}`}>
                  <code>/reference/{page.slug}</code>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
