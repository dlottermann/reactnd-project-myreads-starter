import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {search} from './../BooksAPI'
import Books from './Books'

export default class SearchBooks extends Component {

  state = {
    query: '',
    results:[]
  }

  handleSearch = (searchQuery) => {
    this.setState({ query:searchQuery })
    if (searchQuery.length === 0) {
      this.setState({ results: [] })
    } else {
      search(searchQuery).then(searchResponse => {
        const items = searchResponse.error ? [] : searchResponse
        this.setState({ results: items })
      })
}
  }

  render() {
    const { handleShelf, books } = this.props
    const { results, query } = this.state

    const resultBooks = results.map(book => {
      const found = books.find(myBook => myBook.id === book.id)
      book.shelf = found ? found.shelf : "none"
      return book
    })

    return (
        <div className="search-books">
            <div className="search-books-bar">

          
            <Link to="/">
              <p className="close-search">Close</p>
            </Link>
              <div className="search-books-input-wrapper">
                
              <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={ query }
                  onChange={(event) => this.handleSearch(event.target.value)}
              />

              </div>
            </div>
            <div className="search-books-results">
            { resultBooks.length > 0 ? (
              <Books
              onHandleChange={handleShelf}
              books={resultBooks}
              titleShelf={`Result of search by: ${ query }`}
            />
            ) : (
              <div>
                <div className="no-results">
                  {`No books to show `}
                </div>
              </div> )}
            </div>
          </div>
    )
  }
}
