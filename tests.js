QUnit.test("Test the displayCurrentInput() function.", function (assert) {
    currentInput = 3245234
    displayCurrentInput();
    assert.equal(document.getElementById('screen').value, "3245234", "We expect the value to be 3245234.");
    currentInput = -53245342523453453453453453543453425345345345346546746
    displayCurrentInput();
    assert.equal(document.getElementById('screen').value, "-53245342523453453453453453543453425345345345346546746", "We expect the result to be 53245342523453453453453453543453425345345345346546746 in exponential form");
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
    assert.deepEqual(document.getElementById('screen').value, "7", "We expect the result to be 7.");
});