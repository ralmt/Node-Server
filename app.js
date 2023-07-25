import express from 'express';
import chalk from 'chalk';
import Debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
import sessionRouter  from "./src/routers/sessionsRouter.js";
import adminRouter from "./src/routers/adminRouter.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
console.log('__filename: ', __filename)

const __dirname = path.dirname(__filename);
console.log('__dirname: ', __dirname);

const app = express();

const debug = Debug('app');
const port = process.env.PORT || 3000;
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views','./src/views');
app.set('view engine','ejs');

app.use('/sessions', sessionRouter);
app.use('/admin', adminRouter);

app.get('/',(req, res) => {
    res.render('index', { title: `Globomantics!`, data: ['a', 'b', 'c'] });
})

app.listen(port, ()=>{
    debug( `Listening to port ${chalk.green(port)}`);
})