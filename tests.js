QUnit.test("Test the displayCurrentInput() function.", function (assert) {
    currentInput = 3245234
    displayCurrentInput();
    assert.equal(document.getElementById("screen").value, "3245234", "We expect the value to be 3245234.");
    currentInput = -53245342
    displayCurrentInput();
    assert.equal(document.getElementById("screen").value, "-53245342", "We expect the result to be -53245342");
    currentInput = -0.9000998094375
    displayCurrentInput();
    assert.equal(document.getElementById("screen").value, "-0.9000998094375", "We expect the result to be -0.9000998094375.");
});
QUnit.test("Test the calculate() function.", function (assert) {
    allClear();
    memory = ["(", "1", "+", "2", ")", "*", "3"];
    calculate();
    assert.deepEqual(document.getElementById("screen").value, "9", "We expect the result to be 9.");
    memory = ["(", "1", "+", "2", ")", "/", "(", "1", "+", "2", ")"];
    calculate();
    assert.deepEqual(document.getElementById("screen").value, "1", "We expect the result to be 1.");
});
QUnit.test("Test the evaluate() function.", function (assert) {
    assert.deepEqual(evaluate(["1", "+", "2", "-", "3"]), [0], "We expect the result to be [0].");
    assert.deepEqual(evaluate(["1", "+", "2", "*", "3"]), [7], "We expect the result to be [7].");
    assert.deepEqual(evaluate(["5", "/", "2", "-", "1"]), [1.5], "We expect the result to be [1.5].");
});
QUnit.test("Test the percentage function", function (assert) {
    currentInput = 23;
    percentage();
    assert.equal(document.getElementById("screen").value, "0.23", "We expect the value to be 0.23");
    currentInput = 450;
    percentage();
    assert.equal(document.getElementById("screen").value, "4.5", "We expect the value to be 4.5");

});
QUnit.test("Test the getDeepestParenthesesPair() function.", function(assert) {
    assert.deepEqual(getDeepestParenthesesPair("()()"), [0, 1], "We expect the result to be [0, 1].");
    assert.deepEqual(getDeepestParenthesesPair("(()(()))"), [4, 5], "We expect the result to be [4, 5].");
    assert.deepEqual(getDeepestParenthesesPair("There be no parentheses."), -1, "We expect the result to be -1.");
});
QUnit.test("Test the factorial function", function (assert) {
    currentInput = 72;
    factorial();
    assert.equal(document.getElementById("screen").value, "6.123445837688612e+103", "We expect the value 6.123445837688612e+103");
    currentInput = 6;
    factorial();
    assert.equal(document.getElementById("screen").value, "720", "We expect the value 720");
});
QUnit.test("Test the replaceOperator() function", function (assert) {
    assert.deepEqual(replaceOperator(["1", "+", "2"], 1, 3), [3], "We expect the value [3].");
});
QUnit.test("Test the square function", function (assert) {
    currentInput = 8;
    square();
    assert.equal(document.getElementById("screen").value, "64", "We expect the value 8")
 currentInput = -8;
    square();
    assert.equal(document.getElementById("screen").value, "64", "We expect the value NaN");
});
QUnit.test("Test the squareRoot function", function (assert) {
    currentInput = 64;
    squareRoot();
    assert.equal(document.getElementById("screen").value, "8", "We expect the value 8")
 currentInput = -64;
    squareRoot();
    assert.equal(document.getElementById("screen").value, "NaN", "We expect the value NaN");
});
QUnit.test("Test the inverse function", function (assert) {
    currentInput = 64;
    inverse();
    assert.equal(document.getElementById("screen").value, "0.015625", "We expect the value 8")
 currentInput = -100897908790874;
    inverse();
    assert.equal(document.getElementById("screen").value, "-9.911008186231585e-15", "We expect the value -9.911008186231585e-15");
});
QUnit.test("Test the addDigit() function.", function (assert) {
    allClear();
    addDigit("1");
    addDigit("2");
    addDigit("3");
    assert.equal(currentInput, "123", "We expect the value to be 123.");
});
QUnit.test("Test the addDecimal() function.", function (assert) {
    allClear();
    addDigit("1");
    addDecimal();
    addDigit("2");
    addDigit("3");
    addDecimal();
    assert.equal(currentInput, "1.23", "We expect the value to be 1.23.");

    allClear();
    addDecimal();
    addDigit("1");
    addDigit("2");
    addDecimal();
    assert.equal(currentInput, "0.12", "We expect the value to be 0.12.");
});
QUnit.test("Test the addOperator() function.", function (assert) {
    allClear();
    addDigit("1");
    addOperator("+");
    addDigit("2")
    addOperator("/")
    assert.deepEqual(memory, ["1", "+", "2", "/"], "We expect the value to be [1, +, 2, /].");

    allClear();
    addOperator("-");
    addDigit("2")
    addOperator("*")
    assert.deepEqual(memory, ["-", "2", "*"], "We expect the value to be [-, 2, *].");
});
QUnit.test("Test the allClear() function.", function (assert) {
    addDigit("1");
    addOperator("+");
    addDigit("2");
    addOperator("-");
    allClear();
    assert.equal(currentInput, "", "We expect the value to be ' '.");
    assert.deepEqual(memory, [], "We expect the value to be [].")
});
QUnit.test("Test the clearCurrent() function.", function (assert) {
    addDigit("1");
    addDigit("2");
    clearCurrent();
    assert.equal(currentInput, "", "We expect the value to be ' '.");
});
QUnit.test("Test the changeSign() function.", function (assert) {
    addDigit("1");
    changeSign();
    assert.equal(currentInput, "-1", "We expect the value to be -1.");
    changeSign();
    assert.equal(currentInput, "1", "We expect the value to be 1.");
});
QUnit.test("Test the readUserMemory function", function (assert) {
    userMemory = 64;
    readUserMemory();
    assert.equal(document.getElementById('screen').value, '64', 'We expect the value 64');
 userMemory = -100897908790874;
    readUserMemory();
    assert.equal(document.getElementById('screen').value, '-100897908790874', 'We expect the value -100897908790874');

});
QUnit.test("Test the addToUserMemory function", function (assert) {
    currentInput = 64;
	userMemory = 1;
    addToUserMemory();
    assert.equal(userMemory, '65', 'We expect the value 64');
	currentInput = 55;
	userMemory = -55;
    addToUserMemory();
    assert.equal(userMemory, '0', 'We expect the value 0');

});
QUnit.test("Test the subtractFromUserMemory function", function (assert) {
    currentInput = 64;
	userMemory = 1;
    subtractFromUserMemory();
    assert.equal(userMemory, '-63', 'We expect the value -63');
	currentInput = 55;
	userMemory = -55;
    subtractFromUserMemory();
    assert.equal(userMemory, '-110', 'We expect the value -110');

});
QUnit.test("Test the clearUserMemory function", function (assert) {
	userMemory = 1;
    clearUserMemory();
    assert.equal(userMemory, '0', 'We expect the value 0');
	userMemory = -55;
    clearUserMemory();
    assert.equal(userMemory, '0', 'We expect the value 0');

});
QUnit.test("Test the toggleAngleMode function", function (assert) {
    angleMode = 2;
    toggleAngleMode();
    assert.equal(angleMode, '1', 'We expect the value 1');
 angleMode = 1;
    toggleAngleMode();
    assert.equal(angleMode, '2', 'We expect the value 2');
});
QUnit.test("Test the pi function", function (assert) {
	currentInput = 0;
	pi();
	assert.equal(document.getElementById('screen').value, '3.141592653589793', 'We expect the value 3.141592653589793');

});

QUnit.test("Test the sin function", function (assert) {
    angleMode = 2
	currentInput = 30;
    sin();
    assert.equal(document.getElementById('screen').value, '0.5', 'We expect the value .5');
	angleMode = 1
	currentInput = (Math.PI/6);
    sin();
    assert.equal(document.getElementById('screen').value, '0.5', 'We expect the value .5');
});
QUnit.test("Test the cos function", function (assert) {
    angleMode = 2
	currentInput = 60;
    cos();
    assert.equal(document.getElementById('screen').value, '0.5', 'We expect the value .5');
	angleMode = 1
	currentInput = (Math.PI/3);
    cos();
    assert.equal(document.getElementById('screen').value, '0.5', 'We expect the value .5');
});
QUnit.test("Test the tan function", function (assert) {
    angleMode = 2
	currentInput = 0;
    tan();
    assert.equal(document.getElementById('screen').value, '0', 'We expect the value 0');
	angleMode = 1
	currentInput = 0;
    tan();
    assert.equal(document.getElementById('screen').value, '0', 'We expect the value 0');
});

QUnit.test("Test the rnd function", function (assert) {
	currentInput = .9999999999999999999999;
    rnd();
    assert.equal(currentInput, '1', 'We expect the value 1');
	currentInput = 1.499999999999999999999999999999999999;
    rnd();
    assert.equal(currentInput, '1.5', 'We expect the value 1.5');
});
