import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { AppConfig } from '../utils/AppConfig';
//import { LocalCart } from '../utils/LocalCart';

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
          <div className="font-semibold text-2xl text-gray-900">
            {AppConfig.title}
          </div>
          <div className="text-xs">{AppConfig.description}</div>
        </div>
        <div>
          <Navbar>
            <li className="mr-6">
              <Link href="/">
                <a>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </a>
              </Link>
            </li>
            {categories.map(category=>(
              <li key={category} className="mr-6">
                <Link href={'/category/' + category.toLowerCase()}>{category}</Link>
              </li>
            ))}
            <li className="mr-6">
              <Link prefetch={false} href="/carrito/" >
                <a>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4.142 4L6.01 16.136A1.002 1.002 0 0 0 7.016 17H18a1 1 0 0 0 .958-.713l3-10A1 1 0 0 0 21 5H6.32l-.33-2.138a.993.993 0 0 0-.346-.627a.997.997 0 0 0-.66-.235H3a1 1 0 1 0 0 2h1.142zm3.716 11l-1.23-8h13.028l-2.4 8H7.858zM10 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm9 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0z"/></svg>                
                </a>
              </Link>
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
