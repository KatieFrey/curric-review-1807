import React from 'react'
import { connect } from 'react-redux'
import { requestCoins, updateCoin } from './store'

export class AllCoins extends React.Component {
    componentDidMount() {
        this.props.getInitialCoins()
        this.mkHandleSubmit.bind(this)
    }

    mkHandleSubmit (id) {
        return (event) => { // <-- THIS FUNCTION is the `handleSubmit`
            event.preventDefault()
            const newName = event.target.nom.value
            // console.log('Submitted new coin form! id & name:', id, newName)
            this.props.changeCoinName(id, newName)
        }
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
                return coin.origin.name === origin // could make this more lenient e.g. with `toLowerCase`
            })
            .map(coin => {
                return (
                    <li key={coin.id}><div>
                        <p>{coin.name}</p>
                        <form onSubmit={ this.mkHandleSubmit(coin.id) }>
                            <input name="nom" />
                            <button type="submit">Change Name</button>
                        </form>
                    </div></li>
                )
            })
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
        changeCoinName: (id, name) => {
            const coinDiff = { id, name }
            dispatch(updateCoin(coinDiff))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCoins)
