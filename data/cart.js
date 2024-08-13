//1. module, 2. export, 3. import --> we do it to prevent conflicts with variables with same names
//Helps us avoid naming conflicts
//we don't have to worry about the order of our script tags/files in HTML File
//export const cart = []; //this variable can be used outside this file
export const cart = [];

export function addToCart(productId) {
  let matchingItem;
//loop through the cart array (Each item is each obj. in cart). if both id are true then both objects are matching. matchingItem is true then the quantity will be +1
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
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
}