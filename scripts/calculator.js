export default class Calculator {
    add(a, b) {
        /**Returns sum of a and b.*/
        return a + b;
    }
    
    subtract(a, b) {
        /**Returns difference of a and b.*/
        return a - b;
    }
    
    multiply(a, b) {
        /**Returns product of a and b.*/
        return a * b;
    }
    
    divide(a, b) {
        /**Returns quotient of a and b.*/
        return a / b;
    }

    operate(operator, a, b) {
        /**Returns value after operating on a and b dependent on operator.*/
        let result;
        switch(operator) {
            case '+':
                result = this.add(a, b);
                break;
            case '-':
                result = this.subtract(a, b);
                break;
            case '*':
                result = this.multiply(a, b);
                break;
            case '/':
                result = this.divide(a, b);
                break;
        }
        return result;
    }
}