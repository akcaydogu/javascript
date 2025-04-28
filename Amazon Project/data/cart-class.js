class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();    
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); 
    
        if (!this.cartItems) {
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    };

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

    addToCart(productId) {
        let matchingItem;
        this.cartItems.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item
            }
        })
        
        let quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
        let quantity = 1; // Default quantity = 1
        
        if (quantityElement) {
            quantity = Number(quantityElement.value) || 1; // if invalid number, fallback to 1
        }
        
        if(matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            }
        );
        }
        
        this.saveToStorage();
    };
    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((item) => {
            if (productId === item.productId) {
                return false
            } else {
                return true
            }
        })
        this.saveToStorage();
    };
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((item) => {
            if (item.productId === productId) {
                matchingItem = item; 
            }
        })
    
        if (!matchingItem) {
            return;
        }
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    };
    updateCartQuantity(){
        let cartQuantity = 0
        this.cartItems.forEach((item) => {
            cartQuantity += item.quantity;
        });
        if (cartQuantity > 0) {
            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
        } else {
            document.querySelector('.js-cart-quantity').innerHTML = ''
        }
    };
    updateQuantity(productId, newQuantity){
        this.cartItems.forEach((item) => {
            if (item.productId === productId) {
                item.quantity = newQuantity;
            }
        })
        this.saveToStorage();
    };
}

export const cart = new Cart('cart');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(cart instanceof Cart);







