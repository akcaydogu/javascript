export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')); 

    if (!cart) {
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
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
      cart.push({
          productId,
          quantity,
          deliveryOptionId: '1'
      }
  );
  }

  saveToStorage();
}

export function updateCartQuantity(){
    let cartQuantity = 0
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    if (cartQuantity > 0) {
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
    } else {
        document.querySelector('.js-cart-quantity').innerHTML = ''
    }
  }

export function removeFromCart(productId) {
    cart = cart.filter((item) => {
        if (productId === item.productId) {
            return false
        } else {
            return true
        }
    })
    saveToStorage();
}

export function updateQuantity(productId, newQuantity){
    cart.forEach((item) => {
        if (item.productId === productId) {
            item.quantity = newQuantity;
        }
    })
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((item) => {
        if (item.productId === productId) {
            matchingItem = item; 
        }
    })

    if (!matchingItem) {
        return;
    }
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}