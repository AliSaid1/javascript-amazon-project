//1. saving data (info) with creating a list of objects
//2. generate HTML with looping these objects
//forEach Obj we generate an HTML
// html = .... generating html
//Each object will have its own values (data: like price), due to the ${product.priceCents / 100}
//3. combining this HTML together and put it on the web page

//we are adding html in productsHTML EACH TIME we go through the loop

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png"><!-- convert 4, 4.5 back to 40, 45 -->
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)} <!-- convert cents back to dollars & toFixed to force 2 Decimal Digits (10.9 to 10.90)-->
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id = '${product.id}'>
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;//we changed the html into productsHTML

//we create a list of Add to Cart
document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {// iterates over each selected button
  button.addEventListener('click', () => {//retrieves the product's name from the clicked button using dataset
    const productId = button.dataset.productId;//dataset gives us ALL attributes attached to an Element

    let matchingItem;
//loop through the cart array (Each item is each obj. in cart). if both names are true then both objects are matching. matchingItem is true then the quantity will be +1
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({//adds a new object to the cart array
        productId: productId,
        quantity: 1
      })
    }
    console.log(cart);
  });
});
