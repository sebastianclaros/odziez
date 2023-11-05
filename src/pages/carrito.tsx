import React from 'react';

import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { LocalCart } from '../utils/LocalCart';

function comprar() {
  const telefono = '+5491124058894';
  const mensaje = textFromCart();

  window.location.href = "https://api.whatsapp.com/send/?phone="+ telefono+ "&text=" + mensaje + "&type=phone_number";    
}

function textFromCart(){ 
  const items = LocalCart.getLocalCartItems()
  if(items === null) return
  let texto = '';
  let total = 0
  for(const product of Array.from(items.values())){
      let price = product.price * product.quantity
      price = Math.round(price*100)/100
      total += price
      total = Math.round(total*100)/100
      texto +=`- ${product.name}: ${product.quantity} x $ ${product.price} = $ ${price}`
  }
  texto += `total: $ ${total}`
  return texto;
}

// const productos = LocalCart.getLocalCartItems


const Carrito = () => (
  <Main meta={<Meta title="Carrito" description="Carrito" />}>
    <Content>
      <div>
        <div>
          <h2>Carrito</h2>
          <div className="cart-wrapper">
          </div>

          <button onClick={comprar}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Comprar
          </button>
        </div>
      </div>
    </Content>
  </Main>
);

export default Carrito;
