export default class InputButtons {
    constructor(main) {
        this.display = main.display;
        this.waitingForSecondNum = main.waitingForSecondNum;
    }

    canAppendNum(inputChar) {
        /**Checks if logic of appendNum() should be run. Returns false if:
         * >> User tries to input multiple decimal points. 
         * >> textContent of display already at 16 characters,
         * >> textContent of display equal to 'Infinity'.*/
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

    setUp() {
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
}