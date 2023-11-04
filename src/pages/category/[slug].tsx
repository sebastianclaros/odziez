import React from 'react';
import { GetStaticPaths } from 'next';

import { Content } from '../../content/Content';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IProductProps, getAllProducts, getProductsByCategory } from '../../utils/Content';
import { ProductSection } from '../../product/ProductSection';

type IProductUrl = {
  slug: string;
};

export type ICategoryProps = {
  category: string;
  products: IProductProps[];
};

const DisplayCategory = (props: ICategoryProps) => (
  <Main
    meta={
      <Meta
        title={props.category}
        description="Productos de la linea {props.category}"
      />
    }
  >
    <h1 className="text-center font-bold text-3xl text-gray-900">
      {props.category.toLocaleUpperCase()}
    </h1>
    <Content>
      <ProductSection  products={props.products}/>
    </Content>
  </Main>
);

export const getStaticPaths: GetStaticPaths<IProductUrl> = async () => {
  const products = getAllProducts(['category']).map(p => p.category);
  const categories = Array.from(new Set(products));

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.toLocaleLowerCase(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProductProps, IProductUrl> = async ({
  params,
}) => {
  const products = getProductsByCategory(params!.slug, [
    'title',
    'description',
    'category',
    'precio',
    'image',
    'content',
    'slug',
  ]);

  return {
    props: {
      category: params!.slug,
      products,
    },
  };
};


export default DisplayCategory;
