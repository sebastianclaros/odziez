import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

const productsDirectory = join(process.cwd(), 'productos');

export type ProductGenericProps = {
  [key: string]: string ;
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
    .sort((product1, product2) => (product1.name > product2.name ? 1 : -1));
    return products;
}

export function getProductsByCategory(category: string, fields: string[] = []) {
  const slugs = getProductSlugs();
  const products = slugs
    .map((slug) => getProductBySlug(slug, fields))
    .filter(product => product.category.toLocaleLowerCase() === category.toLocaleLowerCase())
    .sort((product1, product2) => (product1.name > product2.name ? 1 : -1));
    return products;
}


export function getProductBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(productsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const items: ProductGenericProps = { }; // name: '', slug: '', category: '',  description: '', image: '', price: 0, tags: [], href: ''  , content: '' 

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'href') {
      items[field] = '/products/' + realSlug;
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
export function getAllCategories() {
  const products = getAllProducts(['category']).map(p => p.category);
  return Array.from(new Set(products));  
}

export function getAllProducts(fields: string[] = []) {
  const slugs = getProductSlugs();
  const products = slugs
    .map((slug) => getProductBySlug(slug, fields))
    // sort products by name order
    .sort((product1, product2) => (product1.name > product2.name ? 1 : -1));
    return products;
}
