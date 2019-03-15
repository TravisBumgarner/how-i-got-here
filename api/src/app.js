import axios from "axios"
import express from "express"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/", async (request, response, next) => {
    response.status(200).send('hi')
})

app.get("/ok", (request, response, next) => response.send("Service is running"))

export default app
