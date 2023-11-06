import React from 'react';
import { ProductGenericProps } from '../utils/Content';

export type IProductGalleryProps = {
  products: ProductGenericProps[];
};
const ProductBanner = (props: IProductGalleryProps) => (
  <>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {props.products.map((product) => (
        <div key={product.slug} className="h-auto max-w-full rounded-lg">
            <a href={product.href} >
                <img src={product.image}  />
            </a> 
        </div> 
      ))}
      </div>
  </>
);

export { ProductBanner };
