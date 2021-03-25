import Calculator from "./calculator.js";

import ColorButtons from "./objects/colorButtons.js";
import DeletionButtons from "./objects/deletionButtons.js";
import Display from "./objects/display.js";
import KeyboardSupport from "./objects/keyboardSupport.js";


class Main {
    constructor() {
        // this.display = document.querySelectorAll('.calc-display')[0];

        this.calculator = new Calculator;
        this.colorButtons = new ColorButtons;
        this.display = new Display(this);
        this.deletionButtons = new DeletionButtons(this);

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

    canAppendNum(inputChar) {
        /**Checks if logic of appendNum() should be run. Returns false if:
         * - User tries to input multiple decimal points. 
         * - textContent of display already at 16 characters,
         * - textContent of display equal to 'Infinity'.*/
        const displayText = this.display.div.textContent;

        const isMultiDecimal = (
            inputChar === '.' && displayText.split(".").length >= 2);
        const isOverMaxChars = (displayText.length > 16);
        const isInfinity = (displayText === 'Infinity');

        return (!isMultiDecimal && !isOverMaxChars && !isInfinity);
    }

    appendNum(inputChar) {
        /**Appends digit or decimal inputted by user to current number in 
         * display window. Only does so if canAppendNum === true.*/
        if (this.canAppendNum(inputChar)) {
            let newNum = this.display.div.textContent + inputChar;
            if (newNum[0] === '0' && newNum.length >= 2) {
                newNum = newNum.replace(/^0/, '');
            }
            this.display.div.textContent = newNum;
            this.display.formatDiv();
        }
    }

    setUpInputButtons() {
        /**Adds event listeners to .calc-input-btn divs. Makes them add
         * their text content to .calc-display div when clicked. Also clears
         * display window before first digit of second number is inputted.*/
        const inputButtons = document.querySelectorAll('.calc-input-btn');
        for (let i = 0; i < inputButtons.length; i++) {
            inputButtons[i].addEventListener('click', () => {
                if (this.waitingForSecondNum) {
                    this.display.div.textContent = '';
                    this.waitingForSecondNum = false;
                }
                this.appendNum(inputButtons[i].textContent);
            });
        }
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
        this.keyboardSupport.setUp();
        
        this.setUpPercentButton();
        this.setUpInputButtons();
        this.setUpOperatorButtons();
        this.setUpEqualsButton();
    }
}

const main = new Main;
main.setUp();