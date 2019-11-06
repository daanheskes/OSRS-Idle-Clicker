import React, { Component } from 'react';

class Equipment extends Component {
	render() {
		const equipment = this.props.equipment;
		return(
			<div id='equipmentDisplay'>
				<div className='equipment-wrapper'>
					<div className='equipment-display'>   
						{
						Object.entries(equipment).map((slot) => {
							let hasItemInSlot = (slot[1] !== null && slot[1].constructor === Object && Object.entries(slot[1]).length > 0);
							if (!hasItemInSlot) return false;
							return(
								<div id={'equipment-' + slot[0]} className={'equipment-item hasItem'} key={slot[0]}>
									<img src={slot[1].img} alt={slot[0]} />
								</div>
							);
						})
						}                   
					</div>
					<div className='equipment-stats'>
						<div>
							<span className='equipment-skill-name'>Attack:</span>
							<span className='equipment-skill-stat'>{this.props.itemstats.atk_bonus}</span>
						</div>
						<div>
							<span className='equipment-skill-name'>Defence:</span>
							<span className='equipment-skill-stat'>{this.props.itemstats.def_bonus}</span>
						</div>
						<div>
							<span className='equipment-skill-name'>Strength:</span>
							<span className='equipment-skill-stat'>{this.props.itemstats.str_bonus}</span>
						</div>
						<div>
							<span className='equipment-skill-name'>Ranged:</span>
							<span className='equipment-skill-stat'>{this.props.itemstats.rngd_bonus}</span>
						</div>
						<div>
							<span className='equipment-skill-name'>Magic:</span>
							<span className='equipment-skill-stat'>{this.props.itemstats.mage_bonus}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Equipment;