import {calculateCartQuantity, cart,
  removeFromCart, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
console.log(hello);

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from "../data/deliveryOptions.js";

const today = dayjs();//obj that has today's date
const deliveryDate = today.add(7, 'days');//7 days after today

console.log(deliveryDate.format('dddd,MMMM D'));
console.log(deliveryDate.format('YYYY-MM-DD HH:mm:ss'));

console.log(deliveryDate);

let cartSummaryHTML='';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
//Once we have matchingProduct. we can access product data like img, name, price etc..

  products.forEach((product) => {
//if (id in products === id in cart){matchingProduct is the identical product we found}
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
//NOTE: NEED Explanation
  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">
                   ${cartItem.quantity}
                   </span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"
                  data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-link"
                  data-product-id="${matchingProduct.id}">
                  Save
                  </span>
                  <span class="delete-quantity-link link-primary
                   js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {//forEach d.option we generate HTML
  let html = '';

  deliveryOptions.forEach(deliveryOption => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    //if price was 0 then its free else get the price in dollars
    const priceString = deliveryOption.priceCents
    === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked =
      deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option">
        <input type="radio" 
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });
  return html;//returning generated html
}

document.querySelector('.js-order-summary')
.innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
.forEach((link) => {
  link.addEventListener('click', () => {
   const productId = link.dataset.productId;
   removeFromCart(productId);

   const container = document.querySelector
   (`.js-cart-item-container-${productId}`);
   container.remove();

   updateCartQuantity();//update it after deleting
  });
});

function updateCartQuantity() {
  //calculate the quantity of prods. in cart
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();
/*
updating the update button:
1.after clicking the update button, we get the id then Use this productId to
 construct a dynamic class name that uniquely identifies the container for that specific product.ex: .js-cart-item-container-123
 This will find the <div class="js-cart-item-container-123"> element
2.Once the correct container is identified, the next step is to modify its appearance or behavior by adding a class to it using classList.add.
 It’s an easy way to manipulate the class attribute of an element without affecting other classes that might already be applied to it.
 What does classList.add('is-editing-quantity') do?
 When you call container.classList.add('is-editing-quantity'), you’re adding the is-editing-quantity class to the selected container element.
 This class can be used to trigger specific CSS styles or JavaScript behaviors.
 */


document.querySelectorAll('.js-update-link')
  .forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container =
      document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container =
        document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      const quantityInput =
        document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);
      //.value property of an input element contains the data entered by the user
      //Number(): This function converts the string value
      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;
      updateCartQuantity();//to Update Header: Checkout (3 Items)
    });
  });
