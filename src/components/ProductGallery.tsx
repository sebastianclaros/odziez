import React from 'react';
import { Pagination, IPaginationProps } from './Pagination';
import {ProductCard} from './ProductCard';
import { ProductGenericProps } from '../utils/Content';

export type IProductGalleryProps = {
  category?: string;
  products: ProductGenericProps[];
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
