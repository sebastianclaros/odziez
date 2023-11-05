export class CartItem {
    name: string;
    description: string;
    price: number;
    quantity: number;


    constructor(name: string, description: string, price: number) {
        this.name = name
        this.description = description
        this.price = price
        this.quantity = 1
    }
}

export class LocalCart {
    static key = "cartItems"

    static getLocalCartItems(): Map<string, CartItem> {
        let cartMap = new Map()
        if (typeof window === 'undefined') {
            return cartMap;
        }
        const cart = localStorage.getItem(LocalCart.key)
        if (cart === null || cart.length === 0) {
            return cartMap
        }
        console.log(JSON.parse(cart));
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id: string, item: CartItem) {
        const cart = LocalCart.getLocalCartItems()
        const mapItem = cart.get(id);
        if (mapItem) {
            mapItem.quantity += 1
            cart.set(id, mapItem);
        } else {
            cart.set(id, item)
        }
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
    }

    static removeItemFromCart(id: string) {
        const cart = LocalCart.getLocalCartItems()
        const mapItem = cart.get(id)
        if (mapItem) {
            if (mapItem.quantity > 1) {
                mapItem.quantity -= 1
                cart.set(id, mapItem)
            } else {
                cart.delete(id)
            }
        }
        if (cart.size === 0) {
            localStorage.clear()
        } else {
            localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        }
    }
}
