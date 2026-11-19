

import { getContents } from "./api.js";

const board = document.querySelector(".Admin");
let items = [];


function structurTablue(list) {
  board.innerHTML = `
    <table class="w-full text-left">
      <thead>
        <tr class="border-b  border-gray-300">
          <th >Image</th>
          <th >Titre</th>
          <th >Type</th>
          <th ">Année</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        ${list
          .map(
            (item) => `
          <tr class="border-b border-gray-200" data-id="${item.id}">
            <td class="p-3">
              <img src="${item.image}" alt="${item.title}" class="w-12 h-16 object-cover rounded" />
            </td>
            <td class="p-3">${item.title}</td>
            <td class="p-3">${item.type === "movie" ? "Film" : "Série"}</td>
            <td class="p-3">${item.releaseYear}</td>
            <td class="p-3">
              <button  id="modifier" class="btn-edit bg-blue-600 text-white px-3 py-1 rounded">
                Modifier
              </button>
              <button class="btn-delete bg-red-600 text-white px-3 py-1 rounded">
                Supprimer
              </button>
            </td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

async function afficheAdmin() {
  board.textContent = "Chargement…";

  try {
    items = await getContents();
    structurTablue(items);
  } catch (error) {
    board.textContent = "Impossible de charger la liste : " + error.message;
  }
}

afficheAdmin();

const modal = document.querySelector("#modal");

function afficheModal(film) {
    modal.innerHTML = `
        <table class="rounded-2xl shadow-lg border-2 bg-indigo-100 w-full">

            <thead>
                <tr>
                    <th colspan="2" class="italic text-2xl font-black">
                        Modifier Le Film :
                    </th>
                </tr>
            </thead>

            <tbody>
            
            </tbody>

        </table>
    `;
}

