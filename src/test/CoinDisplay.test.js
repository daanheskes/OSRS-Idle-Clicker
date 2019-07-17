import CoinDisplay from '../Components/CoinDisplay';

describe('convertToLetters', () => {
    it('converts amount to K(ilo)', () => {
        expect(CoinDisplay.prototype.convertToLetters(100000)).toBe('100K');
    });
    it('converts amount to M(illion)', () => {
        expect(CoinDisplay.prototype.convertToLetters(10000000)).toBe('10M');
    });
});