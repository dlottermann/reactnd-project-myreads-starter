import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from  './components/SearchBooks'
import { Route } from 'react-router-dom'
import { Alert } from 'reactstrap'

class BooksApp extends React.Component {
  state = {
    books:[],
    loader:true,
    visible:false,
    color:'',
    msg:''
  }

componentDidMount(){
    /*
        TODO: Set new state of books from API result      
    */
  this.getBooks()
  this.setState({loader:false}) 
  // to show the spinner loading on dev enviroment
  // setTimeout(() => { this.setState({loader:false}) }, 1000)
}

getBooks(){
  BooksAPI.getAll().then((books) => {
    this.setState({ books:books})
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
             this.handleMessage(true)
            })
            .catch(err => { 
                            this.handleMessage(false)
                            this.setState({ books: currentState }) 
                          })
}

  handleMessage(success){
    if(success){
      this.setState({ color: 'success', visible:true, msg:'Success! Book Added' })
      setTimeout(() => { this.setState({ color: '', visible:false, msg:'' }) }, 2000)
    }else{
      this.setState({ color: 'danger', visible:true, msg:'Fail! Book not Added' })
      setTimeout(() => { this.setState({ color: '', visible:false, msg:'' }) }, 2000)
    }
  }

  render() {
    return (
      <div className="app">
      <Alert color={ this.state.color } className='alert-book' isOpen={this.state.visible} fade={false}>
          { this.state.msg }
      </Alert>      
      <Route exact path='/' render={()=>(
              <ListBooks
                books={ this.state.books }
                handleShelf={ this.handleShelf } // currentlyReading, read, wantToRead, none
                loader={ this.state.loader}
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
