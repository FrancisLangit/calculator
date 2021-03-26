export default class PercentButton {
    /**Represents percent button on calculator.*/
    
    constructor(main) {
        this.display = main.display;
    }

    convertDisplay() {
        /**Takes current display window number as a percentage and converts 
         * such into a decimal. */
        const oldNum = parseFloat(this.display.div.textContent);
        const newNum = oldNum / 100;
        this.display.div.textContent = newNum;
        this.display.formatDiv();
    }

    setUp() {
        /**Adds event listener to .calc-percent-btn div. When clicked, calls
         * converDisplay().*/
        const percentButton = document.getElementsByClassName(
            'calc-percent-btn')[0];
        percentButton.addEventListener('click', () => this.convertDisplay());
    }
}