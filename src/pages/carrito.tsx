import React from 'react';

import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';


const Carrito = () => (
  <Main meta={<Meta title="Carrito" description="Carrito" />}>
    <Content>
      <div>
        <div>
          <h2>Carrito</h2>
          <div className="cart-wrapper">
          </div>
          <div className="checkout" >Comprar</div>
        </div>
      </div>
    </Content>
  </Main>
);

export default Carrito;
