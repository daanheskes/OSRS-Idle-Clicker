import React, { Component } from 'react';
import coinImages from './../../Data/CoinImages.js';
import equipment from './../../Data/EquipmentList.js';

const allStats = [
	{ name: "Attack", namekey: "atk_bonus" },
	{ name: "Strength", namekey: "str_bonus" },
	{ name: "Defence", namekey: "def_bonus" },
	{ name: "Ranged", namekey: "rngd_bonus" },
	{ name: "Magic", namekey: "mage_bonus" },
	{ name: "Income", namekey: "income" }
];

class ItemShop extends Component {

	returnCoinImage(amount) {
		let coinImage = coinImages[1].img;

		Object.values(coinImages).forEach((coin) => {
			if (amount >= coin.amount) {
				coinImage = coin.img;
			}
		});

		return coinImage;
	}

	hasItem(item) {
		return this.props.ownedItems.includes(item);
	}

	getBestDefender() {
		const defenders = ['Bronze defender', 'Iron defender', 'Steel defender', 'Black defender', 'Mithril defender', 'Adamant defender', 'Rune defender', 'Dragon defender', 'Avernic defender'];
		let bestDefender = false;
		
		for (let defender of defenders) {
			if (this.hasItem(defender)) {
				bestDefender = defender;
			}
		}
		return bestDefender;
	}

	allShopItems(slot) {
		return Object.values(equipment[slot]).filter((item) => {
			// Filter defenders
			if (item.name.includes('defender')) {
				const bestDefender = this.getBestDefender();
				// Show bronze defender if player has no defenders.
				if (bestDefender === false && item.name === 'Bronze defender') return true;
				// Show best defender & Show Avernic defender if best defender is Dragon (to upgrade for money).
				if (item.name === bestDefender || (bestDefender === 'Dragon defender' && item.name === 'Avernic defender')) return true;
				// Show best defender for 1 def pures
				if (this.props.stats.defence.level === 1 && bestDefender !== 'Bronze defender' && bestDefender !== false && item.name === 'Iron defender') return true;
				return false;
			}
			return true;
		});
	}

	calculateStatDifference(compareItem, stat) {
		const currentItem = this.props.gearsets[this.props.gearsets.worn][compareItem.slot];
		let compareItemStat = compareItem[stat];
		let currentItemStat = 0;
		if (currentItem !== null) {
			currentItemStat = currentItem[stat];
		}
		if (compareItemStat === currentItemStat) {
			return false;
		}
		if (compareItemStat > currentItemStat) {
			return '+' + (compareItemStat - currentItemStat);
		}
		return (compareItemStat - currentItemStat);
	}

	convertToLetters(amount) {
		if (amount >= 100000 && amount < 10000000) {
			return (Math.floor(amount / 1000) + "K");
		} else if (amount >= 10000000) {
			return (Math.floor(amount / 1000000) + "M");
		}
		return (Math.floor(amount));
	}

	requirementButtons(item) {
		let buttonsHolder = [];

		Object.entries(item.requirements).forEach((requirement) => {
			const [ requirementName, requirementValue ] = requirement;
			
			let requirementsMet = true;
			if (requirementName === "attack" || requirementName === "strength" || requirementName === "defence" || requirementName === "ranged"
				|| requirementName === "magic" || requirementName === "hitpoints" || requirementName === "slayer" || requirementName === "prayer") {
					if (this.props.stats[requirementName].level < requirementValue) {
					requirementsMet = false;
				}
			}
			if (requirementName === 'item') {
				if (!this.props.ownedItems.includes(requirementValue)) {
					requirementsMet = false;
				}
			}
			if (!requirementsMet) {
				if (requirementName === 'item') {
					buttonsHolder.push(
						<div className='button shop-requirement-button button-disabled' key={item.name + "-" + requirement}>
							<span>{requirementValue}</span>
						</div>
					);
				} else {
					buttonsHolder.push(
						<div className='button shop-requirement-button button-disabled' key={item.name + "-" + requirement}>
							<span>{requirementValue + " " + requirementName}</span>
						</div>
					);
				}
				
			}
		});

		return buttonsHolder;
	}

	renderStats(item) {
		let stats = [];
		allStats.forEach((stat) => {
			let statDifference = null;

			if (item.hasOwnProperty(stat.namekey)) {
				let statDifferenceValue = this.calculateStatDifference(item, stat.namekey);

				if (statDifferenceValue !== false) {
					if (statDifferenceValue > 0) {
						statDifference = <span className='stat-difference'>(<span className='stat-difference-value positive-difference'>{statDifferenceValue}</span>)</span>;
					} else if (statDifferenceValue < 0) {
						statDifference = <span className='stat-difference'>(<span className='stat-difference-value negative-difference'>{statDifferenceValue}</span>)</span>;
					}
				}
			}

			stats.push(
				<p className={(item[stat.namekey] === 0 ? 'stat stat-zero' : 'stat')} key={item + stat.namekey}>
					<span className='stat-name'>{stat.name}</span>
					<span className='stat-value'>{item[stat.namekey]}</span>
					{statDifference}
				</p>
			);
		});
		return stats;
	}

	render() {
		const shopSlot = this.props.shopSlot;
		const allShopItems = this.allShopItems(shopSlot);

		let slotlist = [];

    Object.keys(equipment).forEach((slot) => {
			let slotClassName = 'slot slot-' + slot;

			if (slot === shopSlot) {
				slotClassName += ' slot-selected';
			}
			slotlist.push(<div className={slotClassName} key={slot} onClick={() => this.props.changeShopSlot(slot)}></div>);
		});

		const allItems = Object.values(allShopItems).map((item) => {
			let itemClass = 'shopItem';

			let itemBought = false;
			let itemEquipped = false;
			let itemBuyable = true;
			let itemHasRequirements = false;

			if (item.cost === 0) {
				itemClass += ' item-unbuyable';
				itemBuyable = false;
			}

			if (!(Object.entries(item.requirements).length === 0 && item.requirements.constructor === Object)) {
				itemHasRequirements = true;
			}


			if (this.props.ownedItems.includes(item.name)) {
				itemClass += ' item-owned';
				itemBought = true;
			}
			if (this.props.gearsets[this.props.gearsets.worn][shopSlot] !== null) {
				if (this.props.gearsets[this.props.gearsets.worn][shopSlot].name === item.name) {
					itemClass += ' item-equipped';
					itemEquipped = true;
				}
			}
			if (this.props.meetsRequirements(item.requirements)) {
				itemClass += ' item-meets-requirements';
			}

			return (
				<div className={itemClass} key={item.name}>
					<div className='shop-column shop-column-1'>
						{
							((!itemBought)
								? (
									((itemBuyable)
									? (
										<div className='itemPrice'>
											<img src={this.returnCoinImage(item.cost)} alt='Coins' />
											<span className='itemCost'>{this.convertToLetters(item.cost).toLocaleString()}</span>
										</div>
										)
									: (
										<div className='itemPrice'>
											<span className='itemCost item-unbuyable'>Drop Only</span>
										</div>
										)
									)
								)
								: (
									<div className='itemStatus'>
										<div className='tooltip' data-tooltip='Owned'>
											<svg className='owned' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z'/></svg>
										</div>
										{
											((itemEquipped) &&
												<div className='tooltip' data-tooltip='Equipped'>
													<svg className='equipped' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2zm-1.3-10.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z'/></svg>
												</div>
											)
										}
									</div>
								)
							)
						}
						
						{
							((!itemBought && itemBuyable) &&
								(<div className={(this.props.hasEnoughMoney(item.cost) ? 'button buy-button' : 'button buy-button button-disabled')} onClick={this.props.buyItem.bind(this, item, shopSlot)}>
									<span>Purchase</span>
								</div>)
							)
						}
						{
							((!itemEquipped && itemBought) && 
								((this.props.meetsRequirements(item.requirements))
									? (
										<div className='button equip-button' onClick={this.props.equipItem.bind(this, item, shopSlot)}>
											<span>Equip</span>
										</div>
										)
									: (
										<div className='button equip-button button-disabled'>
											<span>Equip</span>
										</div>
										)
								)
							)
						}
						{
							((itemHasRequirements && (!this.props.meetsRequirements(item.requirements))) &&
								this.requirementButtons(item)
							)
						}
					</div>
					<div className='shop-column shop-column-2'>
						<div className='imageWrapper'>
							<img src={item.img} alt={item.name} />
						</div>
						<span className='itemName'>{item.name}</span>
						<div className='itemStats'>
							{this.renderStats(item)}
						</div>
					</div>
				</div>
			);
		});

		return (
			<div id='itemShop'>
				<div id='shopFilter'>
					<div id='slotList' className='slot-wrapper'>
						{slotlist}
					</div>
					<div className='shopFilters-container'>
						<div className='shopFilters-category'>
							<div className='md-checkbox'>
								<label>
									<input type="checkbox" name="melee" />
									<span>Melee</span>
								</label>
							</div>
							<div className='md-checkbox'>
								<label>
									<input type="checkbox" name="ranged" />
									<span>Ranged</span>
								</label>
							</div>
							<div className='md-checkbox'>
								<label>
									<input type="checkbox" name="magic" />
									<span>Magic</span>
								</label>
							</div>
						</div>
						<div className='shopFilters-category'>
							<div className='md-checkbox'>
								<label>
									<input type="checkbox" name="ownedOnly" />
									<span>Owned Only</span>
								</label>
							</div>
							<div className='md-checkbox'>
								<label>
									<input type="checkbox" name="unownedOnly" />
									<span>Unowned Only</span>
								</label>
							</div>
							<div className='md-checkbox'>
								<label>
									<input type="checkbox" name="equippableOnly" />
									<span>Equippable Only</span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div id='shopItems'>
					{allItems}
				</div>
			</div>
		)
	}
}

export default ItemShop;