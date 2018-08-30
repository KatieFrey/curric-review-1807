import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import AllCoins from './all-coins.js'

const Default = () => <h1>Welcome to my Coin Collection!</h1>

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <NavLink to="/">Home</NavLink>
                        <hr />
                        <NavLink to="/coins">Coins</NavLink>
                    </ul>
                    <Switch>
                        <Route exact path="/coins" component={AllCoins} />
                        <Route path="/coins/:origin" component={AllCoins} />
                        <Route component={Default} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
