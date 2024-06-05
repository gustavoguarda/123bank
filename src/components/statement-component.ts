import Account from "../types/Account.js";
import { DateFormat } from "../types/DateFormat.js";
import { TransactionGroup } from "../types/TransactionGroup.js";
import { formatCurrency, formatDate } from "../utils/formatters.js";
import {TransactionType} from "../types/TransactionType.js"; 

const transactionRecordElement: HTMLElement = document.querySelector(".statement .transaction-record");

renderStatement();
function renderStatement(): void {
    const transactionGroups: TransactionGroup[] = Account.getTransactionGroups();
    transactionRecordElement.innerHTML = "";
    let transactionRecordHtml: string = "";

    for (let transactionGroup of transactionGroups) {
        let transactionItemHtml: string = "";
        for (let transaction of transactionGroup.transactions) {
            // transactionItemHtml += `
            //     <div class="transaction-item">
            //         <div class="transaction-info">
            //             <span class="type">${transaction.transactionType}</span>
            //             <strong class="amount">${formatCurrency(transaction.amount)}</strong>
            //         </div>
            //         <time class="date">${formatDate(transaction.date, DateFormat.DAY_MONTH)}</time>
            //     </div>
            // `;
            let classTransactionType = 'positive'
            if (transaction.transactionType == TransactionType.BILLPAYMENT || transaction.transactionType == TransactionType.TRANSFER) {
                classTransactionType = 'negative'
            }
            console.log(transaction);
            
            transactionItemHtml += `
                <div class="transaction ${classTransactionType}">
                    <div class="transaction-date">
                        <h4>${transactionGroup.label}</h4>
                        <p>${formatDate(transaction.date, DateFormat.DAY_MONTH)}</p>
                    </div>
                    <div>
                        <h4>${transaction.transactionType}</h4>
                        <p>${formatCurrency(transaction.amount)}</p>
                    </div>
                </div>
            `;
        }
        transactionRecordHtml += transactionItemHtml;
    }

    if (transactionRecordHtml === "") {
        transactionRecordHtml = "<div>No transactions recorded.</div>";
    }

    transactionRecordElement.innerHTML = transactionRecordHtml;
}

const StatementComponent = {
    update(): void {
        renderStatement();
    }
}

export default StatementComponent;
