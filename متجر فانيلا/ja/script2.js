/* =====================================================
   عناصر نافذة تسجيل الدخول
   ===================================================== */

const openLogin =
    document.getElementById("open-login");

const closeLogin =
    document.getElementById("close-login");

const loginModal =
    document.getElementById("login-modal");

const loginForm =
    document.getElementById("login-form");

const googleLogin =
    document.getElementById("google-login");


/* =====================================================
   فتح نافذة تسجيل الدخول
   ===================================================== */

if (openLogin) {

    openLogin.addEventListener("click", function (event) {

        event.preventDefault();

        loginModal.classList.add("active");

        loginModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

        const emailInput =
            document.getElementById("login-email");

        if (emailInput) {

            setTimeout(function () {

                emailInput.focus();

            }, 250);

        }

    });

}


/* =====================================================
   إغلاق النافذة
   ===================================================== */

function closeLoginModal() {

    loginModal.classList.remove("active");

    loginModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =====================================================
   زر X
   ===================================================== */

if (closeLogin) {

    closeLogin.addEventListener(
        "click",
        closeLoginModal
    );

}


/* =====================================================
   الضغط خارج الصندوق
   ===================================================== */

if (loginModal) {

    loginModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === loginModal
            ) {

                closeLoginModal();

            }

        }
    );

}


/* =====================================================
   زر ESC
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            loginModal.classList.contains("active")
        ) {

            closeLoginModal();

        }

    }
);


/* =====================================================
   نموذج تسجيل الدخول
   ===================================================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document.getElementById(
                    "login-email"
                ).value;

            const password =
                document.getElementById(
                    "login-password"
                ).value;


            if (!email || !password) {

                alert(
                    "يرجى إدخال البريد الإلكتروني وكلمة المرور"
                );

                return;

            }


            /*
             * هنا لاحقاً نربط النموذج
             * مع Backend وقاعدة البيانات.
             */

            alert(
                "تم استلام بيانات تسجيل الدخول"
            );

        }
    );

}


/* =====================================================
   Google Login
   ===================================================== */

if (googleLogin) {

    googleLogin.addEventListener(
        "click",
        function () {

            /*
             * هذا الزر حالياً واجهة فقط.
             *
             * عند إعداد Google OAuth
             * سنضع عملية تسجيل Google هنا.
             */

            alert(
                "سيتم ربط حساب Google هنا بعد إعداد Google OAuth"
            );

        }
    );

}
