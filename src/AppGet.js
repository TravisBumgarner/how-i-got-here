import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import axios from 'axios'

const AppWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 10px;
`

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 0;
`

const BookWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #ccc;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
`

const AuthorWrapper = styled.div`
    background-color: #ccc;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
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

const ResultsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const ResultsSubContainer = styled.div`
    width: 32%;
`

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            booksAgg: [],
            authorsAgg: [],
            rawList: []
        }
    }

    componentDidMount() {
        this.fetchBooks()
    }

    fetchBooks = async () => {
        const booksResponse = await axios.get(`${__API__}aggregated_books`)
        const authorsResponse = await axios.get(`${__API__}aggregated_authors`)
        const rawListResponse = await axios.get(`${__API__}raw_list`)

        const booksAgg = booksResponse.data.books
        const authorsAgg = authorsResponse.data.authors
        const rawList = rawListResponse.data.results

        this.setState({ booksAgg, authorsAgg, rawList })
    }

    makeBookUrl = bookTitle => {
        const urlBookTitle = bookTitle.replace(' ', '%2B')
        return `https://www.goodreads.com/book/title?id=${urlBookTitle}`
    }

    makeAuthorUrl = AuthorName => {
        const urlAuthorName = AuthorName.replace(' ', '+')
        return `https://www.goodreads.com/book/author/${urlAuthorName}`
    }

    render() {
        const { booksAgg, authorsAgg, rawList } = this.state

        const BooksAgg = booksAgg.map(({ title, author, titleCount, src }) => (
            <BookWrapper key={title + author}>
                <DetailsWrapper>
                    <div>
                        <img src={src} />
                    </div>
                    <TitleAndAuthorWrapper>
                        <BookTitle>{title}</BookTitle>
                        <p>By: {author}</p>
                        <p>Count: {titleCount}</p>
                        <p>
                            <a target="_blank" href={this.makeBookUrl(title)}>
                                Read More on Good Reads
                            </a>
                        </p>
                    </TitleAndAuthorWrapper>
                </DetailsWrapper>
            </BookWrapper>
        ))

        const AuthorsAgg = authorsAgg.map(({ author, count }) => (
            <AuthorWrapper key={author}>
                <BookTitle>{author}</BookTitle>
                <p>Count: {count}</p>
                <p>
                    {' '}
                    <a target="_blank" href={this.makeAuthorUrl(author)}>
                        Read More on Good Reads
                    </a>
                </p>
            </AuthorWrapper>
        ))

        const RawList = rawList.map(({ title, author, user, src }) => (
            <BookWrapper key={title + author + user}>
                <ul>
                    <li>Title: {title}</li>
                    <li>Author: {author}</li>
                    <li>User: {user}</li>
                </ul>
            </BookWrapper>
        ))

        return (
            <AppWrapper>
                <Title>Thanks for participating!</Title>
                <p>(Sorry if the book link doesn't work!)</p>
                <ResultsContainer>
                    <ResultsSubContainer>
                        <SubTitle>Most Popular Books</SubTitle>
                        {BooksAgg}
                    </ResultsSubContainer>
                    <ResultsSubContainer>
                        <SubTitle>Most Popular Authors</SubTitle>
                        {AuthorsAgg}
                    </ResultsSubContainer>
                    <ResultsSubContainer>
                        <SubTitle>Raw List of Submissions</SubTitle>
                        {RawList}
                    </ResultsSubContainer>
                </ResultsContainer>
            </AppWrapper>
        )
    }
}

export default App
