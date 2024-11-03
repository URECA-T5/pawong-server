import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index';
import connectDB from './config/db';
import passport from 'passport';
import session, { SessionOptions } from 'express-session';
import { initPassportStrategies } from './config/passportStrategies';
import path from 'path';

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use('/', indexRouter);

const host = process.env.HOST || 'localhost';
const port = 8080;

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
