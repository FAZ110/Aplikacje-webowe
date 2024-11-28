const tableBody = document.querySelector('#productTable tbody');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');

let products = [];
let originalProducts = [];


async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products = data.products.slice(0, 30); 
    originalProducts = [...products]; 
    renderTable(products);
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
  }
}


function renderTable(data) {
  tableBody.innerHTML = ''; 
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


function filterProducts(query) {
  return originalProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
}


function sortProducts(data, order) {
    if (order === 'asc') {
      return [...data].sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'desc') {
      return [...data].sort((a, b) => b.title.localeCompare(a.title));
    }
    return data; 
  }
  
 
  searchInput.addEventListener('input', () => {
    const filteredData = filterProducts(searchInput.value);
    const sortedData = sortProducts(filteredData, sortSelect.value);
    renderTable(sortedData);
  });
  
  
  sortSelect.addEventListener('change', () => {
    const filteredData = filterProducts(searchInput.value);
    const sortedData = sortProducts(filteredData, sortSelect.value);
    renderTable(sortedData);
  });
  


fetchProducts();
