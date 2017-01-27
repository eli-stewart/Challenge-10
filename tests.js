QUnit.test("Test the displayCurrentInput function.", function (assert) {
    var currentInput = 3245234

    var result = displayCurrentInput(currentInput);
    assert.equal(document.getElementById('screen').value, " 3245234");

    var currentInput = 546

    var result = displayCurrentInput(currentInput);
    assert.equal(document.getElementById('screen').value, " 546");

    var currentInput = -.90009980943750987

    var result = displayCurrentInput(currentInput);
    assert.equal(document.getElementById('screen').value, " -.90009980943750987");
});
