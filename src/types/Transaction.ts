import { TransactionType } from "./TransactionType.js";

export type Transaction = {
    transactionType: TransactionType;
    amount: number;
    date: Date;
}
