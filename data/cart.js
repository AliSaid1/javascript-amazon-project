//1. module, 2. export, 3. import --> we do it to prevent conflicts with variables with same names
//Helps us avoid naming conflicts
//we don't have to worry about the order of our script tags/files in HTML File
//export const cart = []; //this variable can be used outside this file


import {products} from './products.js';

//1.We need to get the cart from the localStorage instead of a default value
//2.localStorage.getItem('cart') will take one String, which the name of what we saved in the storage
//3.JSON.parse() to convert the string back to an array
//4.if localStorage is empty it will give us null value. In this Case we give back the default value if (!cart){}
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  }, {//NOTE IMP: why we don't give more data like img, price etc.? because with specifying the ProductID it's going to search for this products data in product.js so we don't have to do it twice.This Technique called Normalizing the Data
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));//localStorage only saves Strings that's why we converted into JSON.stringify(cart)
}

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
    });
  }
  saveToStorage();//whenever we update the cart we need to save it to localStorage
}
//Each time we select a product it will be automatically removed because we replace old cart with new cart that have unselected products
export function removeFromCart(productId) {
  const newCart = [];
//we add each item to the new cart
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;//we change the cart into newCart
  saveToStorage();//whenever we update the cart we need to save it to localStorage
}