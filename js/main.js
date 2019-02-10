const collectionBooks = 'books'

let fdb = new ForerunnerDB()
let db = fdb.db("home_library")
let booksContainer = document.getElementById('BooksContainer')

loadCollection()

function loadCollection () {
  db.collection(collectionBooks).load(() => {
    console.log('loaded')
  })
}
