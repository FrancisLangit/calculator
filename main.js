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
        /**Returns return value of operator fed with arguments a and b.*/
        return operator(a, b);
    }
}

class UserInterface {
    constructor() {
        this.calculator = new Calculator;
        this.calcDisplay = document.getElementById('calc-display'); 
    }

    trackClearButton() {
        /**Adds event listener to #calc-clear-btn div. When such is clicked it
         * empties the calculator's display window. */
        const clearButton = document.getElementById('calc-clear-btn');
        clearButton.addEventListener('click', () => {
            this.calcDisplay.textContent = '';
        });
    }

    trackDeleteButton() {
        /**Adds event listener to #calc-delete-btn div. If clicked it removes
         * one character from calculator's display window. */
        const deleteButton = document.getElementById('calc-delete-btn');
        deleteButton.addEventListener('click', () => {
            const oldText = this.calcDisplay.textContent;
            const newText = oldText.substring(0, oldText.length - 1);
            this.calcDisplay.textContent = newText;
        });
    }

    trackInputButtons() {
        /**Adds event listener to .calc-input-btn divs. Such divs now add
         * their text content to #calc-display div when clicked.*/
        const inputButtons = document.querySelectorAll('.calc-input-btn');
        for (let i = 0; i < inputButtons.length; i++) {
            inputButtons[i].addEventListener('click', () => {
                this.calcDisplay.textContent += inputButtons[i].textContent;
            });
        }
    }

    setUp() {
        /**Calls all methods in UserInterface class.*/
        this.trackClearButton();
        this.trackDeleteButton();
        this.trackInputButtons();
    }
}

userInterface = new UserInterface;
userInterface.setUp();