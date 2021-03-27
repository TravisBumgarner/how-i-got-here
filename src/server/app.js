import path from 'path'

import axios from 'axios'
import express from 'express'
import bodyParser from 'body-parser'
import { parseString } from 'xml2js'
import cors from 'cors'

import config from './config'
import { getAggregatedBooks, getAggregatedAuthors, getRawList, createBook } from './db'
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/static', express.static(path.join(__dirname + '../../dist')))

app.post('/submission', async (request, response, next) => {
    const { user, selectedBooks } = request.body.data

    selectedBooks.forEach(async book => {
        await createBook({ ...book, user })
    })
    return response.status(200).send(request.body)
})

app.get('/ok', (request, response, next) => response.send('Service is running'))

// This so hacky, I know. :shrug:
app.get('/app.bundle.js', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../../dist', 'app.bundle.js'))
})

app.get('/', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../../dist', 'index.html'))
})

app.get('/aggregated_books', async (request, response, next) => {
    const books = await getAggregatedBooks()
    return response.send({ books })
})

app.get('/aggregated_authors', async (request, response, next) => {
    const authors = await getAggregatedAuthors()
    return response.send({ authors })
})

app.get('/raw_list', async (request, response, next) => {
    const results = await getRawList()
    return response.send({ results })
})

export default app
