import React, { Component } from 'react';
import '../App.scss';

// Data files
import monsters from './../Data/MonsterList.js';
import attackStyles from './../Data/AttackStyles.js';
import prayerExperience from './../Data/PrayerExperience.js';
import magicSpells from './../Data/MagicSpellsList.js';

// Components
import Navbar from './Navbar/Navbar.js';
import Monster from './Monster/Monster.js';
import AttackStyle from './AttackStyle/AttackStyle.js';
import CoinDisplay from './CoinDisplay/CoinDisplay.js';
import ItemShop from './ItemShop/ItemShop.js';
import GearSets from './GearSets/GearSets.js';
import Equipment from './Equipment/Equipment.js';
import Skills from './Skills/Skills.js';

// Styles
import './Navbar/Navbar.scss';
import './Monster/Monster.scss';
import './AttackStyle/AttackStyle.scss';
import './CoinDisplay/CoinDisplay.scss';
import './ItemShop/ItemShop.scss';
import './GearSets/GearSets.scss';
import './Equipment/Equipment.scss';
import './Skills/Skills.scss';

// Settings
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
		this.meetsRequirements = this.meetsRequirements.bind(this);
		this.equipGearSet = this.equipGearSet.bind(this);
		this.changeAttackMethod = this.changeAttackMethod.bind(this);
		this.onUnload = this.onUnload.bind(this);

		this.state = {
			attackMethod: {
				shortname: 'unarmed-punch',
				name: 'Punch',
				experience: 'attack',
				combatStyle: 'melee',
				style: 'accurate'
			},
			clicksPer5: 3,
			coins: 0,
			shopSlot: 'head',
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
					weapon: null,
					body: null,
					shield: null,
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
			ownedItems: [],
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

	onUnload() {
		this.saveGame();
	}

	saveGame() {
		localStorage.setItem('savedGame', JSON.stringify(this.state));
	}

	loadGame() {
		if (localStorage.getItem('savedGame')) {
			let loadedGame = JSON.parse(localStorage.getItem('savedGame'));
			let newState = this.state;
			
			Object.entries(loadedGame).forEach((loadedProp) => {
				const [ propName, propValue ] = loadedProp;

				if (newState.hasOwnProperty(propName)) {
					newState[propName] = propValue;
				}
			});

			this.setState(newState);
		}
	}

	componentDidMount() {
		this.loadGame();

		const INTERVAL_MS = 125;
		let lastClick = 0;
		let clickInterval = 5000 / this.state.clicksPer5;

		this.interval = setInterval(() => {
			this.givePassiveIncome(INTERVAL_MS);

			lastClick += INTERVAL_MS;
			if (lastClick >= clickInterval) {
				const element = document.getElementById('monster-hitsplats');
				const bounds = element.getBoundingClientRect();
				
				let randomX = Math.floor((bounds.width - 24) * Math.random());
				let randomY = Math.floor((bounds.height - 24) * Math.random());

				this.clickMonster(this.state.currentMonster, randomX, randomY);
				lastClick = 0;
			}
		}, INTERVAL_MS);
		window.addEventListener("beforeunload", this.onUnload);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		window.removeEventListener("beforeunload", this.onUnload);
	}

	calculatePassiveIncome() {
		let passiveIncome = 0;

		passiveIncome += Math.floor(this.calculateItemBonus('def_bonus') / 8);
		passiveIncome += Math.floor(this.calculateItemBonus('def_bonus') / 25) * 2;
		passiveIncome += Math.floor(this.calculateItemBonus('def_bonus') / 50) * 3;
		passiveIncome += Math.floor(this.calculateItemBonus('def_bonus') / 100) * 4;
		passiveIncome += Math.floor(this.calculateItemBonus('def_bonus') / 250) * 5;
		passiveIncome += this.calculateItemBonus('income');

		return Math.floor(passiveIncome * MULTIPLIER);
	}

	givePassiveIncome(intervalms) {
		const passiveIncome = this.calculatePassiveIncome();
		
		if (passiveIncome > 0) {
			let newState = this.state;
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

	hasItem(item) {
		if (this.state.ownedItems.includes(item)) return true;
		return false;
	}

	giveBossDrop(newState, item) {

		if (item === "Defender") {
			const defenders = ['Bronze defender', 'Iron defender', 'Steel defender', 'Black defender', 'Mithril defender', 'Adamant defender', 'Rune defender', 'Dragon defender'];
			let nextDefender = null;
			
			for (let defender of defenders) {
				if (!this.hasItem(defender)) {
					nextDefender = defender;
					break;
				}
			}
			if (nextDefender !== null) {
				newState.ownedItems.push(nextDefender);
			}
		} else {
			if (!this.hasItem(item)) {
				newState.ownedItems.push(item);
			}
		}
		
		return newState;
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

		newState = this.grantCombatExperience(newState, damage);
		newState = this.grantExperience(newState, 'hitpoints', damage * 1.33);

		if (newState.currentMonster.current_hp <= 0) {
			newState = this.grantPrayerExperience(newState, currentMonster);
			newState = this.grantSlayerExperience(newState, currentMonster);
			newState = this.assignCoinDrop(newState, currentMonster);
			if (currentMonster.drop) {
				newState = this.giveBossDrop(newState, currentMonster.drop);
			}
			newState = this.updateCombat(newState);
			
			const that = this;
			setTimeout(() => {
				that.newMonster();
			}, 75);
		}
	
		this.setState(newState);
	}

	changeAttackMethod(attackmethod) {

		let newState = this.state;

		newState.attackMethod = attackmethod;

		this.setState(newState);
	}

	getCombatStyleBonus(stat) {
		const attackStyle = this.state.attackMethod.style;
		if (stat === "attack") {
			if (attackStyle === 'accurate') {
				return 3;
			} else if (attackStyle === 'controlled') {
				return 1;
			}
		}
		if (stat === "strength") {
			if (attackStyle === 'attack') {
				return 1;
			} else if (attackStyle === 'strength') {
				return 3;
			}
		}
		if (stat === 'ranged') {
			if (attackStyle === 'accurate') {
				return 3;
			} else if (attackStyle === 'longrange') {
				return 1;
			}
		}
		return 0;
	}

	getPlayerMultipliers(stat) {
		switch(stat) {
			case 'attack':
				return [
					[7,  1.05],
					[16, 1.10],
					[34, 1.15],
					[60, 1.15],
					[70, 1.20]
				];
			case 'strength':
				return [
					[4,  1.05],
					[13, 1.10],
					[31, 1.15],
					[60, 1.18],
					[70, 1.23]
				];
			case 'defence':
				return [
					[1,  1.05],
					[10, 1.10],
					[28, 1.15],
					[60, 1.20],
					[70, 1.25]
				]
			case 'ranged':
				return [
					[8,  1.05],
					[26, 1.10],
					[44, 1.15],
					[74, 1.20]
				];
			case 'rangedstrength':
				return [
					[74, 1.23]
				];
			default:
				return [];
		}
	}

	getPrayerMultiplier(stat, prayerLevel = this.state.stats.prayer.level) {
		let multiplier = 1;
		let multipliers = this.getPlayerMultipliers(stat);

		multipliers.forEach(([prayerRequirement, prayerMultiplier]) => {
			if (prayerLevel >= prayerRequirement) {
				multiplier = prayerMultiplier;
			}
		});

		return multiplier;
	}

	getPrayerRangedDamageMultiplier(prayerLevel = this.state.stats.prayer.level) {
		return 1;
	}

	getPrayerMagicDamageMultiplier(prayerLevel = this.state.stats.prayer.level) {
		return 1;
	}

	calculateEffectiveLevel(level, potionMultiplier, prayerMultiplier, combatStyleBonus) {
		return level * potionMultiplier * prayerMultiplier + combatStyleBonus;
	}

	calculateBaseDamage(effectiveLevel, strengthBonus) {
		return Math.floor(1.3 + (effectiveLevel / 10) + (strengthBonus / 80) + ((effectiveLevel * strengthBonus) / 640));
	}

	calculateAttackRoll() {
		// Based upon: https://www.osrsbox.com/blog/2019/01/22/calculating-melee-dps-in-osrs/#4-calculating-hit-chance

		const combatStyleBonus = this.getCombatStyleBonus('attack');
		const attackLevel = this.state.stats.attack.level;
		const potionMultiplier = 1; // Potions are not currently added
		const prayerMultiplier = this.getPrayerMultiplier('attack');
		const attackBonus = this.calculateItemBonus('atk_bonus');

		const effectiveLevel = this.calculateEffectiveLevel(attackLevel, potionMultiplier, prayerMultiplier, combatStyleBonus) + 8 + 1;
		return effectiveLevel * (attackBonus + 64);
	}

	calculateDefenceRoll() {
		// Based upon: https://www.osrsbox.com/blog/2019/01/22/calculating-melee-dps-in-osrs/#4-calculating-hit-chance
		const combatStyleBonus = 0;
		const potionMultiplier = 1;
		const prayerMultiplier = 1;
		const defenceLevel = 0; 
		const defenceBonus = -21; // Currently not added to the monsters

		const effectiveLevel = this.calculateEffectiveLevel(defenceLevel, potionMultiplier, prayerMultiplier, combatStyleBonus) + 8;
		return effectiveLevel * (defenceBonus + 64);
	}

	meleeHitRoll(maxHit) {
		// Based upon: https://www.osrsbox.com/blog/2019/01/22/calculating-melee-dps-in-osrs/#4-calculating-hit-chance

		let attackRoll = this.calculateAttackRoll();
		let defenceRoll = this.calculateDefenceRoll();

		if (attackRoll > defenceRoll) {
			const hitChance = 1 - (defenceRoll + 2) / (2 * (attackRoll + 1));
			const didHit = (hitChance >= Math.random());

			if (didHit) {
				/* Source: https://twitter.com/JagexAsh/status/591321214771077120 */
				return Math.round(Math.random() * maxHit);
			}
		}
		return 0;
	}

	calculateDamage() {
		const combatStyle = this.state.attackMethod.combatStyle;
		if (combatStyle === "melee") {
			return this.meleeHitRoll(this.calculateMaxMeleeHit());
		} else if (combatStyle === "ranged") {
			return this.calculateMaxRangedHit();
		} else if (combatStyle === "magic") {
			return this.calculateMaxMagicHit();
		}
		return false;
	}

	calculateItemBonus(stat) {
		const equipment = this.state.gearsets[this.state.gearsets.worn];
		let statBonus = 0;

		Object.values(equipment).forEach((item) => {
			if (item !== null) {
				statBonus += item[stat];
			}
		});

		return statBonus;
	}

	calculateMaxMeleeHit() {
		/* Source: https://oldschool.runescape.wiki/w/Maximum_melee_hit */
		const strengthLevel = this.state.stats.strength.level
		const combatStyleBonus = this.getCombatStyleBonus('strength');
		const potionMultiplier = 1;
		const prayerMultiplier = this.getPrayerMultiplier('strength');
		const strengthBonus = this.calculateItemBonus('str_bonus');
		const effectiveLevel = this.calculateEffectiveLevel(strengthLevel, potionMultiplier, prayerMultiplier, combatStyleBonus);

		const baseDamage = this.calculateBaseDamage(effectiveLevel, strengthBonus);
		return baseDamage;
	}

	calculateMaxRangedHit() {
		/* Source: https://oldschool.runescape.wiki/w/Maximum_ranged_hit */
		const rangedLevel = this.state.stats.ranged.level;
		const combatStyleBonus = this.getCombatStyleBonus('ranged');
		const potionMultiplier = 1;
		const prayerMultiplier = this.getPrayerMultiplier('ranged');
		const rangedStrength = this.calculateItemBonus('rngd_strength');
		const effectiveLevel = this.calculateEffectiveLevel(rangedLevel, potionMultiplier, prayerMultiplier, combatStyleBonus);

		const baseDamage = this.calculateBaseDamage(effectiveLevel, rangedStrength);
		return baseDamage;
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

	grantExperience(newState, skill, experience) {

		if (Array.isArray(skill)) {
			skill.forEach(sk => {
				newState.stats[sk].experience += (experience * MULTIPLIER * EXP_MULTIPLIER);
				newState.stats[sk].percentage = (this.checkLevelUp(newState.stats[sk].level, newState.stats[sk].experience) === 99 ? 100 : this.calculateNextLevelPercentage(newState.stats[sk].experience));
				newState.stats[sk].level = this.checkLevelUp(newState.stats[sk].level, newState.stats[sk].experience);
			});
		} else {
			newState.stats[skill].experience += (experience * MULTIPLIER * EXP_MULTIPLIER);
			newState.stats[skill].percentage = (this.checkLevelUp(newState.stats[skill].level, newState.stats[skill].experience) === 99 ? 100 : this.calculateNextLevelPercentage(newState.stats[skill].experience));
			newState.stats[skill].level = this.checkLevelUp(newState.stats[skill].level, newState.stats[skill].experience);
		}
		return newState;
	}

	grantCombatExperience(newState, damage) {
		const attackMethod = this.state.attackMethod;

		switch (attackMethod.style) {
			default:
			case 'melee':
			case 'ranged':
				if (Array.isArray(attackMethod.experience)) {
					newState = this.grantExperience(newState, attackMethod.experience, damage * (4 / attackMethod.experience.length));
				} else {
					newState = this.grantExperience(newState, attackMethod.experience, damage * 4);
				}			
			break;

			case 'magic':
				const spellExp = this.getBestSpell().experience;
				newState = this.grantExperience(newState, 'magic', spellExp + damage * 4);
			break;
		}
		return newState;
	}

	grantPrayerExperience(newState, currentMonster) {
		if (currentMonster.bones !== null) {
			const experienceAmount = prayerExperience[currentMonster.bones];
			newState = this.grantExperience(newState, 'prayer', experienceAmount);
		}
		return newState;
	}

	grantSlayerExperience(newState, currentMonster) {
		const experienceAmount = currentMonster.max_hp;
		newState = this.grantExperience(newState, 'slayer', experienceAmount);
		return newState;
	}

	returnRandom(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	percentageChanceToInteger(percentage) {
		return (100 - percentage) / 100;
	}

	checkBossSpawns() {
		const stats = this.state.stats;
		let bossesRolled = [];

		// Cyclops
		if (!this.hasItem('Dragon defender')) {
			if (stats.attack.level + stats.strength.level >= 130 || stats.attack.level === 99 || stats.strength.level === 99) {
				if (Math.random() >= this.percentageChanceToInteger(5)) {
					bossesRolled.push('cyclops');
				}
			}
		}
		// Jad
		if (!this.hasItem('Fire cape')) {
			if (stats.combat.level >= 70) {
				if (Math.random() >= this.percentageChanceToInteger(0.25 + ((stats.combat.level - 70) * 0.05))) {
					bossesRolled.push('tztokjad');
				}
			}
		}
		// Penance Queen
		if (!this.hasItem('Fighter torso')) {
			if (stats.defence.level >= 40) {
				if (Math.random() >= this.percentageChanceToInteger(1 + ((stats.combat.level - 20) * 0.05))) {
					bossesRolled.push('penancequeen');
				}
			}
		}
	
		return bossesRolled;
	}

	chooseNewMonster() {
		const slayerLevel = this.state.stats.slayer.level;
		const bossesList = this.checkBossSpawns();
		if (bossesList.length) return this.returnRandom(bossesList);

		let monsterList = [];
		
		Object.entries(monsters).forEach((monster) => {
			const [key, value] = monster;
			if (!value.boss) {
				if (slayerLevel >= (value.combatlevel - 2) && slayerLevel <= ((value.combatlevel * 2) + 2)) {
					monsterList.push(key);
				}
			}
		});

		if (!monsterList.length) {
			console.log("No monster available");
			console.log(this.state.stats);
			monsterList = ['mossgiant'];
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
		if (monsters[chosenMonster].drop) {
			newState.currentMonster.drop = monsters[chosenMonster].drop
		} else {
			delete newState.currentMonster.drop;
		}

		this.setState(newState);
	}

	assignCoinDrop(newState, monster) {

		const combatMultiplier = 1 + ((this.state.stats.combat.level - 3) * 0.0275);
		newState.coins += (monster.max_hp * 0.9 * combatMultiplier) * MULTIPLIER * GP_MULTIPLIER;
		return newState;
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

	updateCombat(newState, stats) {
		const combatLevel = this.calculateCombat(stats);

		newState.stats.combat.level = combatLevel;

		return newState;
	}

	calculateCombat(stats) {
		const attack = this.state.stats.attack.level;
		const strength = this.state.stats.strength.level;
		const defence = this.state.stats.defence.level;
		const ranged = this.state.stats.ranged.level;
		const magic = this.state.stats.magic.level;
		const hitpoints = this.state.stats.hitpoints.level;
		const prayer = this.state.stats.prayer.level;

		const base = 0.25 * (defence + hitpoints + Math.floor(prayer / 2));
		const melee = 0.325 * (attack + strength);
		const range = 0.325 * (Math.floor(3 * ranged / 2));
		const mage = 0.325 * (Math.floor(3 * magic / 2));

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

	equipGearSet(gearset) {
		let newState = this.state;
		newState.gearsets.worn = gearset;

		if (newState.gearsets[gearset].weapon !== null) {
			newState.attackMethod = this.chooseAttackStyle(newState.gearsets[newState.gearsets.worn].weapon.attackstyles);
		} else {
			newState.attackMethod = this.chooseAttackStyle(['unarmed-punch', 'unarmed-kick', 'unarmed-block']);
		}

		this.setState(newState);
	}

	meetsRequirements(requirements) {

		let requirementsMet = true;

		Object.entries(requirements).forEach((requirement) => {
			const [ requirementName, requirementValue ] = requirement;
			if (requirementName === "attack" || requirementName === "strength" || requirementName === "defence" || requirementName === "ranged"
			|| requirementName === "magic" || requirementName === "hitpoints" || requirementName === "slayer" || requirementName === "prayer") {
					if (this.state.stats[requirementName].level < requirementValue) {
						requirementsMet = false;
					}
			}
			if (requirementName === 'item') {
				if (!this.state.ownedItems.includes(requirementValue)) {
					requirementsMet = false;
				}
			}
		});

		return requirementsMet;
	}

	chooseAttackStyle(itemAttackStyles) {
		let attackStyle = false;
		let currentAttackStyle = this.state.attackMethod.style;
		let oldCombatStyle = this.state.attackMethod.combatStyle
		let newCombatStyle = attackStyles[itemAttackStyles[0]].combatStyle;

		if (oldCombatStyle !== newCombatStyle) {
			if (oldCombatStyle === "melee" && newCombatStyle === "ranged") {
				switch (currentAttackStyle) {
					case 'aggressive':
					case 'controlled':
						currentAttackStyle = 'rapid';
					break;
					case 'defensive':
						currentAttackStyle = 'longrange';
					break;
					default:
					break;
				}
			}
			if (oldCombatStyle === 'ranged' && newCombatStyle === 'melee') {
				switch (currentAttackStyle) {
					case 'rapid':
						currentAttackStyle = 'aggressive';
						break;
					case 'longrange':
						currentAttackStyle = 'defensive';
						break;
					default:
						break;
				}
			}
		}

		itemAttackStyles.forEach((itemAttackStyle) => {
			if (attackStyles[itemAttackStyle].style === currentAttackStyle) {
				attackStyle = attackStyles[itemAttackStyle];
			}
		});

		if (attackStyle === false) {
			attackStyle = attackStyles[itemAttackStyles[0]];
		}

		return attackStyle;
	}

	equipItem(item, slot) {
		if (this.meetsRequirements(item.requirements)) {
			let newState = this.state;
			newState.gearsets[newState.gearsets.worn][slot] = item;

			if (slot === 'weapon') {
				if (item.twoHanded) {
					newState.gearsets[newState.gearsets.worn].shield = null
				}
				newState.attackMethod = this.chooseAttackStyle(item.attackstyles);
			}
			if (slot === 'shield') {
				if (newState.gearsets[newState.gearsets.worn].weapon !== null) {
					if (newState.gearsets[newState.gearsets.worn].weapon.twoHanded) {
						newState.gearsets[newState.gearsets.worn].weapon = null
						newState.attackMethod = this.chooseAttackStyle(['unarmed-punch', 'unarmed-kick', 'unarmed-block']);
					}
				}
			}

			this.setState(newState);
		}
	}

	buyItem(item, slot) {
		if (this.hasEnoughMoney(item.cost)) {
			let newState = this.state;
			newState.ownedItems.push(item.name);

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
			rngd_strength: this.calculateItemBonus('rngd_strength'),
			mage_bonus: this.calculateItemBonus('mage_bonus')
		}

		let income = this.calculatePassiveIncome();

		return (
			<div className='wrap'>
				<Navbar />
				<div id='column-left' className='column'>
					<Monster clickMonster={this.clickMonster} currentMonster={this.state.currentMonster} />
					<Equipment equipment={this.state.gearsets[this.state.gearsets.worn]} itemstats={itemBonusses} />
					<AttackStyle attackMethod={this.state.attackMethod} equippedWeapon={this.state.gearsets[this.state.gearsets.worn].weapon} changeAttackMethod={this.changeAttackMethod}/>
				</div>
				<div id='column-right' className='column'>
					<CoinDisplay coins={this.state.coins} income={income} />
					<ItemShop stats={this.state.stats} ownedItems={this.state.ownedItems} shopSlot={this.state.shopSlot} gearsets={this.state.gearsets} equipItem={this.equipItem} changeShopSlot={this.changeShopSlot} buyItem={this.buyItem} hasEnoughMoney={this.hasEnoughMoney} meetsRequirements={this.meetsRequirements} />
					<GearSets gearsets={this.state.gearsets} equipGearSet={this.equipGearSet}/>
					<Skills stats={this.state.stats} />
				</div>
			</div>
		);
	}
}

export default IdleOSRS;