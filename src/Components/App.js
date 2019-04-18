import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Equipment from './Equipment.js';
import CoinDisplay from './CoinDisplay.js';
import MonsterList from './MonsterList.js';
import Monster from './Monster.js';
import EquipmentList from './EquipmentList.js';
import Skills from './Skills.js';
import '../App.scss';

const multiplier = 5;
const prayerExperience = {
	"Bones": 4.5,
	"Big bones": 15,
	"Baby dragon bones": 30,
	"Dragon bones": 72,
	"Wyvern bones": 72,
	"Lava dragon bones": 85,
	"Superior dragon bones": 150
}

const monsters = MonsterList;
const equipmentList = EquipmentList;

const firstMonster = monsters.chicken;

class IdleOSRS extends Component {
	constructor(props) {
		super(props);
		this.clickMonster = this.clickMonster.bind(this);
		this.state = {
			attackmethod: 'melee-aggressive',
			coins: 0,
			income: 0.25,
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
			equipment: {
				head: equipmentList.head.bronzemedhelm,
				cape: equipmentList.cape.redcape,
				neck: equipmentList.neck.amuletofaccuracy,
				ammunition: equipmentList.ammunition.bronzearrow,
				weapon: equipmentList.weapon.bronzesword,
				body: equipmentList.body.bronzechainbody,
				shield: equipmentList.shield.woodenshield,
				legs: equipmentList.legs.bronzeplatelegs,
				hand: equipmentList.hand.leathergloves,
				feet: equipmentList.feet.leatherboots,
				ring: equipmentList.ring.goldring
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

	componentDidMount() {
		let intervalms = 125;

		this.interval = setInterval(() => {
			this.givePassiveIncome(intervalms);
		}, intervalms);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	calculatePassiveIncome(intervalms) {
		let passiveIncome = 0;
		passiveIncome += (this.state.stats.combat.level - 3) * 0.015;
		passiveIncome += (this.state.stats.hitpoints.level - 10) * 0.005;
		passiveIncome += (this.state.stats.attack.level - 1) * 0.005;
		passiveIncome += (this.state.stats.strength.level - 1) * 0.0025;
		passiveIncome += (this.state.stats.defence.level - 1) * 0.0125;
		passiveIncome += (this.state.stats.prayer.level - 1) * 0.0025;
		passiveIncome += (this.state.stats.slayer.level - 1) * 0.0075;

		return passiveIncome * multiplier * (intervalms / 1000);
	}

	givePassiveIncome(intervalms) {
		const passiveIncome = this.calculatePassiveIncome(intervalms);
		
		let newstate = this.state;
		newstate.income = passiveIncome;
		newstate.coins += passiveIncome;

		this.setState(newstate);
	}

	createHitSplat(Xcoord, Ycoord, damage) {
		let hitsplat = document.createElement("div");
		hitsplat.className = (Math.random() >= 0.5 ? 'hitsplat travelLeft' : 'hitsplat travelRight');
		hitsplat.style = 'position:absolute;left: ' + Xcoord + 'px;top:' + Ycoord + 'px';
		let hitsplatDamage = document.createElement("span");
		hitsplatDamage.className = 'hitsplatDamage';
		hitsplatDamage.textContent = damage;
		hitsplat.appendChild(hitsplatDamage);

		const hitsplatwrap = document.getElementById('monster-hitsplats');
		hitsplatwrap.appendChild(hitsplat);
		setTimeout(function() {
			hitsplat.remove();
		}, 1800);
	}

	clickMonster(currentMonster, Xcoord, Ycoord) {
		let damage = this.calculateMaxHit();
		let newstate = this.state;
		if (damage > currentMonster.current_hp) {
			damage = currentMonster.current_hp;
		}
		newstate.currentMonster.current_hp = currentMonster.current_hp - damage;
		
		this.createHitSplat(Xcoord, Ycoord, damage);
		if (newstate.currentMonster.current_hp < 0) {
			newstate.currentMonster.current_hp = 0;
		}
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

	calculateMaxHit() {
		const attackmethod = this.state.attackmethod;
		if (attackmethod.startsWith('melee-')) {
			return this.calculateMaxMeleeHit();
		} else if (attackmethod.startsWith('ranged-')) {
			return this.calculateMaxRangedHit();
		} else if (attackmethod.startsWith('magic-')) {
			return this.calculateMaxMagicHit();
		}
	}

	calculateStrengthBonus() {
		const equipment = this.state.equipment;
		let strengthBonus = 0;

		Object.values(equipment).forEach(function(item) {
			strengthBonus += item.str_bonus;
		});
		
		return strengthBonus;
	}

	calculateMaxMeleeHit() {
		const attackStyleBonus = this.getAttackStyleBonus();
		const potionBonus = 0;
		const prayerBonus = this.getPrayerBonus();
		const strengthBonus = this.calculateStrengthBonus();
		const strengthLevel = this.state.stats.strength.level;

		let effectiveStrength = Math.floor((strengthLevel + potionBonus) * prayerBonus + attackStyleBonus);
		const baseDamage = 1.3 + (effectiveStrength / 10) + (strengthBonus / 80) + ((effectiveStrength * strengthBonus) / 640);
		return Math.floor(baseDamage);
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
				newstate.stats[sk].experience += (experience * multiplier);
				newstate.stats[sk].percentage = this.calculateNextLevelPercentage(newstate.stats[sk].experience);
				newstate.stats[sk].level = this.checkLevelUp(newstate.stats[sk].level, newstate.stats[sk].experience);
			});
		} else {
			newstate.stats[skill].experience += (experience * multiplier);
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
			if (combatLevel >= monster[1].combatlevel && combatLevel < (monster[1].combatlevel * 3)) {
				monsterList.push(monster[0]);
			}
		});
		if (!monsterList.length) {
			console.log("Error: No monster available on combat level " + combatLevel);
			monsterList = ['hillgiant'];
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
		let newstate = this.state;
		
		newstate.coins += monster.max_hp * 0.3 * multiplier;

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
				<div id='column-1' className='column'>
					<Monster clickMonster={this.clickMonster} currentMonster={this.state.currentMonster} />
				</div>
				<div id='column-2' className='column'>
					<CoinDisplay coins={this.state.coins} income={this.state.income} multiplier={multiplier}/>
				</div>
				<div id='column-3' className='column'>
					<Equipment equipment={this.state.equipment} />
				</div>
				<div id='column-4' className='column'>
					<Skills stats={this.state.stats} />
				</div>
			</div>
		);
	}
}

export default IdleOSRS;