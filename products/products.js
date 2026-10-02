const productsContainer =
    document.getElementById("products-container");

const productsCount =
    document.getElementById("products-count");

const productsTitle =
    document.getElementById("products-title");

const searchInput =
    document.getElementById("search-input");

const minPrice =
    document.getElementById("min-price");

const maxPrice =
    document.getElementById("max-price");

const sortSelect =
    document.getElementById("sort-select");

const clearFilters =
    document.getElementById("clear-filters");

const noProducts =
    document.getElementById("no-products");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const subcategoryFilters =
    document.getElementById("subcategory-filters");


// =========================
// الحالة الحالية
// =========================

let currentCategory = "all";

let currentSubcategory = "all";


// =========================
// أسماء التصنيفات
// =========================

const categoryNames = {

    all: "جميع المنتجات",

    clothes: "الملابس",

    perfumes: "العطور",

    electronics: "الأجهزة الكهربائية",

    accessories: "الإكسسوارات"

};


// =========================
// الفئات الفرعية
// =========================

const subcategories = {

    clothes: [
        ["all", "الكل"],
        ["dresses", "فساتين"],
        ["shirts", "قمصان"],
        ["pants", "بناطيل"]
    ],

    perfumes: [
        ["all", "الكل"],
        ["women", "نسائية"],
        ["men", "رجالية"],
        ["oriental", "شرقية"]
    ],

    electronics: [
        ["all", "الكل"],
        ["fridges", "ثلاجات"],
        ["washing", "غسالات"],
        ["screens", "شاشات"],
        ["air-conditioners", "مكيفات"],
        ["kitchen", "أجهزة مطبخ"]
    ],

    accessories: [
        ["all", "الكل"],
        ["watches", "ساعات"],
        ["bags", "حقائب"],
        ["jewelry", "مجوهرات"]
    ]

};


// =========================
// عرض المنتجات
// =========================

function displayProducts() {

    let filteredProducts = [...products];


    // التصنيف الرئيسي

    if (currentCategory !== "all") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.category === currentCategory
            );

    }


    // التصنيف الفرعي

    if (currentSubcategory !== "all") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.subcategory === currentSubcategory
            );

    }


    // البحث

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();

    if (searchValue) {

        filteredProducts =
            filteredProducts.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.description
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.brand
                    .toLowerCase()
                    .includes(searchValue)

            );

    }


    // السعر الأدنى

    const min =
        Number(minPrice.value);

    if (min > 0) {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.price >= min
            );

    }


    // السعر الأعلى

    const max =
        Number(maxPrice.value);

    if (max > 0) {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.price <= max
            );

    }


    // الترتيب

    switch (sortSelect.value) {

        case "latest":

            filteredProducts.sort(
                (a, b) => b.id - a.id
            );

            break;


        case "price-low":

            filteredProducts.sort(
                (a, b) => a.price - b.price
            );

            break;


        case "price-high":

            filteredProducts.sort(
                (a, b) => b.price - a.price
            );

            break;


        case "name":

            filteredProducts.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name,
                        "ar"
                    )
            );

            break;

    }


    // تنظيف

    productsContainer.innerHTML = "";


    // العدد

    productsCount.textContent =
        `${filteredProducts.length} منتج`;


    // لا توجد منتجات

    if (filteredProducts.length === 0) {

        noProducts.style.display = "block";

        return;

    }

    noProducts.style.display = "none";


    // إنشاء البطاقات

    filteredProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="
                        this.src='static/my_logo.jpg'
                    "
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.categoryName}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="product-rating">
                    ⭐ ${product.rating}
                </div>

                <div class="product-price">

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                    ${
                        product.oldPrice
                        ?
                        `
                        <del>
                            ${formatPrice(product.oldPrice)}
                        </del>
                        `
                        :
                        ""
                    }

                </div>

                <button
                    class="add-cart"
                    data-id="${product.id}"
                    type="button"
                >
                    🛒 أضف إلى السلة
                </button>

            </div>

        `;


        // الضغط على البطاقة

        card.addEventListener(
            "click",
            function(event) {

                if (
                    event.target.closest(".add-cart")
                ) {

                    return;

                }

                openProductPage(product.id);

            }
        );


        productsContainer.appendChild(card);

    });


    // أزرار السلة

    document
        .querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    const id =
                        Number(
                            this.dataset.id
                        );

                    addToCart(id);

                }
            );

        });

}


// =========================
// صفحة تفاصيل المنتج
// =========================

function openProductPage(id) {

    window.location.href =
        `product.html?id=${id}`;

}


// =========================
// التصنيفات الفرعية
// =========================

function displaySubcategories() {

    subcategoryFilters.innerHTML = "";

    if (
        currentCategory === "all" ||
        !subcategories[currentCategory]
    ) {

        return;

    }


    subcategories[currentCategory]
        .forEach(([value, name]) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.textContent = name;

            button.className =
                value === currentSubcategory
                ? "subcategory-btn active"
                : "subcategory-btn";


            button.addEventListener(
                "click",
                function() {

                    currentSubcategory = value;

                    displaySubcategories();

                    displayProducts();

                }
            );


            subcategoryFilters.appendChild(button);

        });

}


// =========================
// اختيار التصنيف
// =========================

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            categoryButtons
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            this.classList.add("active");


            currentCategory =
                this.dataset.category;

            currentSubcategory = "all";


            productsTitle.textContent =
                categoryNames[currentCategory];


            displaySubcategories();

            displayProducts();

        }
    );

});


// =========================
// الفلاتر
// =========================

searchInput.addEventListener(
    "input",
    displayProducts
);

minPrice.addEventListener(
    "input",
    displayProducts
);

maxPrice.addEventListener(
    "input",
    displayProducts
);

sortSelect.addEventListener(
    "change",
    displayProducts
);


// =========================
// مسح الفلاتر
// =========================

clearFilters.addEventListener(
    "click",
    function() {

        searchInput.value = "";

        minPrice.value = "";

        maxPrice.value = "";

        sortSelect.value = "latest";

        currentCategory = "all";

        currentSubcategory = "all";


        categoryButtons
            .forEach(button =>
                button.classList.remove("active")
            );


        document
            .querySelector(
                '[data-category="all"]'
            )
            .classList.add("active");


        productsTitle.textContent =
            "جميع المنتجات";


        displaySubcategories();

        displayProducts();

    }
);


// =========================
// السلة
// =========================

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


function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;


    const cart = getCart();


    const existing =
        cart.find(
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


function updateCartCount() {

    const cart = getCart();

    const count =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    if (cartCount) {

        cartCount.textContent = count;

    }

}


// =========================
// تنسيق السعر
// =========================

function formatPrice(price) {

    return new Intl.NumberFormat(
        "ar-IQ"
    ).format(price) + " د.ع";

}


// =========================
// قراءة البيانات من الرابط
// =========================

function loadFiltersFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    // التصنيف

    const category =
        params.get("category");


    if (
        category &&
        categoryNames[category]
    ) {

        currentCategory = category;


        categoryButtons
            .forEach(button => {

                button.classList.remove(
                    "active"
                );


                if (
                    button.dataset.category ===
                    category
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            });


        productsTitle.textContent =
            categoryNames[category];

    }


    // البحث القادم من الهيدر

    const search =
        params.get("search");


    if (search) {

        searchInput.value = search;

    }

}


// =========================
// تشغيل
// =========================

loadFiltersFromURL();

displaySubcategories();

displayProducts();

updateCartCount();