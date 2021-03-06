import { Router } from 'express';
import { getCustomRepository } from "typeorm";

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const transactionRouter = Router();

transactionRouter.use(ensureAuthenticated)

transactionRouter.get('/', async (request, response) => {

  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepository.find();
  const balance = await transactionsRepository.getBalance();

  return response.json({ transactions, balance })

});

transactionRouter.post('/', async (request, response) => {

  let { title, value, type, userId } = request.body;

  const createTransaction = new CreateTransactionService()

  const transaction = await createTransaction.execute({ title, value, type, userId })

  return response.json(transaction)

});

export default transactionRouter;
