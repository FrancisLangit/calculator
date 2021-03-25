export default class KeyboardSupport {
    /**Represents keyboard support given to keys that can be used to simulate
     * clicking on buttons in the device.*/

    setUpClearButtons(e) {
        /**Adds keyboard support for clear buttons AC and C.*/
        if (e.key === "Delete") {
            document.getElementsByClassName("calc-ac-btn")[0].click();
        } else if (e.key === "Backspace") {
            document.getElementsByClassName("calc-c-btn")[0].click();
        }
    }

    setUp() {
        /**Adds keydown event listeners to body. If key pressed equal to text
         * content of button, simulate such button being clicked. */
        document.body.addEventListener('keydown', (e) => {
            const buttons = document.querySelectorAll('div.calc > div');
            for (let i = 0; i < buttons.length; i++) {
                if (e.key === buttons[i].textContent) {
                    buttons[i].click();
                }
            }
            this.setUpClearButtons(e);
        });
    }
}