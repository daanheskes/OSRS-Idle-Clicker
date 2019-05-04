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

    render() {
        return(
            <div id='itemShop'>
                <div className='shopItem'>
                    <div className='shop-column-1'>
                        <div className='itemPrice'>
                            <div className='itemPrice-icon-wrapper'>
                                <img src={this.returnCoinImage(equipment.ring.goldring.cost)} />
                            </div>
                            <span class='itemCost'>{equipment.ring.goldring.cost}</span>
                        </div>
                        <img src={equipment.ring.goldring.img} />
                    </div>
                    <div className='shop-column-2'>
                        <span className='itemName'>{equipment.ring.goldring.name}</span>
                        <div className='itemStats'>
                            
                            <p className={(equipment.ring.goldring.atk_bonus === 0 ? 'stat stat-zero' : 'stat')}>
                                <span className='stat-name'>Attack</span>
                                <span className='stat-value'>{equipment.ring.goldring.atk_bonus}</span>
                            </p>
                            <p className={(equipment.ring.goldring.str_bonus === 0 ? 'stat stat-zero' : 'stat')}>
                                <span className='stat-name'>Strength</span>
                                <span className='stat-value'>{equipment.ring.goldring.str_bonus}</span>
                            </p>
                            <p className={(equipment.ring.goldring.def_bonus === 0 ? 'stat stat-zero' : 'stat')}>
                                <span className='stat-name'>Defence</span>
                                <span className='stat-value'>{equipment.ring.goldring.def_bonus}</span>
                            </p>
                            <p className={(equipment.ring.goldring.rngd_bonus === 0 ? 'stat stat-zero' : 'stat')}>
                                <span className='stat-name'>Ranged</span>
                                <span className='stat-value'>{equipment.ring.goldring.rngd_bonus}</span>
                            </p>
                            <p className={(equipment.ring.goldring.mage_bonus === 0 ? 'stat stat-zero' : 'stat')}>
                                <span className='stat-name'>Magic</span>
                                <span className='stat-value'>{equipment.ring.goldring.mage_bonus}</span>
                            </p>
                            <p className={(equipment.ring.goldring.income === 0 ? 'stat stat-zero' : 'stat')}>
                                <span className='stat-name'>Income</span>
                                <span className='stat-value'>{equipment.ring.goldring.income}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemShop;