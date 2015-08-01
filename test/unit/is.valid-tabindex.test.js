define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/supports/focus-invalid-tabindex',
  'ally/is/valid-tabindex',
], function(registerSuite, expect, customFixture, canFocusInvalidTabindex, isValidTabindex) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/valid-tabindex',

      beforeEach: function() {
        fixture = customFixture([
          '<div id="non-tabindex"></div>',
          '<div id="tabindex--1" tabindex="-1"></div>',
          '<div id="tabindex-0" tabindex="0"></div>',
          '<div id="tabindex-1" tabindex="1"></div>',
          '<div id="tabindex-foobar" tabindex="foobar"></div>',
          '<div id="tabindex-empty" tabindex=""></div>',
        ].join(''));
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'non-tabindex': function() {
        var element = document.getElementById('non-tabindex');
        expect(isValidTabindex(element)).to.equal(true);
      },
      'tabindex "-1"': function() {
        var element = document.getElementById('tabindex--1');
        expect(isValidTabindex(element)).to.equal(true);
      },
      'tabindex "0"': function() {
        var element = document.getElementById('tabindex-0');
        expect(isValidTabindex(element)).to.equal(true);
      },
      'tabindex "1"': function() {
        var element = document.getElementById('tabindex-1');
        expect(isValidTabindex(element)).to.equal(true);
      },
      'tabindex "foobar"': function() {
        var element = document.getElementById('tabindex-foobar');
        expect(isValidTabindex(element)).to.equal(canFocusInvalidTabindex);
      },
      'tabindex ""': function() {
        var element = document.getElementById('tabindex-empty');
        expect(isValidTabindex(element)).to.equal(canFocusInvalidTabindex);
      },
    };
  });
});