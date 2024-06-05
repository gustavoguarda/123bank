import Conta from "../types/Conta.js";
const elementoFormulario = document.querySelector("form#transactionForm");
elementoFormulario.addEventListener("submit", function (event) {
    try {
        console.log('aqui');
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }
        const inputTipoTransacao = elementoFormulario.querySelector("#transactionType");
        const inputValor = elementoFormulario.querySelector("#amount");
        const inputData = elementoFormulario.querySelector("#date");
        let tipoTransacao = inputTipoTransacao.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + " 00:00:00");
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        Conta.registrarTransacao(novaTransacao);
        // SaldoComponent.atualizar();
        // ExtratoComponent.atualizar();
        // elementoFormulario.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
