const articlesContainer =
    document.getElementById("articles-container");

const noArticles =
    document.getElementById("no-articles");


function formatDate(date) {

    const articleDate = new Date(date);

    return articleDate.toLocaleDateString("ar-IQ", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

}


function createArticleCard(article) {

    const articleCard =
        document.createElement("article");

    articleCard.className = "article-card";

    articleCard.innerHTML = `
        <div class="article-image">

            <img
                src="${article.image}"
                alt="${article.title}"
            >

        </div>

        <div class="article-content">

            <span class="article-category">
                ${article.category}
            </span>

            <p class="article-date">
                ${formatDate(article.date)}
            </p>

            <h2>
                ${article.title}
            </h2>

            <p class="article-excerpt">
                ${article.excerpt}
            </p>

            <a
                href="article.html?id=${article.id}"
                class="article-read-more"
            >
                اقرأ المزيد
            </a>

        </div>
    `;

    return articleCard;

}


function displayArticles() {

    articlesContainer.innerHTML = "";

    if (
        !Array.isArray(window.articles) ||
        window.articles.length === 0
    ) {

        noArticles.style.display = "block";

        return;

    }


    noArticles.style.display = "none";


    window.articles.forEach(function (article) {

        const articleCard =
            createArticleCard(article);

        articlesContainer.appendChild(articleCard);

    });

}


displayArticles();