import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    
    const validationType = this.transactionsRepository.validationType(type);

    if (validationType===true) throw Error("invalidy type")

    const validationValue = this.transactionsRepository.validationValue({value,type});

    if (validationValue===true) throw Error("value invalidy ")

    const transaction = this.transactionsRepository.create({ title, value, type: validationType.type })
    
    return transaction
  }
}

export default CreateTransactionService;
