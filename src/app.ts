import express from 'express';
import indexRouter from './routes/index';

const app: express.Application = express();

app.use(express.json());
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
