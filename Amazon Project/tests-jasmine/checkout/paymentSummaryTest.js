import { cart } from "../../data/cart-class.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";

describe('test suite: renderPaymentSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-return-to-home-link"></div>
            <div class="js-payment-summary"></div>
            <div class="js-product-name"></div>
        `;
        cart.cartItems = [{
            productId: productId1,
            quantity: 2,
            deliveryOptionId: '1'
          }, {
            productId: productId2,
            quantity: 1,
            deliveryOptionId: '2'
          }];

        renderPaymentSummary();
    });
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = ''
    })
    it('displays the item quantity', () => {
        expect(document.querySelector('.js-cart-quantity').innerText).toEqual('Items (3):');
    })
    it('displays the correct prices', () => {
        expect(document.querySelector('.js-payment-summary-item').innerText).toEqual('$42.75');
        expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$4.99');
        expect(document.querySelector('.js-payment-summary-total').innerText).toEqual('$52.51');
    })
})