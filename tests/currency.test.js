var expect = require('chai').expect;
var cosmos = require('../index.js');
suite('Currency test', function () {
  test('Currency mask test', function (done) {
    //MASK
    expect(cosmos.currency.mask(2400000, 0, ['.', '.', ','])).to.be.equal('2.400.000');
    expect(cosmos.currency.mask("3000,84", 1, ['.', '.', ','])).to.be.equal('3.000,8');
    expect(cosmos.currency.mask("1850.32", 2, [',', ',', '.'])).to.be.equal('1,850.32');
    
    //UNMASK
    expect(cosmos.currency.unmask(2400000)).to.be.equal(2400000);
    expect(cosmos.currency.unmask("3.000,84", false)).to.be.equal(3000);
    expect(cosmos.currency.unmask("1,850.32", true)).to.be.equal("1850.32");

    done();
  });
});