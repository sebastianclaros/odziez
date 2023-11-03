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
        <div class="cart-wrapper">
        </div>
        <div class="checkout" onclick="comprar();">Comprar</div>
      </div>
    </div>
    </div>
<script>
  class CartItem{
    constructor(name, desc, price){
        this.name = name
        this.desc = desc
        this.price = price
        this.quantity = 1
   }
  }
  class LocalCart{
    static key = "cartItems"
  
    static getLocalCartItems(){
        let cartMap = new Map()
     const cart = localStorage.getItem(LocalCart.key)
     if(cart===null || cart.length===0)  return cartMap
     console.log(JSON.parse(cart));   
        return new Map(Object.entries(JSON.parse(cart)))
    }
  
    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity +=1
            cart.set(id, mapItem);
        } else {
          cart.set(id, item)
        }
       localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))        
    }
  
    static removeItemFromCart(id){
    let cart = LocalCart.getLocalCartItems()
    if(cart.has(id)){
        let mapItem = cart.get(id)
        if(mapItem.quantity>1)
       {
        mapItem.quantity -=1
        cart.set(id, mapItem)
       }
       else
       cart.delete(id)
    } 
    if (cart.length===0)
    localStorage.clear()
    else
    localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
    }
  }
</script>

<script>
  updateCartUI();

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
    for(const [key, value] of items.entries()){
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        total += price
        total = Math.round(total*100)/100
        texto +=`- ${value.name}: ${value.quantity} x $ ${value.price} = $ ${price}`
    }
    texto += `total: $ ${total}`
    return texto;
  }
  function updateCartUI(){ 
    const cartWrapper = document.querySelector('.cart-wrapper')
    cartWrapper.innerHTML=""
    const items = LocalCart.getLocalCartItems()
    console.log(items);
    if(items === null) return
    let count = 0
    let total = 0
    for(const [key, value] of items.entries()){
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        count+=1
        total += price
        total = Math.round(total*100)/100
        cartItem.innerHTML =
        `<div class="details">
            <h3>${value.name}</h3>
            <p>
            <span class="quantity">Cantidad: ${value.quantity}</span>
            <span class="price">Precio: $ ${price}</span>
            </p>
        </div>
        <div class="cancel">X</div>`
       cartItem.lastElementChild.addEventListener('click', ()=>{
           LocalCart.removeItemFromCart(key)
       })
      cartWrapper.append(cartItem)
    }
    const cartSubtotal = document.createElement('div')
    cartSubtotal.innerHTML = `<div class="subtotal">Subtotal: ${total}</div>`
    cartWrapper.append(cartSubtotal)
  }
    
  
</script>
<style>
*,
*::after{
margin:0;
padding:0;
box-sizing: border-box;
}
:root{
    --after-content:'2';
}

body{
  font-family: 'Lato', sans-serif;
}
h1{
    color: #fff;
}
h2{
    font-size: x-large;
    padding:15px 10px;
}

.cart-wrapper{
    width:95%;
}
.subtotal{
    text-align: right;
    padding:5%;
}
.checkout {
    width:95%;
    text-align: center;
    cursor: pointer;
    background-color: brown;
    font-size: large;
    color: #fff;
    margin:10px auto;
    padding:10px 15px;
}

.cart-item{
  display:grid;
  grid-template-columns: 3fr 6fr 1fr;
  padding:5% 2%;
  border-bottom:solid 1px lightgray;  
}

.cart-item img{
    width:100%;
}
.cart-item .details{
    padding-left:10%;
}
h4 {
    text-align: left; 
}
p, ul {
    text-align: justify; 
}
.cart-item h3{
  text-align: left; 
  margin-bottom:5%; 
}

.cart-item {
    display: block;
    text-align: right;
}
.price{
    font-size: 18px;
    font-weight: 800; 
}
  
.quantity{
    display: block;
    margin-top:5%;
} 

.cancel{
  color: brown;
  cursor: pointer;
  text-align: right;
}
.whole-cart-window{
    border: solid lightgray 1px;
    border-top:none;
    background-color: #fff;
    margin-right:2%;
}

.hide{
    display: none;
}
.non-empty::after{
  content: var(--after-content);
  font-size: 25px;
  width:25px;
  display: inline-block;
  text-align: center;
  position: relative;
  top:-20px;
  right:20%;
  background-color: red;
  border-radius: 50%;
}

.card-wrapper{
    display: flex;
    flex-wrap: wrap;
}
</style>
    </Content>
  </Main>
);

export default About;
