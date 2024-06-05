import { TransactionType } from "./TransactionType.js";
let balance = JSON.parse(localStorage.getItem("balance")) || 0;
const transactions = JSON.parse(localStorage.getItem("transactions"), (key, value) => {
    if (key === "date") {
        return new Date(value);
    }
    return value;
}) || [];
function debit(amount) {
    if (amount <= 0) {
        throw new Error("The amount to be debited must be greater than zero!");
    }
    if (amount > balance) {
        throw new Error("Insufficient balance!");
    }
    balance -= amount;
    localStorage.setItem("balance", balance.toString());
}
function deposit(amount) {
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
    getAccessDate() {
        return new Date();
    },
    getTransactionGroups() {
        const transactionGroups = [];
        const transactionList = structuredClone(transactions);
        const sortedTransactions = transactionList.sort((t1, t2) => t2.date.getTime() - t1.date.getTime());
        let currentTransactionGroupLabel = "";
        for (let transaction of sortedTransactions) {
            let transactionGroupLabel = transaction.date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
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
    registerTransaction(newTransaction) {
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
};
export default Account;
