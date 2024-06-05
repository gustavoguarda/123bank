import { Transaction } from "../types/Transaction.js";
import { TransactionType } from "../types/TransactionType.js";
import BalanceComponent from "./balance-component.js";
import Account from "../types/Account.js";
import StatementComponent from "./statement-component.js";

const formElement = document.querySelector("form#transactionForm") as HTMLFormElement;
formElement.addEventListener("submit", function(event) {
    try {        
        event.preventDefault();
        if (!formElement.checkValidity()) {
            alert("Please fill in all transaction fields!");
            return;
        }

        const inputTransactionType = formElement.querySelector("#transactionType") as HTMLSelectElement;
        const inputAmount = formElement.querySelector("#amount") as HTMLInputElement;
        const inputDate = formElement.querySelector("#date") as HTMLInputElement;

        let transactionType: TransactionType = inputTransactionType.value as TransactionType;
        let amount: number = inputAmount.valueAsNumber;
        let date: Date = new Date(inputDate.value + " 00:00:00");

        const newTransaction: Transaction = {
            transactionType: transactionType,
            amount: amount, 
            date: date,
        }

        Account.registerTransaction(newTransaction);
        BalanceComponent.update();
        StatementComponent.update();
        formElement.reset();
    }
    catch(error) {
        alert(error.message);
    }
});
