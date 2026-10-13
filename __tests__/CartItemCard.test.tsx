import { isCartQuantityMinReached } from '../src/utils/cartQuantity';

describe('cart quantity rules', () => {
  it('allows decrement at quantity 1 when the minimum order quantity is 1', () => {
    expect(isCartQuantityMinReached(1, 1)).toBe(false);
  });

  it('still respects higher minimum order quantities', () => {
    expect(isCartQuantityMinReached(2, 3)).toBe(true);
    expect(isCartQuantityMinReached(3, 3)).toBe(true);
    expect(isCartQuantityMinReached(4, 3)).toBe(false);
  });
});
