import React from 'react';
import { GetStaticPaths } from 'next';

import { Content } from '../../content/Content';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { getAllProducts, getProductBySlug } from '../../utils/Content';
import { markdownToHtml } from '../../utils/Markdown';
import { ParsedUrlQuery } from 'querystring';
import { CartItem, LocalCart } from '../../utils/LocalCart';

export interface IProductProps  {
  name: string;
  slug: string;  
  category: string;
  description: string;
  image: string;
  price: string;
  tags: string;
  href: string;  
  content: string;
};

interface IParams extends ParsedUrlQuery {
  slug: string
}
type IProductUrl = {
  slug: string;
};

function agregarCarrito(producto: IProductProps ) {
  LocalCart.addItemToLocalCart(producto.slug, new CartItem( producto.name, producto.description, Number.parseInt(producto.price) ) );
}

const DisplayProduct = (props: IProductProps) => (
  <Main
    meta={
      <Meta
        title={props.name}
        description={props.description || props.name }
        category={props.category}
      />
    }
  >
  <Content>
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="text-sm">
              <a href={props.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {props.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{props.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Informacion</h2>
            <p className="text-3xl tracking-tight text-gray-900">{props.price}</p>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Descripcion</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{props.description}</p>
              </div>
            </div>
            <button onClick={()=>agregarCarrito(props)}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Agregar al Carrito
            </button>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Detalles</h2>

              <div className="mt-4 space-y-6">
                <div className="text-sm text-gray-600"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: props.content }}
                    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

export const getStaticProps = async (context: any) => {
  const { slug } = context.params as IParams // no longer causes error

  const product = getProductBySlug(slug, [
    'name',
    'description',
    'category',
    'price',
    'image',
    'content',
    'slug',
  ]);
  const content = await markdownToHtml(product.content || '');

  return {
    props: {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      image: product.image,
      content,
    },
  };
};

export default DisplayProduct;
