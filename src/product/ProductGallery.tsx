import React from 'react';
import Link from 'next/link';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { ProductItems } from '../utils/Content';

export type IProductGalleryProps = {
  products: ProductItems[];
  pagination: IPaginationProps;
};
const ProductGallery = (props: IProductGalleryProps) => (
  <>
    <ul>
      {props.products.map((elt) => (
        <li key={elt.slug} className="mb-3 flex justify-between">
          <Link href="/products/[slug]" as={`/products/${elt.slug}`}>
            <a>
              <h2>{elt.title}</h2>
            </a>
          </Link>

        </li>
      ))}
    </ul>

    <Pagination
      previous={props.pagination.previous}
      next={props.pagination.next}
    />
  </>
);

export { ProductGallery };
