const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-message");


// ================================
// إضافة رسالة المستخدم
// ================================

function addUserMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className = "message user-message";

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    scrollToBottom();
}


// ================================
// إضافة رسالة المتجر
// ================================

function addBotMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className = "message bot-message";

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    scrollToBottom();
}


// ================================
// النزول إلى آخر رسالة
// ================================

function scrollToBottom() {

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


// ================================
// الردود
// ================================

function getBotResponse(message) {

    const text = message.toLowerCase().trim();


    // ----------------------------
    // مرحبًا
    // ----------------------------

    if (
        text.includes("مرحبا") ||
        text.includes("مرحبًا") ||
        text.includes("هلا") ||
        text.includes("السلام")
    ) {

        return "أهلًا وسهلًا بك في متجر فانيلا 🌷 كيف يمكنني مساعدتك؟";

    }


    // ----------------------------
    // الطلب
    // ----------------------------

    if (
        text.includes("طلب") ||
        text.includes("طلبي")
    ) {

        return "يمكنك متابعة طلبك من خلال رقم الطلب. إذا كان لديك رقم الطلب، أرسله لنا وسنساعدك.";

    }


    // ----------------------------
    // التوصيل
    // ----------------------------

    if (
        text.includes("توصيل") ||
        text.includes("التوصيل") ||
        text.includes("شحن")
    ) {

        return "نوفر خدمة التوصيل، وتختلف مدة التوصيل حسب المنطقة. سيتم عرض تفاصيل التوصيل عند إتمام الطلب.";

    }


    // ----------------------------
    // الدفع
    // ----------------------------

    if (
        text.includes("دفع") ||
        text.includes("الدفع") ||
        text.includes("فلوس") ||
        text.includes("السعر")
    ) {

        return "يمكنك معرفة سعر المنتج من صفحة المنتج. أما طرق الدفع فسيتم تحديدها عند إتمام الطلب.";

    }


    // ----------------------------
    // الاسترجاع
    // ----------------------------

    if (
        text.includes("استرجاع") ||
        text.includes("ارجاع") ||
        text.includes("إرجاع") ||
        text.includes("استبدال")
    ) {

        return "يمكنك طلب الاستبدال أو الاسترجاع من خلال التواصل مع خدمة العملاء، مع توضيح رقم الطلب وسبب الطلب.";

    }


    // ----------------------------
    // المنتجات
    // ----------------------------

    if (
        text.includes("منتج") ||
        text.includes("منتجات") ||
        text.includes("اختار")
    ) {

        return "بالتأكيد 🌷 يمكنك الدخول إلى قسم المنتجات ومشاهدة المنتجات والتفاصيل والأسعار قبل الشراء.";

    }


    // ----------------------------
    // المقاسات
    // ----------------------------

    if (
        text.includes("مقاس") ||
        text.includes("قياس")
    ) {

        return "يمكنك معرفة المقاسات المتاحة من صفحة المنتج. إذا كنت محتارًا في اختيار المقاس، أخبرنا بنوع المنتج وسنساعدك.";

    }


    // ----------------------------
    // الألوان
    // ----------------------------

    if (
        text.includes("لون") ||
        text.includes("ألوان") ||
        text.includes("الوان")
    ) {

        return "يمكنك مشاهدة الألوان المتاحة من صفحة المنتج، وبعض الألوان قد تكون غير متوفرة حاليًا.";

    }


    // ----------------------------
    // خدمة العملاء
    // ----------------------------

    if (
        text.includes("موظف") ||
        text.includes("خدمة العملاء") ||
        text.includes("خدمة")
    ) {

        return "يمكنك التواصل مع خدمة العملاء من خلال صفحة تواصل معنا، وسنساعدك في حل المشكلة.";

    }


    // ----------------------------
    // شكرًا
    // ----------------------------

    if (
        text.includes("شكرا") ||
        text.includes("شكرًا")
    ) {

        return "العفو 🌷 يسعدنا مساعدتك دائمًا.";

    }


    // ----------------------------
    // الرد الافتراضي
    // ----------------------------

    return "عذرًا، لم أفهم سؤالك بشكل كامل. يمكنك السؤال عن الطلب، التوصيل، الدفع، الاسترجاع، المنتجات أو الألوان.";


}


// ================================
// إرسال الرسالة
// ================================

function sendMessage() {

    const message = chatInput.value.trim();


    // لا ترسل رسالة فارغة

    if (message === "") {
        return;
    }


    // إظهار رسالة المستخدم

    addUserMessage(message);


    // تفريغ مربع الكتابة

    chatInput.value = "";


    // إظهار رد المتجر بعد فترة قصيرة

    setTimeout(function () {

        const response = getBotResponse(message);

        addBotMessage(response);

    }, 600);

}


// ================================
// زر الإرسال
// ================================

sendButton.addEventListener(
    "click",
    sendMessage
);


// ================================
// الضغط على Enter
// ================================

chatInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);


// ================================
// الأزرار السريعة
// ================================

const quickButtons =
    document.querySelectorAll(".quick-reply");


quickButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const message = button.textContent.trim();

            chatInput.value = message;

            sendMessage();

        }
    );

});


// ================================
// أزرار المساعدة السريعة
// ================================

const helpButtons =
    document.querySelectorAll(".help-option");


helpButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const message = button.textContent.trim();

            chatInput.value = message;

            sendMessage();

        }
    );

});