export default class DeletionButtons {
    /**Represents AC (All-clear) and C (Clear) buttons, both of which are 
     * used to delete characters from the calculator's display window.*/
    
    constructor(main) {
        this.main = main;
        this.display = main.display;
    }

    setUpAllClearButton() {
        /**Adds event listener to .calc-ac-btn div. When such is clicked it
         * empties the calculator's display window and resets this.operator,
         * this.firstNum and this.waitingForSecondNum to default values.*/
        const allClearButton = document.getElementsByClassName(
            'calc-ac-btn')[0];
        allClearButton.addEventListener('click', () => {
            this.display.reset();
            this.main.operator = '';
            this.main.firstNum = '';
            this.main.waitingForSecondNum = false;
        });
    }

    setUpClearButton() {
        /**Adds event listener to .calc-c-btn div. If clicked it removes
         * one character from calculator's display window if such not just
         * displaying 0. */
        const clearButton = document.getElementsByClassName('calc-c-btn')[0];
        clearButton.addEventListener('click', () => {
            if (this.display.div.textContent.length <= 1) {
                this.display.reset();
            } else if (this.display.div.textContent !== '0') {
                const oldNum = this.display.div.textContent;
                const newNum = oldNum.substring(0, oldNum.length - 1);
                this.display.div.textContent = newNum;
            }
        });
    }

    setUp() {
        /**Sets up both the  All-clear and Clear buttons of the user 
         * interface.*/
        this.setUpAllClearButton();
        this.setUpClearButton();
    }
}