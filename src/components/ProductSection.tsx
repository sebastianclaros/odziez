import React from 'react';
import {ProductCard} from './ProductCard';
import { ProductGenericProps } from '../utils/Content';

export type IProductGalleryProps = {
  products: ProductGenericProps[];
};
const ProductSection = (props: IProductGalleryProps) => (
  <>
      {props.products.map((product) => (
        <ProductCard key={product.slug} product={product}></ProductCard>        
      ))}
  </>
);

export { ProductSection };
