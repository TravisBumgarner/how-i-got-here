import axios from "axios"
import express from "express"
import bodyParser from "body-parser"
import { parseString } from 'xml2js'
import cors from 'cors'

import config from './config'

const app = express()

app.use(cors());

app.get("/autocomplete", async (request, response, next) => {
    const url = `https://www.goodreads.com/search/index.xml?key=${config.goodReads.key}&q=${request.query}`
    const grResponse = await axios.get(url).catch(e => console.log(e))
    let works
    parseString(grResponse.data, (error, result) => {
        works = result
    })
    const books = works.GoodreadsResponse.search[0].results[0].work.map(w => w.best_book[0].title[0])
    response.status(200).send(books)
})

app.get("/ok", (request, response, next) => response.send("Service is running"))

export default app
