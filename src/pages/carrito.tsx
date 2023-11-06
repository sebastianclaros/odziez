import React from 'react';

import { Content } from '../components/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import Carrito from '../components/Carrito';
import { CartItem, LocalCart } from '../utils/LocalCart';

function textFromCart(items: CartItem[]){ 
  let subtotal = 0;
  let texto = '';
  if(items === null) {
    return {subtotal: 0};
  }
  for(const product of items){
      let price = product.price * product.quantity
      price = Math.round(price*100)/100
      subtotal += price
      subtotal = Math.round(subtotal*100)/100
      texto +=`- ${product.name}: ${product.quantity} x $ ${product.price} = $ ${price}`
  }
  texto += `total: $ ${subtotal}`
  return {subtotal, texto};
}


const items = Array.from(LocalCart.getLocalCartItems().values());
const txtCart = textFromCart(items);

const CarritoPage = () => (
  <Main meta={<Meta title="Carrito" description="Carrito" />}>
    <Content>
      <h1>Carrito</h1>
      <Carrito items={items} subtotal={txtCart.subtotal} texto={txtCart.texto}></Carrito>
    </Content>
  </Main>
  );

export default CarritoPage;
