import React from 'react';
import { LocalCart, CartItem } from '../utils/LocalCart';

interface ICarritoProps {
    items: CartItem[];
    subtotal: number;
    texto?: string;
}

function comprar(mensaje?: string) {
    const telefono = '+5491124058894';
    if ( mensaje ) {
        window.location.href = "https://api.whatsapp.com/send/?phone="+ telefono+ "&text=" + mensaje + "&type=phone_number";    
    }
    LocalCart.clear();
}

function eliminarCarrito(producto: CartItem ) {
    LocalCart.removeItemFromCart(producto.id);
}

const Carrito = (props: ICarritoProps) => (
    <div className="pointer-events-auto w-screen max-w-md">
        <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                {props.items.map((product) => (
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
                        <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500"></p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Cantidad {product.quantity}</p>

                        <div className="flex">
                        <button onClick={()=>eliminarCarrito(product) } type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Quitar</button>
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
            <p>Subtotal</p>
            <p>{props.subtotal}</p>
            </div>
            <div className="mt-6">
            <button onClick={()=>comprar(props.texto)}
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                Comprar
            </button>
            </div>
        </div>
        </div>
    </div>
  );
  
  
export default Carrito;
