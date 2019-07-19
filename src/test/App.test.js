import React from 'react';
import ReactDOM from 'react-dom';
import App from '../Components/App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Calculate prayer damage multiplier', () => {
  test('Melee', () => {
    expect(App.prototype.getPrayerMeleeDamageMultiplier(1)).toBe(1);
    expect(App.prototype.getPrayerMeleeDamageMultiplier(15)).toBe(1.1);
    expect(App.prototype.getPrayerMeleeDamageMultiplier(70)).toBe(1.23);
    expect(App.prototype.getPrayerMeleeDamageMultiplier(80)).toBe(1.23);
    expect(App.prototype.getPrayerMeleeDamageMultiplier(99)).toBe(1.23);
  });
});

describe('getBestSpell()', () => {
  test("returns best spell", () => {
    expect(App.prototype.getBestSpell(1).name).toBe("Wind Strike");
    expect(App.prototype.getBestSpell(15).name).toBe("Fire Strike");
    expect(App.prototype.getBestSpell(70).name).toBe("Earth Wave");
    expect(App.prototype.getBestSpell(63).name).toBe("Wind Wave");
    expect(App.prototype.getBestSpell(99).name).toBe("Fire Surge");
  });
  test("returns spell", () => {
    expect(App.prototype.getBestSpell(50)).toBeDefined();
  })
});

describe('chooseNewMonster()', () => {

});