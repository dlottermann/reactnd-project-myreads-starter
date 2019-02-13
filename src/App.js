import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from  './components/SearchBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
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

handleShelf = (event,book) => {
    const currentId = book.id
    book.shelf = event.target.value
    const currentState = this.state.books

    const updatedState = this.state.books.filter((e)=>
       e.id !== book.id
    )

    updatedState.push(book)
    this.setState({ books: updatedState })

    BooksAPI.update( currentId, event.target.value)
            .then(bookData => {})
            .catch(err => {
            this.setState({ books: currentState });
    });
}

  render() {
    return (
      <div className="app">
      <Route exact path='/' render={()=>(
              <ListBooks
                books={ this.state.books }
                handleShelf={ this.handleShelf } // currentlyReading, read, wantToRead, none
              />      
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            books={ this.state.books }
            handleShelf={ this.handleShelf }            
          />
        )} />        
      </div>
    )
  }
}

export default BooksApp
