import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route.js'
dotenv.config();

const port = process.env.PORT;

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.json());


app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})