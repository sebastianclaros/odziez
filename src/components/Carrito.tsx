import React, { useState } from 'react';
import { LocalCart, CartItem } from '../utils/LocalCart';
import { AppConfig } from '../utils/AppConfig';
import { QuantitySelector } from './QuantitySelector';

function comprar(mensaje?: string) {
    const telefono = AppConfig.whatsapp;
    if ( mensaje ) {
        window.location.href = "https://api.whatsapp.com/send/?phone="+ telefono+ "&text=" + mensaje + "&type=phone_number";    
    }
    LocalCart.clear();
}

const carritoItems = Array.from(LocalCart.getLocalCartItems().values());

const Carrito = () => {
    const [items, setItems] = useState([...carritoItems]);
    const txtCart = textFromCart(items);
    const [texto, setTexto] = useState(txtCart.texto);
    const [total, setTotal] = useState(txtCart.total);
    
    function textFromCart(items: CartItem[]){ 
        let total = 0;
        let texto = '';
        if(items === null) {
          return {total: 0};
        }
        for(const product of items){
            total += product.subtotal;
            const detalles = (product.color ? '   color: ' + product.color + '%0a' :'' ) + (product.size ? '   talle: ' + product.size + '%0a' :'')
            texto +=`- *${product.name}*: %0a${detalles}   ${product.quantity} x $ ${product.price} = *$ ${product.subtotal}*%0a`
        }
        total = Math.round(total*100)/100;
        texto += `%0a*Total: $ ${total}*`
        return {total, texto};
      }
      
      function refreshState(items: CartItem[]) {
        const txtCart = textFromCart(items);
        setTexto(txtCart.texto);
        setTotal(txtCart.total);
        setItems([...items]);
      }
      function cambiarItemQty(producto: CartItem, qty: number ) {
            producto.quantity = qty;
            items.forEach(item => { 
                if( item.id === producto.id) {
                    item = producto;
                }
            });
            LocalCart.addItemToLocalCart(producto);

            refreshState(items);
        }
      //   const [user, setUser] = React.useState(initialUser);
      function eliminarCarrito(producto: CartItem ) {
          LocalCart.removeItemFromCart(producto.uniqueId);
          refreshState(items.filter(item => item.uniqueId !== producto.uniqueId));
        }
    
    return (
        <>
        <div className="pointer-events-auto w-screen max-w-md">
        <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((product) => (
                    <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center"></img>
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                        <a href={'/products/' + product.id}>{product.name}</a>
                                    </h3>
                                    <p className="ml-4">$ {product.subtotal.toLocaleString(AppConfig.locale)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500"></p>
                                </div>
                                {product.size && (
                                    <div>
                                        <p className="text-sm">Talle: {product.size}</p>
                                    </div>
                                )}
                                {product.color && (
                                    <div>
                                        <p className="text-sm">Color: {product.color}</p>
                                    </div>
                                )}
                                <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">Cantidad 
                                    <QuantitySelector setQuantity={(qty)=>cambiarItemQty(product, qty)} qty={product.quantity} ></QuantitySelector>
                                </p>

                                <div className="flex">
                                <button onClick={()=>eliminarCarrito(product) } type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    X
                                </button>
                                </div>
                            </div>
                        </div>
                    </li>                  
                ))}
                </ul>
            </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>$ {total.toLocaleString(AppConfig.locale)}</p>
            </div>
            <div className="mt-6">
            <button onClick={()=>comprar(texto)}
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                Comprar
            </button>
            </div>
        </div>
        </div>
    </div>
    </>
  );
} 
  
  
export default Carrito;
  