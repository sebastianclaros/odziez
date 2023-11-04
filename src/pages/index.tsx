import React from 'react';

import { GetStaticProps } from 'next';

import { ProductSection, IProductGalleryProps } from '../product/ProductSection';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { AppConfig } from '../utils/AppConfig';
import { getProductsByTag } from '../utils/Content';

const Index = (props: IProductGalleryProps) => (
  <Main
    meta={
      <Meta
        title="Odziez"
        description={AppConfig.description}
      />
    }
  >
    <ProductSection products={props.home} />
    <ProductSection products={props.featured} />
  </Main>
);

export const getStaticProps: GetStaticProps<IProductGalleryProps> = async () => {

  return {
    props: {
      home: getProductsByTag('home', ['title', 'image', 'slug']),
      featured: getProductsByTag('featured', ['title', 'image', 'slug']),
    },
  };
};

export default Index;
