(function () {
  const API_URL = "https://harshadramteke0.github.io/myrepo/"; // <--- Replace with your backend URL

  const container = document.getElementById("google-reviews-widget");

  if (!container) {
    console.error("Google Reviews widget container not found: #google-reviews-widget");
    return;
  }

  async function fetchReviews() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to load Google Reviews");
      return await response.json();
    } catch (error) {
      console.error(error);
      container.innerHTML = `<p>Unable to load reviews at the moment.</p>`;
    }
  }

  function generateHTML(reviews) {
    return `
      <style>
        #google-reviews-widget {
          font-family: Arial, sans-serif;
        }
        .review-card {
          border: 1px solid #eaeaea;
          padding: 1rem;
          margin: 0.5rem 0;
          border-radius: 8px;
          background: #f8f8f8;
        }
        .review-author {
          font-weight: bold;
        }
        .review-stars {
          color: #ffa500;
        }
      </style>
      ${reviews
        .map(
          (r) => `
          <div class="review-card">
            <div class="review-author">${r.author_name}</div>
            <div class="review-stars">⭐️ ${r.rating}</div>
            <p>${r.text}</p>
          </div>
        `
        )
        .join("")}
    `;
  }

  async function init() {
    const reviews = await fetchReviews();
    if (reviews && reviews.length) {
      container.innerHTML = generateHTML(reviews);
    }
  }

  init();
})();
