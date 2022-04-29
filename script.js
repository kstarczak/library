////figure out how to clear the inputs adn add function to close form


let myLibrary = [];
let currentBook;

const bookList = document.querySelector('.book-list');
const submitBookButton = document.querySelector('.submit-book');
const cancelBookButton = document.querySelector('.cancel-book');
const updateBookButton = document.querySelector('.update-book');
const clearButton = document.querySelector('.clear-button');

const bookTitleInput = document.querySelector('#book-title');
const bookAuthorInput = document.querySelector('#book-author');
const bookPagesInput = document.querySelector('#book-pages');
const bookReadInput = document.querySelector('#book-read');


// create book objects
function Book (title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read.checked
};

// add object to library and call display function
function addBook(book) {
    myLibrary.push(book);
    clearBooks();
    displayBooks(myLibrary);
}

function deleteBook() {
    const libraryPosition = parseInt(this.parentNode.dataset.indexNumber);
    myLibrary. splice(libraryPosition, 1);
    clearBooks();
    displayBooks(myLibrary);
}

function editBook() {
    const libraryPosition = parseInt(this.parentNode.dataset.indexNumber);
    currentBook = myLibrary[libraryPosition];
    bookTitleInput.value = currentBook.title;
    bookAuthorInput.value = currentBook.author;
    bookPagesInput.value = currentBook.pages;
    currentBook.read ? bookReadInput.checked = true : bookReadInput.checked = false;
    switchButtons();
    openForm();
    
}
function switchButtons() {
    submitBookButton.style.display = 'none'
    updateBookButton.style.display = 'block';
    updateBookButton.addEventListener('click', submitEdit);
}

function submitEdit() {
    currentBook.title = bookTitleInput.value;
    currentBook.author = bookAuthorInput.value;
    currentBook.pages = bookPagesInput.value;
    currentBook.read = bookReadInput.checked;
    submitBookButton.style.display = 'block';
    updateBookButton.style.display = 'none';
    closeForm();

}
// create a stylized 'add new book' button on grid at the end of all the books
function displayAddItems() {
    const addBookButton = document.createElement('div');
    addBookButton.className = 'add-book';
    bookList.appendChild(addBookButton);
    addBookButton.addEventListener('click', openForm);
} 

function displayBooks (array) {
    array.forEach((book, i) => {
        createBookCard(book, i);
    });
    displayAddItems();
}

//clear all cards form the page
function clearBooks() {
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
}
function clearAll() {
    myLibrary = [];
    clearBooks();
    displayAddItems();
}

// add reg expresson check function!!!!!!!!!!!!
function createBookCard(book, i) {
    if (book) {
        const newBook = document.createElement('div');
        newBook.classList.add('book-card');
        newBook.dataset.indexNumber = i;
        
        const newBookTitle = document.createElement('div');
        newBookTitle.textContent = book.title;
        
        const newBookAuthor = document.createElement('div');
        newBookAuthor.textContent = `By: ${book.author}`;
        
        const newBookPages = document.createElement('div');
        newBookPages.textContent = `${book.pages} pages`;
        
        const newBookRead = document.createElement('div');
        newBookRead.classList.add('read-button');
        if (book.read) {
            newBookRead.textContent = 'Already Read';
            newBookRead.classList.add('read');
        } else {
            newBookRead.textContent = 'Not Read';
            newBookRead.classList.add('not-read');
        };

        const buttons = document.createElement('div');
        buttons.dataset.indexNumber = i
        const editButton = document.createElement('button');
        editButton.classList.add('book-card-button' , 'book-card-edit');
        editButton.textContent = "Edit";
        editButton.addEventListener('click', editBook);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('book-card-button' , 'book-card-delete');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', deleteBook);

        buttons.append(editButton, deleteButton);
        
        newBook.append(newBookTitle, newBookAuthor, newBookPages, newBookRead, buttons);
        bookList.appendChild(newBook);
    };
}

// open pop-up to input book data
function openForm() {
  document.querySelector('.book-form').style.display = 'block';
  document.querySelector('.container-cover').style.display = 'block';
}

// close pop-up to input book data
function closeForm() {
    document.querySelector('.book-form').style.display = 'none';
    document.querySelector('.container-cover').style.display = 'none';
    submitBookButton.style.display = 'block'
    updateBookButton.style.display = 'none';
}

function submitBook() {
    const newBook = new Book(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, bookReadInput);
    bookTitleInput.value = null;
    bookAuthorInput.value = null;
    bookPagesInput.value = null;
    bookReadInput.checked = false;
    closeForm();
    addBook(newBook);
}

displayAddItems();

submitBookButton.addEventListener('click', submitBook);

cancelBookButton.addEventListener('click', closeForm);


clearButton.addEventListener('click', clearAll);


/* temporary button to clear the visual book list
clearButton.addEventListener('click', () => { clearBooks();
    displayBooks();});

  */
