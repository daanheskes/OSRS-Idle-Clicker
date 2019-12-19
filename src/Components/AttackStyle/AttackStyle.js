import React, { Component } from 'react';
import attackStyles from './../../Data/AttackStyles.js';

class AttackStyle extends Component {

	renderAttackStyles(attackStyleNames) {
		if (attackStyleNames.length) {
			let attackStyleDivs = attackStyleNames.map((attackStyleName) => {
				let attackStyle = attackStyles[attackStyleName];

				if (attackStyleName === this.props.attackMethod.shortname) {
					return (
						<div className='attack-style attack-style-selected' key={attackStyle.name}>
							<img src={attackStyle.img} alt={attackStyle.name} />
						</div>
					);
				}
				return (
					<div className='attack-style' key={attackStyle.name} onClick={() => this.props.changeAttackMethod(attackStyle)}>
						<img src={attackStyle.img} alt={attackStyle.name} />
					</div>
				);
			});

			return attackStyleDivs;
		}
	}

	render() {
		let attackStyles = ['unarmed-punch', 'unarmed-kick', 'unarmed-block'];
		if (this.props.equippedWeapon !== null) {
			attackStyles = this.props.equippedWeapon.attackstyles;
		}
		return (
			<div id='attackStyles'>
				<div id='attackMethods'>
					{this.renderAttackStyles(attackStyles)}
				</div>
			</div>
		);
	}
}

export default AttackStyle;