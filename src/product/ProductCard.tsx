import * as React from 'react';
import { ProductGenericProps } from '../utils/Content';

type ProductCard = {
  product: ProductGenericProps;
};

const ProductCard = (props: ProductCard) =>  (
    <div key={props.product.slug} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={props.product.image}
          alt={props.product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={props.product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {props.product.name}
            </a>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{props.product.price}</p>
      </div>
    </div>
)

export { ProductCard };
