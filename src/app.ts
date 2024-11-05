import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import mainRouter from './routes/mainRoute';


const app = express();
const { corsHandler } = require('./middlewares/corsHandler');

// Middleware
app.use(corsHandler);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); 

// Routes
app.use('/api', mainRouter);

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Error Handler
app.use(errorHandler);

export default app;
