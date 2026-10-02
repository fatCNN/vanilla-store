// =========================================
// متجر فانيلا - JavaScript
// =========================================


// =========================================
// شريط الإعلانات المتحرك
// =========================================

const announcementTrack =
    document.getElementById("announcementTrack");


if (announcementTrack) {

    const announcementContent =
        announcementTrack.querySelector(
            ".announcement-content"
        );


    function updateAnnouncementWidth() {

        if (!announcementContent) {
            return;
        }


        const contentWidth =
            announcementContent.getBoundingClientRect().width;


        announcementTrack.style.setProperty(
            "--announcement-width",
            `${contentWidth}px`
        );

    }


    updateAnnouncementWidth();


    window.addEventListener(
        "resize",
        updateAnnouncementWidth
    );

}



// =========================================
// البحث عن المنتجات
// =========================================

const searchForm =
    document.getElementById("searchForm");


if (searchForm) {

    searchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const searchInput =
                document.getElementById("searchInput");


            if (!searchInput) {
                return;
            }


            const searchValue =
                searchInput.value.trim();


            if (searchValue === "") {
                return;
            }


            const searchUrl =
                "products/products.html?search=" +
                encodeURIComponent(searchValue);


            window.location.href =
                searchUrl;

        }
    );

}



// =========================================
// نموذج التواصل
// =========================================

const contactForm =
    document.getElementById("contactForm");


const fileInput =
    document.getElementById("fileInput");


const fileName =
    document.getElementById("fileName");


const formStatus =
    document.getElementById("formStatus");



// =========================================
// إظهار اسم الملف
// =========================================

if (fileInput && fileName) {

    fileInput.addEventListener(
        "change",
        function () {

            if (fileInput.files.length > 0) {

                fileName.textContent =
                    "الملف المختار: " +
                    fileInput.files[0].name;

            } else {

                fileName.textContent = "";

            }

        }
    );

}



// =========================================
// نموذج التواصل
// =========================================

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (formStatus) {

                formStatus.textContent =
                    "تم استلام رسالتك. سيتم تفعيل الإرسال الفعلي لاحقًا.";


                formStatus.classList.add(
                    "success"
                );

            }

        }
    );

}