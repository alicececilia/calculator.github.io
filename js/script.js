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
    //checando se a tela de operações já possui ponto .
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // operadores
  processOperation(operation) {
    console.log(operation);
  }

  // mudando valores na tela da calc
  updateScreen() {
    this.currentOperationText.innerText += this.currentOperation;
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

// clique do botão para receber o valor do texto
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
