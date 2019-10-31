import React, { Component } from 'react';
import attackStyles from './Data/AttackStyles';

class AttackStyle extends Component {
	renderAttackStyles(attackStyleNames) {
		let attackStyleDivs = attackStyleNames.map((attackStyleName) => {
			let attackStyle = attackStyles[attackStyleName];
			return (
				<div class='attack-style'>
					<img src={attackStyle.img} alt={attackStyle.name} />
				</div>
			);
		});

		return attackStyleDivs;
	}

	render() {

		console.log(attackStyles['sword-stab']);
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