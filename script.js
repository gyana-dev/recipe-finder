const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const recipesContainer = document.getElementById("recipes-container");

const API_KEY = "your_api_key_here";  // Replace with your API key
const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=`;

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        fetchRecipes(query);
    }
});

async function fetchRecipes(query) {
    try {
        const response = await fetch(API_URL + query);
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    recipesContainer.innerHTML = "";
    if (recipes.length === 0) {
        recipesContainer.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}
