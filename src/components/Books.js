import React, { Component } from 'react'
import { Spinner, Badge, Button } from 'reactstrap'
export default class Books extends Component {
  
  render() {
    const { onHandleChange, books, titleShelf, loader } = this.props

    return (
      <div className="bookshelf">
            <h2 className="bookshelf-title">{ titleShelf }</h2>
            <Button color="primary" outline>
            Total { titleShelf } <Badge color="secondary">{ books.length }</Badge>
          </Button>
                  <div className="bookshelf-books">
                    <ol className="books-grid">                   
                    { books.map((book) => { 
                      const coverPicture =  book.imageLinks
                                            ? book.imageLinks.smallThumbnail
                                            : 'http://via.placeholder.com/128x190'

                      return (
                              <li key={ book.id }>
                              { loader ? (<Spinner color="success"/>) : '' }
                               <div className="book">                              
                                  <div className="book-top">
                                   <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${coverPicture})` }}></div>
                                    <div className="book-shelf-changer">
                                      <select 
                                        value={book.shelf}
                                        onChange={ (event) => onHandleChange(event,book) }                                    
                                      >
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="book-title">{book.title}</div>
                                  <div className="book-authors">{book.authors ? book.authors.join(', ') : book.publisher}</div>
                                </div>
                              </li>
                            )
                      } ) }

                    </ol>
                  </div>
                </div>
    )
  }
}
