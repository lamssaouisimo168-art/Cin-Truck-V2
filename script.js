
import { fetchItems } from "./api.js";

import {
  createCard,
  openModal,
  showError
} from "./cards.js";

import {
  toggleFavorite,
  getFavorites
} from "./favorites.js";

import {
  searchItems,
  filterByType
} from "./filter.js";

import {
  displayPage,
  createPagination
} from "./pagination.js";

const moviesContainer = document.querySelector("#moviesContainer");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let movies = [];
let filteredMovies = [];
let currentPage = 1;

async function loadMovies() {
  moviesContainer.textContent = "Chargement...";

  try {
    movies = await fetchItems();
    filteredMovies = movies;

    displayMovies();
  } catch (error) {
    showError(moviesContainer, error.message);
  }
}

function displayMovies() {
  const pageMovies = displayPage(filteredMovies, currentPage);

  moviesContainer.innerHTML = pageMovies.map(movie => createCard(movie)).join("");

  createPagination(
    filteredMovies.length,
    currentPage,
    (page) => {
      currentPage = page;
      displayMovies();
    }
  );
}

// Recherche
searchInput.addEventListener("input", () => {
  filteredMovies = searchItems(movies, searchInput.value);
  currentPage = 1;
  displayMovies();
});

// Filtrer
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.type;

    filteredMovies = filterByType(movies, type);
    currentPage = 1;
    displayMovies();
  });
});

// Actions des cartes
moviesContainer.addEventListener("click", (e) => {
  const favoriteButton = e.target.closest(".favorite-btn");
  const detailsButton = e.target.closest(".details-btn");

  if (favoriteButton) {
    const id = favoriteButton.dataset.id;
    const movie = movies.find(item => item.id == id);

    toggleFavorite(movie);
    displayMovies();
  }

  if (detailsButton) {
    const id = detailsButton.dataset.id;
    const movie = movies.find(item => item.id == id);

    if (movie) openModal(movie);
  }
});

loadMovies();
