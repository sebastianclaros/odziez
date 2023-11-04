import React from 'react';

import { GetStaticProps } from 'next';

import { ProductGallery, IProductGalleryProps } from '../product/ProductGallery';
import { Meta } from '../layout/Meta';
import { IPaginationProps } from '../pagination/Pagination';
import { Main } from '../templates/Main';
import { AppConfig } from '../utils/AppConfig';
import { getAllProducts } from '../utils/Content';

const Index = (props: IProductGalleryProps) => (
  <Main
    meta={
      <Meta
        title="Odziez"
        description={AppConfig.description}
      />
    }
  >
    <ProductGallery products={props.products} pagination={props.pagination} />
  </Main>
);

export const getStaticProps: GetStaticProps<IProductGalleryProps> = async () => {
  const products = getAllProducts(['title', 'date', 'slug']);
  const pagination: IPaginationProps = {};

  if (products.length > AppConfig.pagination_size) {
    pagination.next = '/page2';
  }

  return {
    props: {
      products: products.slice(0, AppConfig.pagination_size),
      pagination,
    },
  };
};

export default Index;
