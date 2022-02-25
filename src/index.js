import express from 'express'
import cors from 'cors'
import router from './routes.js'
import bodyParser from 'body-parser'

import { createTable, deleteTable } from './Controllers/agenda.js'

import upload from "express-fileupload";

const port = process.env.PORT || 3001



const app = express()
app.use(express.static('src'))
app.use(express.json())

app.use(upload())
app.use(cors())

let urlEncoderParser = bodyParser.urlencoded({extended: false})

app.use( urlEncoderParser, router)

app.listen(port, () => {
    console.log(`backend rodando ${port}`);
})