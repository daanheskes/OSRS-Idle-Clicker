import React, { Component } from 'react';

import coinImages from './Data/CoinImages.js';

class CoinDisplay extends Component {

    componentDidMount() {
        Object.values(coinImages).forEach((image) => {
            new Image().src = image.img;
        });
    }

    convertToLetters(amount, round) {
        if (amount >= 100000 && amount < 10000000) {
            return (Math.floor(amount / 1000) + "K").toLocaleString();
        } else if (amount >= 10000000) {
            return (Math.floor(amount / 1000000) + "M").toLocaleString();
        }
        return (Math.floor(amount)).toLocaleString();
    }

    render() {
        const coins = this.props.coins;
        let coinImage = "https://oldschool.runescape.wiki/images/4/44/Coins_1.png";
        let income = this.props.income;
        income = parseFloat(income.toFixed(2));
        let incomeImage = "https://oldschool.runescape.wiki/images/4/44/Coins_1.png";

        Object.values(coinImages).forEach(coin => {
            if (coins >= coin.amount) {
                coinImage = coin.img;
            }
            if (income >= coin.amount) {
                incomeImage = coin.img;
            }
        });

        return(
            <div id='coinDisplay' className='full-width-bar'>
                <div className='coin-wrapper'>
                    <div className='coin-img-wrapper'>
                        <img src={coinImage} alt='Coins' />
                    </div>
                    <span id='coinAmount'>{this.convertToLetters(this.props.coins)}</span>
                </div>
                <div className='income-wrapper'>
                    <span id='income-amount-wrapper'>Income<div className='income-img-wrapper'><img src={incomeImage} alt='Coins' /></div><span id='incomeAmount'>{this.convertToLetters(income)}</span></span>
                </div>
            </div>
        );
    }
}

export default CoinDisplay;