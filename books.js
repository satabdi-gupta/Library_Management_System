let books = JSON.parse(localStorage.getItem("books")) || [
  {id: 1, title: "A Tale of Two Cities", author: "Charles Dickens", category: "Fiction"},
  {id: 2, title: "Brief History of Time", author: "Stephen Hawking", category: "Non-Fiction"},
  {id: 3, title: "Operation Gene", author: "Sukanya Datta", category: "Science"},
  {id: 4, title: "And Then There Were None", author: "Agatha Christie", category: "Mystery"},
  {id: 5, title: "Harry Potter and the Philosopher's Stone", author: "J. K. Rowling", category: "Fiction"},
  {id: 6, title: "Professor Shanku", author: "Satyajit Ray", category: "Science"},
  {id: 7, title: "Nineteen Eighty Four", author: "George Orwell", category: "Fiction"}
];

const bookTable = document.getElementById('bookTable');
const bookTableBody = document.getElementById('bookTBody');
const addForm = document.getElementById('addForm');

// save to local storage
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// for dropdown to filtered category
function populateBookTable(category) {
  bookTableBody.innerHTML = '';

  let filteredBooks;
  if (category === 'all') {
    filteredBooks = books;
  } else {
    filteredBooks = books.filter(book => book.category === category);
  }

  filteredBooks.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>
        <button onclick="editBook('${book.id}')" style="background-color: blue; color: white; font-size:15px">Edit</button>
        <button onclick="deleteBook('${book.id}')" style="background-color: red; color: white; font-size:15px">Delete</button>
      </td>
    `;
    bookTableBody.appendChild(row);
  });
}

// for addbook function
function openBookForm() {
  addForm.onsubmit = function(event) {
    event.preventDefault();
    const id = Date.now().toString();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('categoryInput').value;
    books.push({ id, title, author, category });
    saveBooks();
    populateBookTable('all');
  
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('categoryInput').value = '';
  };
}

// for edit book function
function editBook(id) {
  const book = books.find(b => b.id.toString() === id);
  if (book) {
    addForm.onsubmit = function(event) {
      event.preventDefault();
      book.title = document.getElementById('title').value;
      book.author = document.getElementById('author').value;
      book.category = document.getElementById('categoryInput').value;
      saveBooks();
      populateBookTable('all');
      
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('categoryInput').value = '';
    };
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('categoryInput').value = book.category;
  } else {
    console.error('Book not found');
  }
}

// for delete
function deleteBook(id) {
  books = books.filter(book => book.id.toString() !== id);
  saveBooks();
  populateBookTable('all'); // Refresh table
}


document.getElementById('categoryInput').addEventListener('change', function() {
  const selectedCategory = this.value;
  populateBookTable(selectedCategory);
});

// dropdown menu with all categories
populateBookTable('all');

