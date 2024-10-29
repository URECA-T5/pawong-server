import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index';
import connectDB from './config/db';
import passport from 'passport';
import session, { SessionOptions } from 'express-session';
import { initPassportStrategies } from './config/passportStrategies';

const app: express.Application = express();

app.use(cors());
app.use(express.json());

const sessionConfig: SessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
initPassportStrategies();

connectDB();

app.use('/', indexRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
