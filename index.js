const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

function getStoreItemTemplate(item) {
  
  const template = `
    <li>
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      </div>
      <button>Add to cart</button>
    </li>
  `;
  return template;

}

function getCartItemTemplate(cartItem) {

  const template = `
    <li>
      <img class="cart--item-icon" src="assets/icons/${cartItem.id}.svg" alt="${cartItem.name}" />
      <p>${cartItem.name}</p>
      <button class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">${cartItem.quantity}</span>
      <button class="quantity-btn add-btn center">+</button>
    </li>
  `;
  return template;

}

function renderStoreItems() {

  const storeItemList = document.querySelector('.store--item-list');
  storeItemList.innerHTML = ''; 

  state.items.forEach(item => {

    const listItemHTML = getStoreItemTemplate(item);
    const listItemElement = document.createElement('div');
    listItemElement.innerHTML = listItemHTML.trim();

    listItemElement.querySelector('button').addEventListener('click', () => {

      addToCart(item);

    });

    storeItemList.appendChild(listItemElement.firstElementChild);

  });

}

function addToCart(item) {

  const cartItem = state.cart.find(cartItem => cartItem.id === item.id);

  if (cartItem) {
    cartItem.quantity++;
  } 
  
  else {

    state.cart.push({
      ...item,
      quantity: 1
    });

  }

  renderCartItems();
  updateTotal();

}

function renderCartItems() {

  const cartItemList = document.querySelector('.cart--item-list');
  cartItemList.innerHTML = ''; 

  state.cart.forEach(cartItem => {

    const listItemHTML = getCartItemTemplate(cartItem);
    const listItemElement = document.createElement('div');
    listItemElement.innerHTML = listItemHTML.trim(); 

    listItemElement.querySelector('.remove-btn').addEventListener('click', () => {

      updateCartItemQuantity(cartItem, 'decrease');

    });

    listItemElement.querySelector('.add-btn').addEventListener('click', () => {

      updateCartItemQuantity(cartItem, 'increase');

    });

    cartItemList.appendChild(listItemElement.firstElementChild);

  });

}

function updateCartItemQuantity(cartItem, action) {

  if (action === 'increase') {
    cartItem.quantity++;
  } 
  
  else if (action === 'decrease') {
    cartItem.quantity--;
  }

  if (cartItem.quantity === 0) {
    state.cart = state.cart.filter(item => item.id !== cartItem.id);
  }

  renderCartItems();
  updateTotal();

}

function updateTotal() {

  const total = state.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  document.querySelector('.total-number').textContent = `£${total.toFixed(2)}`;

}

renderStoreItems();
renderCartItems();
updateTotal();
