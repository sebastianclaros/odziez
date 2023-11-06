import React from 'react';

import { GetStaticProps } from 'next';

import { ProductSection } from '../components/ProductSection';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { AppConfig } from '../utils/AppConfig';
import { ProductGenericProps, getProductsByTag } from '../utils/Content';

type IHomeProps = {
  home: ProductGenericProps[];
  featured: ProductGenericProps[];
}

const Index = (props: IHomeProps) => (
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

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {

  return {
    props: {
      home: getProductsByTag('home', ['name', 'image', 'href', 'slug']),
      featured: getProductsByTag('featured', ['name', 'image', 'href', 'slug']),
    },
  };
};

export default Index;
