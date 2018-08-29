import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes'

ReactDOM.render(
    <Provider store={store}>
        <div id="demo" className="fill-xy bg-yellow black column center-xy">
            <Routes />
        </div>
    </Provider>,
    document.getElementById('app')
)
