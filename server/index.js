import express from "express"
import axios from "axios"
import { getJson } from "serpapi"
import cors from "cors"
import bodyParser from "body-parser"
import fetch from 'node-fetch'
//import connectDB from "./config/db.js"

const app = express()
const port = 3001;

//import { createProxyMiddleware, } from 'http-proxy-middleware';

app.use(bodyParser.json())

app.use(
    cors()
)



app.listen(port, () => {
    console.log(`The app listening on port ${port}`)
})

app.post("/apidata", async (req, res) => {

    const { locations } = req.body;
    const getdata = getJson({
        engine: "google_local",
        q: "EV charging station",
        location: `${locations}, Tamil Nadu, India`,
        api_key: "64739c74356232c36f6fe0ead2a5a5ec10f6fc529f97b2e02dfcb733fa829884"
    }, (json) => {
        console.log((json["local_results"]));

    });

    res.send(JSON.stringify(await getdata))
})
























