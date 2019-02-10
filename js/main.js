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
      console.log(bookObject)
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
  row.classList.add('mb-2')

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

  let deleteButton = document.createElement('button')
  deleteButton.classList.add('btn')
  deleteButton.classList.add('btn-danger')
  deleteButton.classList.add('btn-sm')
  deleteButton.value = 'DELETE'
  deleteButton.innerText = 'DELETE'
  colActions.appendChild(deleteButton)

  row.appendChild(colActions)

  booksContainer.appendChild(row)
}

function loadCollection () {
  return new Promise(resolve => {
    db.collection(collectionBooks).load(() => {
      console.log('loaded')
      resolve()
    })
  })
}
