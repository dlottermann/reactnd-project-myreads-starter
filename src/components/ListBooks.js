import React, { Component } from 'react'
import Books from './Books'

export default class ListBooks extends Component {
 
  render() {
    
    const { handleShelf, books } = this.props;
    console.log(books)
    return (
              <div className="list-books-content">
                <Books
                  onHandleChange={handleShelf}
                  books={books.filter(b => b.shelf === "currentlyReading")}
                  titleShelf="Currently Reading"
                />
                <Books
                  onHandleChange={handleShelf}
                  books={books.filter(b => b.shelf === "wantToRead")}
                  titleShelf="Want to Read"
                />
                <Books
                  onHandleChange={handleShelf}
                  books={books.filter(b => b.shelf === "read")}
                  titleShelf="Read"
                />
              </div>
      
    )
  }
}
