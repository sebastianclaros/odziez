import React from 'react';
import { Disclosure } from '@headlessui/react'
import { Content } from '../components/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const Sucursales = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <Content>
      <h2>Buenos Aires</h2>
      <Disclosure>
        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
          <span>Horarios</span>
        </Disclosure.Button>
        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
          Lunes 9 a 18hs
          Martes 9 a 18hs
          Miercoles 9 a 18hs
          Jueves 9 a 18hs
          Viernes 9 a 18hs
        </Disclosure.Panel>
      </Disclosure>
    </Content>
  </Main>
);

export default Sucursales;


