import React, { Component } from 'react';
import coinImages from './Data/CoinImages';
import equipment from './Data/EquipmentList';

class ItemShop extends Component {

    returnCoinImage(amount) {
        let coinImage = coinImages[1].img;

        Object.values(coinImages).forEach(coin => {
            if (amount >= coin.amount) {
                coinImage = coin.img;
            }
        });

        return coinImage;
    }

    chooseItems() {
        let items = [];
        items.push(equipment.ring.goldring);
        items.push(equipment.weapon.bronzescimitar);
        return items;
    }

    allStats() {
        return [
            {name: "Attack", namekey: "atk_bonus"},
            {name: "Strength", namekey: "str_bonus"},
            {name: "Defence", namekey: "def_bonus"},
            {name: "Ranged", namekey: "rngd_bonus"},
            {name: "Magic", namekey: "mage_bonus"},
            {name: "Income", namekey: "income"}
        ];
    }

    calculateStatDifference(compareItem, stat) {
        const currentItem = this.props.equipment[compareItem.slot];
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
        let allStats = this.allStats();
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
                <p className={(item[stat.namekey] === 0 ? 'stat stat-zero' : 'stat')}>
                    <span className='stat-name'>{stat.name}</span>
                    <span className='stat-value'>{item[stat.namekey]}</span>
                    {statDifference}
                </p>
            );
        });
        return stats;
    }

    render() {
        const showItems = this.chooseItems();

        const allItems = showItems.map((item) => {
            return (
            <div className='shopItem' key={item.name}>
                <div className='shop-column-1'>
                    <div className='itemPrice'>
                        <div className='itemPrice-icon-wrapper'>
                            <img src={this.returnCoinImage(item.cost)} alt='Coins' />
                            </div>
                        <span className='itemCost'>{item.cost}</span>
                    </div>
                    <img src={item.img} alt={item.name} />
                </div>
                <div className='shop-column-2'>
                    <span className='itemName'>{item.name}</span>
                    <div className='itemStats'>
                        {this.renderStats(item)}
                    </div>
                </div>
            </div>
            );
        });

        return(
            <div id='itemShop'>
                {allItems}
            </div>
        )
    }
}

export default ItemShop;