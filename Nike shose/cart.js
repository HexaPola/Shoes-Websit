const cartContainer = document.getElementById("cartContainer");
const totalPriceElement = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkout-btn");

// جلب البيانات من localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// زر الشراء Checkout
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("🛒 السلة فاضية، مش هتعرف تشتري كدا!");
      return;
    }

    const productsToBuy = cartItems.map(item => ({
      name: item.title,
      price: `${item.price} EGP`,
      image: item.image
    }));

   const now = new Date();
const dateTime = now.toLocaleDateString() + ' - ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const newPurchase = {
  date: dateTime,
  products: productsToBuy
};


    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    history.push(newPurchase);
    localStorage.setItem("purchaseHistory", JSON.stringify(history));

    alert("✅ تمت عملية الشراء بنجاح!");
    localStorage.removeItem("cart");
    location.reload();
  });
}

// عرض المنتجات في صفحة cart
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p style='text-align:center;'>🛒 Your cart is empty.</p>";
    totalPriceElement.textContent = "0";
    return;
  }

  cartItems.forEach((item, index) => {
    total += Number(item.price) * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-details">
        <h3>${item.title}</h3>
        <p>Price: ${item.price} EGP</p>
      </div>
      <div class="cart-item-controls">
        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
        <button class="delete-btn fancy-remove" data-index="${index}">
          <span class="text">Remove</span>
          <span>Thanks!</span>
        </button>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = total.toFixed(2);
}

// أول مرة تشغيل
renderCart();

// حذف منتج من السلة
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }
});

// تعديل الكمية
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("quantity-input")) {
    const index = e.target.dataset.index;
    let quantity = parseInt(e.target.value);
    if (isNaN(quantity) || quantity < 1) quantity = 1;

    cartItems[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }
});
