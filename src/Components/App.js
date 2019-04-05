import React, { Component } from 'react';
import Navbar from './Navbar.js';
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
			attackmethod: 'strength',
			damage: 1,
			stats: {
				combat: {
					name: 'Combat',
					level: 3
				},
				attack: {
					name: 'Attack',
					level: 1,
					experience: 0,
					percentage: 0
				},
				strength: {
					name: 'Strength',
					level: 1,
					experience: 0,
					percentage: 0
				},
				defence: {
					name: 'Defence',
					level: 1,
					experience: 0,
					percentage: 0
				},
				ranged: {
					name: 'Ranged',
					level: 1,
					experience: 0,
					percentage: 0
				},
				magic: {
					name: 'Magic',
					level: 1,
					experience: 0,
					percentage: 0
				},
				hitpoints: {
					name: 'Hitpoints',
					level: 10,
					experience: 1154,
					percentage: 0
				},
				prayer: {
					name: 'Prayer',
					level: 1,
					experience: 0,
					percentage: 0
				},
				total: {
					name: 'Total',
					level: 0
				}
			},
			currentMonster: {
				name: 'chicken',
				combatlevel: 1,
				max_hp: 3,
				current_hp: 3,
				img: "https://oldschool.runescape.wiki/images/thumb/8/84/Cow.png/" + pxsize + "px-Cow.png?d4b4c",
				bones: "Bones"
			}
		}
 	}

	clickMonster(currentMonster) {
		const damage = this.state.damage;
		let newstate = this.state;
		newstate.currentMonster.current_hp = currentMonster.current_hp - damage;
		this.grantExperience(this.state.attackmethod, damage * combatExperiencePerDamage);
		this.grantExperience('hitpoints', damage * hitpointsExperiencePerDamage);
		if (newstate.currentMonster.current_hp === 0) {
			this.grantPrayerEXP(currentMonster);
			const that = this;
			setTimeout(function() {
				that.newMonster();
			}, 75);
		} else {
			this.setState(newstate);
		}
	}

	calculateMaxHit(combatstyle) {
		if (combatstyle === 'attack' || combatstyle === 'strength' || combatstyle === 'defence') {
			return this.calculateMaxMeleeHit();
		} else if (combatstyle === 'ranged') {
			return this.calculateMaxRangedHit();
		} else if (combatstyle === 'magic') {
			return this.calculateMaxMagicHit();
		}
	}

	calculateMaxMeleeHit() {
		let effectiveStrength = 0;

		return 1;
	}

	calculateMaxRangedHit() {
		return 1;
	}

	calculateMaxMagicHit() {
		return 1;
	}

	checkLevelUp(skill) {
		const level = this.state.stats[skill].level;
		const experience = this.state.stats[skill].experience;
		
		const newLevel = this.calculateLevel(experience);
		if (newLevel > level) {
			let newstate = this.state;
			newstate.stats[skill].level = newLevel;
			this.setState(newstate);
		}
	}

	grantExperience(skill, experience) {
		let newstate = this.state;
		newstate.stats[skill].experience += experience;
		newstate.stats[skill].percentage = this.calculateNextLevelPercentage(newstate.stats[skill].experience);
		this.setState(newstate);
		this.checkLevelUp(skill);
		this.updateCombat();
	}

	grantPrayerEXP(currentMonster) {
		const experienceAmount = prayerExperience[currentMonster.bones];
		this.grantExperience('prayer', experienceAmount);
	}

	chooseNewMonster() {
		const newMonster = 'chicken';

		return newMonster;
	}

	newMonster() {
		let newstate = this.state;
		let chosenMonster = this.chooseNewMonster();

		newstate.currentMonster.name = monsters[chosenMonster].name;
		newstate.currentMonster.combatlevel = monsters[chosenMonster].combatlevel;
		newstate.currentMonster.max_hp = monsters[chosenMonster].hitpoints;
		newstate.currentMonster.current_hp = monsters[chosenMonster].hitpoints;
		newstate.currentMonster.img = monsters[chosenMonster].img;
		newstate.currentMonster.bones = monsters[chosenMonster].bones;

		this.setState(newstate);
	}

	calculateCoins(monster) {
		const multiplier = this.state.multiplier;
		return monster.max_hp * 1.5 * multiplier;
	}

	calculateNextLevelPercentage(experience) {		
		let points = 0;
		let output = 0;
		const maxlevel = 99

		let currentLevelExp = 0;
		let nextLevelExp = 0;

		for (let lvl = 1; lvl <= maxlevel; lvl++) {
			points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
			if (experience > output) {
				currentLevelExp = output;
			} else {
				nextLevelExp = output;
				break;
			}
			output = Math.floor(points / 4);
		}
		const totalExperienceNeeded = nextLevelExp - currentLevelExp;
		const experienceGained = experience - currentLevelExp;
		const percentage = experienceGained / totalExperienceNeeded * 100;

		return percentage;
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

	updateCombat(stats) {
		const combatLevel = this.calculateCombat(stats);

		let newstate = this.state;
		this.state.stats.combat.level = combatLevel;

		this.setState(newstate);
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
				<Navbar />
				<div className='column column-1'>
					<Monster monsters={monsters} currentMonster={this.state.currentMonster} clickMonster={this.clickMonster} />
				</div>
				<div className='column column-2'></div>
				<div className='column column-3'>
					<Skills stats={this.state.stats} attackMethod={this.state.attackmethod} />
				</div>
			</div>
		);
	}
}

export default IdleOSRS;