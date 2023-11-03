import React from 'react';
import Link from 'next/link';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { ProductItems } from '../utils/Content';

export type IBlogGalleryProps = {
  products: ProductItems[];
  pagination: IPaginationProps;
};
const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <ul>
      {props.products.map((elt) => (
        <li key={elt.slug} className="mb-3 flex justify-between">
          <Link href="/productos/[slug]" as={`/productos/${elt.slug}`}>
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

export { BlogGallery };
