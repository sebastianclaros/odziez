import React from 'react';
import { ProductGenericProps } from '../utils/Content';

export type IProductGalleryProps = {
  products: ProductGenericProps[];
};
const ProductBanner = (props: IProductGalleryProps) => (
  <>  
    <div className="flex justify-center w-full py-2 gap-2">
    {props.products.map((product, index) => (
        <a key={product.slug} href={ '#' + product.slug} className="btn btn-xs">
          {index+1}
        </a>
    ))}
    </div>
    <div className="carousel w-full">
    {props.products.map((product) => (
      <div id={product.slug} key={product.slug} className="carousel-item w-full h-96 ">
          <a href={product.href} >
              <img src={product.image}  />
          </a> 
      </div> 
    ))}
    </div>
  </>
);

export { ProductBanner };
