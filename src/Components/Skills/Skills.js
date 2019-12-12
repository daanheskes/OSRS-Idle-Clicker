import React, { Component } from 'react';

import combatImage from './../../assets/skills/Combat.png';
import attackImage from './../../assets/skills/Attack.png';
import strengthImage from './../../assets/skills/Strength.png';
import defenceImage from './../../assets/skills/Defence.png';
import rangedImage from './../../assets/skills/Ranged.png';
import magicImage from './../../assets/skills/Magic.png';
import hitpointsImage from './../../assets/skills/Hitpoints.png';
import prayerImage from './../../assets/skills/Prayer.png';
import slayerImage from './../../assets/skills/Slayer.png';
import totalImage from './../../assets/skills/Total.png';

class Skills extends Component {

	constructor(props) {
		super(props);
		const skillIcons = {
			combat: combatImage,
			attack: attackImage,
			strength: strengthImage,
			defence: defenceImage,
			ranged: rangedImage,
			magic: magicImage,
			hitpoints: hitpointsImage,
			prayer: prayerImage,
			slayer: slayerImage,
			total: totalImage,
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