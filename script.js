const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg"
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 1299,
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg"
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 899,
    image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 1799,
    image: "https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg"
  },
  {
    id: 6,
    name: "DSLR Camera",
    price: 45999,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"
  },
  {
    id: 7,
    name: "Running Shoes",
    price: 2999,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
  },
  {
    id: 8,
    name: "Backpack",
    price: 1499,
    image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg"
  },
  {
    id: 9,
    name: "Sunglasses",
    price: 799,
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg"
  },
  {
    id: 10,
    name: "Keyboard",
    price: 1999,
    image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg"
  },
  {
    id: 11,
    name: "Office Chair",
    price: 5999,
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg"
  },
  {
    id: 12,
    name: "Coffee Maker",
    price: 3499,
    image: "https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg"
  },
  {
    id: 13,
    name: "Fitness Band",
    price: 1599,
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg"
  },
  {
    id: 14,
    name: "LED Monitor",
    price: 8999,
    image: "https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg"
  },
  {
    id: 15,
    name: "Tablet",
    price: 12999,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg"
  }
];


function showProduct() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((p) => {
    productList.innerHTML += `
    
    <div class="col-md-4 mt-3">
    <div class="card product-card shadow rounded-4">
  <img src="${p.image}" class="card-img-top img-fluid rounded-4" alt="${p.name}">
  <div class="card-body text-center">
    <h5 class="card-title">${p.name}</h5>
     <h4 class="card-text">₹${p.price} </h4>
  <button class="btn btn-outline-primary" onclick="addToCart(${p.id})" >Add to cart</button>

  <button class="btn btn-outline-warning " onclick="updateProductModal(${p.id})" >✏️</button>
    <button class="btn btn-outline-danger" onclick="deleteProduct(${p.id})" >🗑️</button>
  </div>
</div>
    
    </div>

    `;
  });

  console.log("products", products);
}

showProduct();

// localStorage concept added

// const data = { name: "electronic", qty: 1 };

// localStorage.setItem("cartData", JSON.stringify(data));

// const productData = localStorage.getItem("cartData");

// console.log("productData", JSON.parse(productData));

let cartItems = JSON.parse(localStorage.getItem("cartData")) || [];

console.log("cartItems", cartItems);

function addToCart(id) {
  try {
    let product = cartItems.find((p) => p.id === id);

    console.log("product already added", product);

    if (product) {
      product.qty++;
    } else {
      product = products.find((p) => p.id === id);

      cartItems.push({ ...product, qty: 1 });

      console.log("product new added", product);
    }

    localStorage.setItem("cartData", JSON.stringify(cartItems));

    alert("item added in cart");
  } catch (error) {
    console.log(error);
  }
}

function showModal() {
  try {
    const cartList = document.getElementById("cartList");

    let modal = new bootstrap.Modal(cartList);

    modal.show();
    updateLatestData();
  } catch (error) {
    console.log(error);
  }
}

function showCartList() {
  try {
    const cartTable = document.getElementById("cartTable");

    cartTable.innerHTML = "";

    cartItems.forEach((p) => {
      cartTable.innerHTML += `
      
      <tr>
      <td>${p.name}</td>
      <td>
      <div class="d-flex gap-2">

      <button class="btn btn-outline-success" onclick="increase(${p.id})" >+</button>
      
      <h5>${p.qty}</h5>
 <button class="btn btn-outline-danger" onclick="decrease(${p.id})"  >-</button>
      
      </div>
      </td>
      <td>₹ ${p.price * p.qty}</td>
      <td><button class="btn btn-outline-danger" onclick="remove(${p.id})"  >remove</button></td>
      
      </tr>
      

      `;
    });
  } catch (error) {}
}

function increase(id) {
  const product = cartItems.find((p) => p.id === id);

  if (product) {
    product.qty++;
  }

  updateLatestData();
}

function updateLatestData() {
  localStorage.setItem("cartData", JSON.stringify(cartItems));

  showCartList();
  total();
}

function decrease(id) {
  const product = cartItems.find((p) => p.id === id);

  if (product) {
    product.qty--;
  }

  if (product.qty <= 0) {
    cartItems = cartItems.filter((p) => p.id !== id);
  }

  updateLatestData();
}

function remove(id) {
  cartItems = cartItems.filter((p) => p.id !== id);

  updateLatestData();
}

function total() {
  const total = document.getElementById("grand-total");

  total.innerHTML = "";

  const totalAmount = cartItems.reduce((acc, curr) => {
    return (acc += curr.price * curr.qty);
  }, 0);

  console.log("total Amount", totalAmount);

  total.innerHTML += `<h5>₹${totalAmount}</h5>`;
}

function checkOut() {
  if (cartItems.length === 0) {
    alert(
      "there is currently no items in cart please add some item to checkout",
    );
  } else {
    alert("order placed successfully");

    cartItems = [];
    updateLatestData();
  }
}

function addModalShow() {
  const addProductModal = document.getElementById("addProductModal");

  const modal = new bootstrap.Modal(addProductModal);

  modal.show();
}


document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = Number(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value;

  const newProduct = { id: new Date().getTime(), name, price, image };
  products.push({ ...newProduct });


  const modal = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
  modal.hide();

  showProduct();
});

function deleteProduct(id) {
  const product = products.find((p) => p.id === id);

  if (!product) {
    alert(" product not found");
  }

  products = products.filter((p) => p.id !== id);
  showProduct();
}

function updateProductModal(id) {
  const updateProductModal = document.getElementById("updateProductModal");

  let modal = new bootstrap.Modal(updateProductModal);

  modal.show();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return alert(" product not found");
  }

  let index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return alert(" product not found");
  }

  document.getElementById("updateProductName").value = products[index].name;
  document.getElementById("updateProductPrice").value = products[index].price;
  document.getElementById("updateProductImage").value = products[index].image;

  const form = document.getElementById("updateProductForm");

  form.onsubmit = function (e) {
    e.preventDefault();

    let name = document.getElementById("updateProductName").value;
    let price = document.getElementById("updateProductPrice").value;
    let image = document.getElementById("updateProductImage").value;
    products[index] = {
      ...products[index],
      name,
      price: Number(price),
      image,
    };

    modal.hide();

    showProduct();
  };
}

 