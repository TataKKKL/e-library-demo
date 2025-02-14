import express from 'express';
import cors from 'cors';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();

// Add these middleware configurations
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(cors());
app.use('/api', routes);

export default app;