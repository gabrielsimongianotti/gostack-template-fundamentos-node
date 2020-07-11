import { Router } from 'express';

import transactionRouter from './transaction.routes';
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";

const routes = Router();

routes.use('/transactions', transactionRouter);
routes.use('/users', usersRouter)
routes.use("/sessions", sessionsRouter)

export default routes;
