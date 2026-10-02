/* =====================================================
   إعدادات السلة والعروض
   ===================================================== */

const CART_KEY = "vanillaCart";


/*
   الحد الأول:
   عند الوصول إليه يصبح التوصيل مجانيًا
*/

const FREE_DELIVERY_LIMIT = 50000;


/*
   الحد الثاني:
   عند الوصول إليه يحصل العميل على خصم 10%
*/

const DISCOUNT_LIMIT = 100000;


/*
   نسبة الخصم
*/

const DISCOUNT_RATE = 0.10;


/*
   قيمة التوصيل العادية

   يمكن تغييرها لاحقًا حسب نظام المتجر.
*/

const DELIVERY_FEE = 5000;



/* =====================================================
   قراءة السلة
   ===================================================== */

function getCart() {

    try {

        const cart =
            JSON.parse(
                localStorage.getItem(CART_KEY)
            );

        return Array.isArray(cart)
            ? cart
            : [];

    } catch (error) {

        console.error(
            "حدث خطأ أثناء قراءة السلة:",
            error
        );

        return [];
    }
}



/* =====================================================
   حفظ السلة
   ===================================================== */

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}



/* =====================================================
   تنسيق السعر
   ===================================================== */

function formatPrice(price) {

    return (
        new Intl.NumberFormat("ar-IQ")
            .format(Number(price) || 0)
        + " د.ع"
    );
}



/* =====================================================
   تحديث رقم السلة في الهيدر
   ===================================================== */

function updateCartCount(cart) {

    const cartCount =
        document.getElementById(
            "cart-count"
        );


    if (!cartCount) {
        return;
    }


    const totalQuantity =
        cart.reduce(
            function (total, item) {

                return (
                    total +
                    Number(item.quantity || 0)
                );

            },
            0
        );


    cartCount.textContent =
        totalQuantity;
}



/* =====================================================
   حساب الخصم والتوصيل
   ===================================================== */

function calculateCartBenefits(subtotal) {

    let discount = 0;
    let delivery = DELIVERY_FEE;


    /*
       إذا وصل الطلب إلى 100,000
       يحصل على خصم 10%
       والتوصيل مجاني
    */

    if (subtotal >= DISCOUNT_LIMIT) {

        discount =
            subtotal * DISCOUNT_RATE;

        delivery = 0;

    }


    /*
       إذا وصل الطلب إلى 50,000
       يصبح التوصيل مجانيًا
    */

    else if (
        subtotal >= FREE_DELIVERY_LIMIT
    ) {

        delivery = 0;
    }


    const finalTotal =
        subtotal -
        discount +
        delivery;


    return {
        discount,
        delivery,
        finalTotal
    };
}



/* =====================================================
   عرض رسالة العروض
   ===================================================== */

function displayCartBenefits(subtotal) {

    const benefits =
        document.getElementById(
            "cart-benefits"
        );


    if (!benefits) {
        return;
    }


    /*
       وصل العميل إلى الخصم 10%
    */

    if (subtotal >= DISCOUNT_LIMIT) {

        benefits.innerHTML = `

            <h3 class="benefit-title">
                🎉 مبروك! حصلتِ على مزايا الطلب
            </h3>

            <p class="benefit-message">
                حصلتِ على خصم 10% بالإضافة إلى التوصيل المجاني.
            </p>

            <div class="benefit-progress">

                <div
                    class="benefit-progress-bar"
                    style="width: 100%;"
                ></div>

            </div>

        `;

        return;
    }


    /*
       وصل العميل إلى التوصيل المجاني
    */

    if (
        subtotal >= FREE_DELIVERY_LIMIT
    ) {

        const remaining =
            DISCOUNT_LIMIT -
            subtotal;


        const progress =
            Math.min(
                (subtotal / DISCOUNT_LIMIT) * 100,
                100
            );


        benefits.innerHTML = `

            <h3 class="benefit-title">
                🎁 حصلتِ على التوصيل المجاني
            </h3>

            <p class="benefit-message">
                أضيفي ${formatPrice(remaining)}
                لتحصلي أيضًا على خصم 10%.
            </p>

            <div class="benefit-progress">

                <div
                    class="benefit-progress-bar"
                    style="width: ${progress}%;"
                ></div>

            </div>

        `;

        return;
    }


    /*
       لم يصل العميل إلى 50,000
    */

    const remaining =
        FREE_DELIVERY_LIMIT -
        subtotal;


    const progress =
        Math.min(
            (subtotal / FREE_DELIVERY_LIMIT) * 100,
            100
        );


    benefits.innerHTML = `

        <h3 class="benefit-title">
            🎁 عروض خاصة على طلبك
        </h3>

        <p class="benefit-message">
            أضيفي ${formatPrice(remaining)}
            لتحصلي على توصيل مجاني.
        </p>

        <div class="benefit-progress">

            <div
                class="benefit-progress-bar"
                style="width: ${progress}%;"
            ></div>

        </div>

    `;
}



/* =====================================================
   عرض السلة
   ===================================================== */

function displayCart() {

    const cartItemsContainer =
        document.getElementById(
            "cart-items"
        );


    const emptyCart =
        document.getElementById(
            "empty-cart"
        );


    const cartSummary =
        document.getElementById(
            "cart-summary"
        );


    if (!cartItemsContainer) {
        return;
    }


    const cart =
        getCart();


    updateCartCount(cart);


    /*
       إذا كانت السلة فارغة
    */

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = "";


        if (emptyCart) {
            emptyCart.style.display =
                "block";
        }


        if (cartSummary) {
            cartSummary.style.display =
                "none";
        }


        return;
    }


    /*
       السلة تحتوي على منتجات
    */

    if (emptyCart) {
        emptyCart.style.display =
            "none";
    }


    if (cartSummary) {
        cartSummary.style.display =
            "block";
    }


    cartItemsContainer.innerHTML = "";


    let totalItems = 0;
    let subtotal = 0;



    /* =================================================
       إنشاء المنتجات
       ================================================= */

    cart.forEach(
        function (item, index) {

            const quantity =
                Number(item.quantity) || 0;


            const price =
                Number(item.price) || 0;


            const itemTotal =
                price * quantity;


            totalItems += quantity;

            subtotal += itemTotal;



            /*
               بطاقة المنتج
            */

            const cartItem =
                document.createElement(
                    "article"
                );


            cartItem.className =
                "cart-item";



            /* الصورة */

            const imageContainer =
                document.createElement(
                    "div"
                );


            imageContainer.className =
                "cart-item-image";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                `products/${item.image}`;


            image.alt =
                item.name || "منتج";


            image.loading =
                "lazy";


            image.onerror =
                function () {

                    this.src =
                        "products/static/my_logo.jpg";
                };


            imageContainer.appendChild(
                image
            );



            /* معلومات المنتج */

            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "cart-item-info";


            const name =
                document.createElement(
                    "h3"
                );


            name.className =
                "cart-item-name";


            name.textContent =
                item.name || "منتج";


            info.appendChild(name);



            /*
               اللون إذا كان موجودًا
            */

            if (item.color) {

                const color =
                    document.createElement(
                        "p"
                    );


                color.className =
                    "cart-item-color";


                color.textContent =
                    `اللون: ${item.color}`;


                info.appendChild(color);
            }



            /* السعر */

            const priceElement =
                document.createElement(
                    "p"
                );


            priceElement.className =
                "cart-item-price";


            priceElement.textContent =
                formatPrice(price);


            info.appendChild(
                priceElement
            );



            /* =================================================
               التحكم بالكمية
               ================================================= */

            const quantityContainer =
                document.createElement(
                    "div"
                );


            quantityContainer.className =
                "cart-item-quantity";


            const minusButton =
                document.createElement(
                    "button"
                );


            minusButton.className =
                "quantity-button";


            minusButton.type =
                "button";


            minusButton.textContent =
                "−";


            const quantityNumber =
                document.createElement(
                    "span"
                );


            quantityNumber.className =
                "quantity-number";


            quantityNumber.textContent =
                quantity;


            const plusButton =
                document.createElement(
                    "button"
                );


            plusButton.className =
                "quantity-button";


            plusButton.type =
                "button";


            plusButton.textContent =
                "+";


            quantityContainer.appendChild(
                minusButton
            );


            quantityContainer.appendChild(
                quantityNumber
            );


            quantityContainer.appendChild(
                plusButton
            );



            /* مجموع المنتج */

            const itemTotalElement =
                document.createElement(
                    "div"
                );


            itemTotalElement.className =
                "cart-item-total";


            itemTotalElement.textContent =
                formatPrice(itemTotal);



            /* زر الحذف */

            const removeButton =
                document.createElement(
                    "button"
                );


            removeButton.className =
                "remove-cart-item";


            removeButton.type =
                "button";


            removeButton.textContent =
                "✕";



            /* =================================================
               تقليل الكمية
               ================================================= */

            minusButton.addEventListener(
                "click",
                function () {

                    const currentCart =
                        getCart();


                    if (
                        !currentCart[index]
                    ) {
                        return;
                    }


                    if (
                        Number(
                            currentCart[index].quantity
                        ) > 1
                    ) {

                        currentCart[index]
                            .quantity -= 1;

                    } else {

                        currentCart.splice(
                            index,
                            1
                        );
                    }


                    saveCart(
                        currentCart
                    );


                    displayCart();
                }
            );



            /* =================================================
               زيادة الكمية
               ================================================= */

            plusButton.addEventListener(
                "click",
                function () {

                    const currentCart =
                        getCart();


                    if (
                        !currentCart[index]
                    ) {
                        return;
                    }


                    currentCart[index]
                        .quantity =
                        Number(
                            currentCart[index]
                                .quantity
                        ) + 1;


                    saveCart(
                        currentCart
                    );


                    displayCart();
                }
            );



            /* =================================================
               حذف المنتج
               ================================================= */

            removeButton.addEventListener(
                "click",
                function () {

                    const currentCart =
                        getCart();


                    if (
                        !currentCart[index]
                    ) {
                        return;
                    }


                    currentCart.splice(
                        index,
                        1
                    );


                    saveCart(
                        currentCart
                    );


                    displayCart();
                }
            );



            /* إضافة العناصر */

            cartItem.appendChild(
                imageContainer
            );


            cartItem.appendChild(
                info
            );


            cartItem.appendChild(
                quantityContainer
            );


            cartItem.appendChild(
                itemTotalElement
            );


            cartItem.appendChild(
                removeButton
            );


            cartItemsContainer.appendChild(
                cartItem
            );
        }
    );



    /* =====================================================
       حساب الخصم والتوصيل
       ===================================================== */

    const benefits =
        calculateCartBenefits(
            subtotal
        );


    displayCartBenefits(
        subtotal
    );



    /* =====================================================
       تحديث ملخص السلة
       ===================================================== */

    const totalItemsElement =
        document.getElementById(
            "cart-total-items"
        );


    const subtotalElement =
        document.getElementById(
            "cart-subtotal"
        );


    const discountElement =
        document.getElementById(
            "cart-discount"
        );


    const deliveryElement =
        document.getElementById(
            "cart-delivery"
        );


    const totalElement =
        document.getElementById(
            "cart-total-price"
        );



    if (totalItemsElement) {

        totalItemsElement.textContent =
            totalItems;
    }


    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(subtotal);
    }


    if (discountElement) {

        discountElement.textContent =
            benefits.discount > 0
                ? "- " +
                  formatPrice(
                      benefits.discount
                  )
                : "0 د.ع";
    }


    if (deliveryElement) {

        if (
            benefits.delivery === 0
        ) {

            deliveryElement.textContent =
                "مجاني";


            deliveryElement.classList.add(
                "delivery-free"
            );

        } else {

            deliveryElement.textContent =
                formatPrice(
                    benefits.delivery
                );


            deliveryElement.classList.remove(
                "delivery-free"
            );
        }
    }


    if (totalElement) {

        totalElement.textContent =
            formatPrice(
                benefits.finalTotal
            );
    }
}



/* =====================================================
   إفراغ السلة
   ===================================================== */

function clearCart() {

    const cart =
        getCart();


    if (cart.length === 0) {
        return;
    }


    const confirmed =
        confirm(
            "هل أنتِ متأكدة من حذف جميع المنتجات من السلة؟"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        CART_KEY
    );


    displayCart();
}



/* =====================================================
   متابعة الطلب
   ===================================================== */

function checkout() {

    const cart =
        getCart();


    if (cart.length === 0) {

        alert(
            "السلة فارغة. أضيفي منتجًا أولًا."
        );

        return;
    }


    alert(
        "سيتم إضافة نظام إتمام الطلب لاحقًا."
    );
}



/* =====================================================
   البحث
   ===================================================== */

function setupSearch() {

    const searchForm =
        document.getElementById(
            "home-search-form"
        );


    const searchInput =
        document.getElementById(
            "home-search-input"
        );


    if (
        !searchForm ||
        !searchInput
    ) {
        return;
    }


    searchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const search =
                searchInput.value.trim();


            if (search === "") {
                return;
            }


            window.location.href =
                "products/products.html?search=" +
                encodeURIComponent(search);
        }
    );
}



/* =====================================================
   تشغيل الصفحة
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        setupSearch();


        const clearButton =
            document.getElementById(
                "clear-cart-button"
            );


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearCart
            );
        }


        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                checkout
            );
        }

    }
);

