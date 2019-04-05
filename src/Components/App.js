import React, { Component } from 'react';
import Monster from './Monster.js';
import Skills from './Skills.js';
import '../App.scss';

const combatExperiencePerDamage = 4;
const hitpointsExperiencePerDamage = 1.33;
const prayerExperience = {
  "Bones": 4,
  "Big bones": 15
}

const pxsize = 64;
const monsters = {
	chicken: {
		name: "Chicken",
		combatlevel: 1,
		img: "https://oldschool.runescape.wiki/images/thumb/a/a3/Chicken.png/" + pxsize + "px-Chicken.png?00c5a",
		hitpoints: 3,
		bones: "Bones"
	},
	goblin: {
		name: "Goblin",
		combatlevel: 2,
		hitpoints: 5,
		img: "https://oldschool.runescape.wiki/images/thumb/d/d2/Goblin.png/" + pxsize + "px-Goblin.png?21289",
		bones: "Bones"
	},
	cowcalf: {
		name: "Cow calf",
		combatlevel: 2,
		hitpoints: 6,
		img: "https://oldschool.runescape.wiki/images/thumb/7/72/Cow_calf.png/" + pxsize + "px-Cow_calf.png?a24a0",
		bones: "Bones"
  },
	cow: {
		name: "Cow",
		combatlevel: 2,
		hitpoints: 8,
		img: "https://oldschool.runescape.wiki/images/thumb/8/84/Cow.png/" + pxsize + "px-Cow.png?d4b4c",
		bones: "Bones"
	},
	hillgiant: {
		name: "Hill Giant",
		combatlevel: 28,
		hitpoints: 35,
		img: "https://oldschool.runescape.wiki/images/b/bd/Hill_giant.png?e6339",
		bones: "Big bones"
  }
}

class IdleOSRS extends Component {
	constructor(props) {
		super(props);
		this.clickMonster = this.clickMonster.bind(this);
		this.state = {
			attackmethod: 'attack',
			damage: 1,
			stats: {
				combat: {
					name: 'Combat',
					level: 3
				},
				attack: {
					name: 'Attack',
					level: 1,
					experience: 0
				},
				strength: {
					name: 'Strength',
					level: 1,
					experience: 0
				},
				defence: {
					name: 'Defence',
					level: 1,
					experience: 0
				},
				ranged: {
					name: 'Ranged',
					level: 1,
					experience: 0
				},
				magic: {
					name: 'Magic',
					level: 1,
					experience: 0
				},
				hitpoints: {
					name: 'Hitpoints',
					level: 10,
					experience: 1154
				},
				prayer: {
					name: 'Prayer',
					level: 1,
					experience: 0
				},
				total: {
					name: 'Total',
					level: 16
				}
			},
			currentMonster: {
				name: 'chicken',
				combatlevel: 1,
				max_hp: 3,
				current_hp: 3
			}
		}
 	}

	clickMonster(currentMonster) {
		const damage = this.state.damage;
		let newstate = this.state;
		newstate.currentMonster.current_hp = currentMonster.current_hp - damage;
		this.grantExperience(this.state.attackmethod, damage * 4);
		if (newstate.currentMonster.current_hp === 0) {
			this.grantPrayerEXP(currentMonster);
			this.newMonster();
		} else {
			this.setState(newstate);
		}
	}

	grantExperience(skill, experience) {
		let newstate = this.state;
		newstate.stats[newstate.attackmethod].experience += experience;
		this.setState(newstate); 
	}

	grantPrayerEXP(currentMonster) {

	}

	newMonster() {
		let newstate = this.state;
		let chosenMonster = 'chicken';
		newstate.currentMonster.name = monsters[chosenMonster].name;
		newstate.currentMonster.combatlevel = monsters[chosenMonster].combatlevel;
		newstate.currentMonster.max_hp = monsters[chosenMonster].hitpoints;
		newstate.currentMonster.current_hp = monsters[chosenMonster].hitpoints;

		this.setState(newstate);
	}

	calculateCoins(monster) {
		const multiplier = this.state.multiplier;
		return monster.max_hp * 1.5 * multiplier;
	}

	calculateLevel(experience) {
		let points = 0;
		let output = 0;
		const minlevel = 1;
		const maxlevel = 99;

		let userLevel = 1;

		for (let lvl = 1; lvl <= maxlevel; lvl++) {
			points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
			if (lvl >= minlevel) {
				if (experience > output) {
					userLevel = lvl;
				} else {
					break;
				}
				output = Math.floor(points / 4);
			}
		}
		return userLevel;
	}

	calculateCombat(stats) {
		const attack = this.state.stats.attack.level;
		const strength = this.state.stats.strength.level;
		const defence = this.state.stats.defence.level;
		const ranged = this.state.stats.ranged.level;
		const magic = this.state.stats.magic.level;
		const hitpoints = this.state.stats.hitpoints.level;
		const prayer = this.state.stats.prayer.level;

		const base = 0.25 * (defence + hitpoints + Math.floor(prayer/2));
		const melee = 0.325 * (attack + strength);
		const range = 0.325 * (Math.floor(3*ranged/2));
		const mage = 0.325 * (Math.floor(3*magic/2));
		return Math.floor(base + Math.max(melee, range, mage));
	}

	render() {
		return (
			<div className='wrap'>
				<div className='column-1'>
					<Monster monsters={monsters} currentMonster={this.state.currentMonster} clickMonster={this.clickMonster} />
				</div>
				<div className='column-2'></div>
				<div className='column-3'>
					<Skills stats={this.state.stats} attackMethod={this.state.attackmethod} />
				</div>
			</div>
		);
	}
}

export default IdleOSRS;