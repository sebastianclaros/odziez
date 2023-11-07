import React from 'react';

import { Content } from '../components/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import Carrito from '../components/Carrito';

const CarritoPage = () => (
  <Main meta={<Meta title="Carrito" description="Carrito" />}>
    <Content>
      <h1>Carrito</h1>
      <Carrito></Carrito>
    </Content>
  </Main>
  );

export default CarritoPage;
