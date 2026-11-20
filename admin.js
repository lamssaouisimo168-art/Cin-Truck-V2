
import {
  getContents,
  createContent,
  updateContent,
  deleteContent
} from "./api.js";

const board = document.querySelector(".Admin");
const form = document.querySelector("#contentForm");
const formTitle = document.querySelector("#formTitle");
const submitBtn = document.querySelector("#submitBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const message = document.querySelector("#formMessage");
const typeInput = document.querySelector("#type");

let items = [];
let editId = null;

// Afficher les contenus
function afficherTable(list) {
  board.innerHTML = `
    <table class="w-full bg-white rounded-xl shadow text-left">
      <thead>
        <tr class="border-b bg-gray-200">
          <th class="p-3">Image</th>
          <th class="p-3">Titre</th>
          <th class="p-3">Type</th>
          <th class="p-3">Année</th>
          <th class="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        ${list.map(item => `
          <tr class="border-b" data-id="${item.id}">
            <td class="p-3">
              <img src="${item.image}" class="w-12 h-16 object-cover rounded">
            </td>

            <td class="p-3">${item.title}</td>

            <td class="p-3">
              ${item.type === "movie" ? "Film" : "Série"}
            </td>

            <td class="p-3">${item.releaseYear}</td>

            <td class="p-3 space-y-2">
              <button class="btn-edit bg-blue-600 text-white px-3 py-1 rounded">
                Modifier
              </button>

              <button class="btn-delete bg-red-600 text-white px-3 py-1 rounded">
                Supprimer
              </button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// Charger les contenus
async function afficherAdmin() {
  board.textContent = "Chargement...";

  try {
    items = await getContents();
    afficherTable(items);
  } catch (error) {
    board.textContent = "Erreur : " + error.message;
  }
}

afficherAdmin();

// Ajouter ou modifier
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const type = typeInput.value;

  const data = {
    title: document.querySelector("#title").value.trim(),
    image: document.querySelector("#image").value.trim(),
    type: type,
    releaseYear: Number(document.querySelector("#year").value),
    description: document.querySelector("#description").value.trim(),
    genres: document.querySelector("#genres").value.split(",").map(item => item.trim()),
    directors: document.querySelector("#directors").value.split(",").map(item => item.trim()),
    productionCountries: document.querySelector("#countries").value.split(",").map(item => item.trim())
  };

  if (type === "movie") {
    data.duration = Number(document.querySelector("#duration").value);
  }

  if (type === "series") {
    const number = Number(document.querySelector("#seasons").value);
    data.seasons = Array.from({ length: number }, (_, i) => i + 1);
  }

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Chargement...";

    if (editId) {
      await updateContent(editId, data);
      message.textContent = "Modification réussie !";
    } else {
      await createContent(data);
      message.textContent = "Ajout réussi !";
    }

    form.reset();
    editId = null;
    formTitle.textContent = "Ajouter un contenu";
    submitBtn.textContent = "Enregistrer";
    cancelBtn.classList.add("hidden");

    await afficherAdmin();

  } catch (error) {
    message.textContent = "Erreur : " + error.message;
  } finally {
    submitBtn.disabled = false;
    if (!editId) submitBtn.textContent = "Enregistrer";
  }
});

// Modifier et supprimer
board.addEventListener("click", async (e) => {
  const tr = e.target.closest("tr");

  if (!tr) return;

  const id = tr.dataset.id;
  const film = items.find(item => item.id == id);

  if (e.target.closest(".btn-edit")) {
    if (!film) return;

    editId = film.id;

    document.querySelector("#title").value = film.title;
    document.querySelector("#image").value = film.image;
    document.querySelector("#type").value = film.type;
    document.querySelector("#year").value = film.releaseYear;
    document.querySelector("#description").value = film.description || "";
    document.querySelector("#genres").value = (film.genres || []).join(", ");
    document.querySelector("#directors").value = (film.directors || []).join(", ");
    document.querySelector("#countries").value = (film.productionCountries || []).join(", ");

    document.querySelector("#duration").value = film.duration || "";
    document.querySelector("#seasons").value = film.seasons ? film.seasons.length : "";

    formTitle.textContent = "Modifier le contenu";
    submitBtn.textContent = "Modifier";
    cancelBtn.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (e.target.closest(".btn-delete")) {
    if (!confirm("Voulez-vous vraiment supprimer ce contenu ?")) return;

    try {
      await deleteContent(id);
      await afficherAdmin();
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  }
});

// Annuler la modification
cancelBtn.addEventListener("click", () => {
  form.reset();
  editId = null;
  formTitle.textContent = "Ajouter un contenu";
  submitBtn.textContent = "Enregistrer";
  cancelBtn.classList.add("hidden");
  message.textContent = "";
});

// Afficher le champ adapté au type
function afficherChamps() {
  const movie = typeInput.value === "movie";

  document.querySelector("#duration").parentElement.style.display =
    movie ? "block" : "none";

  document.querySelector("#seasons").parentElement.style.display =
    typeInput.value === "series" ? "block" : "none";
}

typeInput.addEventListener("change", afficherChamps);
afficherChamps();
