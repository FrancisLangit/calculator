class Calculator {
    add(a, b) {
        /**Returns sum of a and b.*/
        return a + b;
    }
    
    subtract(a, b) {
        /**Returns difference of a and b.*/
        return a - b;
    }
    
    multiply(a, b) {
        /**Returns product of a and b.*/
        return a * b;
    }
    
    divide(a, b) {
        /**Returns quotient of a and b.*/
        return a / b;
    }

    operate(operator, a, b) {
        /**Returns value after operating on a and b dependent on operator.*/
        let result;
        switch(operator) {
            case '+':
                result = this.add(a, b);
                break;
            case '-':
                result = this.subtract(a, b);
                break;
            case '*':
                result = this.multiply(a, b);
                break;
            case '/':
                result = this.divide(a, b);
                break;
        }
        return result;
    }
}

class UserInterface {
    constructor() {
        this.calculator = new Calculator;
        this.calcDisplay = document.getElementById('calc-display'); 
        
        this.operator = '';
        this.firstNum = '';
        this.secondNum = '';
        this.waitingForSecondNum = false;
    }

    setUpClearButton() {
        /**Adds event listener to #calc-clear-btn div. When such is clicked it
         * empties the calculator's display window. */
        const clearButton = document.getElementById('calc-clear-btn');
        clearButton.addEventListener('click', () => {
            this.calcDisplay.textContent = '';
        });
    }

    setUpDeleteButton() {
        /**Adds event listener to #calc-delete-btn div. If clicked it removes
         * one character from calculator's display window. */
        const deleteButton = document.getElementById('calc-delete-btn');
        deleteButton.addEventListener('click', () => {
            const oldText = this.calcDisplay.textContent;
            const newText = oldText.substring(0, oldText.length - 1);
            this.calcDisplay.textContent = newText;
        });
    }

    setUpInputButtons() {
        /**Adds event listener to .calc-input-btn divs. Such divs now add
         * their text content to #calc-display div when clicked.*/
        const inputButtons = document.querySelectorAll('.calc-input-btn');
        for (let i = 0; i < inputButtons.length; i++) {
            inputButtons[i].addEventListener('click', () => {
                if (this.waitingForSecondNum) {
                    this.calcDisplay.textContent = '';
                    this.waitingForSecondNum = false;
                }
                this.calcDisplay.textContent += inputButtons[i].textContent;
            });
        }
    }

    displayResult() {
        // this.calcDisplay.textContent = this.calculator.operate(
        //     this.operator, 
        //     parseFloat(this.firstNum), 
        //     parseFloat(this.calcDisplay.textContent),
        // );
        // this.operator = '';
        // this.firstNum = this.calcDisplay.textContent;
        // this.waitingForSecondNum = true;
    }

    setUpOperatorButtons() {
        const operatorButtons = document.querySelectorAll(
            '.calc-operator-btn');
        for (let i = 0; i < operatorButtons.length; i++) {
            operatorButtons[i].addEventListener('click', () => {
                if (this.calcDisplay.textContent !== '') {
                    if (this.firstNum === '') {
                        this.operator = operatorButtons[i].textContent;
                        this.firstNum = this.calcDisplay.textContent;
                        this.waitingForSecondNum = true;
                    } else if (this.firstNum !== '') {
                        this.secondNum = this.calcDisplay.textContent;
                        this.calcDisplay.textContent = this.calculator.operate(
                            this.operator,
                            parseFloat(this.firstNum),
                            parseFloat(this.secondNum),
                        );
                        this.firstNum = this.calcDisplay.textContent;
                        this.secondNum = '';
                        this.waitingForSecondNum = true;
                        this.operator = operatorButtons[i].textContent;
                    }
                }
            });
        }
    }

    setUpEqualsButton() {
        const equalsButton = document.getElementById("calc-equals-btn");
        equalsButton.addEventListener('click', () => {
            // if (this.firstNum !== '') {
            //     this.displayResult();
            // }
        });
    }

    setUp() {
        /**Calls methods in UserInterface class associated with setting up
         * buttons on calculator user interface.*/
        this.setUpClearButton();
        this.setUpDeleteButton();
        this.setUpInputButtons();
        this.setUpOperatorButtons();
        this.setUpEqualsButton();
    }
}

userInterface = new UserInterface;
userInterface.setUp();