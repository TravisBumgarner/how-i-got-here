import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'

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
    width: 50%;
`

const SelectedBooksWrapper = styled.div`
    width: 50%;
`

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchField: ''
        }
    }

    updateSearchField = (event) => {
        this.setState({searchField: event.target.value})
    }

    render() {
        const {
            searchField
        } = this.state

        return (
            <AppWrapper>
                <TextField onChange={this.updateSearchField} fullWidth value={searchField} label="Search for a Book (Via GoodReads)"/>
                <FlexWrapper>
                    <SearchWrapper>hi</SearchWrapper>
                    <SelectedBooksWrapper>hi</SelectedBooksWrapper>
                </FlexWrapper>
            </AppWrapper>
        )
    }
}

export default App
