import React, { Component } from 'react';

const coinImages = {
    1: {
        amount: 1,
        img: "https://oldschool.runescape.wiki/images/4/44/Coins_1.png"
    },
    2: {
        amount: 2,
        img: "https://oldschool.runescape.wiki/images/b/b9/Coins_2.png"
    },
    3: {
        amount: 3,
        img: "https://oldschool.runescape.wiki/images/6/69/Coins_3.png"
    },
    4: {
        amount: 4,
        img: "https://oldschool.runescape.wiki/images/b/ba/Coins_4.png"
    },
    5: {
        amount: 5,
        img: "https://oldschool.runescape.wiki/images/0/00/Coins_5.png"
    },
    25: {
        amount: 25,
        img: "https://oldschool.runescape.wiki/images/6/65/Coins_25.png"
    },
    100: {
        amount: 100,
        img: "https://oldschool.runescape.wiki/images/b/b6/Coins_100.png"
    },
    250: {
        amount: 250,
        img: "https://oldschool.runescape.wiki/images/d/d5/Coins_250.png"
    },
    1000: {
        amount: 1000,
        img: "https://oldschool.runescape.wiki/images/a/af/Coins_1000.png"
    },
    10000: {
        amount: 10000,
        img: "https://oldschool.runescape.wiki/images/3/30/Coins_10000.png"
    }
}



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