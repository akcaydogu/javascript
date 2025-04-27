export let cart = JSON.parse(localStorage.getItem('cart')); 

if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }];
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

  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

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
            console.log(2)
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
    cart.forEach((item) => {
        if (item.productId === productId) {
            item.deliveryOptionId = deliveryOptionId; 
        }
    })
    saveToStorage();
}