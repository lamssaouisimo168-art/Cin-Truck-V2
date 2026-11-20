
import { isFavorite, toggleFavorite } from "./favorites.js";

function getTypeLabel(type) {
  return type === "movie" ? "Film" : "Série";
}

export function renderList(items, container, createCardFn) {
  container.innerHTML = items.map(item => createCardFn(item)).join("");
}

export function showError(container, message) {
  container.innerHTML = `
    <p class="text-center text-red-500 p-5">
      ${message}
    </p>
  `;
}

function getDetailsLine(item) {
  if (item.type === "movie") {
    return `${item.duration || "?"} minutes`;
  }

  return `${item.seasons ? item.seasons.length : 0} saisons`;
}

export function createCard(item) {
  return `
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src="${item.image}"
        alt="${item.title}"
        class="w-full h-64 object-cover"
      >

      <div class="p-4">
        <h3 class="font-bold text-lg">${item.title}</h3>

        <p class="text-gray-500">
          ${getTypeLabel(item.type)} • ${item.releaseYear}
        </p>

        <p class="text-sm text-gray-600 mt-2">
          ${getDetailsLine(item)}
        </p>

        <button
          class="favorite-btn mt-3 text-xl"
          data-id="${item.id}"
        >
          ${isFavorite(item.id) ? "❤️" : "🤍"}
        </button>

        <button
          class="details-btn bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
          data-id="${item.id}"
        >
          Détails
        </button>
      </div>
    </div>
  `;
}

export function createModalContent(item) {
  return `
    <div class="bg-white p-6 rounded-xl max-w-lg w-full">
      <h2 class="text-2xl font-bold mb-3">${item.title}</h2>

      <img
        src="${item.image}"
        alt="${item.title}"
        class="w-full h-64 object-cover rounded-lg mb-4"
      >

      <p><strong>Type :</strong> ${getTypeLabel(item.type)}</p>
      <p><strong>Année :</strong> ${item.releaseYear}</p>
      <p><strong>Durée :</strong> ${getDetailsLine(item)}</p>
      <p><strong>Genres :</strong> ${(item.genres || []).join(", ")}</p>
      <p><strong>Réalisateurs :</strong> ${(item.directors || []).join(", ")}</p>
      <p><strong>Pays :</strong> ${(item.productionCountries || []).join(", ")}</p>

      <p class="mt-4">${item.description || ""}</p>

      <button class="close-modal mt-5 bg-red-500 text-white px-4 py-2 rounded-lg">
        Fermer
      </button>
    </div>
  `;
}

export function openModal(item) {
  const modal = document.createElement("div");

  modal.className =
    "fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50";

  modal.innerHTML = createModalContent(item);

  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (
      e.target === modal ||
      e.target.closest(".close-modal")
    ) {
      modal.remove();
    }
  });
}
