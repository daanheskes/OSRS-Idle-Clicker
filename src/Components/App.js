import React, { Component } from 'react';
import '../App.scss';

// Data files
import monsters from './Data/MonsterList.js';
import equipmentList from './Data/EquipmentList.js';
import prayerExperience from './Data/PrayerExperience.js';
import magicSpells from './Data/MagicSpellsList.js';

// Components
import Navbar from './Navbar.js';
import Monster from './Monster.js';
import AttackStyle from './AttackStyle.js';
import CoinDisplay from './CoinDisplay.js';
import ItemShop from './ItemShop.js';
import GearSets from './GearSets.js';
import Equipment from './Equipment.js';
import Skills from './Skills.js';

const multiplier = 1;
const exp_multiplier = 50;

const firstMonster = monsters.chicken;

class IdleOSRS extends Component {
	constructor(props) {
		super(props);
		this.clickMonster = this.clickMonster.bind(this);
		this.state = {
			attackstyle: 'melee',
			attackmethod: 'controlled',
			coins: 0,
			income: 0,
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
			gearsets: {
				worn: 'melee',
				melee: {
					head: null,
					cape: null,
					neck: null,
					ammunition: null,
					weapon: equipmentList.weapon.bronzesword,
					body: null,
					shield: equipmentList.shield.woodenshield,
					legs: null,
					hand: null,
					feet: null,
					ring: null
				},
				ranged: {
					head: null,
					cape: null,
					neck: null,
					ammunition: null,
					weapon: null,
					body: null,
					shield: null,
					legs: null,
					hand: null,
					feet: null,
					ring: null
				},
				magic: {
					head: null,
					cape: null,
					neck: null,
					ammunition: null,
					weapon: null,
					body: null,
					shield: null,
					legs: null,
					hand: null,
					feet: null,
					ring: null
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

	componentDidMount() {
		let intervalms = 125;

		this.interval = setInterval(() => {
			this.givePassiveIncome(intervalms);
		}, intervalms);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	calculatePassiveIncome() {
		let passiveIncome = 0;
		const atkmultiplier = 0.04;
		const strmultiplier = 0.02;
		const defmultiplier = 0.06;
		const rngdmultiplier = 0.06;
		const magemultiplier = 0.06;

		passiveIncome += (this.state.stats.combat.level - 3) * 0.06 + ((this.state.stats.combat.level - 3) * 0.125);
		passiveIncome += (this.state.stats.hitpoints.level - 10) * 0.02;
		passiveIncome += (this.state.stats.attack.level - 1) * 0.02;
		passiveIncome += (this.state.stats.strength.level - 1) * 0.01;
		passiveIncome += (this.state.stats.defence.level - 1) * 0.05;
		passiveIncome += (this.state.stats.ranged.level -1) * 0.05;
		passiveIncome += (this.state.stats.magic.level -1) * 0.05;
		passiveIncome += (this.state.stats.prayer.level - 1) * 0.01;
		passiveIncome += (this.state.stats.slayer.level - 1) * 0.03;
		passiveIncome += this.calculateItemBonus('atk_bonus') * atkmultiplier;
		passiveIncome += this.calculateItemBonus('str_bonus') * strmultiplier;
		passiveIncome += this.calculateItemBonus('def_bonus') * defmultiplier;
		passiveIncome += this.calculateItemBonus('rngd_bonus') * rngdmultiplier;
		passiveIncome += this.calculateItemBonus('mage_bonus') * magemultiplier;
		
		if (this.state.gearsets[this.state.gearsets.worn].weapon.name === 'Bronze Sword') {
			passiveIncome -= equipmentList.weapon.bronzesword.atk_bonus * atkmultiplier;
			passiveIncome -= equipmentList.weapon.bronzesword.str_bonus * strmultiplier;
		}
		if (this.state.gearsets[this.state.gearsets.worn].shield.name === 'Wooden Shield') {
			passiveIncome -= equipmentList.shield.woodenshield.def_bonus * defmultiplier;
		}

		return Math.floor(passiveIncome * multiplier);

	}

	givePassiveIncome(intervalms) {
		const passiveIncome = this.calculatePassiveIncome();
		
		if (passiveIncome > 0) {
			let newstate = this.state;
			newstate.income = passiveIncome;
			newstate.coins += passiveIncome * (intervalms / 1000);

			this.setState(newstate);
		}
	}

	createHitSplat(Xcoord, Ycoord, damage) {
		let hitsplat = document.createElement("div");
		let random = Math.random();
		const checkNoDamage = (damage === 0 ? ' blockHitsplat' : '');
		if (random >= 0 && random < 0.25) {
			hitsplat.className = 'hitsplat travelLeft' + checkNoDamage;
		} else if (random >= 0.25 && random < 0.5) {
			hitsplat.className = 'hitsplat travelLeft2' + checkNoDamage;
		} else if (random >= 0.5 && random < 0.75) {
			hitsplat.className = 'hitsplat travelRight' + checkNoDamage;
		} else {
			hitsplat.className = 'hitsplat travelRight2' + checkNoDamage;
		}

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
		let damage = this.calculateDamage();
		let newstate = this.state;
		if (damage > currentMonster.current_hp) {
			damage = currentMonster.current_hp;
		}
		newstate.currentMonster.current_hp = currentMonster.current_hp - damage;
		
		this.createHitSplat(Xcoord, Ycoord, damage);
		if (newstate.currentMonster.current_hp < 0) {
			newstate.currentMonster.current_hp = 0;
		}
		this.grantCombatExperience(damage);
		this.grantExperience('hitpoints', damage * 1.33);
		if (newstate.currentMonster.current_hp <= 0) {
			this.grantPrayerExperience(currentMonster);
			this.grantSlayerExperience(currentMonster);
			this.assignCoinDrop(currentMonster);
			const that = this;
			setTimeout(() => {
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

	calculateDamage() {
		const attackstyle = this.state.attackstyle;
		if (attackstyle === "melee") {
			return this.calculateMaxMeleeHit();
		} else if (attackstyle === "ranged") {
			return this.calculateMaxRangedHit();
		} else if (attackstyle === "magic") {
			return this.calculateMaxMagicHit();
		}
	}

	calculateItemBonus(stat) {
		const equipment = this.state.gearsets[this.state.gearsets.worn];
		let statBonus = 0;

		Object.values(equipment).forEach(function(item) {
			if (item != null) {
				statBonus += item[stat];
			}
		});
		
		return statBonus;
	}

	calculateMaxMeleeHit() {
		const attackStyleBonus = this.getAttackStyleBonus();
		const potionBonus = 0;
		const prayerBonus = this.getPrayerBonus();
		const strengthBonus = this.calculateItemBonus('str_bonus');
		const strengthLevel = this.state.stats.strength.level;

		let effectiveStrength = Math.floor((strengthLevel + potionBonus) * prayerBonus + attackStyleBonus);
		const baseDamage = 1.3 + (effectiveStrength / 10) + (strengthBonus / 80) + ((effectiveStrength * strengthBonus) / 640);
		return Math.floor(baseDamage);
	}

	calculateMaxRangedHit() {
		return 1;
	}

	calculateMaxMagicHit() {
		return this.getBestSpell().damage;
	}

	getBestSpell() {
		const magicLevel = this.state.stats.magic.level;
		let bestSpell = magicSpells.windstrike;

		Object.values(magicSpells).forEach((spell) => {
			if (magicLevel >= spell.level) {
				bestSpell = spell;
			}
		});

		return bestSpell;
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
				newstate.stats[sk].experience += (experience * multiplier * exp_multiplier);
				newstate.stats[sk].percentage = this.calculateNextLevelPercentage(newstate.stats[sk].experience);
				newstate.stats[sk].level = this.checkLevelUp(newstate.stats[sk].level, newstate.stats[sk].experience);
			});
		} else {
			newstate.stats[skill].experience += (experience * multiplier * exp_multiplier);
			newstate.stats[skill].percentage = this.calculateNextLevelPercentage(newstate.stats[skill].experience);
			newstate.stats[skill].level = this.checkLevelUp(newstate.stats[skill].level, newstate.stats[skill].experience);
		}
		this.setState(newstate);
		this.updateCombat();
	}

	grantCombatExperience(damage) {
		const attackstyle = this.state.attackstyle;
		const attackmethod = this.state.attackmethod;

		switch(attackstyle) {
			default:
			case 'melee':
				switch(attackmethod) {
					case 'accurate':
						this.grantExperience('attack', damage * 4);
					break;

					case 'aggressive':
						this.grantExperience('strength', damage * 4);
					break;

					case 'defensive':
						this.grantExperience('defence', damage * 4);
					break;

					default:
					case 'controlled':
						this.grantExperience(['attack','strength','defence'], damage * 1.33);
					break;
				}
			break;

			case 'ranged':
				switch(attackmethod) {
					default:
					case 'accurate':
					case 'rapid':
						this.grantExperience('ranged', damage * 4);
					break;

					case 'longrange':
						this.grantExperience(['ranged','defence'], damage * 2);
					break;
				}
			break;

			case 'magic':
				switch(attackmethod) {
					default:
					case 'spell':
						let totalMagicExp = this.getBestSpell().experience + damage * 2;
						this.grantExperience('magic', totalMagicExp);
					break;

					case 'defensivespell':
						this.grantExperience('magic', this.getBestSpell().experience);
						this.grantExperience(['magic','defence'], damage * 2);
					break;
				}
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
			if (combatLevel >= monster[1].combatlevel && combatLevel <= ((monster[1].combatlevel * 2) + 2)) {
				monsterList.push(monster[0]);
			}
		});
		if (!monsterList.length) {
			console.log("UwU Oopsie Woopsie: No monster available on combat level " + combatLevel);
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
		const combatMultiplier = 1 + this.state.stats.combat.level - 3 * 0.2;

		newstate.coins += monster.max_hp * 0.1 * combatMultiplier * multiplier;

		this.setState(newstate);
	}

	calculateNextLevelPercentage(experience) {		
		let points = 0;
		let output = 0;
		const maxlevel = 99;

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

		const itemBonusses = {
			atk_bonus: this.calculateItemBonus('atk_bonus'),
			str_bonus: this.calculateItemBonus('str_bonus'),
			def_bonus: this.calculateItemBonus('def_bonus'),
			rngd_bonus: this.calculateItemBonus('rngd_bonus'),
			mage_bonus: this.calculateItemBonus('mage_bonus')
		}

		return (

			<div className='wrap'>
				<Navbar />
				<div id='column-1' className='column'>
					<Monster clickMonster={this.clickMonster} currentMonster={this.state.currentMonster} />
					<AttackStyle attackMethod={this.state.attackmethod} />
				</div>
				<div id='column-2' className='column'>
					<CoinDisplay coins={this.state.coins} income={this.state.income} />
					<ItemShop equipment={this.state.gearsets[this.state.gearsets.worn]} />
					<Equipment equipment={this.state.gearsets[this.state.gearsets.worn]} itemstats={itemBonusses} />
					<GearSets gearsets={this.state.gearsets} />
				</div>
				<div id='column-3' className='column'>
					<Skills stats={this.state.stats} />
				</div>
			</div>
		);
	}
}

export default IdleOSRS;