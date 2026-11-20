
const itemsPerPage = 8;

export function displayPage(items, page) {
  const start = (page - 1) * itemsPerPage;

  return items.slice(start, start + itemsPerPage);
}

export function createPagination(totalItems, currentPage, changePage) {
  const pagination = document.querySelector("#pagination");

  if (!pagination) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");

    button.textContent = i;
    button.className = "px-4 py-2 m-1 rounded bg-red-500 text-white";

    if (i === currentPage) {
      button.classList.add("bg-black");
    }

    button.addEventListener("click", () => {
      changePage(i);
    });

    pagination.appendChild(button);
  }
}
