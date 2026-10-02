/* =====================================================
   الحصول على رقم المنتج من الرابط
   مثال:
   product.html?id=1
   ===================================================== */

const params =
    new URLSearchParams(window.location.search);


const productId =
    Number(params.get("id"));



/* =====================================================
   البحث عن المنتج
   ===================================================== */

const product =
    products.find(
        item => item.id === productId
    );



/* =====================================================
   عناصر الصفحة
   ===================================================== */

const productDetails =
    document.getElementById("product-details");


const specifications =
    document.getElementById("specifications");


const relatedProducts =
    document.getElementById("related-products");


const breadcrumbProduct =
    document.getElementById("breadcrumb-product");


const cartCount =
    document.getElementById("cart-count");



/* =====================================================
   المتغيرات
   ===================================================== */

let selectedColor = null;

let quantity = 1;



/* =====================================================
   التحقق من وجود المنتج
   ===================================================== */

if (!product) {

    if (productDetails) {

        productDetails.innerHTML = `

            <div class="not-found">

                <h2>
                    المنتج غير موجود
                </h2>


                <p>
                    عذرًا، لم نتمكن من العثور على المنتج المطلوب.
                </p>


                <a href="products.html">
                    العودة إلى المنتجات
                </a>

            </div>

        `;

    }

} else {


    /* =================================================
       اسم المنتج في مسار الصفحة
       ================================================= */

    if (breadcrumbProduct) {

        breadcrumbProduct.textContent =
            product.name;

    }


    /* =================================================
       عرض المنتج
       ================================================= */

    renderProduct();


    /* =================================================
       عرض المواصفات
       ================================================= */

    renderSpecifications();


    /* =================================================
       عرض المنتجات المشابهة
       ================================================= */

    renderRelatedProducts();


    /* =================================================
       تحديث عداد السلة
       ================================================= */

    updateCartCount();

}



/* =====================================================
   عرض المنتج
   ===================================================== */

function renderProduct() {

    if (!productDetails) {
        return;
    }


    /* =================================================
       التحقق من وجود الألوان
       ================================================= */

    const hasColors =
        product.colors &&
        product.colors.length > 0;



    /* =================================================
       اختيار أول لون متوفر تلقائيًا
       ================================================= */

    if (hasColors) {

        selectedColor =
            product.colors.find(
                color => color.stock > 0
            ) ||
            product.colors[0];

    }



    /* =================================================
       الصورة الحالية
       ================================================= */

    const mainImage =
        selectedColor &&
        selectedColor.image

            ? selectedColor.image

            : product.image;



    /* =================================================
       المخزون الحالي
       ================================================= */

    const currentStock =
        selectedColor
            ? selectedColor.stock
            : product.stock;



    /* =================================================
       HTML الخاص بالمنتج
       ================================================= */

    productDetails.innerHTML = `

        <!-- =========================================
             صورة المنتج
             ========================================= -->

        <div class="product-image-section">

            <div class="main-image-wrapper">

                <img
                    id="main-product-image"
                    src="${mainImage}"
                    alt="${product.name}"
                    class="main-product-image"
                >

            </div>

        </div>



        <!-- =========================================
             معلومات المنتج
             ========================================= -->

        <div class="product-info">


            <!-- التصنيف -->

            <div class="product-category">

                ${product.categoryName}

            </div>



            <!-- الاسم -->

            <h1>

                ${product.name}

            </h1>



            <!-- التقييم -->

            <div class="rating">

                ⭐ ${product.rating}

            </div>



            <!-- الوصف -->

            <p class="product-description">

                ${product.description}

            </p>



            <!-- =====================================
                 السعر
                 ===================================== -->

            <div class="price-section">


                <span class="current-price">

                    ${product.price.toLocaleString()} د.ع

                </span>


                ${
                    product.oldPrice
                        ? `

                            <span class="old-price">

                                ${product.oldPrice.toLocaleString()} د.ع

                            </span>

                        `
                        : ""
                }


            </div>



            <!-- =====================================
                 الألوان
                 ===================================== -->

            ${
                hasColors

                    ? `

                        <div class="colors-section">

                            <h3>
                                اللون
                            </h3>


                            <div class="colors-container">

                                ${
                                    product.colors
                                        .map(
                                            (color, index) => {

                                                const isSelected =
                                                    selectedColor &&
                                                    selectedColor.name ===
                                                        color.name;


                                                const isOut =
                                                    color.stock <= 0;


                                                return `

                                                    <button
                                                        type="button"
                                                        class="
                                                            color-option
                                                            ${
                                                                isSelected
                                                                    ? "selected"
                                                                    : ""
                                                            }
                                                            ${
                                                                isOut
                                                                    ? "out-of-stock"
                                                                    : ""
                                                            }
                                                        "
                                                        data-color-index="${index}"
                                                        title="${color.name}"
                                                        ${
                                                            isOut
                                                                ? "disabled"
                                                                : ""
                                                        }
                                                    >

                                                        <span
                                                            class="color-circle"
                                                            style="
                                                                background-color:
                                                                ${color.value};
                                                            "
                                                        ></span>

                                                    </button>

                                                `;

                                            }
                                        )
                                        .join("")
                                }

                            </div>

                        </div>

                    `

                    : ""
            }



            <!-- =====================================
                 المخزون
                 ===================================== -->

            <div
                id="selected-color-stock"
                class="
                    selected-color-stock
                    ${
                        currentStock > 0
                            ? "available"
                            : "out"
                    }
                "
            >

                ${
                    currentStock > 0
                        ? `متوفر ${currentStock} قطعة`
                        : "نفذ"
                }

            </div>



            <!-- =====================================
                 الكمية
                 ===================================== -->

            <div class="quantity-section">

                <label for="quantity">

                    الكمية

                </label>


                <div class="quantity-control">


                    <button
                        type="button"
                        id="decrease"
                    >
                        −
                    </button>


                    <input
                        type="number"
                        id="quantity"
                        value="1"
                        min="1"
                        max="${currentStock}"
                        ${
                            currentStock <= 0
                                ? "disabled"
                                : ""
                        }
                    >


                    <button
                        type="button"
                        id="increase"
                    >
                        +
                    </button>


                </div>

            </div>



            <!-- =====================================
                 إضافة إلى السلة
                 ===================================== -->

            <button
                type="button"
                id="add-to-cart"
                class="add-to-cart"
                ${
                    currentStock <= 0
                        ? "disabled"
                        : ""
                }
            >

                ${
                    currentStock > 0
                        ? "أضف إلى السلة"
                        : "نفذ من المخزون"
                }

            </button>


        </div>

    `;



    /* =================================================
       تشغيل أحداث المنتج
       ================================================= */

    setupProductEvents();

}



/* =====================================================
   أحداث المنتج
   ===================================================== */

function setupProductEvents() {


    const mainImage =
        document.getElementById(
            "main-product-image"
        );


    const quantityInput =
        document.getElementById(
            "quantity"
        );


    const decreaseButton =
        document.getElementById(
            "decrease"
        );


    const increaseButton =
        document.getElementById(
            "increase"
        );


    const addToCartButton =
        document.getElementById(
            "add-to-cart"
        );



    /* =================================================
       اختيار اللون
       ================================================= */

    const colorButtons =
        document.querySelectorAll(
            ".color-option"
        );


    colorButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {


                    const index =
                        Number(
                            this.dataset.colorIndex
                        );


                    const color =
                        product.colors[index];


                    if (
                        !color ||
                        color.stock <= 0
                    ) {

                        return;

                    }


                    /* تحديث اللون */

                    selectedColor =
                        color;


                    /* تغيير الصورة */

                    if (
                        mainImage &&
                        color.image
                    ) {

                        mainImage.src =
                            color.image;

                    }


                    /* إزالة التحديد من جميع الألوان */

                    colorButtons.forEach(
                        item => {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    /* تحديد اللون الحالي */

                    this.classList.add(
                        "selected"
                    );


                    /* تحديث المخزون */

                    updateSelectedColorStock();


                    /* إعادة الكمية إلى 1 */

                    quantity = 1;


                    if (quantityInput) {

                        quantityInput.value = 1;

                        quantityInput.max =
                            color.stock;

                        quantityInput.disabled =
                            false;

                    }


                    /* تفعيل زر السلة */

                    if (addToCartButton) {

                        addToCartButton.disabled =
                            false;

                        addToCartButton.textContent =
                            "أضف إلى السلة";

                    }

                }
            );

        }
    );



    /* =================================================
       زيادة الكمية
       ================================================= */

    if (increaseButton) {

        increaseButton.addEventListener(
            "click",
            function () {

                const stock =
                    getCurrentStock();


                if (
                    quantity < stock
                ) {

                    quantity++;


                    if (quantityInput) {

                        quantityInput.value =
                            quantity;

                    }

                }

            }
        );

    }



    /* =================================================
       تقليل الكمية
       ================================================= */

    if (decreaseButton) {

        decreaseButton.addEventListener(
            "click",
            function () {

                if (
                    quantity > 1
                ) {

                    quantity--;


                    if (quantityInput) {

                        quantityInput.value =
                            quantity;

                    }

                }

            }
        );

    }



    /* =================================================
       إدخال الكمية يدويًا
       ================================================= */

    if (quantityInput) {

        quantityInput.addEventListener(
            "change",
            function () {

                const stock =
                    getCurrentStock();


                let value =
                    Number(this.value);


                if (
                    isNaN(value) ||
                    value < 1
                ) {

                    value = 1;

                }


                if (
                    value > stock
                ) {

                    value = stock;

                }


                quantity =
                    value;


                this.value =
                    value;

            }
        );

    }



    /* =================================================
       إضافة المنتج إلى السلة
       ================================================= */

    if (addToCartButton) {

        addToCartButton.addEventListener(
            "click",
            function () {

                const stock =
                    getCurrentStock();


                if (
                    stock <= 0
                ) {

                    return;

                }


                /* الحصول على السلة */

                const cart =
                    JSON.parse(
                        localStorage.getItem(
                            "vanillaCart"
                        )
                    ) || [];


                /* اللون */

                const colorName =
                    selectedColor
                        ? selectedColor.name
                        : null;


                /* البحث عن المنتج نفسه بنفس اللون */

                const existingItem =
                    cart.find(
                        item =>
                            item.id === product.id &&
                            item.color === colorName
                    );



                /* =====================================
                   المنتج موجود مسبقًا
                   ===================================== */

                if (existingItem) {

                    existingItem.quantity =
                        Math.min(
                            existingItem.quantity +
                                quantity,

                            stock
                        );

                }



                /* =====================================
                   المنتج غير موجود
                   ===================================== */

                else {

                    cart.push({

                        id:
                            product.id,


                        name:
                            product.name,


                        price:
                            product.price,


                        image:
                            selectedColor &&
                            selectedColor.image

                                ? selectedColor.image

                                : product.image,


                        quantity:
                            quantity,


                        color:
                            colorName

                    });

                }



                /* حفظ السلة */

                localStorage.setItem(
                    "vanillaCart",
                    JSON.stringify(cart)
                );


                /* تحديث العداد */

                updateCartCount();


                /* رسالة */

                alert(
                    "تمت إضافة المنتج إلى السلة"
                );

            }
        );

    }

}



/* =====================================================
   الحصول على المخزون الحالي
   ===================================================== */

function getCurrentStock() {

    if (selectedColor) {

        return selectedColor.stock;

    }


    return product.stock;

}



/* =====================================================
   تحديث المخزون عند تغيير اللون
   ===================================================== */

function updateSelectedColorStock() {


    const stockElement =
        document.getElementById(
            "selected-color-stock"
        );


    if (!stockElement) {

        return;

    }


    const stock =
        getCurrentStock();


    if (stock > 0) {


        stockElement.textContent =
            `متوفر ${stock} قطعة`;


        stockElement.classList.remove(
            "out"
        );


        stockElement.classList.add(
            "available"
        );

    }

    else {


        stockElement.textContent =
            "نفذ";


        stockElement.classList.remove(
            "available"
        );


        stockElement.classList.add(
            "out"
        );

    }

}



/* =====================================================
   المواصفات
   ===================================================== */

function renderSpecifications() {


    if (
        !product ||
        !product.specifications ||
        !specifications
    ) {

        return;

    }


    specifications.innerHTML =
        Object.entries(
            product.specifications
        )
        .map(
            ([key, value]) => {

                return `

                    <div class="specification-item">

                        <span class="specification-name">

                            ${key}

                        </span>


                        <span class="specification-value">

                            ${value}

                        </span>

                    </div>

                `;

            }
        )
        .join("");

}



/* =====================================================
   المنتجات المشابهة
   ===================================================== */

function renderRelatedProducts() {


    if (!relatedProducts) {

        return;

    }


    const related =
        products
            .filter(
                item =>
                    item.category ===
                        product.category &&

                    item.id !==
                        product.id
            )
            .slice(0, 4);



    /* إذا لم توجد منتجات مشابهة */

    if (related.length === 0) {

        relatedProducts.innerHTML = `

            <p class="no-related-products">

                لا توجد منتجات مشابهة حاليًا.

            </p>

        `;

        return;

    }



    /* عرض المنتجات */

    relatedProducts.innerHTML =
        related
            .map(
                item => {

                    return `

                        <a
                            href="product.html?id=${item.id}"
                            class="related-product"
                        >

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >


                            <h3>

                                ${item.name}

                            </h3>


                            <p>

                                ${item.price.toLocaleString()} د.ع

                            </p>

                        </a>

                    `;

                }
            )
            .join("");

}



/* =====================================================
   تحديث عداد السلة
   ===================================================== */

function updateCartCount() {


    const cart =
        JSON.parse(
            localStorage.getItem(
                "vanillaCart"
            )
        ) || [];



    const count =
        cart.reduce(
            (
                total,
                item
            ) =>
                total +
                item.quantity,

            0
        );



    if (cartCount) {

        cartCount.textContent =
            count;

    }

}