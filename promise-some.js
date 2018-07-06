const promiseSome = promises => (
  new Promise((resolve, reject) => {
    const result = [];
    let numberOfFulfilled = 0;

    const addValue = (value, index, resolved) => {
      result[index] = { value, resolved };
      numberOfFulfilled += 1;
    };

    const fulfillIfLast = () => {
      if (numberOfFulfilled === promises.length) {
        const allRejected = promises.length === result.filter((r => !r.resolved)).length;
        if (allRejected) {
          reject(result);
        } else {
          resolve(result);
        }
      }
    };

    promises.forEach((promise, index) => {
      promise
        .then(((value) => {
          addValue(value, index, true);
          fulfillIfLast();
        }))
        .catch((error) => {
          addValue(error, index, false);
          fulfillIfLast();
        });
    });
  })
);

export default promiseSome;
