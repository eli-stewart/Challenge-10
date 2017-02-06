// Global Variables
var currentInput = '';
var memory = [];
var userMemory = 0;
var angleMode = 1;
/**
 * Writes the current input to the calculator display.
 */
function displayCurrentInput() {
    if (currentInput >= Math.pow(10, 16) || currentInput <= Math.pow(10, -16) && currentInput > 0) {
        document.getElementById('screen').value = currentInput.toExponential();
    }
    else {
        document.getElementById('screen').value = currentInput;
    }
}
/**
 * Adds the selected digit to the current input.
 * @param {string} dig The selected digit.
 */
function addDigit(dig) {
    if ((parseInt(currentInput) == 0) && (currentInput.indexOf('.') == -1)) {
        currentInput = dig;
    }
    else if (currentInput.length < 30) {
        currentInput = currentInput + dig;
    }
    displayCurrentInput();
}
/**
 * Adds a decimal to the current input.
 */
function addDecimal() {
    if (currentInput.length == 0) {
        currentInput = '0.';
    }
    else {
        if (currentInput.indexOf('.') == -1) {
            currentInput = currentInput + '.';
        }
    }
    displayCurrentInput();
}
/**
 * Pushes the selected operator to memory.
 * @param {string} op The selected operator.
 */
function addOperator(op) {
    if (currentInput != '') {
        memory.push(currentInput);
    }
    memory.push(op);
    currentInput = '';
    displayCurrentInput();
}
/**
 * Flushes all calculator memory.
 */
function allClear() {
    currentInput = '';
    memory.length = 0;
    displayCurrentInput();
}
/**
 * Flushes only the current input.
 */
function clearCurrent() {
    currentInput = '';
    displayCurrentInput();
}
/**
 * Parses and evaluates the calculator memory.
 */
function calculate() {
    // Push trailing input not added by operator pushing.
    if (currentInput != '') {
        memory.push(currentInput);
    }
    console.log('Memory: ' + memory);
    // Memory contains parentheses.
    while (memory.indexOf('(') != -1 && memory.indexOf(')') != -1) {
        var parenthesesPositions = getDeepestParenthesesPair(memory);
        console.log('Parentheses found: ' + parenthesesPositions);
        result = evaluate(memory.slice(parenthesesPositions[0] + 1, parenthesesPositions[1]));
        memory = memory.slice(0, parenthesesPositions[0]).concat(result).concat(memory.slice(parenthesesPositions[1] + 1));
        console.log('Memory: ' + memory);
    }
    // Memory (now) contains no parentheses. Evaluate normally.
    memory = evaluate(memory);
    console.log('Memory: ' + memory);
    // Set current input to evaluated memory and display.
    if (memory[0] == Infinity) {
        currentInput = 'ERROR: Divide by zero or out of memory.';
    }
    else {
        currentInput = memory[0];
    }
    displayCurrentInput();
    // Wipe memory.
    memory.length = 0;
}
/**
 * Evaluate a piece of memory that contains basic operators and no parentheses. Whee!
 */
function evaluate(memory) {
    // Exponent
    while (memory.indexOf('^') > -1) {
        var index = memory.indexOf('^');
        var result = Math.pow(Number.parseFloat(memory[index - 1]), Number.parseFloat(memory[index + 1]));
        console.log('Performing operation: ' + memory[index - 1] + ' ' + memory[index] + ' ' + memory[index + 1]);
        memory = replaceOperator(memory, index, result);
    }
    // Base 10 Exponent
    while (memory.indexOf('EE') > -1) {
        var index = memory.indexOf('EE');
        var result = Number.parseFloat(memory[index - 1]) * Math.pow(10, Number.parseFloat(memory[index + 1]));
        console.log('Performing operation: ' + memory[index - 1] + ' ' + memory[index] + ' ' + memory[index + 1]);
        memory = replaceOperator(memory, index, result);
    }
    // Multiply
    while (memory.indexOf('*') > -1) {
        var index = memory.indexOf('*');
        var result = Number.parseFloat(memory[index - 1]) * Number.parseFloat(memory[index + 1]);
        console.log('Performing operation: ' + memory[index - 1] + ' ' + memory[index] + ' ' + memory[index + 1]);
        memory = replaceOperator(memory, index, result);
    }
    //Divide
    while (memory.indexOf('/') > -1) {
        var index = memory.indexOf('/');
        var result = Number.parseFloat(memory[index - 1]) / Number.parseFloat(memory[index + 1]);
        console.log('Performing operation: ' + memory[index - 1] + ' ' + memory[index] + ' ' + memory[index + 1]);
        memory = replaceOperator(memory, index, result);
    }
    // Add
    while (memory.indexOf('+') > -1) {
        var index = memory.indexOf('+');
        var result = Number.parseFloat(memory[index - 1]) + Number.parseFloat(memory[index + 1]);
        console.log('Performing operation: ' + memory[index - 1] + ' ' + memory[index] + ' ' + memory[index + 1]);
        memory = replaceOperator(memory, index, result);
    }
    // Subtract
    while (memory.indexOf('-') > -1) {
        var index = memory.indexOf('-');
        var result = Number.parseFloat(memory[index - 1]) - Number.parseFloat(memory[index + 1]);
        console.log('Performing operation: ' + memory[index - 1] + ' ' + memory[index] + ' ' + memory[index + 1]);
        memory = replaceOperator(memory, index, result);
    }
    return memory;
}
/**
 * Locate the position of the deepest set of parentheses for evaluation.
 * @param {Array} memory The chunk of memory to be evaluated.
 * @return {Array} The indexes of the deepest set of parentheses.
 */
function getDeepestParenthesesPair(memory) {
    if (memory.indexOf('(') > -1) {
        // Get position of open parentheses.
        var currentDepth = 0;
        var maxDepth = 0;
        var positions = [];
        for (var i = 0; i < memory.length; i++) {
            if (memory[i] == '(') {
                currentDepth++;
                if (currentDepth > maxDepth) {
                    maxDepth = currentDepth;
                    positions[0] = i;
                    console.log('Found ( at: ' + i);
                }
            }
            else if (memory[i] == ')') {
                currentDepth--;
            }
        }
        // Get position of closed parenthesis.
        for (var i = positions[0]; i < memory.length; i++) {
            if (memory[i] == ')') {
                positions[1] = i;
                console.log('Found ) at: ' + i);
                return positions;
            }
        }
    }
    else {
        // No parentheses found in memory. This should never be returned. In theory.
        return -1;
    }
}
/**
 * Replace the operator and surrounding elements in memory with evaluated portion.
 * @param {Array} memory The chunk of memory to be evaluated.
 * @param {number} index The index of the operator.
 * @return {Array} A chunk of memory containing the new evaluated portion.
 */
function replaceOperator(memory, index, result) {
    memory = memory.slice(0, index - 1).concat(result).concat(memory.slice(index + 2));
    return memory;
}
/**
 * Change the sign of the current input.
 */
function changeSign() {
    // Updated version.
    if (currentInput.charAt(0) == '-') {
        currentInput = currentInput.slice(1);
    }
    else {
        currentInput = '-'.concat(currentInput);
    }
    displayCurrentInput();
    // Code below causes strange type errors. Eg. '3' * -1 -> -3
    //currentInput = currentInput * -1;
}
/**
 * Convert the current input to a percentage.
 */
function percentage() {
    currentInput = currentInput / 100;
    displayCurrentInput();
}
/**
 * Calculate the factorial of the current input.
 */
function factorial() {
    for (var i = currentInput - 1; i > 0; i--) {
        currentInput *= i;
    }
    displayCurrentInput();
}
/**
 * Calculate the square of the current input.
 */
function square() {
    currentInput = Math.pow(currentInput, 2);
    displayCurrentInput();
}
/**
 * Calculate the square root of the current input.
 */
function squareRoot() {
    currentInput = Math.sqrt(currentInput);
    displayCurrentInput();
}
/**
 * Calcluate the inverse of the current input.
 */
function inverse() {
    currentInput = 1 / currentInput;
    displayCurrentInput();
}
/**
 * Add the current input to the user memory.
 */
function addToUserMemory() {
    userMemory = userMemory + Number.parseInt(currentInput);
}
/**
 * Subtract the current input from the user memory.
 */
function subtractFromUserMemory() {
    userMemory = userMemory - Number.parseInt(currentInput);
}
/**
 * Change the sign of the current input.
 */
function clearUserMemory() {
    userMemory = 0;
}
/**
 * Set the current input to the user memory.
 */
function readUserMemory() {
    currentInput = '' + userMemory;
    displayCurrentInput();
}
/**
 * Allows the angle button to toggle between radians and degrees
 */
function toggleAngleMode() {
    if (angleMode == 2) {
        angleMode = 1;
        $('#angle-mode-button').text('Rad');
    }
    else if (angleMode == 1) {
        angleMode = 2;
        $('#angle-mode-button').text('Deg');
    }
}
/**
 * sets CurrentInput to pi
 */
function pi() {
    currentInput = Math.PI;
    displayCurrentInput();
}
/**
 * Finds the sine of a number in radians or degrees depending on the setting of the calulator
 */
function sin() {
    if (angleMode == 2) {
        currentInput = Math.sin((currentInput * Math.PI) / 180);
    }
    else {
        currentInput = Math.sin(currentInput);
    }
 currentInput = rnd(currentInput);
    displayCurrentInput();
}
/**
 * Finds the cosine of a number in radians or degrees depending on the setting of the calulator
 */
function cos() {
    if (angleMode == 2) {
        currentInput = Math.cos((currentInput * Math.PI) / 180);
    }
    else {
        currentInput = Math.cos(currentInput);
    }
    currentInput = rnd(currentInput);
    displayCurrentInput();
}
/**
 * Finds the tangent of a number in radians or degrees depending on the setting of the calulator
 */
function tan() {
    if (angleMode == 2) {
        currentInput = Math.tan((currentInput * Math.PI) / 180);
    }
    else {
        currentInput = Math.tan(currentInput);
    }
    currentInput = rnd(currentInput);
    displayCurrentInput();
}
/**
 * Checks if the difference between currentInput and the closest integer is less than 0.00000000001
 * If it is, it rounds the currentInput to that integer
 */
function rnd() {
    if ((Math.abs(((Math.round(2*currentInput))/2) - currentInput)) < 0.00000000001) {
        return (Math.round(2*currentInput)/2);
    }
    else {
        return currentInput;
    }
}
