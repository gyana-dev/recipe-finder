const API_KEY = "e71e0f3bb0e34d749d17b39ca636d246";
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (query) {
    resultsContainer.innerHTML = "<p>Loading...</p>";
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`);
    const data = await res.json();
    displayResults(data.results);
  }
});

function displayResults(recipes) {
  resultsContainer.innerHTML = "";
  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <button class="view-btn" data-id="${recipe.id}">View Recipe</button>
    `;
    resultsContainer.appendChild(card);
  });

  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      const recipeDetails = await fetchRecipeDetails(id);
      showModal(recipeDetails);
    });
  });
}

async function fetchRecipeDetails(id) {
  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
  return await res.json();
}

function showModal(recipe) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}" />
      <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <h3>Ingredients:</h3>
      <ul>
        ${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join("")}
      </ul>
      <h3>Instructions:</h3>
      <p>${recipe.instructions || "No instructions available."}</p>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal
  modal.querySelector(".close-button").addEventListener("click", () => {
    modal.remove();
  });

  // Close when clicking outside modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}
