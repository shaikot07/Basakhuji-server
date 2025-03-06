/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true, }))
// app.use(cors({ origin: ['https://bike-house-l2-as4.netlify.app'], credentials: true, }))
// app.use(cors());


// application routes
app.use('/api', router);  //index.ts  theke asbe oi khabe route gula foreach kora ache
// app.use(); comment kora thakbe
// /api/auth/login
// const test = (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };


app.use(globalErrorHandler);

//Not Found
app.use(notFound);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
