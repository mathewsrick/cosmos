var expect = require('chai').expect;
var cosmos = require('../index.js');
suite('Currency test', function () {
  test('Currency mask test', function (done) {
    expect(cosmos.currency.mask(2400000, 0, ['.', '.', ','])).to.be.equal('2.400.000');
    expect(cosmos.currency.mask("3000,84", 1, ['.', '.', ','])).to.be.equal('3.000,8');
    expect(cosmos.currency.mask("1850.32", 2, [',', ',', '.'])).to.be.equal('1,850.32');
    done();
  });
});