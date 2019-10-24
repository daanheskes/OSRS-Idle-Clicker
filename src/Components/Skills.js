import React, { Component } from 'react';

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => {
		return images[item.replace('./', '')] = r(item);
	});
	return images;
}

const images = importAll(require.context('./../assets/skills', false, /\.png$/));

class Skills extends Component {

	constructor(props) {
		super(props);
		const skillIcons = {
			combat: images['Combat.png'],
			attack: images['Attack.png'],
			strength: images['Strength.png'],
			defence: images['Defence.png'],
			ranged: images['Ranged.png'],
			magic: images['Magic.png'],
			hitpoints: images['Hitpoints.png'],
			prayer: images['Prayer.png'],
			slayer: images['Slayer.png'],
			total: images['Total.png'],
		}
		this.skillIcons = skillIcons;
	}

	calculateTotalLevel(stats) {
		let totalLevel = 0;
		Object.entries(stats).forEach(function(stat) {
			if ("experience" in stat[1]) {
				totalLevel += stat[1].level;
			}
		});
		return totalLevel;
	}

	render() {
		const stats = this.props.stats;
		const totalLevel = this.calculateTotalLevel(stats);

		return(
			<div className='skills-wrap'>
			{
				Object.entries(stats).map(stat => {
					return(
					<div className="skill" key={stat[1].name}>
						<div className='skillImg-wrap'>
							<img src={this.skillIcons[stat[0]]} title={stat[1].name} alt={stat[1].name} />
						</div>
						<span className='skillLevel'>{(stat[0] === 'total' ? totalLevel : stat[1].level)}</span>
						{("experience" in stat[1] ? <div className="skillProgress"><div className='skillProgressBar' style={{width: stat[1].percentage + "%"}}></div></div> : '')}
					</div>
					);
				})
			}
			</div>
		);
	}
}

export default Skills;