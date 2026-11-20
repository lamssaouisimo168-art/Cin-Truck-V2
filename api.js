
const BASE_URL = "https://6afad80d730c1d152f3299f7.mockapi.io/api/data/cinetrack";

export async function getContents() {
  const response = await fetch(`${BASE_URL}/movies`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des contenus");
  }

  return await response.json();
}

export async function getContent(id) {
  const response = await fetch(`${BASE_URL}/movies/${id}`);

  if (!response.ok) {
    throw new Error("Contenu introuvable");
  }

  return await response.json();
}

export async function createContent(data) {
  const response = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout");
  }

  return await response.json();
}

export async function updateContent(id, data) {
  const response = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la modification");
  }

  return await response.json();
}

export async function deleteContent(id) {
  const response = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression");
  }

  return true;
}

export const fetchItems = getContents;
