import express from 'express';
import http from 'http';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
import cors from 'cors';
import pool from '../src/db/db';

const app = express();

app.use(cors({
    credentials: true,
}));

app.get('/', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM "tbl_Ingredients"')
        res.json(result.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }   
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})
