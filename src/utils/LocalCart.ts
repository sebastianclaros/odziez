export class CartItem {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;

    get uniqueId() {
        return this.id + '|' + this.color + '|' + this.size;
    }

    get subtotal() {
        return Math.round(this.quantity * this.price*100)/100;
    }

    constructor(id: string, name: string, description: string, price: number, image: string, color?: string, size?: string, quantity?: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.quantity = quantity || 1;
        this.color = color || '';
        this.size = size || '';
    }
}

export class LocalCart {
    static key = "cartItems";

    static getLocalCartItems(): Map<string, CartItem> {
        const cartMap = new Map();
        if (typeof window !== 'undefined') {
            const cart = localStorage.getItem(LocalCart.key)
            if (cart !== null && cart.length > 0) {
                const cartObject: Map<string, CartItem> = JSON.parse(cart);
                for ( const [key, producto] of Object.entries(cartObject) ){
                    cartMap.set(key, new CartItem( producto.id, producto.name, producto.description, producto.price, producto.image, producto.color, producto.size, producto.quantity) );
                }            
            }
        }
        return cartMap;
    }

    static addItemToLocalCart(item: CartItem) {
        const cart = LocalCart.getLocalCartItems()
        cart.set(item.uniqueId, item);
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)));
    }

    static clear() {
        localStorage.clear();
    }
    static removeItemFromCart(id: string) {
        const cart = LocalCart.getLocalCartItems();
        cart.delete(id);
        if (cart.size === 0) {
            localStorage.clear();
        } else {
            localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)));
        }
    }
}