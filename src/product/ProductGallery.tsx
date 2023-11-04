import React from 'react';
import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { IProductProps } from '../pages/products/[slug]';
import {ProductCard} from './ProductCard';

export type IProductGalleryProps = {
  category?: string;
  products: IProductProps[];
  pagination: IPaginationProps;
};
const ProductGallery = (props: IProductGalleryProps) => (
  <>
      {props.products.map((product) => (
        <ProductCard key={product.slug} product={product}></ProductCard>        
      ))}
    <Pagination
      previous={props.pagination.previous}
      next={props.pagination.next}
    />
  </>
);

export { ProductGallery };
