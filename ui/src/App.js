import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import axios from 'axios';

const DEFAULT_SPACING = `30px`;

const AppWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    padding: ${DEFAULT_SPACING};
    box-sizing: border-box;
`

const FlexWrapper = styled.div`
    margin-top: ${DEFAULT_SPACING};
    display: flex;
`

const SearchWrapper = styled.div`
    width: 45%;
    margin: 0 2.5% 0 0;
    border: 2px solid black;
    padding: 10px;
`

const SelectedBooksWrapper = styled.div`
    width: 45%;
    border: 2px solid black;
    padding: 10px;
`

const BookWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            query: '',
            searchedBooks: [],
            selectedBooks: []
        }
    }

    getBooks = async () => {
        const {query} = this.state
        if(query.length === 0){
            alert('Please enter a query.')
        } else {
            const response = await axios.get(`${__API__}search?query=${query}`)
            this.setState({searchedBooks: response.data})
        }
    }

    addBook = (book) => {
        console.log(book)
        const {selectedBooks} = this.state
        if(selectedBooks.length === 5){
            alert('Please remove a book. There is a max of 5!')
        } else if (selectedBooks.includes(book)){
            alert('You\'ve already added this book!')
        }
        else {
            this.setState({selectedBooks: [...selectedBooks, book]})
        }
    }

    submitBooks = async() => {
        const {selectedBooks} = this.state

        if(selectedBooks.length === 0){
            alert("Please select at least one book.")
        } else {
            axios.post(`${__API__}submission`,{data: {
                selectedBooks
            }}).then(response => {
                alert("You are awesome, thanks!")
                this.setState({selectedBooks: [], searchedBooks: [], query: ''})
            })
            .catch(error => alert("I think I broke it. Whoops."))
            
            this.setState()
        }
    }

    removeBook = (index) => {
        const {selectedBooks} = this.state
        const updatedBooks = [...selectedBooks]
        updatedBooks.splice(index, 1)
        this.setState({selectedBooks: [...updatedBooks]})
    }

    updateQuery = (event) => {
        this.setState({query: event.target.value})
    }

    render() {
        const {
            query,
            searchedBooks,
            selectedBooks
        } = this.state

        console.log(searchedBooks)

        const SearchResults = searchedBooks.map(book => (<BookWrapper><p><img src={book.src}/>{book.title} by {book.author}</p><Button variant="contained" color="primary" onClick={() => this.addBook(book)}>Add</Button></BookWrapper>))
        const SelectedBooks = selectedBooks.sort().map((book, index) => (<BookWrapper><p><img src={book.src}/>{book.title} by {book.author}</p><Button variant="contained" color="primary" onClick={() => this.removeBook(index)}>Remove</Button></BookWrapper>))

        return (
            <AppWrapper>
                <TextField onChange={this.updateQuery} fullWidth value={query} label="Search for a Book (Via Goodreads)"/>
                <Button onClick={this.getBooks} variant="contained" color="primary">
                    Search
                </Button>
                <FlexWrapper>
                    <SearchWrapper>
                        <h2>Search Results</h2>
                        {SearchResults}
                    </SearchWrapper>
                    <SelectedBooksWrapper>
                        <h2>Selected Books</h2>
                        {SelectedBooks}
                        <Button onClick={this.submitBooks} fullWidth variant="contained" color="primary">Submit Selected Books</Button>
                    </SelectedBooksWrapper>
                </FlexWrapper>
            </AppWrapper>
        )
    }
}

export default App
