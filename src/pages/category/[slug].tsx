import React from 'react';
import { GetStaticPaths , GetStaticProps} from 'next';

import { Content } from '../../components/Content';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { ProductGenericProps, getAllCategories, getProductsByCategory } from '../../utils/Content';
import { ProductSection } from '../../components/ProductSection';
import { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
  slug: string
}

type IProductUrl = {
  slug: string;
};

export type ICategoryProps = {
  category: string;
  products: ProductGenericProps[];
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
    <h1>
      {props.category.toLocaleUpperCase()}
    </h1>
    <Content>
      <ProductSection  products={props.products}/>
    </Content>
  </Main>
);

export const getStaticPaths: GetStaticPaths<IProductUrl> = async () => {
  const categories = getAllCategories();

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.toLocaleLowerCase(),
      },
    })),
    fallback: false,
  };
};
 
export const getStaticProps: GetStaticProps = async (context: any) => {
  const { slug } = context.params as IParams // no longer causes error
 const products = getProductsByCategory(slug, [
    'name',
    'description',
    'category',
    'price',
    'image',
    'href',
    'content',
    'slug',
  ]);

  return {
    props: {
      category: slug,
      products,
    },
  };
};


export default DisplayCategory;
