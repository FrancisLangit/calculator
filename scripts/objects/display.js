export default class Display {
    /**Represents display window of calculator.*/
    constructor(main) {
        this.main = main;
        this.div = document.getElementsByClassName('calc-display')[0]; 
    }

    reset() {
        /**Resets div textContent as well as its font-size and 
         * margin-top CSS attributes to default values.*/
        this.div.textContent = "0";
        this.div.style.fontSize = "75px";
        this.div.style.marginTop = "100px";
    }

    formatNumber() {
        /**Formats number in div to exponential notation if and when its
         * length goes above 11 characters.*/
        const currentNum = this.div.textContent;
        if (currentNum.length >= 11) {
            const newNum = Number.parseFloat(currentNum).toExponential(3)
            this.div.textContent = newNum;
        }
    }

    formatDiv() {
        /**Makes font size of display window div smaller when its text content
         * gets too large. Also adjusts top margin of such accordingly.*/
        this.formatNumber();

        const styles = getComputedStyle(this.div);
        const fontSize = parseFloat(styles.getPropertyValue('font-size'));
        const marginTop = parseFloat(styles.getPropertyValue('margin-top'));

        if (this.div.clientWidth > 335) {
            this.div.style.fontSize = fontSize - 7.5 * 3;
            this.div.style.marginTop = marginTop + 9 * 3;
        } 
    }
}