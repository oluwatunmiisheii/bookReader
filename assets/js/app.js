const list = document.querySelector('#book-list ul');
const alertMessage = document.querySelector('.alert p');

// DELETE BOOKS (first mway of grabbing an element with the delete class)
list.addEventListener('click', e => {
    if (e.target.className ==='far fa-trash-alt delete') {
        const li = e.target.parentElement.parentElement;
        li.classList.add('fade-out');
        setTimeout(() => {
            list.removeChild(li);
            alertMessage.innerText = 'Book Deleted!!';
            alertMessage.className = 'bookDeleted'; 
        }, 700); 
        setTimeout(clearOut, 2000);
    }

    // CHECK IF BOOK HAS BEEN READ (alternate way of grabbing the element with class of name)
    else if(e.target.classList.contains('name')) {
        const li = e.target.parentElement;
        li.classList.toggle('completed');
    }

    // TOGGLE BOOK INFO
    else if (e.target.className === 'info-btn fas fa-info') {
        const infoText = e.target.nextElementSibling;
        infoText.classList.toggle('show');
    }
});


// modal logic
const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const spanClose = document.querySelector('.close');

btn.addEventListener('click', e => {
    modal.classList.add('see');
});

spanClose.addEventListener('click', e => {
    modal.classList.remove('see');

    // clearing the values of the input fields
    bookHeader.value = "";
    bookDescription.value = "";
});



//ADD BOOKS
const addForm = document.forms['add-book'];
const bookHeader = addForm.querySelector('input[type="text"]');
const bookDescription = addForm.querySelector('textarea');

addForm.addEventListener('submit', e => {

    e.preventDefault();
    //create elements
    const li = document.createElement('li');
    const div = document.createElement('div')
    const bookName = document.createElement('span');
    const deleteBtn = document.createElement('span');
    const infoBtn = document.createElement('span');
    const bookInfo = document.createElement('span');

    // add text content
    bookName.textContent = bookHeader.value;
    bookInfo.textContent = bookDescription.value;

    //add classes
    bookName.className = ('name');
    deleteBtn.classList.add('far', 'fa-trash-alt', 'delete')
    infoBtn.className = ('info-btn fas fa-info');
    bookInfo.classList.add('info');


    // append to dom
    div.appendChild(bookName);
    div.appendChild(deleteBtn);
    div.appendChild(infoBtn);
    div.appendChild(bookInfo);
    li.appendChild(div);
    list.appendChild(li);

    // clearing the values of the input fields
    bookHeader.value = "";
    bookDescription.value = "";

    // make modal invisible
    modal.classList.remove('see');

    // alert book added
    alertMessage.innerText = 'New Book Added!!';
    alertMessage.className = 'success';
    setTimeout(clearOut, 2000);
});

// clear alert timeout function for book deleted and added
function clearOut() {
    alertMessage.innerText = '';
}

// HIDE BOOK USING BUTTON
const button = document.getElementById('hide-books');

button.addEventListener('click', () => {
    if (list.className === "hide") {
        list.className = "";
        button.innerHTML = "Hide books";
    } else {
        list.className = "hide";
        button.innerHTML = "Show books";
    }
})

// SEARCH FILTER
const searchBar = document.forms['search-books'].querySelector('input');

searchBar.addEventListener('keyup', e => {
    const term = e.target.value.toLowerCase();
    const books = list.getElementsByTagName('li');
    Array.from(books).forEach(function(book){
        const title = book.firstElementChild.textContent;
        if(title.toLowerCase().indexOf(term) === -1){
            book.style.display = 'none';
        } else{
            book.style.display = 'block';
        }
        
    })
})




