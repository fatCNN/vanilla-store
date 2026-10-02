// =====================================================
// عناصر صفحة العروض
// =====================================================

const topDiscountsContainer =
    document.getElementById("top-discounts");

const allDiscountsContainer =
    document.getElementById("all-discounts");

const noOffers =
    document.getElementById("no-offers");

const cartCount =
    document.getElementById("cart-count");


// =====================================================
// التأكد من تحميل المنتجات
// =====================================================

if (typeof products === "undefined") {

    console.error("لم يتم تحميل products-data.js");

} else {

    displayOffers();

}


// =====================================================
// السلة
// =====================================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("vanillaCart")
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "vanillaCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// تحديث عدد المنتجات في السلة
// =====================================================

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => {

            return total + Number(
                item.quantity || 0
            );

        },
        0
    );

    if (cartCount) {

        cartCount.textContent = count;

    }

}


// =====================================================
// تنسيق السعر
// =====================================================

function formatPrice(price) {

    return new Intl.NumberFormat("ar-IQ").format(price)
        + " د.ع";

}


// =====================================================
// حساب نسبة الخصم
// =====================================================

function calculateDiscount(oldPrice, price) {

    return Math.round(
        ((oldPrice - price) / oldPrice) * 100
    );

}


// =====================================================
// إضافة المنتج إلى السلة
// =====================================================

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {

        return;

    }

    const cart = getCart();

    const existing = cart.find(
        item => item.id === productId
    );

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }

    saveCart(cart);

    updateCartCount();

    alert(
        `${product.name} تمت إضافته إلى السلة`
    );

}


// =====================================================
// إنشاء بطاقة المنتج
// =====================================================

function createOfferCard(product) {

    const discount =
        calculateDiscount(
            product.oldPrice,
            product.price
        );

    const card =
        document.createElement("article");

    card.className = "offer-card";

    card.innerHTML = `

        <div class="offer-image">

            <img
                src="../products/${product.image}"
                alt="${product.name}"
                loading="lazy"
                onerror="this.src='../products/static/my_logo.jpg'"
            >

            <span class="discount-badge">
                خصم ${discount}%
            </span>

        </div>

        <div class="offer-info">

            <span class="offer-category">
                ${product.categoryName}
            </span>

            <h3>
                ${product.name}
            </h3>

            <p class="offer-description">
                ${product.description}
            </p>

            <div class="offer-rating">
                ⭐ ${product.rating}
            </div>

            <div class="price-area">

                <strong class="current-price">
                    ${formatPrice(product.price)}
                </strong>

                <del class="old-price">
                    ${formatPrice(product.oldPrice)}
                </del>

            </div>

            <button
                type="button"
                class="add-offer-cart"
                data-id="${product.id}"
            >
                🛒 أضف إلى السلة
            </button>

        </div>

    `;


    // =================================================
    // فتح صفحة المنتج عند الضغط على البطاقة
    // =================================================

    card.addEventListener(
        "click",
        function(event) {

            if (
                event.target.closest(".add-offer-cart")
            ) {

                return;

            }

            window.location.href =
                `../products/product.html?id=${product.id}`;

        }
    );


    // =================================================
    // زر إضافة إلى السلة
    // =================================================

    const cartButton =
        card.querySelector(".add-offer-cart");

    cartButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            const id =
                Number(this.dataset.id);

            addToCart(id);

        }
    );


    return card;

}


// =====================================================
// عرض العروض
// =====================================================

function displayOffers() {

    // تنظيف الحاويات

    topDiscountsContainer.innerHTML = "";

    allDiscountsContainer.innerHTML = "";


    // الحصول على المنتجات المخفضة فقط

    let discountedProducts =
        products.filter(
            product =>
                product.oldPrice &&
                product.oldPrice > product.price
        );


    // =================================================
    // ترتيب المنتجات حسب نسبة الخصم
    // من الأعلى إلى الأقل
    // =================================================

    discountedProducts.sort(
        function(a, b) {

            const discountA =
                calculateDiscount(
                    a.oldPrice,
                    a.price
                );

            const discountB =
                calculateDiscount(
                    b.oldPrice,
                    b.price
                );

            return discountB - discountA;

        }
    );


    // =================================================
    // لا توجد عروض
    // =================================================

    if (discountedProducts.length === 0) {

        noOffers.style.display = "block";

        return;

    }


    noOffers.style.display = "none";


    // =================================================
    // أكثر 4 منتجات تخفيضًا
    // =================================================

    const topDiscounts =
        discountedProducts.slice(0, 4);

    topDiscounts.forEach(
        function(product) {

            const card =
                createOfferCard(product);

            topDiscountsContainer.appendChild(card);

        }
    );


    // =================================================
    // جميع المنتجات المخفضة
    // =================================================

    discountedProducts.forEach(
        function(product) {

            const card =
                createOfferCard(product);

            allDiscountsContainer.appendChild(card);

        }
    );

}


// =====================================================
// تحديث السلة عند فتح الصفحة
// =====================================================

updateCartCount();