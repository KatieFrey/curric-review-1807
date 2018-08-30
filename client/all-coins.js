import React from 'react'
import { connect } from 'react-redux'

export class AllCoins extends React.Component {
    render() {
        if (this.props.loading) {
            return <p>Loading, please wait…</p>
        }
        if (this.props.error) {
            return (
                <div>
                    <p>ERROR, sorry!</p>
                    <pre>{this.props.error.message}</pre>
                </div>
            )
        }
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
        loading: state.loading,
        error: state.error,
    }
}

export default connect(mapStateToProps)(AllCoins)
