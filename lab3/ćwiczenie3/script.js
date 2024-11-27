const tableBody = document.querySelector('#productTable tbody');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');

let products = [];
let originalProducts = [];

// Funkcja do pobierania danych
async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products = data.products.slice(0, 30); // Pobierz pierwsze 30 elementów
    originalProducts = [...products]; // Kopia do zachowania oryginalnej kolejności
    renderTable(products);
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
  }
}

// Funkcja do renderowania tabeli
function renderTable(data) {
  tableBody.innerHTML = ''; // Wyczyść zawartość tabeli
  data.forEach(product => {
    const row = document.createElement('tr');

    const imageCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = product.thumbnail;
    imageCell.appendChild(img);

    const titleCell = document.createElement('td');
    titleCell.textContent = product.title;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = product.description;

    row.appendChild(imageCell);
    row.appendChild(titleCell);
    row.appendChild(descriptionCell);

    tableBody.appendChild(row);
  });
}

// Funkcja do filtrowania danych
function filterProducts(query) {
  return originalProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
}

// Funkcja do sortowania danych
function sortProducts(data, order) {
    if (order === 'asc') {
      return [...data].sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'desc') {
      return [...data].sort((a, b) => b.title.localeCompare(a.title));
    }
    return data; // Nie zmieniaj kolejności w przypadku "oryginalnej kolejności"
  }
  
  // Obsługa pola wyszukiwania
  searchInput.addEventListener('input', () => {
    const filteredData = filterProducts(searchInput.value);
    const sortedData = sortProducts(filteredData, sortSelect.value);
    renderTable(sortedData);
  });
  
  // Obsługa sortowania
  sortSelect.addEventListener('change', () => {
    const filteredData = filterProducts(searchInput.value);
    const sortedData = sortProducts(filteredData, sortSelect.value);
    renderTable(sortedData);
  });
  

// Pobranie danych przy ładowaniu strony
fetchProducts();
