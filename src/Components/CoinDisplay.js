import React, { Component } from 'react';

class CoinDisplay extends Component {
    render() {
        return(
            <div id='coindisplay'>{Math.floor(this.props.coins)}</div>
        )
    }
}

export default CoinDisplay;