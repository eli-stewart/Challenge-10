QUnit.test("Test the displayCurrentInput() function.", function (assert) {
    currentInput = 3245234
    displayCurrentInput();
    assert.equal(document.getElementById('screen').value, "3245234", "We expect the value to be 3245234.");
    currentInput = -53245342
    displayCurrentInput();
    assert.equal(document.getElementById('screen').value, "-53245342", "We expect the result to be -53245342");
    currentInput = -.90009980943750987
    displayCurrentInput();
    assert.equal(document.getElementById('screen').value, "-.90009980943750987", "We expect the result to be -.90009980943750987.");
});
QUnit.test("Test the calculate() function.", function (assert) {
    allClear();
    memory = ['1', '+', '2', '-', '3'];
    calculate();
    assert.deepEqual(document.getElementById('screen').value, "0", "We expect the result to be 0.");
    allClear();
    memory = ['1', '+', '2', '*', '3'];
    calculate();
    assert.deepEqual(document.getElementById('screen').value, "7", "We expect the result to be 7.");
});
QUnit.test("Test the percentage function", function (assert) {
    currentInput = 23
    percentage();
    assert.equal(document.getElementById('screen').value, ".23", "We expect the value to be .23")
    currentInput = 450
    percentage();
    assert.equal(document.getElementById('screen').value, "4.5", "We expect the value to be 4.5")
});