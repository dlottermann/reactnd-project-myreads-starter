import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from  './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[]
  }

componentDidMount(){
    /*
        TODO: Set new state of books from API result      
    */
  BooksAPI.getAll().then((books) => {
      this.setState({books})
  })

}

handleShelf = (event, book) => {

}



  render() {
    return (
      <div className="app">
      
        
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            
              <ListBooks
                books={ this.state.books }
                shelf={ this.handleShelf } // currentlyReading, read, wantToRead, none
              />
          
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        
      </div>
    )
  }
}

export default BooksApp
