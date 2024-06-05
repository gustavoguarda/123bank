import { DateFormat } from "../types/DateFormat.js";
export function formatCurrency(valor) {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
export function formatDate(data, format = DateFormat.STANDARD) {
    if (format === DateFormat.DAY_WEEK_DAY_MONTH_YEAR) {
        return data.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
    else if (format === DateFormat.DAY_MONTH) {
        return data.toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });
    }
    return data.toLocaleDateString("pt-br");
}
