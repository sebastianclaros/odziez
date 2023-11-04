import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

const productsDirectory = join(process.cwd(), 'productos');

export type IProductProps = {
  product: any;
  title: string;
  description?: string;
  category: string;
  image?: string;
  precio: number;
  slug: string;  
  tags?: string[];  
  content: string;
};

export function getProductSlugs() {
  return fs.readdirSync(productsDirectory);
}

export function getProductsByTag(tag: string, fields: string[] = []) {
  const slugs = getProductSlugs();
  if ( !fields.includes('tags') )  {
    fields.push('tags');
  }
  const products = slugs
    .map((slug) => getProductBySlug(slug, fields))
    .filter(product => product.tags?.includes(tag) )
    .sort((product1, product2) => (product1.title > product2.title ? 1 : -1));
    return products;
}

export function getProductsByCategory(category: string, fields: string[] = []) {
  const slugs = getProductSlugs();
  const products = slugs
    .map((slug) => getProductBySlug(slug, fields))
    .filter(product => product.category.toLocaleLowerCase() === category.toLocaleLowerCase())
    .sort((product1, product2) => (product1.title > product2.title ? 1 : -1));
    return products;
}


export function getProductBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(productsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const items: IProductProps = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'tags') {
      items[field] = data[field] ? data[field]: [];
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
    // sort products by title order
    .sort((product1, product2) => (product1.title > product2.title ? 1 : -1));
    return products;
}
