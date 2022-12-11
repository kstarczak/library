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


// book constructor
function Book (title, author, pages, pagesRead, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.pagesRead = pagesRead
    this.read = read.checked
    this.toggleRead = function() {
        if (this.read) {
            this.read = false;
            this.pagesRead = 0;
        } else {
            this.read = true;
            this.pagesRead = 'all';
        };
    }
};

/*
Prototype removed and added to contructor since as adding library to localstorage removed the prototype (could alternatively re-add prototype when JSON.parse called)
Book.prototype.toggleRead = function () {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
        this.pagesRead = 0;
    };
};
*/

// add object to library and call display function
function addBook(book) {
    myLibrary.push(book);
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
    console.log(JSON.parse(localStorage.getItem('myLibrary')));
    clearBooks();
    displayBooks();
}

function deleteBook() {
    const libraryPosition = parseInt(this.parentNode.dataset.indexNumber);
    myLibrary.splice(libraryPosition, 1);
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
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
    currentBook.title = bookTitleInput.value;
    currentBook.author = bookAuthorInput.value;
    currentBook.pages = bookPagesInput.value;
    currentBook.pagesRead = bookPagesReadInput.value;
    currentBook.read = bookReadInput.checked;
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
    submitBookButton.style.display = 'block';
    updateBookButton.style.display = 'none';
    closeForm();
    clearBooks();
    displayBooks();
}

function toggleReadStatus() {
    const libraryPosition = parseInt(this.parentNode.dataset.indexNumber);
    currentBook = myLibrary[libraryPosition];
    console.log(currentBook);
    currentBook.toggleRead();
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
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
    clearBooks();
    displayAddItems();
}

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
        newBookPages.textContent = `${book.pages} pg.`;

        const newBookPagesRead = document.createElement('div')
        if (!book.pagesRead) {
            newBookPagesRead.textContent = "You've read 0 pages.";
        } else if (book.pagesRead === 'all') {
            newBookPagesRead.textContent = "You've read this book.";
        } else {
            newBookPagesRead.textContent = `You've read ${book.pagesRead} pages.`;
        }
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
  document.querySelector('.book-form').style.display = 'flex';
  document.querySelector('.container-cover').style.display = 'block';
}

function openConfirm() {
    document.querySelector('.confirm-form').style.display = 'flex';
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
    const invalidMessage = document.querySelector('.invalid-message');
    invalidMessage.textContent = "";
}



function submitBook() {
    const invalidMessage = document.querySelector('.invalid-message');
    if (!bookTitleInput.value ||!bookAuthorInput.value || !bookPagesInput.value) {  
        invalidMessage.textContent = "Complete the first 3 fields to add a book!"
    }
    else if (parseInt(bookPagesReadInput.value) > parseInt(bookPagesInput.value)) {
        invalidMessage.textContent = "Pages read cannot be greater than total pages!";
    }
    else {
        if (bookReadInput) {
            const newBook = new Book(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, "all", bookReadInput);
            closeForm();
            addBook(newBook);
        } else {
            const newBook = new Book(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, bookPagesReadInput, bookReadInput);
            closeForm();
            addBook(newBook);
        }
        
        
    }
}

submitBookButton.addEventListener('click', submitBook);

cancelBookButton.addEventListener('click', closeForm);

clearButton.addEventListener('click', openConfirm);

confirmDeleteButton.addEventListener('click', function() {closeConfirm(); clearAll();});

confirmCancelButton.addEventListener('click', closeConfirm);

// Display books saved in localstorage
window.addEventListener('load', ()=> {
    if (localStorage.getItem('localLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('localLibrary'));
    };
    displayBooks();
})



/* temporary button to clear the visual book list
clearButton.addEventListener('click', () => { clearBooks();
    displayBooks();});

  */
