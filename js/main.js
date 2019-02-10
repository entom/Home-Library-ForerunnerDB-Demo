const collectionBooks = 'books'

let fdb = new ForerunnerDB()
let db = fdb.db("home_library")
db.persist.driver("LocalStorage")

let booksContainer = document.getElementById('BooksContainer')

document.getElementById('AddBookSubmitButton').addEventListener('click', () => {
  let bookTitle = document.getElementById('bookTitle').value
  let bookAuthor = document.getElementById('bookAuthor').value
  let bookYear = document.getElementById('bookYear').value
  let bookPages = document.getElementById('bookPages').value

  loadCollection().then(() => {
    let collection = db.collection(collectionBooks)
    let bookObject = {
      title: bookTitle,
      author: bookAuthor,
      year: bookYear,
      pages: bookPages
    }
    collection.insert(bookObject)
    collection.save(() => {
      drawBook(bookObject)
    })
  })
})

loadBooks()

function loadBooks () {
  loadCollection().then(() => {
    let books = db.collection(collectionBooks).find({})

    for (let book of books) {
      drawBook(book)
    }
  })
}

function drawBook (book) {
  console.log(book)
  let row = document.createElement('div')
  row.classList.add('row')
  row.classList.add('row-book')
  row.classList.add('animate-bg')
  row.classList.add('pb-2')
  row.classList.add('pt-2')
  row.dataset.id = book._id

  let colTitle = document.createElement('div')
  colTitle.classList.add('col-sm-3')
  colTitle.innerHTML = book.title
  row.appendChild(colTitle)

  let colAuthor = document.createElement('div')
  colAuthor.classList.add('col-sm-3')
  colAuthor.innerHTML = book.author
  row.appendChild(colAuthor)

  let colPages = document.createElement('div')
  colPages.classList.add('col-sm-2')
  colPages.innerHTML = book.pages
  row.appendChild(colPages)

  let colYear = document.createElement('div')
  colYear.classList.add('col-sm-2')
  colYear.innerHTML = book.year
  row.appendChild(colYear)

  let colActions = document.createElement('div')
  colActions.classList.add('col-sm-2')

  let editButton = document.createElement('button')
  editButton.classList.add('btn')
  editButton.classList.add('btn-primary')
  editButton.classList.add('btn-sm')
  editButton.classList.add('mr-1')
  editButton.dataset.id = book._id

  let editIcon = document.createElement('i')
  editIcon.classList.add('fas')
  editIcon.classList.add('fa-edit')
  editButton.appendChild(editIcon)

  colActions.appendChild(editButton)

  let deleteButton = document.createElement('button')
  deleteButton.classList.add('btn')
  deleteButton.classList.add('btn-danger')
  deleteButton.classList.add('btn-sm')
  deleteButton.dataset.id = book._id

  let deleteIcon = document.createElement('i')
  deleteIcon.classList.add('fas')
  deleteIcon.classList.add('fa-trash')
  deleteButton.appendChild(deleteIcon)

  deleteButton.addEventListener('click', () => {
    deleteBook(book._id)
  })
  colActions.appendChild(deleteButton)

  row.appendChild(colActions)

  booksContainer.appendChild(row)
}

function deleteBook (bookId) {
  loadCollection().then(() => {
    collection = db.collection(collectionBooks)
    collection.remove({_id: bookId})
    collection.save()

    let rows = document.getElementsByClassName('row-book')
    for (let row of rows) {
      if (row.dataset.id === bookId) {
        row.remove()
      }
    }
  })
}

function loadCollection () {
  return new Promise(resolve => {
    db.collection(collectionBooks).load(() => {
      resolve()
    })
  })
}
