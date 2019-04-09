import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Monster from './Monster.js';
import Skills from './Skills.js';
import '../App.scss';

const exp_multiplier = 5;
const prayerExperience = {
	"Bones": 4,
	"Big bones": 15
}

const pxsize = 128;
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
	minotaur: {
		name: "Minotaur",
		combatlevel: 12,
		hitpoints: 10,
		img: "https://oldschool.runescape.wiki/images/thumb/7/7e/Minotaur.png/" + pxsize + "-Minotaur.png?65d6a",
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

const firstMonster = monsters.chicken;

class IdleOSRS extends Component {
	constructor(props) {
		super(props);
		this.clickMonster = this.clickMonster.bind(this);
		this.state = {
			attackmethod: 'melee-controlled',
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
				slayer: {
					name: 'Slayer',
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
				name: firstMonster.name,
				combatlevel: firstMonster.combatlevel,
				max_hp: firstMonster.hitpoints,
				current_hp: firstMonster.hitpoints,
				img: firstMonster.img,
				bones: firstMonster.bones
			}
		}
	}

	clickMonster(currentMonster, Xcoord, Ycoord) {
		const damage = this.state.damage;
		let newstate = this.state;
		newstate.currentMonster.current_hp = currentMonster.current_hp - damage;
		this.grantCombatExperience(this.state.attackmethod, damage);
		this.grantExperience('hitpoints', damage * 1.33);
		if (newstate.currentMonster.current_hp <= 0) {
			this.grantPrayerExperience(currentMonster);
			this.grantSlayerExperience(currentMonster);
			this.assignCoinDrop(currentMonster);
			const that = this;
			setTimeout(function() {
				that.newMonster();
			}, 75);
		} else {
			this.setState(newstate);
		}
	}

	getAttackStyleBonus() {
		if (this.state.combatstyle === 'attack') {
			return 1;
		} else if (this.state.combatstyle === 'strength') {
			return 3;
		} else {
			return 0;
		}
	}

	getPrayerBonus() {
		const prayerLevel = this.state.stats.prayer.level;
		let meleeBonusMultiplier = 1;
		if (prayerLevel >= 4) {
			meleeBonusMultiplier = 1.05;
		}
		if (prayerLevel >= 13) {
			meleeBonusMultiplier = 1.1;
		}
		if (prayerLevel >= 31) {
			meleeBonusMultiplier = 1.15;
		}
		if (prayerLevel >= 60) {
			meleeBonusMultiplier = 1.18;
		}
		if (prayerLevel >= 70) {
			meleeBonusMultiplier = 1.23;
		}
		return meleeBonusMultiplier;
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
		const attackStyleBonus = this.getAttackStyleBonus();
		const prayerBonus = this.getPrayerBonus();
		let effectiveStrength = attackStyleBonus * prayerBonus;
		return effectiveStrength;
	}

	calculateMaxRangedHit() {
		return 1;
	}

	calculateMaxMagicHit() {
		return 1;
	}

	checkLevelUp(currentLevel, newExperience) {
		const newLevel = this.calculateLevel(newExperience);
		
		if (newLevel > currentLevel) {
			return newLevel;
		}
		return currentLevel;
	}

	grantExperience(skill, experience) {
		let newstate = this.state;
		if (Array.isArray(skill)) {
			skill.forEach(sk => {
				newstate.stats[sk].experience += (experience * exp_multiplier);
				newstate.stats[sk].percentage = this.calculateNextLevelPercentage(newstate.stats[sk].experience);
				newstate.stats[sk].level = this.checkLevelUp(newstate.stats[sk].level, newstate.stats[sk].experience);
			});
		} else {
			newstate.stats[skill].experience += (experience * exp_multiplier);
			newstate.stats[skill].percentage = this.calculateNextLevelPercentage(newstate.stats[skill].experience);
			newstate.stats[skill].level = this.checkLevelUp(newstate.stats[skill].level, newstate.stats[skill].experience);
		}
		this.setState(newstate);
		this.updateCombat();
	}

	grantCombatExperience(attackmethod, damage) {
		switch(attackmethod) {
			case 'melee-accurate':
				this.grantExperience('attack', damage * 4);
			break;
			case 'melee-aggressive':
				this.grantExperience('strength', damage * 4);
			break;
			case 'melee-defensive':
				this.grantExperience('defence', damage * 4);
			break;
			case 'melee-controlled':
				this.grantExperience(['attack','strength','defence'], damage * 1.33);
			break;
			default:
				this.grantExperience('strength', damage * 1.33);
			break;
		}
	}

	grantPrayerExperience(currentMonster) {
		const experienceAmount = prayerExperience[currentMonster.bones];
		this.grantExperience('prayer', experienceAmount);
	}

	grantSlayerExperience(currentMonster) {
		const experienceAmount = currentMonster.max_hp;
		this.grantExperience('slayer', experienceAmount);
	}

	returnRandom(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	chooseNewMonster() {
		const combatLevel = this.state.stats.combat.level;
		let monsterList = [];

		Object.entries(monsters).forEach(monster => {
			if (combatLevel >= monster[1].combatlevel && combatLevel < (monster[1].combatlevel * 4)) {
				monsterList.push(monster[0]);
			}
		});
		if (!monsterList.length) {
			monsterList = ['chicken'];
		}
		return this.returnRandom(monsterList);
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

	assignCoinDrop(monster) {
		const multiplier = this.state.multiplier;
		let newstate = this.state;
		
		newstate.coins += monster.hitpoints * 1.5 * multiplier;

		this.setState(newstate);
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
		newstate.stats.combat.level = combatLevel;

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
					<Monster clickMonster={this.clickMonster} currentMonster={this.state.currentMonster} />
				</div>
				<div className='column column-2'></div>
				<div className='column column-3'>
					<Skills stats={this.state.stats} />
				</div>
			</div>
		);
	}
}

export default IdleOSRS;