// عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
  // ====== CART ======
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function getCartTotalItems(cart) {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = getCartTotalItems(cart);
    }
  }

  updateCartCount();

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const card = button.closest(".card");
      const title = card.querySelector(".product-title").textContent.trim();
      const priceText = card.querySelector(".product-price").textContent;
      const image = card.querySelector("img").getAttribute("src");
      const price = parseFloat(priceText.replace("$", ""));

      const existingProduct = cart.find(item =>
        item.title === title &&
        item.price === price &&
        item.image === image
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ title, price, image, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      const counter = document.getElementById("cart-count");
      if (counter) {
        counter.style.transform = "scale(1.2)";
        setTimeout(() => {
          counter.style.transform = "scale(1)";
        }, 200);
      }
    });
  });

  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

  // ====== FAVORITES ======

  function updateHeaderHeartColor() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const heartHeader = document.getElementById("heart-icon-header");

    if (heartHeader) {
      if (favorites.length > 0) {
        heartHeader.classList.remove("empty-fav");
        heartHeader.classList.add("full-fav");
      } else {
        heartHeader.classList.remove("full-fav");
        heartHeader.classList.add("empty-fav");
      }
    }
  }

  updateHeaderHeartColor();

  const favoriteButtons = document.querySelectorAll(".fa-heart");
  favoriteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const title = card.querySelector(".product-title").textContent.trim();
      const priceText = card.querySelector(".product-price").textContent;
      const image = card.querySelector("img").getAttribute("src");
      const price = parseFloat(priceText.replace("$", ""));
      const product = { title, price, image };

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      const exists = favorites.some(item =>
        item.title === title &&
        item.price === price &&
        item.image === image
      );

      const heartHeader = document.getElementById("heart-icon-header");

      if (exists) {
        favorites = favorites.filter(item =>
          !(item.title === title && item.price === price && item.image === image)
        );
        button.style.color = "";
      } else {
        favorites.push(product);
        button.style.color = "#c72092";

        // 💓 إضافة نبضة مؤقتة للقلب في الهيدر
        if (heartHeader) {
          heartHeader.classList.add("pulse-once");
          setTimeout(() => {
            heartHeader.classList.remove("pulse-once");
          }, 500);
        }
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateHeaderHeartColor();
    });
  });

  // تلوين القلوب الموجودة بالفعل في المفضلة
  const currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  document.querySelectorAll(".card").forEach(card => {
    const title = card.querySelector(".product-title").textContent.trim();
    const price = parseFloat(card.querySelector(".product-price").textContent.replace("$", ""));
    const image = card.querySelector("img").getAttribute("src");

    const isFavorite = currentFavorites.some(item =>
      item.title === title &&
      item.price === price &&
      item.image === image
    );

    if (isFavorite) {
      const heart = card.querySelector(".fa-heart");
      heart.style.color = "#c72092";
    }
  });

  // الضغط على القلب في الهيدر
  const goToFavIcon = document.querySelector(".go-to-favorites");
  if (goToFavIcon) {
    goToFavIcon.addEventListener("click", () => {
      window.location.href = "favorites.html";
    });
  }
});
