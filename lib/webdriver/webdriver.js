
module.exports = new function() {

  var webdriver = require("selenium-webdriver");

  webdriver.WebDriver.prototype.waitJqueryReady = function() {
    var self = this;

    return self.flow_.execute(function() {
      self.executeScript("return typeof jQuery != String(undefined) ? (!jQuery.active === jQuery.isReady) : null;").then(function(isReady) {
        switch (isReady) {
          case true:
            return true
            break;

          case false:
            self.waitJqueryReady();
            break;

          case null:
            self.controlFlow().timeout(30*1000)
            break;
        }
      })
    }, "WebDriver.waitJqueryReady()");

  }

  return webdriver;
}
