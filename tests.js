QUnit.test("Test the displayCurrentInput() function.", function (assert) {
    currentInput = 3245234
    displayCurrentInput();
    assert.equal(document.getElementById("screen").value, "3245234", "We expect the value to be 3245234.");
    currentInput = -53245342
    displayCurrentInput();
    assert.equal(document.getElementById("screen").value, "-53245342", "We expect the result to be -53245342");
    currentInput = -.9000998094375
    displayCurrentInput();
    assert.equal(document.getElementById("screen").value, "-.9000998094375", "We expect the result to be -.9000998094375.");
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
    assert.deepEqual(evaluate(["1", "+", "2", "-", "3"]), [0], "We expect the result to be 0.");
    assert.deepEqual(evaluate(["1", "+", "2", "*", "3"]), [7], "We expect the result to be 7.");
    assert.deepEqual(evaluate(["5", "/", "2", "-", "1"]), [1.5], "We expect the result to be 1.5.");
});
QUnit.test("Test the percentage function", function (assert) {
    currentInput = 23
    percentage();
    assert.equal(document.getElementById("screen").value, "0.23", "We expect the value to be 0.23")
    currentInput = 450
    percentage();
    assert.equal(document.getElementById("screen").value, "4.5", "We expect the value to be 4.5")
});
