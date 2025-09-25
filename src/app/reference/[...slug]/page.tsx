import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Handlebars from 'handlebars';

export default async function ReferencePage({ params }: { params: { slug: string[] } }) {
  const filePath = path.join(process.cwd(), 'reference', ...params.slug) + '.yml';
  const file = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(file);

  const templatePath = path.join(process.cwd(), 'src', 'templates', 'reference.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = Handlebars.compile(templateSource);

  const html = template(data);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}