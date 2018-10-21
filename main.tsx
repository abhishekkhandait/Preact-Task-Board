import { h, render } from "preact";
import { Provider, connect } from 'preact-redux';

import { App } from "./src/app";
import store from './src/store/store';


render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById("app")
);