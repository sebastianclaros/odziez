import React from 'react';
import { IProductProps } from '../pages/products/[slug]';
import {ProductCard} from './ProductCard';

export type IProductGalleryProps = {
  products: IProductProps[];
};
const ProductSection = (props: IProductGalleryProps) => (
  <>
      {props.products.map((product) => (
        <ProductCard key={product.slug} product={product}></ProductCard>        
      ))}
  </>
);

export { ProductSection };
