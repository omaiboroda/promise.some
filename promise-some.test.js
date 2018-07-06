import promiseSome from './promise-some';

const values = {
  resolvedFirst: 'Value of first promise',
  resolvedSecond: 'Value of second promise',
  rejectedFirst: 'Reason for a first rejected promise',
  rejectedSecond: 'Reason for a second rejected promise',
}

const firstResolvedPromise = Promise.resolve(values.resolvedFirst);
const secondResolvedPromise = Promise.resolve(values.resolvedSecond);
const firstRejectedPromise = Promise.reject(values.rejectedFirst);
const secondRejectedPromise = Promise.reject(values.rejectedSecond);

describe('Test promise-some', () => {
  it('Resolves if all promises are resolved', () => {
    promiseSome([firstResolvedPromise, secondResolvedPromise]).then((response) => {
      expect(response).toEqual([
      {
        value: values.resolvedFirst, 
        resolved: true
      }, {
        value: values.resolvedSecond, 
        resolved: true
      }])
    })
  })
  it('Resolves if one promise is resolved', () => {
    promiseSome([firstRejectedPromise, firstResolvedPromise, secondRejectedPromise]).then((response) => {
      expect(response).toEqual([
      {
        value: values.rejectedFirst, 
        resolved: false
      }, {
        value: values.resolvedFirst, 
        resolved: true
      }, {
        value: values.rejectedSecond, 
        resolved: false
      }])
    })
  })
  it('Resolves if one promise is resolved', () => {
    promiseSome([firstRejectedPromise, secondRejectedPromise]).catch((response) => {
      expect(response).toEqual([
      {
        value: values.rejectedFirst,
        resolved: false
      }, {
        value: values.rejectedSecond,
        resolved: false
      }])
    })
  })
})