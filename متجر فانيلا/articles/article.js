const articleContainer =
    document.getElementById("article-container");


function formatDate(date) {

    const articleDate = new Date(date);

    return articleDate.toLocaleDateString("ar-IQ", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

}


const urlParams =
    new URLSearchParams(window.location.search);

const articleId =
    Number(urlParams.get("id"));


const article =
    articles.find(function (item) {

        return item.id === articleId;

    });


if (!article) {

    document.title =
        "المقال غير موجود - متجر فانيلا";


    articleContainer.innerHTML = `

        <div class="article-not-found">

            <h1>
                المقال غير موجود
            </h1>

            <p>
                عذرًا، لم نتمكن من العثور على المقال المطلوب.
            </p>

            <a
                href="articles.html"
                class="article-back-button"
            >
                العودة إلى المقالات
            </a>

        </div>

    `;

} else {

    document.title =
        article.title + " - متجر فانيلا";


    articleContainer.innerHTML = `

        <article class="article-single">

            <div class="article-single-image">

                <img
                    src="${article.image}"
                    alt="${article.title}"
                >

            </div>


            <div class="article-single-content">

                <span class="article-category">
                    ${article.category}
                </span>


                <p class="article-date">
                    ${formatDate(article.date)}
                </p>


                <h1>
                    ${article.title}
                </h1>


                <div class="article-text">

                    ${article.content}

                </div>


                <a
                    href="articles.html"
                    class="article-back-button"
                >
                    ← العودة إلى المقالات
                </a>

            </div>

        </article>

    `;

}