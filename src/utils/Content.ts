import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

const productsDirectory = join(process.cwd(), 'productos');

export type ProductItems = {
  [key: string]: string;
};

export function getProductSlugs() {
  return fs.readdirSync(productsDirectory);
}

export function getProductBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(productsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const items: ProductItems = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllProducts(fields: string[] = []) {
  const slugs = getProductSlugs();
  const products = slugs
    .map((slug) => getProductBySlug(slug, fields))
    // sort products by date in descending order
    .sort((product1, product2) => (product1.title > product2.title ? -1 : 1));
    return products;
}
