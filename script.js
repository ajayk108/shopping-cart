"use strict";
//set cart counts object to localStorage 
const setCartItemsToLocalStorage = (cartItems) =>{
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// get the cart count for specific item from cart count object
const getCartItemsFromLocalStorage = () =>{
  return JSON.parse(localStorage.getItem('cartItems')) || [];
}


//handle the 'add to cart' button click
const addToCart = (event) =>{
  const itemDiv = event.target.closest('.card');
  const itemId = itemDiv.dataset.itemId;

  //get the item name, price and image source dynamically from html
  const itemName = itemDiv.querySelector('h5').textContent.trim();
  const itemPriceText = itemDiv.querySelector('p').textContent.trim();
  const itemPrice = itemPriceText.replace(/^\D+/g, '');
  const itemImgSrcText = itemDiv.querySelector('img');
  const itemImgSrc =  itemImgSrcText.getAttribute('src');

  //create an object of itemDetials and store it to localStorage
  const itemDetails = {
    name:itemName,
    price:itemPrice,
    imgSrc:itemImgSrc,
    inCartCount:1,
    itemId:itemId
  }
  //save itemDetails to localStorage
  const cartItems = getCartItemsFromLocalStorage();
  const existItem = cartItems.find((item)=>item.name === itemName);
  const cartItemIndex = cartItems.findIndex((item)=>item.itemId === itemId);

  if(existItem){
    const count = ++existItem.inCartCount;
    cartItems[cartItemIndex].inCartCount =count;
    setCartItemsToLocalStorage(cartItems);
  }
  else{
    cartItems.push(itemDetails);
    setCartItemsToLocalStorage(cartItems);
  }
  updateCartCountDispay();
}

//
const addToCartButton = document.querySelectorAll('.addToCartButton');
addToCartButton.forEach((button)=>{
  button.addEventListener('click', addToCart);
});


const getCartCountTotal = () =>{
  const cartItems = getCartItemsFromLocalStorage();
  return cartItems.reduce((total, cartItem )=> total + cartItem.inCartCount,0)
}

const updateCartCountDispay = () =>{
  const cartEl = document.querySelector('.cartCount');
  const cartTotal = getCartCountTotal();
  cartEl.textContent =cartTotal;
}

updateCartCountDispay();

