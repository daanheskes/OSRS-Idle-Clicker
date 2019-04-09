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

		return (
			<div className='monster-wrap' onClick={this.onClick}>
				<div className='hitpoints'>
					<div className='hitpoints_stats'>{currentMonster.current_hp}/{currentMonster.max_hp}</div>
					<div className='current_hitpoints' style={{width: this.calculateHitpointsPercentage(currentMonster.current_hp, currentMonster.max_hp)}} ></div>
				</div>
				<h1 className='monster-name'>{currentMonster.name}</h1>
				<img src={currentMonster.img} alt={currentMonster.img}/>
			</div>
		);
	}
}

export default Monster;