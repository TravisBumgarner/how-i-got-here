import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import axios from 'axios'

const DEFAULT_SPACING = `30px`

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const TitleAndAuthorWrapper = styled.div`
    margin-left: 20px;
`

const BookTitle = styled.h3`
    font-weight: 100;
    font-size: 20px;
    margin: 0;
    padding: 0;
`

const Title = styled.h1`
    font-weight: 400;
    font-size: 30px;
`

const SubTitle = styled.h2`
    font-weight: 100;
    font-size: 26px;
`

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

const SearchBarWrapper = styled.div`
    display: flex;
    width: 100%;
`

const SearchWrapper = styled.div`
    width: 70%;
    margin: 0 2.5% 0 0;
    border: 1px solid #888;
    padding: 10px;
`

const SelectedBooksWrapper = styled.div`
    width: 30%;
    border: 1px solid #888;
    padding: 10px;

    & * {
        margin: 10px 0;
    }
`

const BookWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid black;
`

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            user: '',
            searchedBooks: [],
            selectedBooks: []
        }
    }

    getBooks = async event => {
        const ENTER = 13
        if (event.keyCode && event.keyCode !== ENTER) {
            // Don't get books if keyCode is pressed but not enter
            return
        }

        const { query } = this.state
        if (query.length === 0) {
            alert('Please enter a query.')
        } else {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
            const books = response.data.items.map(({volumeInfo, id}) => ({...volumeInfo, id}))
            console.log(response.data)
            this.setState({ searchedBooks: books })
        }
    }

    addBook = book => {
        const { selectedBooks } = this.state
        if (selectedBooks.length === 5) {
            alert('Please remove a book. There is a max of 5!')
        } else if (selectedBooks.includes(book)) {
            alert("You've already added this book!")
        } else {
            this.setState({ selectedBooks: [...selectedBooks, book] })
        }
    }

    // submitBooks = async () => {
    //     const { selectedBooks, user } = this.state

    //     if (selectedBooks.length === 0) {
    //         alert('Please select at least one book.')
    //     } else {
    //         axios
    //             .post(`${__API__}submission`, {
    //                 data: {
    //                     selectedBooks,
    //                     user
    //                 }
    //             })
    //             .then(response => {
    //                 alert('You are awesome, thanks!')
    //                 this.setState({
    //                     selectedBooks: [],
    //                     searchedBooks: [],
    //                     query: '',
    //                     user: ''
    //                 })
    //             })
    //             .catch(error => alert('I think I broke it. Whoops.'))

    //         this.setState()
    //     }
    // }

    removeBook = index => {
        const { selectedBooks } = this.state
        const updatedBooks = [...selectedBooks]
        updatedBooks.splice(index, 1)
        this.setState({ selectedBooks: [...updatedBooks] })
    }

    updateQuery = event => {
        this.setState({ query: event.target.value })
    }

    updateUser = event => {
        this.setState({ user: event.target.value })
    }

    render() {
        const { query, searchedBooks, selectedBooks, user } = this.state
        console.log(searchedBooks)
        const SearchResults = searchedBooks.map(({title, authors, description, id, imageLinks}) => {
            return (
            <BookWrapper key={id}>
                <DetailsWrapper>
                    <img style={{maxHeight: '150px'}} src={imageLinks && imageLinks.smallThumbnail} />
                    <TitleAndAuthorWrapper>
                        <BookTitle>{title ? title : ''}</BookTitle>
                        <p>Authors: {authors ? authors.join(', ') : ''}</p>
                        <p>Description: {description ? `${description.slice(0,250)}...` : ''}</p>
                    </TitleAndAuthorWrapper>
                </DetailsWrapper>
                <Button variant="contained" color="primary" onClick={() => this.addBook({title, authors, description, id, imageLinks})}>
                    Add
                </Button>
            </BookWrapper>
            )})
        const SelectedBooks = selectedBooks.sort().map((book, index) => (
            <BookWrapper key={book.title + book.author}>
                <DetailsWrapper>
                    <img src={book.src} />
                    <TitleAndAuthorWrapper>
                        {book.title} by {book.author}
                    </TitleAndAuthorWrapper>
                </DetailsWrapper>
                <Button variant="contained" color="primary" onClick={() => this.removeBook(index)}>
                    Remove
                </Button>
            </BookWrapper>
        ))

        return (
            <AppWrapper>
                <Title>
                    Hey! Search for books that have made you who you are today, select up to 5 good ones, enter your
                    name, hit submit.
                </Title>
                <FlexWrapper>
                    <SearchWrapper>
                        <SearchBarWrapper>
                            <TextField
                                onKeyUp={this.getBooks}
                                onChange={this.updateQuery}
                                value={query}
                                fullWidth
                                label="Search for a Book (Via Goodreads)"
                            />
                            <Button onClick={this.getBooks} variant="contained" color="primary">
                                Search
                            </Button>
                        </SearchBarWrapper>
                        <SubTitle>Search Results</SubTitle>
                        {SearchResults}
                    </SearchWrapper>
                    <SelectedBooksWrapper>
                        <SubTitle>Selected Books</SubTitle>
                        {SelectedBooks}
                        <TextField
                            onChange={this.updateUser}
                            fullWidth
                            value={user}
                            label="Your Name (annonymous is fine!)?"
                        />
                        <Button onClick={this.submitBooks} fullWidth variant="contained" color="primary">
                            Submit Selected Books
                        </Button>
                    </SelectedBooksWrapper>
                </FlexWrapper>
            </AppWrapper>
        )
    }
}

export default App
