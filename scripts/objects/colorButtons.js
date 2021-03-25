export default class ColorButtons {
    /**Represents color buttons found right above the iPhone used to change 
     * the device's color scheme.*/

    removeCurrentDeviceColor(device) {
        /**Removes the current color class of device.*/
        const availableDeviceColors = ['black', 'silver', 'gold'];
        for (let i = 0; i < device.classList.length; i++) {
            if (availableDeviceColors.includes(device.classList[i])) {
                device.classList.remove(device.classList[i]);
            }
        }
    }

    changeDeviceColor(colorButton) {
        /**Changes color of iPhone dependent on colorButton argument.*/
        const newColor = colorButton.getAttribute('name');
        const device = document.getElementsByClassName('marvel-device')[0];
        this.removeCurrentDeviceColor(device);
        device.classList.add(newColor);
    }

    setUp() {
        /**Adds event listeners to color buttons. Makes them change color of 
         * iPhone if and when they are clicked.*/
        const colorButtons = document.querySelectorAll('.color-btns > div');
        for (let i = 0; i < colorButtons.length; i++) {
            colorButtons[i].addEventListener('click', () => {
                this.changeDeviceColor(colorButtons[i]);
            });
        }
    }
}