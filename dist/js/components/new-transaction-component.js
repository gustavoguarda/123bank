import BalanceComponent from "./balance-component.js";
import Account from "../types/Account.js";
import StatementComponent from "./statement-component.js";
const formElement = document.querySelector("form#transactionForm");
formElement.addEventListener("submit", function (event) {
    try {
        event.preventDefault();
        if (!formElement.checkValidity()) {
            alert("Please fill in all transaction fields!");
            return;
        }
        const inputTransactionType = formElement.querySelector("#transactionType");
        const inputAmount = formElement.querySelector("#amount");
        const inputDate = formElement.querySelector("#date");
        let transactionType = inputTransactionType.value;
        let amount = inputAmount.valueAsNumber;
        let date = new Date(inputDate.value + " 00:00:00");
        const newTransaction = {
            transactionType: transactionType,
            amount: amount,
            date: date,
        };
        Account.registerTransaction(newTransaction);
        BalanceComponent.update();
        StatementComponent.update();
        formElement.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
