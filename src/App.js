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
  this.getBooks()

}

getBooks(){
  BooksAPI.getAll().then((books) => {
    this.setState({books})
  })
}

handleShelf = (event,book) => {
    
    // Get Current State to treat error 
    const currentState = this.state.books

   //Create new array  without book 
   const updatedState = this.state.books.filter((e)=>
       e.id !== book.id
    )
    //update book shelf before
    book.shelf = event.target.value
    // push again the array and update state with news shelf of book
    updatedState.push(book)
    this.setState({ books: updatedState })

    BooksAPI.update( book, event.target.value)
            .then(() => {
              // Removed to performance of state
              //this.getBooks()
            })
            .catch(err => { this.setState({ books: currentState }) })
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
