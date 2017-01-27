QUnit.test("Test the addTwoArrays function.", function (assert) {
    var a1 = [1, 2, 3];
    var a2 = [3, 2, 1];
    var result = addTwoArrays(a1, a2);
    assert.deepEqual(result, [4, 4, 4], "We expect result to be 4, 4, 4");
});
