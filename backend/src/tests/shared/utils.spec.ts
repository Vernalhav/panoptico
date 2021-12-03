import { arrayOrElementToArray } from 'src/shared/utils';

describe('Utils', () => {

  describe('arrayOrElementToArray', () => {
    it('should return an array with the same element', async () => {
      const element = 'string';
      const expected = ['string'];
      
      const received = arrayOrElementToArray(element);

      expect(received).toEqual(expected);
    });
  });

  describe('arrayOrElementToArray', () => {
    it('should return an equal array', async () => {
      const element = [420, 69];
      
      const expected = [420, 69];
      const received = arrayOrElementToArray(element);

      expect(received).toEqual(expected);
    });
  });

  describe('arrayOrElementToArray', () => {
    it('should return an equal array', async () => {
      const element = [{name: 'Johns', age: 28}];
      
      const expected = [{name: 'Johns', age: 28}];
      const received = arrayOrElementToArray(element);

      expect(received).toEqual(expected);
    });
  });

  describe('arrayOrElementToArray', () => {
    it('should return an array with the same element', async () => {
      const element = 'string';
      const expected = ['string'];
      
      const received = arrayOrElementToArray(element);

      expect(received).toEqual(expected);
    });
  });

  describe('arrayOrElementToArray', () => {
    it('should return an array with the same element', async () => {
      const element = 420;
      const expected = [420];
      
      const received = arrayOrElementToArray(element);

      expect(received).toEqual(expected);
    });
  });

  describe('arrayOrElementToArray', () => {
    it('should return an array with an equal object', async () => {
      const element = {name: 'Johns', age: 28};
      
      const expected = [{name: 'Johns', age: 28}];
      const received = arrayOrElementToArray(element);

      expect(received).toEqual(expected);
    });
  });

  describe('arrayOrElementToArray', () => {
    it('should return an empty array', async () => {
      const element = [];
      
      const expected = [];
      const received = arrayOrElementToArray(element);

      expect(received).toEqual(expected);
    });
  });

  describe('arrayOrElementToArray', () => {
    it('should return an array with undefined element', async () => {
      const element = undefined;
      
      const expected = [undefined];
      const received = arrayOrElementToArray(element);

      expect(received).toEqual(expected);
    });
  });

  describe('arrayOrElementToArray', () => {
    it('should return an array with undefined element', async () => {
      const element = ['string', 420, {name: 'john'}];
      
      const expected = ['string', 420, {name: 'john'}];
      const received = arrayOrElementToArray(element);

      expect(received).toEqual(expected);
    });
  });
});