export default class EqualsButton {
    /**Represents equals button on calculator.*/
    constructor(main) {
        this.main = main;
    }

    equate() {
        /**Calls main.displayResult() if first number already inputted. Also 
         * resets main.firstNum. */
        if (this.main.firstNum !== '') {
            this.main.displayResult();
        }
        this.main.firstNum = '';
    }

    setUp() {
        /**Adds event listener to .calc-equals-btn div.*/
        const equalsButton = document.getElementsByClassName(
            "calc-equals-btn")[0];
        equalsButton.addEventListener('click', () => this.equate());
    }
}