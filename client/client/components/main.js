import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import mainReducer from '../reducers/reducer.js';
import Display from './display.js';
import Edit from './edit.js';

let store = createStore(mainReducer);
// <div id=""></div>

const Main = () => (
    <Provider store={store}>
        <div className="container">
            <div><span id="title">ASK NASA</span></div>
            <div><input type="text" id="filter" placeholder="Ask NASA anything"/></div>
        </div>
    </Provider>
);

export default Main;
