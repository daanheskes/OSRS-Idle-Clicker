import React, { Component } from 'react';

class Skills extends Component {

	constructor(props) {
		super(props);
		const skillIcons = {
			combat: "https://oldschool.runescape.wiki/images/8/8f/Combat_icon.png?93d63",
			attack: "https://oldschool.runescape.wiki/images/f/fe/Attack_icon.png?b4bce",
			strength: "https://oldschool.runescape.wiki/images/1/1b/Strength_icon.png?e6e0c",
			defence: "https://oldschool.runescape.wiki/images/b/b7/Defence_icon.png?ca0cd",
			ranged: "https://oldschool.runescape.wiki/images/1/19/Ranged_icon.png?01b0e",
			magic: "https://oldschool.runescape.wiki/images/5/5c/Magic_icon.png?334cf",
			hitpoints: "https://oldschool.runescape.wiki/images/9/96/Hitpoints_icon.png?a4819",
			prayer: "https://oldschool.runescape.wiki/images/f/f2/Prayer_icon.png?ca0dc",
			slayer: "https://oldschool.runescape.wiki/images/2/28/Slayer_icon.png?cd34f",
			total: "https://oldschool.runescape.wiki/images/b/bd/Stats_icon.png?1b467"
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