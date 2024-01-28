// Constants
const addButton = document.querySelector(".add");
const table = document.querySelector("table");
const form = document.querySelector("form");

// Get book info from form
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");

let id = 0;
const myLibrary = [];

// Event Listeners
addButton.addEventListener("click", (event) => {
  event.preventDefault();

  // TODO: Validate input before submitting

  addBookToLibrary();
  form.reset();
});

// Functions
function Book(title, author) {
  this.id = id++;
  this.title = title;
  this.author = author;
}

function addBookToLibrary() {
  // Create book object
  const book = new Book(inputTitle.value, inputAuthor.value);

  // Add book to myLibrary
  myLibrary.push(book);

  // Display book
  displayBooks();
}

function displayBooks() {
  // Clear table before re-displaying
  table.innerHTML = "<tr><th>Title</th><th>Author</th></tr>";

  for (let book of myLibrary) {
    // Create table row elements
    const row = document.createElement("tr");
    const rowTitle = document.createElement("td");
    const rowAuthor = document.createElement("td");
    const removeButton = document.createElement("button");

    // Add text content to row elements
    rowTitle.textContent = book.title;
    rowAuthor.textContent = book.author;
    removeButton.textContent = "Remove";

    // Add event listener to remove button
    removeButton.addEventListener("click", () => {
      // Remove table row from display
      row.remove();

      // Find index and if it exists, remove book object from myLibrary
      const index = myLibrary.findIndex(
        (bookObject) => bookObject.id === book.id
      );
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
    });

    // Append row elements to row, then row to table
    row.appendChild(rowTitle);
    row.appendChild(rowAuthor);
    row.appendChild(removeButton);

    table.appendChild(row);
  }
}