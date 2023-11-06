import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { ProductGallery, IProductGalleryProps } from '../components/ProductGallery';
import { Meta } from '../layout/Meta';
import { IPaginationProps } from '../components/Pagination';
import { Main } from '../templates/Main';
import { AppConfig } from '../utils/AppConfig';
import { getAllProducts } from '../utils/Content';
import { convertTo2D } from '../utils/Pagination';

type IPageUrl = {
  page: string;
};

const PaginateProducts = (props: IProductGalleryProps) => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <ProductGallery products={props.products} pagination={props.pagination} />
  </Main>
);

export const getStaticPaths: GetStaticPaths<IPageUrl> = async () => {
  
  const products = getAllProducts(['slug']);

  const pages = convertTo2D(products, AppConfig.pagination_size);

  return {
    paths: pages.slice(1).map((_, index) => ({
      params: {
        // Index starts from zero so we need to do index + 1
        // slice(1) removes the first page so we do another index + 1
        // the first page is implemented in index.tsx
        page: `page${index + 2}`,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IProductGalleryProps,
  IPageUrl
> = async ({ params }) => {
  const products = getAllProducts(['title', 'category', 'slug']);

  const pages = convertTo2D(products, AppConfig.pagination_size);
  const currentPage = Number(params!.page.replace('page', ''));
  const currentIndex = currentPage - 1;

  const pagination: IPaginationProps = {};

  if (currentPage < pages.length) {
    pagination.next = `page${currentPage + 1}`;
  }

  if (currentPage === 2) {
    pagination.previous = '/';
  } else {
    pagination.previous = `page${currentPage - 1}`;
  }

  return {
    props: {
      products: pages[currentIndex],
      pagination,
    },
  };
};

export default PaginateProducts;
