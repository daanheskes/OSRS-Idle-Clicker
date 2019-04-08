import React, { Component } from 'react';

class Monster extends Component {

	constructor(props) {
		super(props);

		this.onClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		const Xcoord = e.clientX;
		const Ycoord = e.clientY;

		this.props.clickMonster(this.props.currentMonster, Xcoord, Ycoord);
	}

	calculateHitpointsPercentage(currentHP, maxHP) {
		return currentHP / maxHP * 100 + "%";
	}

	render() {
		const currentMonster = this.props.currentMonster;
		const monsters = this.props.monsters;

		return (
			<div className='monster-wrap' onClick={this.onClick}>
				<div className='hitpoints'>
					<div className='hitpoints_stats'>{currentMonster.current_hp}/{currentMonster.max_hp}</div>
					<div className='current_hitpoints' style={{width: this.calculateHitpointsPercentage(currentMonster.current_hp, currentMonster.max_hp)}} ></div>
				</div>
				<h1 className='monster-name'>{monsters.chicken.name}</h1>
				<img src={monsters.chicken.img} alt={monsters.chicken.name}/>
			</div>
		);
	}
}

export default Monster;