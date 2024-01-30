// Constants
const addButton = document.querySelector(".add");
const table = document.querySelector("table");
const form = document.querySelector("form");

// Get book info from form
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector("#read");

let id = 0;
const myLibrary = [];

// Event Listeners
addButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Validate input before submitting
  if (
    inputTitle.value.trim() === "" 
    || inputAuthor.value.trim() === ""
    || inputPages.value === ""
    ) {
    alert("All fields must be filled out.");
    return;
  } else if (
    !Number.isInteger(Number(inputPages.value))
    || inputPages.value < 1
    ) {
    alert("Number of pages must be a positive integer.");
    return;
  }

  addBookToLibrary();
  form.reset();
});

// Functions
function Book(title, author, pages, read) {
  this.id = id++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  // Create book object
  const book = new Book(inputTitle.value.trim(), inputAuthor.value.trim(), parseInt(inputPages.value), inputRead.checked);

  // Add book to myLibrary
  myLibrary.push(book);

  // Display book
  displayBooks();
}

function displayBooks() {
  // Clear table before re-displaying
  table.innerHTML = "<tr><th>Title</th><th>Author</th><th>Pages</th><th>Read</th></tr>";

  for (let book of myLibrary) {
    // Create table row elements
    const row = document.createElement("tr");
    const rowTitle = document.createElement("td");
    const rowAuthor = document.createElement("td");
    const rowPages = document.createElement("td");
    const rowRead = document.createElement("td");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");

    // Add text content to row elements
    rowTitle.textContent = book.title;
    rowAuthor.textContent = book.author;
    rowPages.textContent = book.pages;
    if (book.read) {
      readButton.textContent = "Read";
    } else {
      readButton.textContent = "Unread";
    }
    removeButton.textContent = "Remove";

    // Add event listener to read button
    readButton.addEventListener("click", () => {
      // Toggles read status on book object
      book.read = !book.read;

      // Toggles read status on display
      if (book.read) {
        readButton.textContent = "Read";
      } else {
        readButton.textContent = "Unread";
      }
    });

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
    row.appendChild(rowPages);
    rowRead.appendChild(readButton);
    row.appendChild(rowRead);
    row.appendChild(removeButton);

    table.appendChild(row);
  }
}