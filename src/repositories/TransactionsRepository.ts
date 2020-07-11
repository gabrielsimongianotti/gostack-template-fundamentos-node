import Transaction from '../models/Transaction';
import { EntityRepository, Repository } from "typeorm";

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
interface typeUser {
  userId: string
}
// interface CreateTransactionDTO {
//   title: string;
//   value: number;
//   type: 'income' | 'outcome';
// }

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction>{

  public async getBalance(): Promise<Balance> {
    let outcome = 0
    let income = 0
    let transactions = await this.find()
    transactions.reduce((total, objects) => objects.type === "income" ? income += objects.value : outcome += objects.value, 0)

    const balance = { income, outcome, total: income - outcome }

    return balance
  }

  public validationType(type: string): TypeBalance | true {

    if (type === "income" || type === "outcome") {
      return { type }
    }

    return true
  }

  public async validationValue({ value, type }: { value: number, type: string }): Promise<false | true> {
    let transactions = await this.find()
    const balance = transactions.reduce((total, objects) => objects.type === "income" ? total += objects.value : total -= objects.value, 0)

    if (type === "outcome" && balance < value) {
      return true
    }

    return false
  }

  public async validationUser({ userId }: typeUser): Promise<true | false> {
    const checkUserExists = await this.find({      where: { user_id: userId }    })
    let transactions = await this.find()

    let checkUserExist = transactions.filter(( objects) => objects.user_id === userId)

    console.log(checkUserExists.length,userId)

    if (checkUserExists.length===0) {
      return true
    }
    return false

  }
}

export default TransactionsRepository;
