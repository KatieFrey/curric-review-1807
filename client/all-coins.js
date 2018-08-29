import React from 'react'
import { connect } from 'react-redux'

export class AllCoins extends React.Component {
    render() {
        return (
            <ul>
                {this.props.coins.map(coin => (
                    <li key={coin.id}>{coin.name}</li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        coins: state.coins,
    }
}

export default connect(mapStateToProps)(AllCoins)
