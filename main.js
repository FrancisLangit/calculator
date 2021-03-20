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
        let buttons = document.querySelectorAll(".calc-input-btn")
        for (let i = 0; i < buttons.length; i++) {
            console.log(buttons[i].textContent);
        }
    }

    populateDisplay() {
        document.getElementByID('calc-display');
    }
}

userInterface = new UserInterface;
userInterface.trackInputButtons();