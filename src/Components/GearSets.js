import React, { Component } from 'react';

class GearSets extends Component {
    render() {
        const gearsets = this.props.gearsets;

        let gearsetDivs = [];

        Object.entries(gearsets).forEach((gearset) => {

            const [gearsetKey, gearsetValue] = gearset;

            if (typeof(gearsetValue) === 'object') {
                gearsetDivs.push(<h3 className='gearsetName' key={gearsetKey}>{gearsetKey}</h3>);
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

                gearsetDivs.push(<div className='slot-wrapper' key={'slotwrap-' + gearsetKey}>{slotlist}</div>);
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