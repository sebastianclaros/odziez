import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Content } from '../../content/Content';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IProductProps, getAllProducts, getProductBySlug } from '../../utils/Content';
import { markdownToHtml } from '../../utils/Markdown';

type IProductUrl = {
  slug: string;
};


const DisplayProduct = (props: IProductProps) => (
  <Main
    meta={
      <Meta
        title={props.title}
        description={props.description || props.title }
        category={props.category}
      />
    }
  >
    <h1 className="text-center font-bold text-3xl text-gray-900">
      {props.title}
    </h1>
    <Content>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </Content>
  </Main>
);

export const getStaticPaths: GetStaticPaths<IProductUrl> = async () => {
  const products = getAllProducts(['slug']);

  return {
    paths: products.map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProductProps, IProductUrl> = async ({
  params,
}) => {
  const product = getProductBySlug(params!.slug, [
    'title',
    'description',
    'category',
    'precio',
    'image',
    'content',
    'slug',
  ]);
  const content = await markdownToHtml(product.content || '');

  return {
    props: {
      title: product.title,
      description: product.description,
      category: product.category,
      content,
    },
  };
};

export default DisplayProduct;
