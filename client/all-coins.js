import React from 'react'
import { connect } from 'react-redux'
import { requestCoins } from './store'

export class AllCoins extends React.Component {
    componentDidMount() {
        this.props.getInitialCoins()
    }
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

const mapDispatchToProps = dispatch => {
    return {
        getInitialCoins: () => dispatch(requestCoins()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCoins)
