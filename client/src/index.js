import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import $ from 'jquery';

import Navbar from './components/Navbar';
import AllPolls from './components/AllPolls';
import NewPoll from './components/NewPoll';
import Poll from './components/Poll';
import Profile from './components/Profile';

import './components/styles/index.css';

class Index extends Component {
	componentDidMount(){
		$.get('/api/userinfo', (res)=>{
			if (res) this.setState(res)
		})
	}
	checkAuth(){
			if (!this.state) {
				alert('Please log in first');
				window.location.href = '/';
			}
	}
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Navbar}>
					<IndexRoute component={AllPolls} />
					<Route path="/new" onEnter={()=>this.checkAuth()} component={()=><NewPoll userid={this.state.userid} />} />
					<Route path="/profile" onEnter={()=>this.checkAuth()} component={()=><Profile
						name={this.state.name}
						userid={this.state.userid}
					/>}/>
					<Route path="/:pollid" component={Poll} />
				</Route>
			</Router>
		)
	}
}
		
ReactDOM.render(<Index />, document.getElementById('root'))