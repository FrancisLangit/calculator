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
    }

    trackInputButtons() {
        /**Adds event listener to .calc-input-btn divs. Such divs now add
         * their text content to #calc-display div when clicked.*/
        let calcDisplay = document.getElementById('calc-display');
        let inputButtons = document.querySelectorAll(".calc-input-btn");
        for (let i = 0; i < inputButtons.length; i++) {
            inputButtons[i].addEventListener("click", () => {
                calcDisplay.textContent += inputButtons[i].textContent;
            })
        }
    }

    setUp() {
        /**Calls all functions in UserInterface class.*/
        this.trackInputButtons();
    }
}

userInterface = new UserInterface;
userInterface.setUp();