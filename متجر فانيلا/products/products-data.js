const products = [

    // =====================================================
    // 1. فستان أنيق
    // =====================================================

    {
        id: 1,
        name: "فستان أنيق",
        description: "فستان نسائي أنيق مناسب للمناسبات والاستخدام اليومي.",
        price: 75000,
        oldPrice: 90000,
        image: "static/id.png",
        category: "clothes",
        categoryName: "ملابس",
        subcategory: "dresses",
        subcategoryName: "فساتين",
        brand: "Vanilla",
        rating: 4.5,

        colors: [
            {
                name: "فستان زارا اسود",
                value: "#111111",
                image: "static/id.png",
                stock: 5
            },
            {
                name: "أبيض",
                value: "#ffffff",
                image: "static/product1-white.jpg",
                stock: 0
            },
            {
                name: "بيج",
                value: "#d8c3a5",
                image: "static/product1-beige.jpg",
                stock: 3
            },
            {
                name: "وردي",
                value: "#f3a6b8",
                image: "static/product1-pink.jpg",
                stock: 4
            }
        ],

        specifications: {
            "النوع": "فستان",
            "الجنس": "نسائي",
            "المقاسات": "S - M - L - XL",
            "الخامة": "قطن"
        }
    },


    // =====================================================
    // 2. قميص نسائي
    // =====================================================

    {
        id: 2,
        name: "قميص نسائي",
        description: "قميص أنيق بتصميم عصري ومريح.",
        price: 45000,
        image: "static/product2.jpg",
        category: "clothes",
        categoryName: "ملابس",
        subcategory: "shirts",
        subcategoryName: "قمصان",
        brand: "Vanilla",
        rating: 4,

        colors: [
            {
                name: "أبيض",
                value: "#ffffff",
                image: "static/product2-white.jpg",
                stock: 7
            },
            {
                name: "أسود",
                value: "#111111",
                image: "static/product2-black.jpg",
                stock: 8
            },
            {
                name: "أزرق",
                value: "#3b82f6",
                image: "static/product2-blue.jpg",
                stock: 5
            },
            {
                name: "بيج",
                value: "#d8c3a5",
                image: "static/product2-beige.jpg",
                stock: 0
            }
        ],

        specifications: {
            "النوع": "قميص",
            "الجنس": "نسائي",
            "المقاسات": "S - M - L",
            "الخامة": "قطن"
        }
    },


    // =====================================================
    // 3. عطر نسائي فاخر
    // =====================================================

    {
        id: 3,
        name: "عطر نسائي فاخر",
        description: "عطر نسائي برائحة ناعمة وثابتة.",
        price: 55000,
        oldPrice: 65000,
        image: "static/perfume1.jpg",
        category: "perfumes",
        categoryName: "عطور",
        subcategory: "women",
        subcategoryName: "عطور نسائية",
        brand: "Vanilla",
        rating: 4.8,
        stock: 15,

        specifications: {
            "النوع": "عطر نسائي",
            "الحجم": "100 مل",
            "الثبات": "طويل",
            "التركيز": "Eau de Parfum"
        }
    },


    // =====================================================
    // 4. عطر رجالي
    // =====================================================

    {
        id: 4,
        name: "عطر رجالي",
        description: "عطر رجالي برائحة قوية وأنيقة.",
        price: 60000,
        image: "static/perfume2.jpg",
        category: "perfumes",
        categoryName: "عطور",
        subcategory: "men",
        subcategoryName: "عطور رجالية",
        brand: "Vanilla",
        rating: 4.6,
        stock: 10,

        specifications: {
            "النوع": "عطر رجالي",
            "الحجم": "100 مل",
            "الثبات": "طويل",
            "التركيز": "Eau de Parfum"
        }
    },


    // =====================================================
    // 5. ثلاجة Samsung
    // =====================================================

    {
        id: 5,
        name: "ثلاجة Samsung",
        description: "ثلاجة Samsung بتصميم عصري وسعة كبيرة.",
        price: 1200000,
        oldPrice: 1350000,
        image: "static/pro1.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "fridges",
        subcategoryName: "ثلاجات",
        brand: "Samsung",
        rating: 4.8,

        colors: [
            {
                name: "فضي",
                value: "#c0c0c0",
                image: "static/pro1-silver.png",
                stock: 3
            },
            {
                name: "أسود",
                value: "#111111",
                image: "static/pro1-black.png",
                stock: 2
            }
        ],

        specifications: {
            "النوع": "ثلاجة",
            "العلامة": "Samsung",
            "السعة": "500 لتر",
            "اللون": "متعدد",
            "الضمان": "سنتان"
        }
    },


    // =====================================================
    // 6. غسالة LG
    // =====================================================

    {
        id: 6,
        name: "غسالة LG",
        description: "غسالة أوتوماتيكية حديثة مع برامج متعددة.",
        price: 850000,
        image: "static/pro2.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "washing",
        subcategoryName: "غسالات",
        brand: "LG",
        rating: 4.7,

        colors: [
            {
                name: "أبيض",
                value: "#ffffff",
                image: "static/pro2-white.png",
                stock: 4
            },
            {
                name: "فضي",
                value: "#c0c0c0",
                image: "static/pro2-silver.png",
                stock: 3
            }
        ],

        specifications: {
            "النوع": "غسالة أوتوماتيك",
            "العلامة": "LG",
            "السعة": "9 كغم",
            "السرعة": "1200 دورة",
            "الضمان": "سنتان"
        }
    },


    // =====================================================
    // 7. شاشة Samsung Smart
    // =====================================================

    {
        id: 7,
        name: "شاشة Samsung Smart",
        description: "شاشة ذكية بدقة عالية وتصميم أنيق.",
        price: 650000,
        image: "static/pro3.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "screens",
        subcategoryName: "شاشات",
        brand: "Samsung",
        rating: 4.7,

        colors: [
            {
                name: "أسود",
                value: "#111111",
                image: "static/pro3-black.png",
                stock: 8
            }
        ],

        specifications: {
            "النوع": "Smart TV",
            "العلامة": "Samsung",
            "الحجم": "55 إنش",
            "الدقة": "4K",
            "الضمان": "سنتان"
        }
    },


    // =====================================================
    // 8. مكيف هواء
    // =====================================================

    {
        id: 8,
        name: "مكيف هواء",
        description: "مكيف هواء بتبريد قوي واستهلاك اقتصادي.",
        price: 900000,
        image: "static/pro4.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "air-conditioners",
        subcategoryName: "مكيفات",
        brand: "Gree",
        rating: 4.5,

        colors: [
            {
                name: "أبيض",
                value: "#ffffff",
                image: "static/pro4-white.png",
                stock: 6
            }
        ],

        specifications: {
            "النوع": "سبلت",
            "العلامة": "Gree",
            "القدرة": "2 طن",
            "التبريد": "بارد",
            "الضمان": "سنة"
        }
    },


    // =====================================================
    // 9. فرن كهربائي
    // =====================================================

    {
        id: 9,
        name: "فرن كهربائي",
        description: "فرن كهربائي مناسب للمطبخ المنزلي.",
        price: 350000,
        image: "static/pro5.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "kitchen",
        subcategoryName: "أجهزة مطبخ",
        brand: "Vanilla",
        rating: 4.3,

        colors: [
            {
                name: "أسود",
                value: "#111111",
                image: "static/pro5-black.png",
                stock: 5
            },
            {
                name: "فضي",
                value: "#c0c0c0",
                image: "static/pro5-silver.png",
                stock: 4
            }
        ],

        specifications: {
            "النوع": "فرن كهربائي",
            "السعة": "60 لتر",
            "القدرة": "2000 واط"
        }
    },


    // =====================================================
    // 10. مايكروويف
    // =====================================================

    {
        id: 10,
        name: "مايكروويف",
        description: "مايكروويف عملي وسهل الاستخدام.",
        price: 220000,
        image: "static/pro6.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "kitchen",
        subcategoryName: "أجهزة مطبخ",
        brand: "Vanilla",
        rating: 4.2,

        colors: [
            {
                name: "أسود",
                value: "#111111",
                image: "static/pro6-black.png",
                stock: 5
            },
            {
                name: "فضي",
                value: "#c0c0c0",
                image: "static/pro6-silver.png",
                stock: 4
            },
            {
                name: "أبيض",
                value: "#ffffff",
                image: "static/pro6-white.png",
                stock: 2
            }
        ],

        specifications: {
            "النوع": "مايكروويف",
            "السعة": "25 لتر",
            "القدرة": "900 واط"
        }
    },


    // =====================================================
    // 11. مكنسة كهربائية
    // =====================================================

    {
        id: 11,
        name: "مكنسة كهربائية",
        description: "مكنسة كهربائية للاستخدام المنزلي.",
        price: 180000,
        image: "static/pro7.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "kitchen",
        subcategoryName: "أجهزة منزلية",
        brand: "Vanilla",
        rating: 4.1,

        colors: [
            {
                name: "أسود",
                value: "#111111",
                image: "static/pro7-black.png",
                stock: 8
            },
            {
                name: "أحمر",
                value: "#d64545",
                image: "static/pro7-red.png",
                stock: 6
            }
        ],

        specifications: {
            "النوع": "مكنسة كهربائية",
            "القدرة": "1800 واط"
        }
    },


    // =====================================================
    // 12. خلاط كهربائي
    // =====================================================

    {
        id: 12,
        name: "خلاط كهربائي",
        description: "خلاط كهربائي للاستخدام اليومي.",
        price: 95000,
        image: "static/pro8.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "kitchen",
        subcategoryName: "أجهزة مطبخ",
        brand: "Vanilla",
        rating: 4.4,

        colors: [
            {
                name: "أسود",
                value: "#111111",
                image: "static/pro8-black.png",
                stock: 10
            },
            {
                name: "أبيض",
                value: "#ffffff",
                image: "static/pro8-white.png",
                stock: 10
            }
        ],

        specifications: {
            "النوع": "خلاط",
            "القدرة": "600 واط"
        }
    },


    // =====================================================
    // 13. غسالة صحون
    // =====================================================

    {
        id: 13,
        name: "غسالة صحون",
        description: "غسالة صحون حديثة للمطبخ.",
        price: 700000,
        image: "static/pro9.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "washing",
        subcategoryName: "غسالات",
        brand: "LG",
        rating: 4.5,

        colors: [
            {
                name: "فضي",
                value: "#c0c0c0",
                image: "static/pro9-silver.png",
                stock: 4
            },
            {
                name: "أبيض",
                value: "#ffffff",
                image: "static/pro9-white.png",
                stock: 0
            }
        ],

        specifications: {
            "النوع": "غسالة صحون",
            "السعة": "14 مكان"
        }
    },


    // =====================================================
    // 14. شاشة LG
    // =====================================================

    {
        id: 14,
        name: "شاشة LG",
        description: "شاشة ذكية بدقة عالية.",
        price: 500000,
        image: "static/pro10.png",
        category: "electronics",
        categoryName: "أجهزة كهربائية",
        subcategory: "screens",
        subcategoryName: "شاشات",
        brand: "LG",
        rating: 4.6,

        colors: [
            {
                name: "أسود",
                value: "#111111",
                image: "static/pro10-black.png",
                stock: 6
            }
        ],

        specifications: {
            "النوع": "Smart TV",
            "الحجم": "50 إنش",
            "الدقة": "4K"
        }
    },


    // =====================================================
    // 15. ساعة أنيقة
    // =====================================================

    {
        id: 15,
        name: "ساعة أنيقة",
        description: "ساعة أنيقة مناسبة للاستخدام اليومي.",
        price: 85000,
        image: "static/accessory1.jpg",
        category: "accessories",
        categoryName: "إكسسوارات",
        subcategory: "watches",
        subcategoryName: "ساعات",
        brand: "Vanilla",
        rating: 4.4,

        colors: [
            {
                name: "ذهبي",
                value: "#d4af37",
                image: "static/accessory1-gold.jpg",
                stock: 5
            },
            {
                name: "فضي",
                value: "#c0c0c0",
                image: "static/accessory1-silver.jpg",
                stock: 5
            },
            {
                name: "أسود",
                value: "#111111",
                image: "static/accessory1-black.jpg",
                stock: 3
            }
        ],

        specifications: {
            "النوع": "ساعة",
            "الجنس": "نسائي"
        }
    },


    // =====================================================
    // 16. حقيبة نسائية
    // =====================================================

    {
        id: 16,
        name: "حقيبة نسائية",
        description: "حقيبة أنيقة وعملية للاستخدام اليومي.",
        price: 70000,
        image: "static/accessory2.jpg",
        category: "accessories",
        categoryName: "إكسسوارات",
        subcategory: "bags",
        subcategoryName: "حقائب",
        brand: "Vanilla",
        rating: 4.3,

        colors: [
            {
                name: "أسود",
                value: "#111111",
                image: "static/accessory2-black.jpg",
                stock: 4
            },
            {
                name: "بيج",
                value: "#d8c3a5",
                image: "static/accessory2-beige.jpg",
                stock: 3
            },
            {
                name: "بني",
                value: "#8b5a2b",
                image: "static/accessory2-brown.jpg",
                stock: 3
            }
        ],

        specifications: {
            "النوع": "حقيبة",
            "الجنس": "نسائي"
        }
    }

];


// =====================================================
// حساب المخزون الكلي تلقائيًا من مخزون الألوان
// =====================================================

products.forEach(product => {

    // إذا كان المنتج يحتوي على ألوان
    if (product.colors && product.colors.length > 0) {

        product.stock = product.colors.reduce(
            (total, color) => total + Number(color.stock || 0),
            0
        );

    }

});