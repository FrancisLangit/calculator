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
        this.calcDisplay = document.getElementsByClassName('calc-display')[0];
        
        this.operator = '';
        this.firstNum = '';
        this.waitingForSecondNum = false;
    }

    setUpAllClearButton() {
        /**Adds event listener to #calc-ac-btn div. When such is clicked it
         * empties the calculator's display window and resets this.operator,
         * this.firstNum and this.waitingForSecondNum to default values.*/
        const clearButton = document.getElementsByClassName('calc-ac-btn')[0];
        clearButton.addEventListener('click', () => {
            this.calcDisplay.textContent = '';
            this.operator = '';
            this.firstNum = '';
            this.waitingForSecondNum = false;
        });
    }

    setUpClearButton() {
        /**Adds event listener to #calc-c-btn div. If clicked it removes
         * one character from calculator's display window. */
        const deleteButton = document.getElementsByClassName('calc-c-btn')[0];
        deleteButton.addEventListener('click', () => {
            const oldText = this.calcDisplay.textContent;
            const newText = oldText.substring(0, oldText.length - 1);
            this.calcDisplay.textContent = newText;
        });
    }

    setUpInputButtons() {
        /**Adds event listeners to .calc-input-btn divs. Makes them add
         * their text content to #calc-display div when clicked. Also clears
         * display window before first digit of second number is inputted.*/
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
        /**Calculates result of user input and displays such in calculator
         * display window.*/
        this.calcDisplay.textContent = this.calculator.operate(
            this.operator,
            parseFloat(this.firstNum),
            parseFloat(this.calcDisplay.textContent),
        );
    }

    setUpOperatorButtons() {
        /**Adds event listeners to all divs with class .calc-operator-btn.
         * When such are clicked calls this.displayResult() if this.firstNum
         * already inputted and prepares calculator to anticipate 
         * this.secondNum.*/
        const operatorButtons = document.querySelectorAll(
            '.calc-operator-btn');
        for (let i = 0; i < operatorButtons.length; i++) {
            operatorButtons[i].addEventListener('click', () => {
                if (this.firstNum !== '') {
                    this.displayResult();
                }
                this.operator = operatorButtons[i].textContent;
                this.firstNum = this.calcDisplay.textContent;
                this.waitingForSecondNum = true;
            });
        }
    }

    setUpEqualsButton() {
        /**Adds event listener to #calc-equals-btn div. Calls displayResult()
         * if first number already inputted. Also resets this.firstNum.*/
        const equalsButton = document.getElementsByClassName(
            "calc-equals-btn")[0];
        equalsButton.addEventListener('click', () => {
            if (this.firstNum !== '') {
                this.displayResult();
            }
            this.firstNum = '';
        });
    }

    addClearButtonsKeyboardSupport(e) {
        /**Adds keyboard support for clear buttons AC and C.*/
        if (e.key === "Delete") {
            document.getElementsByClassName("calc-ac-btn")[0].click();
        } else if (e.key === "Backspace") {
            document.getElementsByClassName("calc-c-btn")[0].click();
        }
    }

    addKeyboardSupport() {
        /**Adds keydown event listeners to body. If key pressed equal to text
         * content of button, simulate such button being clicked. */
        document.body.addEventListener('keydown', (e) => {
            const buttons = document.querySelectorAll('div.calc > div');
            for (let i = 0; i < buttons.length; i++) {
                if (e.key === buttons[i].textContent) {
                    buttons[i].click();
                }
            }
            this.addClearButtonsKeyboardSupport(e);
        });
    }

    setUp() {
        /**Calls methods in UserInterface class associated with setting up
         * user interface.*/
        this.setUpAllClearButton();
        this.setUpClearButton();
        this.setUpInputButtons();
        this.setUpOperatorButtons();
        this.setUpEqualsButton();
        this.addKeyboardSupport();
    }
}

userInterface = new UserInterface;
userInterface.setUp();