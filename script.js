////figure out how to clear the inputs adn add function to close form


let myLibrary = [];
let currentBook;

const bookList = document.querySelector('.book-list');
const submitBookButton = document.querySelector('.submit-book');
const cancelBookButton = document.querySelector('.cancel-book');
const updateBookButton = document.querySelector('.update-book');
const clearButton = document.querySelector('.clear-button');
const confirmDeleteButton = document.querySelector('.confirm-delete')
const confirmCancelButton = document.querySelector('.cancel-delete');

const bookTitleInput = document.querySelector('#book-title');
const bookAuthorInput = document.querySelector('#book-author');
const bookPagesInput = document.querySelector('#book-pages');
const bookReadInput = document.querySelector('#book-read');
const bookPagesReadInput = document.querySelector('#book-pages-read');


// book constructer
function Book (title, author, pages, pagesRead, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.pagesRead = pagesRead
    this.read = read.checked
};

Book.prototype.toggleRead = function () {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
        this.pagesRead = 0;
    };
};

// add object to library and call display function
function addBook(book) {
    myLibrary.push(book);
    clearBooks();
    displayBooks();
}

function deleteBook() {
    const libraryPosition = parseInt(this.parentNode.dataset.indexNumber);
    myLibrary. splice(libraryPosition, 1);
    clearBooks();
    displayBooks();
}

function editBook() {
    const libraryPosition = parseInt(this.parentNode.dataset.indexNumber);
    currentBook = myLibrary[libraryPosition];
    bookTitleInput.value = currentBook.title;
    bookAuthorInput.value = currentBook.author;
    bookPagesInput.value = currentBook.pages;
    bookPagesReadInput.value = currentBook.pagesRead;
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
    console.log(`Book title before edit: ${currentBook.title}, input before edit: ${bookTitleInput.value}`);
    currentBook.title = bookTitleInput.value;
    console.log(`Book title AFTER edit: ${currentBook.title}`);
    currentBook.author = bookAuthorInput.value;
    currentBook.pages = bookPagesInput.value;
    currentBook.pagesRead = bookPagesReadInput.value;
    currentBook.read = bookReadInput.checked;
    console.log(currentBook);
    submitBookButton.style.display = 'block';
    updateBookButton.style.display = 'none';
    closeForm();
    clearBooks();
    displayBooks();
}

function toggleReadStatus() {
    const libraryPosition = parseInt(this.parentNode.dataset.indexNumber);
    currentBook = myLibrary[libraryPosition];
    currentBook.toggleRead();
    console.log();
    clearBooks();
    displayBooks();
}

// create a stylized 'add new book' button on grid at the end of all the books
function displayAddItems() {
    const addBookButton = document.createElement('div');
    addBookButton.className = 'add-book';
    bookList.appendChild(addBookButton);
    addBookButton.addEventListener('click', openForm);
} 

function displayBooks () {
    myLibrary.forEach((book, i) => {
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

        const newBookPagesRead = document.createElement('div')
        if (book.pagesRead) newBookPagesRead.textContent = `You've read ${book.pagesRead} pages`;
        
        const newBookRead = document.createElement('div');
        newBookRead.classList.add('read-button');
        newBookRead.addEventListener('click', toggleReadStatus);
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
        
        newBook.append(newBookTitle, newBookAuthor, newBookPages, newBookPagesRead, newBookRead, buttons);
        bookList.appendChild(newBook);
    };
}

// open pop-up to input book data
function openForm() {
  document.querySelector('.book-form').style.display = 'block';
  document.querySelector('.container-cover').style.display = 'block';
}

function openConfirm() {
    document.querySelector('.confirm-form').style.display = 'block';
    document.querySelector('.container-cover').style.display = 'block';
}

function closeConfirm() {
    document.querySelector('.confirm-form').style.display = 'none';
    document.querySelector('.container-cover').style.display = 'none';

}

// close pop-up to input book data
function closeForm() {
    document.querySelector('.book-form').style.display = 'none';
    document.querySelector('.container-cover').style.display = 'none';
    //submitBook is 'turned on',update is 'turned off, and fields are cleared for the next time form is opened
    submitBookButton.style.display = 'block'
    updateBookButton.style.display = 'none';
    bookTitleInput.value = null;
    bookAuthorInput.value = null;
    bookPagesInput.value = null;
    bookPagesReadInput.value = null;
    bookReadInput.checked = false;
}



function submitBook() {
    const newBook = new Book(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, bookPagesReadInput.value, bookReadInput);
   
    closeForm();
    addBook(newBook);
}

displayAddItems();

submitBookButton.addEventListener('click', submitBook);

cancelBookButton.addEventListener('click', closeForm);

clearButton.addEventListener('click', openConfirm);

confirmDeleteButton.addEventListener('click', function() {closeConfirm(); clearAll();});

confirmCancelButton.addEventListener('click', closeConfirm);


/* temporary button to clear the visual book list
clearButton.addEventListener('click', () => { clearBooks();
    displayBooks();});

  */
