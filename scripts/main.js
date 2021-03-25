import Calculator from "./calculator.js";

import Display from "./objects/display.js";
import KeyboardSupport from "./objects/keyboardSupport.js";

import ColorButtons from "./objects/colorButtons.js";
import DeletionButtons from "./objects/deletionButtons.js";
import EqualsButton from "./objects/equalsButton.js";
import InputButtons from "./objects/inputButtons.js";
import OperatorButtons from "./objects/operatorButtons.js";
import PercentButton from "./objects/percentButton.js";


class Main {
    constructor() {
        this.operator = '';
        this.firstNum = '';
        this.waitingForSecondNum = false;

        this.calculator = new Calculator;

        this.display = new Display(this);
        this.keyboardSupport = new KeyboardSupport;

        this.colorButtons = new ColorButtons;
        this.deletionButtons = new DeletionButtons(this);
        this.equalsButton = new EqualsButton(this);
        this.inputButtons = new InputButtons(this);
        this.operatorButtons = new OperatorButtons(this);
        this.percentButton = new PercentButton(this);
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

    setUp() {
        /**Calls methods in class associated with setting up user interface.*/
        this.colorButtons.setUp();
        this.deletionButtons.setUp();
        this.equalsButton.setUp();
        this.inputButtons.setUp()
        this.operatorButtons.setUp();
        this.percentButton.setUp();

        this.keyboardSupport.setUp();
    }
}

const main = new Main;
main.setUp();