import Calculator from "./calculator.js";

import ColorButtons from "./objects/colorButtons.js";
import DeletionButtons from "./objects/deletionButtons.js";
import Display from "./objects/display.js";
import InputButtons from "./objects/inputButtons.js";
import KeyboardSupport from "./objects/keyboardSupport.js";


class Main {
    constructor() {
        this.calculator = new Calculator;
        
        this.colorButtons = new ColorButtons;
        this.display = new Display(this);
        this.deletionButtons = new DeletionButtons(this);
        this.inputButtons = new InputButtons(this);

        this.keyboardSupport = new KeyboardSupport;

        this.operator = '';
        this.firstNum = '';
        this.waitingForSecondNum = false;
    }

    setUpPercentButton() {
        /**Adds event listener to .calc-percent-btn div. When clicked, it
         * it takes the number in the display window as a percentage and
         * converts such into a decimal.*/
        const percentButton = document.getElementsByClassName(
            'calc-percent-btn')[0];
        percentButton.addEventListener('click', ()  => {
            const oldNum = parseFloat(this.display.div.textContent);
            const newNum = oldNum / 100;
            this.display.div.textContent = newNum;
        });
    }

    displayResult() {
        /**Calculates result of user input and displays such in calculator
         * display window.*/
        this.display.div.textContent = this.calculator.operate(
            this.operator,
            parseFloat(this.firstNum),
            parseFloat(this.display.div.textContent),
        );
        this.display.formatDiv();
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
                this.firstNum = this.display.div.textContent;
                this.waitingForSecondNum = true;
            });
        }
    }

    setUpEqualsButton() {
        /**Adds event listener to .calc-equals-btn div. Calls displayResult()
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

    setUp() {
        /**Calls methods in class associated with setting up user interface.*/
        this.colorButtons.setUp();
        this.deletionButtons.setUp();
        this.inputButtons.setUp()

        this.keyboardSupport.setUp();
        
        this.setUpPercentButton();
        this.setUpOperatorButtons();
        this.setUpEqualsButton();
    }
}

const main = new Main;
main.setUp();