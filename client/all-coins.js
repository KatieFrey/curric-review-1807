import React from 'react'
import { connect } from 'react-redux'

export class AllCoins extends React.Component {
    render() {
        const origin = this.props.match.params.origin
        const allCoins = this.props.coins
            .filter(coin => {
                if (!origin) return true
                return coin.origin === origin
            })
            .map(coin => <li key={coin.id}>{coin.name}</li>)
        return <ul>{allCoins}</ul>
    }
}

const mapStateToProps = state => {
    return {
        coins: state.coins,
    }
}

export default connect(mapStateToProps)(AllCoins)
