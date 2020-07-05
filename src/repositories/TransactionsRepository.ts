import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TypeBalance {
  type: 'income' | 'outcome';
}

interface ValueBalance {
  type: 'income' | 'outcome';
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let outcome = 0
    let income = 0
    this.transactions.reduce((total, objects) => objects.type === "income" ? income += objects.value : outcome += objects.value, 0)

    const balance = { income, outcome, total: income - outcome }

    return balance
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }

  public validationType(type: string): TypeBalance | true {
    
    if (type === "income" || type === "outcome") {
      return { type }
    }

    return true
  }
  public validationValue({ value, type }: { value: number, type: string }): false | true {
    const balance = this.transactions.reduce((total, objects) => objects.type === "income" ? total += objects.value : total -= objects.value, 0)

    if (type === "outcome" && balance < value) {
      return true
    }

    return false
  }
}

export default TransactionsRepository;
