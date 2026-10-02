/* =====================================================
   متجر فانيلا
   البحث + السلة
   ===================================================== */


/* =====================================================
   البحث
   ===================================================== */

const searchForm =
    document.getElementById("search-form");

const searchInput =
    document.getElementById("search-input");


if (searchForm && searchInput) {

    searchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const searchText =
                searchInput.value.trim();


            if (searchText === "") {

                return;

            }


            const search =
                searchText.toLowerCase();


            /* الرئيسية */

            if (
                search.includes("الرئيسية") ||
                search.includes("رئيسية") ||
                search.includes("home")
            ) {

                window.location.href =
                    "index.html";

                return;

            }


            /* المنتجات */

            if (
                search.includes("المنتجات") ||
                search.includes("منتجات") ||
                search.includes("product")
            ) {

                window.location.href =
                    "products.html";

                return;

            }


            /* العروض */

            if (
                search.includes("العروض") ||
                search.includes("عروض") ||
                search.includes("خصم") ||
                search.includes("خصومات") ||
                search.includes("offer")
            ) {

                window.location.href =
                    "offers.html";

                return;

            }


            /* التواصل */

            if (
                search.includes("تواصل") ||
                search.includes("اتصل") ||
                search.includes("contact")
            ) {

                window.location.href =
                    "contact.html";

                return;

            }


            /* السلة */

            if (
                search.includes("السلة") ||
                search.includes("سلة") ||
                search.includes("cart")
            ) {

                window.location.href =
                    "cart.html";

                return;

            }


            /* إذا لم تكن صفحة
               نعتبرها بحثًا عن منتج */

            window.location.href =
                "products.html?search=" +
                encodeURIComponent(searchText);

        }
    );

}


/* =====================================================
   السلة
   ===================================================== */


/*
   الحصول على السلة المحفوظة
*/

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


/* =====================================================
   حفظ السلة
   ===================================================== */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   أزرار + في صفحة المنتجات
   ===================================================== */

const plusButtons =
    document.querySelectorAll(
        ".quantity-plus"
    );


plusButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const productCard =
                    button.closest(
                        ".product-card"
                    );


                const productName =
                    productCard.dataset.name;


                const productPrice =
                    Number(
                        productCard.dataset.price
                    );


                /* البحث عن المنتج */

                let product =
                    cart.find(
                        function (item) {

                            return (
                                item.name ===
                                productName
                            );

                        }
                    );


                /* إذا موجود */

                if (product) {

                    product.quantity++;

                }

                /* إذا غير موجود */

                else {

                    cart.push({

                        name: productName,

                        price: productPrice,

                        quantity: 1

                    });

                }


                /* حفظ */

                saveCart();


                /* تحديث الرقم */

                updateProductQuantity(
                    productCard
                );

            }
        );

    }
);


/* =====================================================
   أزرار - في صفحة المنتجات
   ===================================================== */

const minusButtons =
    document.querySelectorAll(
        ".quantity-minus"
    );


minusButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const productCard =
                    button.closest(
                        ".product-card"
                    );


                const productName =
                    productCard.dataset.name;


                const product =
                    cart.find(
                        function (item) {

                            return (
                                item.name ===
                                productName
                            );

                        }
                    );


                /* إذا المنتج غير موجود */

                if (!product) {

                    return;

                }


                product.quantity--;


                /* إذا وصلت الكمية إلى صفر */

                if (
                    product.quantity <= 0
                ) {

                    cart =
                        cart.filter(
                            function (item) {

                                return (
                                    item.name !==
                                    productName
                                );

                            }
                        );

                }


                saveCart();


                updateProductQuantity(
                    productCard
                );

            }
        );

    }
);


/* =====================================================
   تحديث كمية المنتج
   ===================================================== */

function updateProductQuantity(
    productCard
) {

    const productName =
        productCard.dataset.name;


    const quantityElement =
        productCard.querySelector(
            ".quantity"
        );


    const product =
        cart.find(
            function (item) {

                return (
                    item.name ===
                    productName
                );

            }
        );


    if (product) {

        quantityElement.textContent =
            product.quantity;

    }

    else {

        quantityElement.textContent =
            "0";

    }

}


/* =====================================================
   تحديث الكميات عند فتح صفحة المنتجات
   ===================================================== */

const productCards =
    document.querySelectorAll(
        ".product-card"
    );


productCards.forEach(
    function (productCard) {

        updateProductQuantity(
            productCard
        );

    }
);


/* =====================================================
   صفحة السلة
   ===================================================== */

const cartItemsContainer =
    document.getElementById(
        "cart-items"
    );


const cartTotalPrice =
    document.getElementById(
        "cart-total-price"
    );


if (cartItemsContainer) {

    displayCart();

}


/* =====================================================
   عرض السلة
   ===================================================== */

function displayCart() {

    cartItemsContainer.innerHTML =
        "";


    let total = 0;


    /* إذا السلة فارغة */

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <p class="empty-cart">
                السلة فارغة حاليًا 🛒
            </p>

        `;


        cartTotalPrice.textContent =
            "0 د.ع";


        return;

    }


    /* عرض المنتجات */

    cart.forEach(
        function (item, index) {


            const itemTotal =
                item.price *
                item.quantity;


            total += itemTotal;


            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        السعر:
                        ${formatPrice(item.price)}
                        د.ع
                    </p>

                    <p>
                        الكمية:
                        ${item.quantity}
                    </p>

                    <p class="cart-item-price">

                        مجموع المنتج:
                        ${formatPrice(itemTotal)}
                        د.ع

                    </p>

                </div>


                <div class="cart-quantity">

                    <button
                        class="cart-minus"
                        data-index="${index}"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        class="cart-plus"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-cart-item"
                    data-index="${index}"
                >
                    حذف
                </button>

            `;


            cartItemsContainer.appendChild(
                cartItem
            );

        }
    );


    /* المجموع الكلي */

    cartTotalPrice.textContent =
        formatPrice(total) +
        " د.ع";


    addCartButtonsEvents();

}


/* =====================================================
   أزرار صفحة السلة
   ===================================================== */

function addCartButtonsEvents() {


    /* زر + */

    document
        .querySelectorAll(".cart-plus")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        cart[index].quantity++;


                        saveCart();


                        displayCart();

                    }
                );

            }
        );


    /* زر - */

    document
        .querySelectorAll(".cart-minus")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        cart[index].quantity--;


                        if (
                            cart[index]
                                .quantity <= 0
                        ) {

                            cart.splice(
                                index,
                                1
                            );

                        }


                        saveCart();


                        displayCart();

                    }
                );

            }
        );


    /* حذف */

    document
        .querySelectorAll(
            ".remove-cart-item"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        cart.splice(
                            index,
                            1
                        );


                        saveCart();


                        displayCart();

                    }
                );

            }
        );

}


/* =====================================================
   إفراغ السلة
   ===================================================== */

const clearCartButton =
    document.getElementById(
        "clear-cart"
    );


if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        function () {

            cart = [];


            saveCart();


            displayCart();

        }
    );

}


/* =====================================================
   تنسيق السعر
   ===================================================== */

function formatPrice(price) {

    return price.toLocaleString(
        "ar-IQ"
    );

}

/* =====================================================
   تحريك العلامات التجارية
   ===================================================== */

const brandsSlider =
    document.getElementById("brands-slider");

const brandNext =
    document.getElementById("brand-next");

const brandPrev =
    document.getElementById("brand-prev");


if (
    brandsSlider &&
    brandNext &&
    brandPrev
) {

    brandNext.addEventListener("click", function () {

        brandsSlider.scrollBy({

            left: -230,

            behavior: "smooth"

        });

    });


    brandPrev.addEventListener("click", function () {

        brandsSlider.scrollBy({

            left: 230,

            behavior: "smooth"

        });

    });

}
/* =====================================================
   المنتجات
   ===================================================== */

const products = [

    {
        id: 1,

        name: "فستان أنيق",

        image: "static/product1.jpg",

        oldPrice: 50000,

        price: 30000,

        discount: 40
    },


    {
        id: 2,

        name: "عطر فاخر",

        image: "static/product2.jpg",

        oldPrice: 75000,

        price: 45000,

        discount: 40
    },


    {
        id: 3,

        name: "سماعات لاسلكية",

        image: "static/product3.jpg",

        oldPrice: 60000,

        price: 42000,

        discount: 30
    },


    {
        id: 4,

        name: "حقيبة نسائية",

        image: "static/product4.jpg",

        oldPrice: 80000,

        price: 60000,

        discount: 25
    },


    {
        id: 5,

        name: "ساعة أنيقة",

        image: "static/product5.jpg",

        oldPrice: 90000,

        price: 54000,

        discount: 40
    }

];


/* =====================================================
   عرض المنتجات المخفضة
   ===================================================== */

function showDiscountProducts() {

    const container =
        document.getElementById("discounts-container");


    /* إذا لم يكن القسم موجوداً */

    if (!container) {

        return;

    }


    /* حذف المحتوى القديم */

    container.innerHTML = "";


    /* اختيار المنتجات التي عليها خصم */

    const discountProducts =
        products.filter(
            product =>
                product.discount > 0
        );


    /* عرض المنتجات */

    discountProducts.forEach(
        product => {


            const card =
                document.createElement("a");


            card.className =
                "discount-card";


            card.href =
                "product.html?id=" +
                product.id;


            card.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="discount-product-image"
                >


                <div class="discount-overlay">


                    <span class="discount-percent">

                        خصم ${product.discount}%

                    </span>


                    <h3>

                        ${product.name}

                    </h3>


                    <div class="discount-prices">

                        <span class="old-price">

                            ${product.oldPrice.toLocaleString()} د.ع

                        </span>


                        <span class="new-price">

                            ${product.price.toLocaleString()} د.ع

                        </span>

                    </div>


                    <span class="discount-link">

                        تسوق الآن

                    </span>


                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =====================================================
   تشغيل القسم
   ===================================================== */

showDiscountProducts();


