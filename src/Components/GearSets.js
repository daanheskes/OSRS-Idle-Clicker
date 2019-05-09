import React, { Component } from 'react';

class GearSets extends Component {
    render() {
        const gearsets = this.props.gearsets;

        let gearsetDivs = [];

        Object.entries(gearsets).forEach((gearset) => {
            if (typeof(gearset[1]) === 'object') {
                gearsetDivs.push(<h3 className='gearsetName' key={gearset[0]}>{gearset[0]}</h3>);
                const currentGearset = gearset[1];
                
                let slotlist = [];

                Object.entries(currentGearset).forEach((slot) => {
                    let hasItemInSlot = (slot[1] !== null && slot[1].constructor === Object && Object.entries(slot[1]).length > 0);
                    if (hasItemInSlot) {
                        slotlist.push(<div className={'slot hasItem slot-' + slot[0]} key={slot[0]}><img src={slot[1].img} alt={slot[1].name} /></div>);
                    } else {
                        slotlist.push(<div className={'slot slot-' + slot[0]} key={slot[0]}></div>);
                    }
                    
                });

                gearsetDivs.push(<div className='slot-wrapper' key={'slotwrap-' + gearset[0]}>{slotlist}</div>);
            }
        });

        return(
            <div id='gearsets'>
                {gearsetDivs}
            </div>
        )
    }
}

export default GearSets;