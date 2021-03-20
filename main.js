class Calculator {
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
        /**Returns return value of operator fed with arguments a and b.*/
        return operator(a, b);
    }
}

let calculator = new Calculator;
console.log(calculator.divide(1, 12))