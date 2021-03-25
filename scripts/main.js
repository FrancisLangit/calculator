import Calculator from "./calculator.js";

import ColorButtons from "./objects/colorButtons.js";
import KeyboardSupport from "./objects/keyboardSupport.js";

class Main {
    constructor() {
        this.calculator = new Calculator;

        this.colorButtons = new ColorButtons;
        this.keyboardSupport = new KeyboardSupport;
        this.calcDisplay = document.getElementsByClassName('calc-display')[0];
        
        this.operator = '';
        this.firstNum = '';
        this.waitingForSecondNum = false;
    }

    resetCalcDisplay() {
        /**Resets calcDisplay text content as well as its font-size and 
         * margin-top CSS attributes to default values.*/
        this.calcDisplay.textContent = "0";
        this.calcDisplay.style.fontSize = "75px";
        this.calcDisplay.style.marginTop = "100px";
    }

    setUpAllClearButton() {
        /**Adds event listener to .calc-ac-btn div. When such is clicked it
         * empties the calculator's display window and resets this.operator,
         * this.firstNum and this.waitingForSecondNum to default values.*/
        const allClearButton = document.getElementsByClassName(
            'calc-ac-btn')[0];
        allClearButton.addEventListener('click', () => {
            this.resetCalcDisplay();
            this.operator = '';
            this.firstNum = '';
            this.waitingForSecondNum = false;
        });
    }

    setUpClearButton() {
        /**Adds event listener to .calc-c-btn div. If clicked it removes
         * one character from calculator's display window if such not just
         * displaying 0. */
        const clearButton = document.getElementsByClassName('calc-c-btn')[0];
        clearButton.addEventListener('click', () => {
            if (this.calcDisplay.textContent.length <= 1) {
                this.resetCalcDisplay();
            } else if (this.calcDisplay.textContent !== '0') {
                const oldNum = this.calcDisplay.textContent;
                const newNum = oldNum.substring(0, oldNum.length - 1);
                this.calcDisplay.textContent = newNum;
            }
        });
    }

    setUpPercentButton() {
        /**Adds event listener to .calc-percent-btn div. When clicked, it
         * it takes the number in the display window as a percentage and
         * converts such into a decimal.*/
        const percentButton = document.getElementsByClassName(
            'calc-percent-btn')[0];
        percentButton.addEventListener('click', ()  => {
            const oldNum = parseFloat(this.calcDisplay.textContent);
            const newNum = oldNum / 100;
            this.calcDisplay.textContent = newNum;
        });
    }

    formatDisplayNumber() {
        /**Formats display number to exponential notation if and when its 
         * length goes above 10 characters.*/
        const calcDisplayText = this.calcDisplay.textContent;
        if (calcDisplayText.length >= 10) {
            let newNum = Number.parseFloat(calcDisplayText).toExponential(3);
            this.calcDisplay.textContent = newNum;
        }
    }

    formatDisplayWindow() {
        /**Makes font size of display window div smaller when its text content
         * gets too large. Also adjusts top margin of such accordingly.*/
        this.formatDisplayNumber();

        const calcDisplayStyles = getComputedStyle(this.calcDisplay);
        const calcDisplayFontSize = parseFloat(
            calcDisplayStyles.getPropertyValue('font-size'));
        const calcDisplayMarginTop = parseFloat(
            calcDisplayStyles.getPropertyValue('margin-top'));

        if (this.calcDisplay.clientWidth > 335) {
            this.calcDisplay.style.fontSize = calcDisplayFontSize - 7.5 * 2;
            this.calcDisplay.style.marginTop = calcDisplayMarginTop + 9 * 2;
        } 
    }

    canAppendNum(inputChar) {
        /**Checks if logic of appendNum() should be run. Returns false if:
         * - User tries to input multiple decimal points. 
         * - textContent of display already at 16 characters,
         * - textContent of display equal to 'Infinity'.*/
        const calcDisplayText = this.calcDisplay.textContent;

        const isMultiDecimal = (
            inputChar === '.' && calcDisplayText.split(".").length >= 2);
        const isOverMaxChars = (calcDisplayText.length > 16);
        const isInfinity = (calcDisplayText === 'Infinity');

        return (!isMultiDecimal && !isOverMaxChars && !isInfinity);
    }

    appendNum(inputChar) {
        /**Appends digit or decimal inputted by user to current number in 
         * display window. Only does so if canAppendNum === true.*/
        if (this.canAppendNum(inputChar)) {
            let newNum = this.calcDisplay.textContent + inputChar;
            if (newNum[0] === '0' && newNum.length >= 2) {
                newNum = newNum.replace(/^0/, '');
            }
            this.calcDisplay.textContent = newNum;
            this.formatDisplayWindow();
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
                    this.calcDisplay.textContent = '';
                    this.waitingForSecondNum = false;
                }
                this.appendNum(inputButtons[i].textContent);
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
        this.formatDisplayWindow();
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
        this.keyboardSupport.setUp();
        
        this.setUpAllClearButton();
        this.setUpClearButton();
        this.setUpPercentButton();
        this.setUpInputButtons();
        this.setUpOperatorButtons();
        this.setUpEqualsButton();
    }
}

const main = new Main;
main.setUp();