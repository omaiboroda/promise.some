"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var promiseSome = function promiseSome(promises) {
  return new Promise(function (resolve, reject) {
    var result = [];
    var numberOfFulfilled = 0;

    var addValue = function addValue(value, index, resolved) {
      result[index] = { value: value, resolved: resolved };
      numberOfFulfilled += 1;
    };

    var fulfillIfLast = function fulfillIfLast() {
      if (numberOfFulfilled === promises.length) {
        var allRejected = promises.length === result.filter(function (r) {
          return !r.resolved;
        }).length;
        if (allRejected) {
          reject(result);
        } else {
          resolve(result);
        }
      }
    };

    promises.forEach(function (promise, index) {
      promise.then(function (value) {
        addValue(value, index, true);
        fulfillIfLast();
      }).catch(function (error) {
        addValue(error, index, false);
        fulfillIfLast();
      });
    });
  });
};

exports.default = promiseSome;
