export default class OperatorButtons {
    /**Represents /, *, -, and + buttons on calculator.*/

    constructor(main) {
        this.main = main
    }

    operate(operatorButton) {
        /**Calls main.displayResult() if main.firstNum already inputted and 
         * prepares user interface to anticipate main.secondNum. */
        if (this.main.firstNum !== '') {
            this.main.displayResult();
        }
        this.main.operator = operatorButton.textContent;
        this.main.firstNum = this.main.display.div.textContent;
        this.main.waitingForSecondNum = true;
    }

    setUp() {
        /**Adds click event listeners to all divs with class 
         * .calc-operator-btn.*/
        const operatorButtons = document.querySelectorAll(
            '.calc-operator-btn');
        for (let i = 0; i < operatorButtons.length; i++) {
            operatorButtons[i].addEventListener('click', () => {
                this.operate(operatorButtons[i]);
            });
        }
    }
}