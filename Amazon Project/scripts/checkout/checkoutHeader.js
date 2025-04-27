import { cart } from "../../data/cart.js";

export function renderCheckoutHeader() {
    let cartQuantity = 0
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity + ' items'

    return cartQuantity;
}