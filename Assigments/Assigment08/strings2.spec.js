var assert = require('assert');
var strings = require('./strings2');

describe('Strings', function () {
  describe('#lengthOfLastWord', function () {
    it('should return 5 when given "Hello World"', function () {
      assert.equal(5, strings.lengthOfLastWord('Hello World'));
    });

    it('should return 5 when given "Hello World   "', function () {
      assert.equal(5, strings.lengthOfLastWord('Hello World   '));
    });

    it('should return 0 when given an empty string', function () {
      assert.equal(0, strings.lengthOfLastWord(''));
    });
  });
});
