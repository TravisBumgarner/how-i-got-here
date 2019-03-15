import axios from "axios"
import express from "express"
import bodyParser from "body-parser"
import { parseString } from 'xml2js'
import cors from 'cors'

import config from './config'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

app.get("/search", async (request, response, next) => {
    console.log(request.query.query)
    const url = `https://www.goodreads.com/search/index.xml?key=${config.goodReads.key}&q=${request.query.query}`
    const grResponse = await axios.get(url).catch(e => console.log(e))
    let works
    parseString(grResponse.data, (error, result) => {
        works = result
    })
    console.log(works.GoodreadsResponse.search[0].results[0].work[0].best_book[0])
    const books = works.GoodreadsResponse.search[0].results[0].work.map(w => ({title: w.best_book[0].title[0], author: w.best_book[0].author[0].name, src: w.best_book[0].small_image_url[0]}))
    response.status(200).send(books)
})

app.post("/submission", (request, response, next) => {

    response.status(200).send(request.body)
})

app.get("/ok", (request, response, next) => response.send("Service is running"))

export default app
