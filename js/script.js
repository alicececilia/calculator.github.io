// chamando o DOM
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // add digito na tela da calc
  addDigit(digit) {
    //checando se a tela de operações já possui ponto "."
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processando todas as operações
  processOperation(operation) {
    //check if valor atual está vazio
    if (this.currentOperationText.innerText === "" && operation !== " C") {
      // mudar operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // valore anteriores e atuais
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

      case "DEL":
        operationValue = previous * current;
        this.processDelOperator();
        break;

      case "CE":
        operationValue = previous * current;
        this.processClearCurrentOperator();
        break;

      case "C":
        operationValue = previous * current;
        this.processClearAllOperator();
        break;

      case "=":
        operationValue = previous * current;
        this.processEqualOperator();
        break;

      default:
        return;
    }
  }

  // mudando valores na tela da calc
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // checando se o valor é zero, se for apenas adicione o valor atual
      if (previous === 0) {
        operationValue = current;
      }

      // adicionando o valor atual ao anterior
      // prettier-ignore
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // mudando operação metemática
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];
    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // deletando último número
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  // limpando operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }
  // limpando todas as operações
  processClearAllOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  // precessando a opp "="
  processEqualOperator() {
    let operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

// clique do botão para receber o valor do texto (números e ".")
buttons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
