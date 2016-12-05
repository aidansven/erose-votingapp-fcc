import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Navbar from './components/Navbar';
import AllPolls from './components/AllPolls';
import NewPoll from './components/NewPoll';
import Poll from './components/Poll';
import Profile from './components/Profile';

import './components/styles/index.css';

class Index extends Component {

	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Navbar}>
					<IndexRoute component={AllPolls} />
					<Route path="/new" component={NewPoll} />
					<Route path="/profile" component={Profile} />
					<Route path="/:pollid" component={Poll} />
				</Route>
			</Router>
		)
	}
}
		
ReactDOM.render(<Index />, document.getElementById('root'))