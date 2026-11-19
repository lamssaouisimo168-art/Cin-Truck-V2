
const API_URL = "https://6afad80d730c1d152f3299f7.mockapi.io/api/data/cinetrack/movies";
const DATA_URL = "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json";

async function importData() {
  try {
    const res = await fetch(DATA_URL);
    const items = await res.json();

    for (const item of items) {
      const { id, ...data } = item;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erreur sur " + item.title);
      console.log("Ajouté :", item.title);
    }
  } catch (error) {
    console.log(error);
  }
}

importData();

console.log(importData)