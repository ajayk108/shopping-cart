const cartDispay = () =>{
  const tbodyEl = document.querySelector('.items-data');
  const cartData = JSON.parse(localStorage.getItem('cartItems'));

  let grandTotal =0;
  const rupeeSign = '\u20B9';

  let data =``;
  cartData.forEach((cartdata, index)=>{
    //total for price
    const totalPrice = parseInt(cartdata.price * cartdata.inCartCount);
    grandTotal +=totalPrice;

    data +=`<tr><td>${index+1}</td>`
    data +=`<td><img src="${cartdata.imgSrc}"></td>`
    data +=`<td>${cartdata.name}</td>`
    data +=`<td>${rupeeSign}${cartdata.price}</td>`
    data +=`<td><input class='qty-input' type='number' step='1' onclick='handlInputChange(event,${index})' value='${cartdata.inCartCount}' style='height:30px;width:40px'></td>`
    data +=`<td>${rupeeSign}${totalPrice}</td>`;
    data +=`<td><i class="fa-solid fa-trash text-danger" onclick='del(${index})'></i></td></tr>`;
  });
  
  data +=`<tr><td colspan='5'></td><td><strong>Gr.Total: ${rupeeSign}${grandTotal}</strong></td><td></td><tr>`

  tbodyEl.innerHTML = data;


}

const handlInputChange = (event,index) =>{
  const qtyInputText = event.target;
  const qtyInput = parseInt(qtyInputText.value);

  const cartItems = getCartItemsFromLocalStorage();

  if(qtyInput > 0){
    cartItems[index].inCartCount = qtyInput;
    setCartItemsToLocalStorage(cartItems);
    updateCartCountDispay();
    cartDispay();
  }else{
    alert('please enter quantity greater than 0 ...');
    cartItems[index].inCartCount = 1;
    setCartItemsToLocalStorage(cartItems);
    updateCartCountDispay();
    cartDispay();
  }
}
const del = (index) =>{
  const result = confirm("Are you sure you want to delete the Item from cart...")
  if(result){
    const cartItems = getCartItemsFromLocalStorage()
    cartItems.splice(index, 1);
    setCartItemsToLocalStorage(cartItems);

    cartDispay();
    updateCartCountDispay();
  }
}


// load cart page
cartDispay();
