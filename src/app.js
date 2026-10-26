import express, { json } from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const clientUrl = process.env.CLIENT_URL;

app.use(json());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(cookieParser());

app.use('/auth', routes.authRouter);
app.use('/places', routes.placesRouter);
app.use('/availability', routes.availabilityRouter);
app.use('/comments', routes.commentsRouter);
app.use('/ratings', routes.ratingsRouter);

export default app;
