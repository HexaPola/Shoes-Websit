document.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  const profilePicture = document.getElementById("profile-picture");
  const editBtn = document.getElementById("edit-btn");
  const modal = document.getElementById("edit-modal");
  const closeModal = document.getElementById("close-modal");
  const form = document.getElementById("edit-form");
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const imageInput = document.getElementById("image-input");
  const purchaseList = document.getElementById("purchase-list");
  const clearBtn = document.getElementById("clear-purchase-history");

  // فتح المودال
  editBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // حفظ البيانات
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const imageFile = imageInput.files[0];

    if (name) {
      profileName.textContent = name;
      localStorage.setItem("profileName", name);
    }

    if (email) {
      profileEmail.textContent = email;
      localStorage.setItem("profileEmail", email);
    }

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        profilePicture.src = reader.result;
        localStorage.setItem("profilePicture", reader.result);
      };
      reader.readAsDataURL(imageFile);
    }

    modal.style.display = "none";
  });

  // تحميل البيانات
  if (localStorage.getItem("profileName")) {
    profileName.textContent = localStorage.getItem("profileName");
  }

  if (localStorage.getItem("profileEmail")) {
    profileEmail.textContent = localStorage.getItem("profileEmail");
  }

  if (localStorage.getItem("profilePicture")) {
    profilePicture.src = localStorage.getItem("profilePicture");
  }

  // عرض عمليات الشراء
  const purchaseData = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

  if (purchaseData.length === 0) {
    purchaseList.innerHTML = '<p>لا توجد عمليات شراء مسجلة.</p>';
  } else {
    purchaseList.innerHTML = "";
    purchaseData.reverse().forEach(purchase => {
      const purchaseBlock = document.createElement("div");
      purchaseBlock.className = "purchase-block";
      purchaseBlock.innerHTML = `<h3>🗓️ ${purchase.date}</h3>`;

      purchase.products.forEach(product => {
        const item = document.createElement("div");
        item.className = "purchase-item";
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <p><strong>${product.name}</strong></p>
          <p>${product.price}</p>
        `;
        purchaseBlock.appendChild(item);
      });

      purchaseList.appendChild(purchaseBlock);
    });
  }
  

  // زر حذف السجل
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف كل عمليات الشراء؟");
      if (confirmDelete) {
        localStorage.removeItem("purchaseHistory");
        location.reload();
      }
    });
  }
});
