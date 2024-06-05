import { Transaction } from "./Transaction.js";
import { TransactionType } from "./TransactionType.js";
import { TransactionGroup } from "./TransactionGroup.js";

let balance: number = JSON.parse(localStorage.getItem("balance")) || 0;
const transactions: Transaction[] = JSON.parse(localStorage.getItem("transactions"), (key: string, value: string) => {
    if (key === "date") {
        return new Date(value);
    }

    return value;
}) || [];

function debit(amount: number): void {
    if (amount <= 0) {
        throw new Error("The amount to be debited must be greater than zero!");
    }
    if (amount > balance) {
        throw new Error("Insufficient balance!");
    }

    balance -= amount;
    localStorage.setItem("balance", balance.toString());
}

function deposit(amount: number): void {
    if (amount <= 0) {
        throw new Error("The amount to be deposited must be greater than zero!");
    }

    balance += amount;
    localStorage.setItem("balance", balance.toString());
}

const Account = {
    getBalance() {
        return balance;
    },

    getAccessDate(): Date {
        return new Date();
    },

    getTransactionGroups(): TransactionGroup[] {
        const transactionGroups: TransactionGroup[] = [];
        const transactionList: Transaction[] = structuredClone(transactions);
        const sortedTransactions: Transaction[] = transactionList.sort((t1, t2) => t2.date.getTime() - t1.date.getTime());
        let currentTransactionGroupLabel: string = "";

        for (let transaction of sortedTransactions) {
            let transactionGroupLabel: string = transaction.date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
            if (currentTransactionGroupLabel !== transactionGroupLabel) {
                currentTransactionGroupLabel = transactionGroupLabel;
                transactionGroups.push({
                    label: transactionGroupLabel,
                    transactions: []
                });
            }
            transactionGroups.at(-1).transactions.push(transaction);
        }

        return transactionGroups;
    },

    registerTransaction(newTransaction: Transaction): void {
        if (newTransaction.transactionType == TransactionType.DEPOSIT) {
            deposit(newTransaction.amount);
        } 
        else if (newTransaction.transactionType == TransactionType.TRANSFER || newTransaction.transactionType == TransactionType.BILLPAYMENT) {
            debit(newTransaction.amount);
            newTransaction.amount *= -1;
        } 
        else {
            throw new Error("Invalid Transaction Type!");
        }

        transactions.push(newTransaction);
        console.log(this.getTransactionGroups());
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
}

export default Account;
