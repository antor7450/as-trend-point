// ===============================
// AS Trend Point V5
// Part 1
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const cartCount = document.getElementById("cart-count");

function updateCartCount() {

    if (!cartCount) return;

    let total = 0;

    cart.forEach(item => {
        total += item.quantity || 1;
    });

    cartCount.textContent = total;

}

updateCartCount();
// ===============================
// Sidebar Menu
// ===============================

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function closeSidebar() {

    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");

}

if (menuBtn && sidebar && overlay) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.add("active");
        overlay.classList.add("active");

    });

    overlay.addEventListener("click", closeSidebar);

    document.querySelectorAll(".sidebar a").forEach(link => {

        link.addEventListener("click", closeSidebar);

    });

}
// ===============================
// Cart System
// ===============================

function updateCartCount() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cartCount) return;

    const total = cart.reduce((sum, item) => {

        return sum + (item.quantity || 1);

    }, 0);

    cartCount.innerText = total;

}

updateCartCount();

document.querySelectorAll(".cart-btn").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        if (!card) return;

        const sizeSelect = card.querySelector(".size-select");

        const size = sizeSelect ? sizeSelect.value : "Free Size";

        if (
            sizeSelect &&
            (!size || size === "Select Size" || size === "Choose Size")
        ) {

            alert("⚠ Please select a size.");
            return;

        }

        const name = card.querySelector("h3").innerText;

        const price = Number(
            card.querySelector(".price").innerText.replace(/[^\d]/g, "")
        );

        const image = card.querySelector("img").src;

        cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item =>
            item.name === name && item.size === size
        );

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                name,
                price,
                image,
                size,
                quantity: 1
            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert("✅ Product Added To Cart");

    });

});
// ===============================
// Wishlist
// ===============================

document.querySelectorAll(".wishlist-btn").forEach((button, index) => {

    if (wishlist.includes(index)) {
        button.classList.add("active");
    }

    button.addEventListener("click", () => {

        if (wishlist.includes(index)) {

            wishlist = wishlist.filter(i => i !== index);
            button.classList.remove("active");

        } else {

            wishlist.push(index);
            button.classList.add("active");

        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

    });

});

// ===============================
// Live Search
// ===============================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("input", function () {

        const keyword = this.value.trim().toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const title = card.querySelector("h3").innerText.toLowerCase();

            card.style.display = title.includes(keyword) ? "" : "none";

        });

    });

}

// ===============================
// Flash Sale Countdown
// ===============================

function updateCountdown() {

    const timer = document.getElementById("timer");

    if (!timer) return;

    const now = new Date();

    const end = new Date();

    end.setHours(23, 59, 59, 999);

    const diff = end - now;

    if (diff <= 0) {

        timer.innerText = "Sale Ended";
        return;

    }

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    timer.innerText =
        `${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;

}

updateCountdown();
setInterval(updateCountdown, 1000);
// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});

// ===============================
// Theme Toggle
// ===============================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    const savedTheme = localStorage.getItem("theme") || "dark";

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';

    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const light = document.body.classList.contains("light-mode");

        localStorage.setItem("theme", light ? "light" : "dark");

        themeToggle.innerHTML = light
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });

}

// ===============================
// Auto Repair
// ===============================

try {

    if (!Array.isArray(cart)) {

        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));

    }

} catch (e) {

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

}
// ===============================
// FINAL OPTIMIZATION
// ===============================

// Keep cart counter synced across all pages
window.addEventListener("load", () => {

    updateCartCount();

    console.log("✅ AS Trend Point V5 Loaded");

});

// Update counter if another page changes localStorage
window.addEventListener("storage", () => {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCartCount();

});

// Clear Cart
window.clearCart = function () {

    if (!confirm("Are you sure you want to clear your cart?")) return;

    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    if (typeof renderCart === "function") {
        renderCart();
    }

};

// Refresh counter every second (safe)
setInterval(() => {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCartCount();

}, 1000);