import React, { Component } from 'react';
import coinImages from './../../Data/CoinImages.js';

class CoinDisplay extends Component {

	convertToLetters(amount) {
		if (amount >= 100000 && amount < 10000000) {
			return (Math.floor(amount / 1000) + "K");
		} else if (amount >= 10000000) {
			return (Math.floor(amount / 1000000) + "M");
		}
		return (Math.floor(amount));
	}

	render() {
		const coins = this.props.coins;
		let coinImage = coinImages[1].img;
		let income = parseFloat(this.props.income.toFixed(2));
		let incomeImage = coinImages[1].img;

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
					<span id='coinAmount'>{this.convertToLetters(this.props.coins).toLocaleString()}</span>
				</div>
				<div className='income-wrapper'>
					<span id='income-amount-wrapper'>Income<div className='income-img-wrapper'><img src={incomeImage} alt='Coins' /></div><span id='incomeAmount'>{this.convertToLetters(income).toLocaleString()}</span></span>
				</div>
			</div>
		);
	}
}

export default CoinDisplay;