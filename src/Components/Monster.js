import React, { Component } from 'react';

class Monster extends Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		const element = document.getElementById('monster-hitsplats');
		const bounds = element.getBoundingClientRect();

		const Xcoord = e.clientX - bounds.left - 24;
		const Ycoord = e.clientY - bounds.top - 23;

		this.props.clickMonster(this.props.currentMonster, Xcoord, Ycoord);
	}

	calculateHitpointsPercentage(currentHP, maxHP) {
		return currentHP / maxHP * 100 + "%";
	}

	render() {
		const currentMonster = this.props.currentMonster;

		return (
			<div className='monster-wrap'>
				<div className='monster-name-wrap full-width-bar'>
					<h1 className='monster-name'>{currentMonster.name} (Lv. {currentMonster.combatlevel})</h1>
				</div>
				<div className='monster-hitpoints'>
					<div className='monster-hitpoints_stats'>{Math.floor(currentMonster.current_hp)}/{Math.floor(currentMonster.max_hp)}</div>
					<div className='monster-current_hitpoints' style={{width: this.calculateHitpointsPercentage(currentMonster.current_hp, currentMonster.max_hp)}} ></div>
				</div>
				<div className='monster-background'>
					<div className='monster-image-wrap' onClick={this.handleClick}>
						<div id='monster-hitsplats'></div>
						<img className='monster-image' src={currentMonster.img} alt={currentMonster.name} />
					</div>
				</div>
			</div>
		);
	}
}

export default Monster;