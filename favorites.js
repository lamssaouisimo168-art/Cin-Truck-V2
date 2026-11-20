
const FAVORITES_KEY = "cinetrack-favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id) {
  const favorites = getFavorites();

  return favorites.some(item => item.id == id);
}

export function toggleFavorite(item) {
  let favorites = getFavorites();

  if (isFavorite(item.id)) {
    favorites = favorites.filter(fav => fav.id != item.id);
  } else {
    favorites.push(item);
  }

  saveFavorites(favorites);

  return favorites;
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(item => item.id != id);

  saveFavorites(favorites);

  return favorites;
}

export function countByType(type) {
  return getFavorites().filter(item => item.type === type).length;
}
