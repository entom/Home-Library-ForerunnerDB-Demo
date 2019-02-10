const collectionBooks = 'books'

let fdb = new ForerunnerDB()
let db = fdb.db("home_library")
db.persist.driver("WebSQL")

let booksContainer = document.getElementById('BooksContainer')

document.getElementById('AddBookSubmitButton').addEventListener('click', () => {
  let bookTitle = document.getElementById('bookTitle')
  let bookAuthor = document.getElementById('bookAuthor')
  let bookYear = document.getElementById('bookYear')
  let bookPages = document.getElementById('bookPages')

  loadCollection().then(() => {
    let collection = db.collection(collectionBooks)
    let bookObject = {
      title: bookTitle,
      author: bookAuthor,
      year: bookYear,
      pages: bookPages
    }
    collection.insert(bookObject)
    collection.save()
  })
})

function loadCollection () {
  return new Promise(resolve => {
    db.collection(collectionBooks).load(() => {
      console.log('loaded')
      resolve()
    })
  })
}
