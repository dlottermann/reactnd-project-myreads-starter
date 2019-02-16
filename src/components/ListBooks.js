import React, { Component } from 'react'
import Books from './Books'
import { Link } from 'react-router-dom'

export default class ListBooks extends Component {
 
  render() {
    
    const { handleShelf, books, loader } = this.props
    return (
       <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              <div className="list-books-content">             
                <Books
                  onHandleChange={handleShelf}
                  books={books.filter(b => b.shelf === "currentlyReading")}
                  titleShelf="Currently Reading"
                  loader={ loader }
                />
                <Books
                  onHandleChange={handleShelf}
                  books={books.filter(b => b.shelf === "wantToRead")}
                  titleShelf="Want to Read"
                  loader={ loader }
                />
                <Books
                  onHandleChange={handleShelf}
                  books={books.filter(b => b.shelf === "read")}
                  titleShelf="Read"
                  loader={ loader }
                />
              </div>
              <div className="open-search">
                    <Link to='/search'>
                      <button>Add a book</button>
                    </Link>
               </div>
              
       </div>   
    )
  }
}
