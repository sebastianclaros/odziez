import React, { ReactNode } from 'react';

import Link from 'next/link';

import { Navbar } from '../components/Navbar';
import { AppConfig } from '../utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};
const categories = AppConfig.categories;
const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700 px-3 md:px-0">
    {props.meta}

    <div className="max-w-screen-md mx-auto">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="font-semibold text-3xl text-gray-900">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div>
        <div>
          <Navbar>
            <li className="mr-6">
              <Link href="/">Home</Link>
            </li>
            {categories.map(category=>(
              <li className="mr-6">
                <Link href={'/category/' + category}>{category}</Link>
              </li>
            ))}
            <li className="mr-6">
              <Link href="/carrito/" >Carrito</Link>
            </li>
          </Navbar>
        </div>
      </div>

      <div className="text-xl py-5">{props.children}</div>

      <div className="border-t border-gray-300 text-center py-8 text-sm"></div>
    </div>
  </div>
);

export { Main };
