const favoritesContainer = document.getElementById("favorites-container");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// عرض المنتجات المحفوظة في المفضلة
function renderFavorites() {
  favoritesContainer.innerHTML = "";

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p style='text-align:center;'>No favorites yet.</p>";
    return;
  }

  favorites.forEach((item, index) => {
    const favItem = document.createElement("div");
    favItem.className = "cart-item";
    favItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-details">
        <h3>${item.title}</h3>
        <p>Price: ${item.price} EGP</p>
      </div>
      <div class="cart-item-controls">
        <button class="delete-btn fancy-remove" data-index="${index}">
          <span class="text">Remove</span>
          <span>Thanks!</span>
        </button>
      </div>
    `;
    favoritesContainer.appendChild(favItem);
  });
}

renderFavorites();

// التعامل مع حذف العناصر من المفضلة
document.addEventListener("click", (e) => {
  // بنستخدم closest عشان نضمن الزرار حتى لو ضغطت على span جواه
  const removeBtn = e.target.closest(".delete-btn");
  if (removeBtn && removeBtn.classList.contains("fancy-remove")) {
    const index = removeBtn.dataset.index;
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
});
