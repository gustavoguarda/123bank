import { formatDate, formatCurrency } from "../utils/formatters.js";
import { DateFormat } from "../types/DateFormat.js";
import Account from "../types/Account.js";
const balanceElement = document.querySelector(".balance-value .value");
const accessDateElement = document.querySelector(".block-balance time");
if (accessDateElement != null) {
    accessDateElement.textContent = formatDate(Account.getAccessDate(), DateFormat.DAY_WEEK_DAY_MONTH_YEAR);
}
renderBalance();
function renderBalance() {
    if (balanceElement != null) {
        balanceElement.textContent = formatCurrency(Account.getBalance());
    }
}
const BalanceComponent = {
    update() {
        renderBalance();
    }
};
export default BalanceComponent;
