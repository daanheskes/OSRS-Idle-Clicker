import React, { Component } from 'react';
import attackStyles from './../Data/AttackStyles';

class AttackStyle extends Component {
	renderAttackStyles(attackStyleNames) {
		let attackStyleDivs = attackStyleNames.map((attackStyleName) => {
			let attackStyle = attackStyles[attackStyleName];
			return (
				<div className='attack-style' key={attackStyle.name}>
					<img src={attackStyle.img} alt={attackStyle.name} />
				</div>
			);
		});

		return attackStyleDivs;
	}

	render() {

		return (
			<div id='attackStyles'>
				<div id='attackMethods'>
					{this.renderAttackStyles(['sword-stab', 'sword-lunge-strength', 'sword-slash', 'sword-block'])}
				</div>
			</div>
		);
	}
}

export default AttackStyle;