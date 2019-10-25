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

const MULTIPLIER = 1;
const EXP_MULTIPLIER = 1;
const GP_MULTIPLIER = 1;

const FIRST_MONSTER = monsters.chicken;

class IdleOSRS extends Component {
	constructor(props) {
		super(props);

		this.clickMonster = this.clickMonster.bind(this);
		this.changeShopSlot = this.changeShopSlot.bind(this);
		this.buyItem = this.buyItem.bind(this);
		this.equipItem = this.equipItem.bind(this);
		this.hasEnoughMoney = this.hasEnoughMoney.bind(this);

		this.state = {
			attackstyle: 'melee',
			attackmethod: 'controlled',
			coins: 0,
			income: 0,
			shopSlot: 'weapon',
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
					ammunition: equipmentList.ammunition.bronzearrow,
					weapon: equipmentList.weapon.shortbow,
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
			boughtItems: {
				head: [],
				cape: [],
				neck: [],
				ammunition: [],
				weapon: ['Bronze sword'],
				body: [],
				shield: ['Wooden shield'],
				legs: [],
				hand: [],
				feet: [],
				ring: []
			},
			currentMonster: {
				name: FIRST_MONSTER.name,
				combatlevel: FIRST_MONSTER.combatlevel,
				max_hp: FIRST_MONSTER.hitpoints,
				current_hp: FIRST_MONSTER.hitpoints,
				img: FIRST_MONSTER.img,
				bones: FIRST_MONSTER.bones
			}
		}
	}

	componentDidMount() {
		const INTERVAL_MS = 125;

		this.interval = setInterval(() => {
			this.givePassiveIncome(INTERVAL_MS);
		}, INTERVAL_MS);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	calculatePassiveIncome() {
		let passiveIncome = 0;

		const ATK_MULTIPLIER = 0.03;
		const STR_MULTIPLIER = 0.02;
		const DEF_MULTIPLIER = 0.06;
		const RNGD_MULTIPLIER = 0.05;
		const MAGE_MULTIPLIER = 0.05;

		const CB_MULTIPLIER = 0.05;
		const HP_MULTIPLIER = 0.01;
		const PRAY_MULTIPLIER = 0.01;
		const SLAY_MULTIPLIER = 0.01;

		passiveIncome += (this.state.stats.combat.level - 3) * CB_MULTIPLIER + ((this.state.stats.combat.level - 3) * 0.075);
		passiveIncome += (this.state.stats.hitpoints.level - 10) * (HP_MULTIPLIER / 2);
		passiveIncome += (this.state.stats.attack.level - 1) * (ATK_MULTIPLIER / 2);
		passiveIncome += (this.state.stats.strength.level - 1) * (STR_MULTIPLIER / 2);
		passiveIncome += (this.state.stats.defence.level - 1) * (DEF_MULTIPLIER / 2);
		passiveIncome += (this.state.stats.ranged.level -1) * (RNGD_MULTIPLIER / 2);
		passiveIncome += (this.state.stats.magic.level -1) * (MAGE_MULTIPLIER / 2);
		passiveIncome += (this.state.stats.prayer.level - 1) * (PRAY_MULTIPLIER / 2);
		passiveIncome += (this.state.stats.slayer.level - 1) * (SLAY_MULTIPLIER / 2);
		passiveIncome += this.calculateItemBonus('atk_bonus') * ATK_MULTIPLIER;
		passiveIncome += this.calculateItemBonus('str_bonus') * STR_MULTIPLIER;
		passiveIncome += this.calculateItemBonus('def_bonus') * DEF_MULTIPLIER;
		passiveIncome += this.calculateItemBonus('rngd_bonus') * RNGD_MULTIPLIER;
		passiveIncome += this.calculateItemBonus('mage_bonus') * MAGE_MULTIPLIER;
		passiveIncome += this.calculateItemBonus('income');

		return Math.floor(passiveIncome * MULTIPLIER);

	}

	givePassiveIncome(intervalms) {
		const passiveIncome = this.calculatePassiveIncome();
		
		if (passiveIncome > 0) {
			let newState = this.state;
			newState.income = passiveIncome;
			newState.coins += (passiveIncome * (intervalms / 1000)) * GP_MULTIPLIER;

			this.setState(newState);
		}
	}

	createHitSplat(Xcoord, Ycoord, damage) {
		let hitsplat = document.createElement("div");
		let random = Math.random();
		const zeroDamageClass = (damage === 0 ? ' blockHitsplat' : '');

		if (random >= 0 && random < 0.25) {
			hitsplat.className = 'hitsplat travelLeft' + zeroDamageClass;
		} else if (random >= 0.25 && random < 0.5) {
			hitsplat.className = 'hitsplat travelLeft2' + zeroDamageClass;
		} else if (random >= 0.5 && random < 0.75) {
			hitsplat.className = 'hitsplat travelRight' + zeroDamageClass;
		} else {
			hitsplat.className = 'hitsplat travelRight2' + zeroDamageClass;
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
		let newState = this.state;

		if (damage > currentMonster.current_hp) {
			damage = currentMonster.current_hp;
		}

		newState.currentMonster.current_hp = currentMonster.current_hp - damage;
		
		this.createHitSplat(Xcoord, Ycoord, damage);

		if (newState.currentMonster.current_hp < 0) {
			newState.currentMonster.current_hp = 0;
		}

		this.grantCombatExperience(damage);
		this.grantExperience('hitpoints', damage * 1.33);
		if (newState.currentMonster.current_hp <= 0) {
			this.grantPrayerExperience(currentMonster);
			this.grantSlayerExperience(currentMonster);
			this.assignCoinDrop(currentMonster);
			const that = this;
			setTimeout(() => {
				that.newMonster();
			}, 75);
		} else {
			this.setState(newState);
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

	getPrayerMeleeDamageMultiplier(prayerLevel = this.state.stats.prayer.level) {
		let damageMultiplier = 1;

		if (prayerLevel >= 4) {
			damageMultiplier = 1.05;
		}
		if (prayerLevel >= 13) {
			damageMultiplier = 1.1;
		}
		if (prayerLevel >= 31) {
			damageMultiplier = 1.15;
		}
		if (prayerLevel >= 60) {
			damageMultiplier = 1.18;
		}
		if (prayerLevel >= 70) {
			damageMultiplier = 1.23;
		}

		return damageMultiplier;
	}

	getPrayerRangedDamageMultiplier(prayerLevel = this.state.stats.prayer.level) {
		return 1;
	}

	getPrayerMagicDamageMultiplier(prayerLevel = this.state.stats.prayer.level) {
		return 1;
	}

	calculateDamage(attackStyle = this.state.attackstyle) {
		if (attackStyle === "melee") {
			return this.calculateMaxMeleeHit();
		} else if (attackStyle === "ranged") {
			return this.calculateMaxRangedHit();
		} else if (attackStyle === "magic") {
			return this.calculateMaxMagicHit();
		}
		return false;
	}

	calculateItemBonus(stat) {
		const equipment = this.state.gearsets[this.state.gearsets.worn];
		let statBonus = 0;

		Object.values(equipment).forEach((item) => {
			if (item !== null) {
				if(((item.name).indexOf("arrow") < 0) && ((item.name).indexOf("Bronze sword") < 0) && ((item.name).indexOf("Wooden shield") < 0)) {
					statBonus += item[stat];
				}
			}
		});

		return statBonus;
	}

	calculateMaxMeleeHit(strengthLevel = this.state.stats.strength.level) {
		const attackStyleBonus = this.getAttackStyleBonus();
		const potionBonus = 0;
		const prayerDamageMultiplier = this.getPrayerMeleeDamageMultiplier();
		const strengthBonus = this.calculateItemBonus('str_bonus');

		let effectiveStrength = Math.floor((strengthLevel + potionBonus) * prayerDamageMultiplier + attackStyleBonus);
		const baseDamage = 1.3 + (effectiveStrength / 10) + (strengthBonus / 80) + ((effectiveStrength * strengthBonus) / 640);
		return Math.floor(baseDamage);
	}

	calculateMaxRangedHit() {
		return 1;
	}

	calculateMaxMagicHit() {
		return this.getBestSpell().damage;
	}

	getBestSpell(magicLevel = this.state.stats.magic.level) {
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
		let newState = this.state;

		if (Array.isArray(skill)) {
			skill.forEach(sk => {
				let newLevel = this.checkLevelUp(newState.stats[sk].level, newState.stats[sk].experience);
				newState.stats[sk].experience += (experience * MULTIPLIER * EXP_MULTIPLIER);
				newState.stats[sk].percentage = (newLevel === 99 ? 100 : this.calculateNextLevelPercentage(newState.stats[sk].experience));
				newState.stats[sk].level = newLevel;
			});
		} else {
			let newLevel = this.checkLevelUp(newState.stats[skill].level, newState.stats[skill].experience);
			newState.stats[skill].experience += (experience * MULTIPLIER * EXP_MULTIPLIER);
			newState.stats[skill].percentage = (newLevel === 99 ? 100 : this.calculateNextLevelPercentage(newState.stats[skill].experience));
			newState.stats[skill].level = newLevel;
		}
		this.setState(newState);
		this.updateCombat();
	}

	grantCombatExperience(damage) {
		const attackStyle = this.state.attackstyle;
		const attackMethod = this.state.attackmethod;

		switch(attackStyle) {
			default:
			case 'melee':
				switch(attackMethod) {
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
				switch(attackMethod) {
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
				switch(attackMethod) {
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

	chooseNewMonster(slayerLevel = this.state.stats.slayer.level) {
		let monsterList = [];

		for (let [key, value] of Object.entries(monsters)) {
			if (slayerLevel >= (value.combatlevel - 2) && slayerLevel <= ((value.combatlevel * 2) + 2)) {
				monsterList.push(key);
			}
		};

		if (!monsterList.length) {
			console.log("No monster available on combat level " + slayerLevel);
			monsterList = ['hillgiant'];
		}
		return this.returnRandom(monsterList);
	}

	newMonster() {
		const chosenMonster = this.chooseNewMonster();
		let newState = this.state;

		newState.currentMonster.name = monsters[chosenMonster].name;
		newState.currentMonster.combatlevel = monsters[chosenMonster].combatlevel;
		newState.currentMonster.max_hp = monsters[chosenMonster].hitpoints;
		newState.currentMonster.current_hp = monsters[chosenMonster].hitpoints;
		newState.currentMonster.img = monsters[chosenMonster].img;
		newState.currentMonster.bones = monsters[chosenMonster].bones;

		this.setState(newState);
	}

	assignCoinDrop(monster) {
		const combatMultiplier = 1 + ((this.state.stats.combat.level - 3) * 0.1);
		let newState = this.state;
		
		newState.coins += (monster.max_hp * 0.35 * combatMultiplier) * MULTIPLIER * GP_MULTIPLIER;

		this.setState(newState);
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
		const minLevel = 1;
		const maxLevel = 99;

		let userLevel = 1;

		for (let lvl = 1; lvl <= maxLevel; lvl++) {
			points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
			if (lvl >= minLevel) {
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

		let newState = this.state;
		newState.stats.combat.level = combatLevel;

		this.setState(newState);
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

	hasEnoughMoney(cost) {
		if (this.state.coins >= cost) {
			return true;
		}
		return false;
	}

	changeShopSlot(slot) {
		this.setState({shopSlot: slot});
	}

	equipItem(item, slot) {
		let newState = this.state;
		newState.gearsets[newState.gearsets.worn][slot] = item;

		this.setState(newState);
	}

	buyItem(item, slot) {
		if (this.hasEnoughMoney(item.cost)) {
			let newState = this.state;
			newState.boughtItems[slot].push(item.name);

			newState.coins -= item.cost;
			this.setState(newState);
		}
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
				<div id='column-left' className='column'>
					<Monster clickMonster={this.clickMonster} currentMonster={this.state.currentMonster} />
					<Equipment equipment={this.state.gearsets[this.state.gearsets.worn]} itemstats={itemBonusses} />
					<AttackStyle attackMethod={this.state.attackmethod} />
				</div>
				<div id='column-right' className='column'>
					<CoinDisplay coins={this.state.coins} income={this.state.income} />
					<ItemShop boughtItems={this.state.boughtItems} shopSlot={this.state.shopSlot} gearsets={this.state.gearsets} equipItem={this.equipItem} changeShopSlot={this.changeShopSlot} buyItem={this.buyItem} hasEnoughMoney={this.hasEnoughMoney} />
					<GearSets gearsets={this.state.gearsets} />
					<Skills stats={this.state.stats} />
				</div>
			</div>
		);
	}
}

export default IdleOSRS;