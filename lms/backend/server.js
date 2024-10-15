import express from 'express';
const app = express();
import morgan from 'morgan';
import bodyParser from 'body-parser';
import  'dotenv/config'
const port  =  process.env.PORT;
import fs from 'fs';
import db from './services/database/db.js';

const streame = fs.createWriteStream("./services/logs/config.txt", {flags: "a"});

app.use(morgan('combined', {stream: streame}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db
db()

app.listen(port, ()=>{
    console.log(`server connected on port http://localhost:${port}`);
});