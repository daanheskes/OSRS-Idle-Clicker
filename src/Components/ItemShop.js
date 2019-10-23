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

	allShopItems(slot) {
		console.log('slot:' + slot);
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

		const shopSlot = this.props.shopSlot;
		const allShopItems = this.allShopItems(shopSlot);

		let slotlist = [];

    Object.keys(equipment).forEach((slot) => {
			let slotClassName = 'slot slot-' + slot;

			if (slot === shopSlot) {
				slotClassName += ' slot-selected';
			}
      slotlist.push(<div className={slotClassName} key={slot} onClick={this.props.changeShopSlot.bind(this, slot)}></div>);
		});

		const allItems = Object.values(allShopItems).map((item) => {
			let itemClass = 'shopItem';

			let itemBought = false;
			let itemEquipped = false;

			if (this.props.boughtItems[shopSlot] !== null) {
				if (this.props.boughtItems[shopSlot].includes(item.name)) {
					itemClass += ' item-bought';
					itemBought = true;
				}
			}
			if (this.props.gearsets[this.props.gearsets.worn][shopSlot] !== null) {
				if (this.props.gearsets[this.props.gearsets.worn][shopSlot].name === item.name) {
					itemClass += ' item-equipped';
					itemEquipped = true;
				}
			}

			return (
				<div className={itemClass} key={item.name}>
					<div className='shop-column shop-column-1'>
						{
							((!itemBought
								? (
								<div className='itemPrice'>
									<div className='itemPrice-icon-wrapper'>
										<img src={this.returnCoinImage(item.cost)} alt='Coins' />
									</div>
									<span className='itemCost'>{item.cost}</span>
								</div> 
								)
								: (
									<div className='itemStatus'>
										<div className='tooltip' data-tooltip='Owned'>
											<svg className='item-bought' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"/></svg>
										</div>
										{
											((itemEquipped) &&
												<div className='tooltip' data-tooltip='Equipped'>
													<svg className="item-equipped" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2zm-1.3-10.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"/></svg>
												</div>
											)
										}
									</div>
								)
							)
							)
						}
						
						{
							((!itemBought) &&
								(<div className={(this.props.hasEnoughMoney(item.cost) ? 'shop-button shop-buy-button' : 'shop-button shop-buy-button shop-buy-button-disabled')} onClick={this.props.buyItem.bind(this, item, shopSlot)}>
									<span>Purchase</span>
								</div>)
							)
						}
						{
							((!itemEquipped && itemBought) && 
								(<div className='shop-button shop-equip-button' onClick={this.props.equipItem.bind(this, item, shopSlot)}>
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
				<div id='shopFilter'>
					<div id='slotList' className='slot-wrapper'>
						{slotlist}
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