import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AllCoins from './all-coins.js'

const Default = () => <h1>Welcome to my Coin Collection!</h1>

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/coins" component={AllCoins} />
                    <Route component={Default} />
                </Switch>
            </BrowserRouter>
        )
    }
}
