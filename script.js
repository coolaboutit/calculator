let inputValue = "";
let firstOperand = null;
let secondOperand = null;
let operationResult = 0;
let currentOperator = null;
let equalsClicked = false;
const screenTop = document.getElementById("screen-top");
const screenBottom = document.getElementById("screen-bottom");
const deleteButton = document.getElementById("btnDelete");
const numberButtons = document.querySelectorAll(".btnNumber");
const clearButton = document.getElementById("btnClear");
const operatorButtons = document.querySelectorAll(".btnOperator");
const pointButton = document.getElementById("btnPoint");
const equalsButton = document.getElementById("btnEquals");
const operators = {
    add: function (num1, num2) {
        return Math.round((num1 + num2) * 1000) / 1000;
    },
    subtract: function (num1, num2) {
        return Math.round((num1 - num2) * 1000) / 1000;
    },
    multiply: function (num1, num2) {
        return Math.round((num1 * num2) * 1000) / 1000;
    },
    divide: function (num1, num2) {
        return Math.round((num1 / num2) * 1000) / 1000;
    },
}

// Event listeners
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", handleNumberClick);
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", handleOperatorClick);
});

equalsButton.addEventListener("click", handleEqualsClick);

clearButton.addEventListener("click", clearEverything);

pointButton.addEventListener("click", handlePointClick);

deleteButton.addEventListener("click", handleDeleteClick);

// Handlers and functions
function handleDeleteClick() {
    inputValue = inputValue.slice(0, inputValue.length - 1);
    updateScreenBottom();
}

function handlePointClick() {
    if (equalsClicked === true) {
        clearEverything();
    }

    if (!inputValue.includes(".")) {
        if (inputValue === "") {
            inputValue += "0.";
            updateScreenBottom();
            return;
        }

        inputValue += ".";
        updateScreenBottom();
        return;
    }
}

function handleNumberClick(e) {
    if (equalsClicked === true) {
        clearEverything();
    }

    inputValue += e.target.textContent;
    updateScreenBottom();
}

function handleEqualsClick() {
    // no input for second operand
    if (firstOperand !== null && currentOperator !== null && inputValue === "") {
        return;
    }

    // Trying to divide by zero
    if (currentOperator === "/" && +inputValue === 0) {
        alert("Can't divide by zero!");
        inputValue = "";
        updateScreenBottom();
        return;
    }

    // result is currently shown
    if (equalsClicked === true) { return; }

    // no operands and operator set
    if (firstOperand === null && currentOperator === null) { return; }

    // first operand and operator entered
    if (firstOperand !== null && currentOperator !== null && inputValue !== "") {
        equalsClicked = true;
        secondOperand = +inputValue;
        operationResult = evaluate();
        inputValue = operationResult;
        updateScreenTop();
        updateScreenBottom();
        return;
    }
}

function handleOperatorClick(e) {
    const operatorClicked = e.target.textContent;

    // equals was clicked
    if (equalsClicked === true) {
        currentOperator = operatorClicked;
        firstOperand = operationResult;
        secondOperand = null;
        inputValue = "";
        equalsClicked = false;
        updateScreenTop();
        updateScreenBottom();
        return;
    }

    // inputting first operand
    if (inputValue !== "" && firstOperand === null) {
        currentOperator = operatorClicked;
        firstOperand = +inputValue;
        inputValue = "";
        updateScreenTop();
        updateScreenBottom();
        return;
    }

    // inputting second operand
    if (inputValue !== "" && secondOperand === null) {
        secondOperand = +inputValue;
        inputValue = "";
        firstOperand = evaluate();
        secondOperand = null;
        currentOperator = operatorClicked;
        updateScreenTop();
        updateScreenBottom();
        return;
    }

    // changing operator when first operand is already set
    if (inputValue === "" && firstOperand !== null && secondOperand === null) {
        currentOperator = operatorClicked;
        updateScreenTop();
        updateScreenBottom();
        return;
    }
}

function updateScreenBottom() {
    screenBottom.textContent = inputValue;
}

function clearEverything() {
    inputValue = "";
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    operationResult = 0;
    screenTop.textContent = "";
    screenBottom.textContent = "";
    equalsClicked = false;
}

function updateScreenTop() {
    // first operand and operator clicked
    if (firstOperand !== null && secondOperand === null) {
        screenTop.textContent = `${firstOperand}${currentOperator}`;
        return;
    }

    // equals is clicked
    if (equalsClicked === true) {
        screenTop.textContent = `${firstOperand}${currentOperator}${secondOperand}=`;
        return;
    }

    // scroll to the end
    screenTop.scrollLeft = screenTop.scrollWidth;
}

function evaluate() {
    // Trying to divide by zero
    if (currentOperator === "/" && secondOperand === 0) {
        alert("Can't divide by zero!");
        return firstOperand;
    }

    switch (currentOperator) {
        case "+":
            return operators.add(firstOperand, secondOperand);
        case "-":
            return operators.subtract(firstOperand, secondOperand);
        case "*":
            return operators.multiply(firstOperand, secondOperand);
        case "/":
            return operators.divide(firstOperand, secondOperand);
    }
}