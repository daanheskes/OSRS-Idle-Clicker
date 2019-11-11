import React, { Component } from 'react';

class GearSets extends Component {
	render() {
		const gearsets = this.props.gearsets;
		const worn = this.props.gearsets.worn;

		let gearsetDivs = [];

		Object.entries(gearsets).forEach((gearset) => {
			const [gearsetKey, gearsetValue] = gearset;
			if (gearsetKey !== 'worn') {
				const isEquipped = (gearsetKey === worn);
				let gearsetDiv = [];
				if (typeof (gearsetValue) === 'object') {
					
					gearsetDiv.push(
						<div className='gearsetHeader' key={gearsetKey}>
							<h3 className='gearsetName'>{gearsetKey}</h3>
							{
								((isEquipped)
								? (
									<div className='tooltip' data-tooltip='Equipped'>
										<svg className='equipped' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2zm-1.3-10.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z'/></svg>
									</div>
									)
								: (
										<div className='button equip-button' onClick={() => this.props.equipGearSet(gearsetKey)}>
											<span>Equip</span>
										</div>
									)
								)
							}
						</div>
					);
					const currentGearset = gearsetValue;

					let slotlist = [];
					Object.entries(currentGearset).forEach((slot) => {

						const [slotKey, slotValue] = slot;

						let hasItemInSlot = (slotValue !== null && slotValue.constructor === Object && Object.entries(slotValue).length > 0);
						if (hasItemInSlot) {
							slotlist.push(<div className={'slot slot-notEmpty slot-' + slotKey} key={slotKey}><img src={slotValue.img} alt={slotValue.name} /></div>);
						} else {
							slotlist.push(<div className={'slot slot-' + slotKey} key={slotKey}></div>);
						}
					});

					gearsetDiv.push(<div className='slot-wrapper' key={'slotwrap-' + gearsetKey}>{slotlist}</div>);
				}
				gearsetDivs.push(<div className='gearset' key={gearsetKey}>{gearsetDiv}</div>);
			}
		});

		return (
			<div id='gearsets'>
				{gearsetDivs}
			</div>
		)
	}
}

export default GearSets;