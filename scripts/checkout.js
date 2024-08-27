import {calculateCartQuantity, cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

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
  })
//console.log(matchingProduct);
  cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"
                  data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary">
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
});

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