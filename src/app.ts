import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index';
import connectDB from './config/db';
import passport from 'passport';
import session, { SessionOptions } from 'express-session';
import './config/passport';

const app: express.Application = express();

app.use(cors());
app.use(express.json());

const sessionConfig: SessionOptions = {
  secret: '0401',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use('/', indexRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
