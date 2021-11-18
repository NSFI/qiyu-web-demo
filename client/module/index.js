import 'CSS/base.less';
import 'CSS/style.less';

import React, {Component} from 'react';
import {render} from 'react-dom';

import Main from './pages/Main';

class App extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="m-app">
                <Main/>
            </div>
        );
    }
}

render(<App/>, document.getElementById('j-root'));