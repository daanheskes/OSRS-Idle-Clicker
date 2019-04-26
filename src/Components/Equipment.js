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
                            if (hasItemInSlot) {
                                return(
                                    <div id={'equipment-' + slot[0]} className={'equipment-item hasItem'} key={slot[0]}>
                                        <img src={slot[1].img} alt={slot[0]} />
                                    </div>
                                );
                            }
                        })
                        }                   
                    </div>
                    <div className='equipment-stats'>
                        <p>Attack: {this.props.itemstats.atk_bonus}</p>
                        <p>Defence: {this.props.itemstats.def_bonus}</p>
                        <p>Strength: {this.props.itemstats.str_bonus}</p>
                        <p>Ranged: {this.props.itemstats.rngd_bonus}</p>
                        <p>Magic: {this.props.itemstats.mage_bonus}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Equipment;