import axios from "axios"
import express from "express"
import bodyParser from "body-parser"
import { parseString } from 'xml2js'
import cors from 'cors'

import config from './config'
import { createBook } from './db'
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

app.get("/search", async (request, response, next) => {
    const url = `https://www.goodreads.com/search/index.xml?key=${config.goodReads.key}&q=${request.query.query}`
    const grResponse = await axios.get(url).catch(e => console.log(e))
    let works
    parseString(grResponse.data, (error, result) => {
        works = result
    })
    const books = works.GoodreadsResponse.search[0].results[0].work.map(w => ({title: w.best_book[0].title[0], author: w.best_book[0].author[0].name[0], src: w.best_book[0].small_image_url[0]}))
    response.status(200).send(books)
})

app.post("/submission", async (request, response, next) => {
    request.body.data.selectedBooks.forEach(async book => {
        await createBook(book)
    })
    return response.status(200).send(request.body)
})

app.get("/ok", (request, response, next) => response.send("Service is running"))

export default app
