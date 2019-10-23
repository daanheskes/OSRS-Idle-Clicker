import React, { Component } from 'react';
import coinImages from './Data/CoinImages';
import equipment from './Data/EquipmentList';

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

		for (let coin of Object.values(coinImages)) {
			if (amount >= coin.amount) {
				coinImage = coin.img;
			}
		}

		return coinImage;
	}

	shopItems(slot) {
		return Object.values(equipment[slot]);
	}

	calculateStatDifference(compareItem, stat) {
		const currentItem = this.props.gearsets[this.props.gearsets.worn][compareItem.slot];
		if (currentItem !== null) {
			if (compareItem[stat] === currentItem[stat]) {
				return false;
			}
			if (compareItem[stat] - currentItem[stat] > 0) {
				return '+' + (compareItem[stat] - currentItem[stat]);
			}
			return (compareItem[stat] - currentItem[stat]);
		}

		return '+' + compareItem[stat];
	}

	renderStats(item) {
		let stats = [];

		allStats.forEach((stat) => {
			let statDifference = null;
			if (item[stat.namekey] !== 0) {
				let statDifferenceValue = this.calculateStatDifference(item, stat.namekey);
				if (statDifferenceValue !== false) {
					if (statDifferenceValue > 0) {
						statDifference = <span className='stat-difference'>(<span className='stat-difference-value positive-difference'>{statDifferenceValue}</span>)</span>;
					} else {
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
		const slot = this.props.shopSlot;
		const shopItems = this.shopItems(slot);

		const allItems = Object.values(shopItems).map((item) => {
			let itemClass = 'shopItem';

			let itemBought = false;
			let itemEquipped = false;

			if (this.props.boughtItems[slot].includes(item.name)) {
				itemClass += ' item-bought';
				itemBought = true;
			}
			if (this.props.gearsets[this.props.gearsets.worn][slot].name === item.name) {
				itemClass += ' item-equipped';
				itemEquipped = true;
			}

			return (
				<div className={itemClass} key={item.name}>
					<div className='shop-column shop-column-1'>
						<div className='itemPrice'>
							<div className='itemPrice-icon-wrapper'>
								<img src={this.returnCoinImage(item.cost)} alt='Coins' />
							</div>
							<span className='itemCost'>{item.cost}</span>
						</div>
						{
							((!itemBought) &&
								(<div className={(this.props.hasEnoughMoney(item.cost) ? 'shop-button shop-buy-button' : 'shop-button shop-buy-button shop-buy-button-disabled')} onClick={this.props.buyItem.bind(this, item, slot)}>
									<span>Purchase</span>
								</div>)
							)
						}
						{
							((!itemEquipped && itemBought) && 
								(<div className='shop-button shop-equip-button' onClick={this.props.equipItem.bind(this, item, slot)}>
									<span>Equip</span>
								</div>)
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
				{allItems}
			</div>
		)
	}
}

export default ItemShop;