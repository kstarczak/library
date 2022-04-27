const bookList = document.querySelector('.book-list');

let myLibrary = [];

function Book () {
    //constructor..
}

function addBookToLibary() {
    //code to update array with object
}

function deleteBookFromLibrary () {
    //code delete objecy from array
}

function updateBook () {
    //code remove then add ibject
}


function displayBooks (array) {
    array.forEach(book => createBookCard(book));
    // 
}

function createBookCard(book) {
    const newBook = document.createElement(div);
    newBook.classList.add('book.name');
    //check if above should be and expression vs string
    const newBookTitle = document.createElement(div);
    const newBookAuthor = document.createElement(div);
    const newBookPages = document.createElement(div);
    const newBookRead = document.createElement(div);
    bookList.appendChild(newBook);
    newBook.append(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    


}