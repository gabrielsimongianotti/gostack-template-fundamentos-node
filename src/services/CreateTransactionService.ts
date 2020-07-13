import { getCustomRepository } from "typeorm"

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import AppError from "../errors/AppError";

interface Request {
  title: string;
  value: number;
  type: string;
  userId: string;
}

class CreateTransactionService {

  public async execute({ title, value, type, userId }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);


    const validationUser = await transactionsRepository.validationUser({ userId });

    if (validationUser === true) throw new AppError("please send user")


    const validationType = await transactionsRepository.validationType(type);

    if (validationType === true) throw new AppError("invalidy type",401)

    const validationValue = await transactionsRepository.validationValue({ value, type });

    if (validationValue === true) throw new AppError("value invalidy ",401)

    const transaction = transactionsRepository.create({
      title,
      value,
      type: validationType.type,
      user_id: userId
    })

    console.log(transaction)
    await transactionsRepository.save(transaction)
    return transaction
  }
}

export default CreateTransactionService;
