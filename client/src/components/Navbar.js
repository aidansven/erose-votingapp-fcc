import React, { Component } from 'react';
import './styles/Navbar.css';
import $ from 'jquery';
import { Link } from 'react-router';

class Navbar extends Component {
	
	handleLogin(){
		$.get('/auth/facebook/callback', function(response){
			console.log(response)
		});
	}
	
	componentDidMount(){
	}
	
	render(){
		return (
			<div>
			<div id="navbar-container">
				<div id="greeting">Votinator</div>
				<div id="divider"></div>
				
				<Link to="/"><div
					id="allpolls"
					className="navbtn"
					>
					All Polls
				</div></Link>
				<Link to="/new"><div
					id="newpoll"
					className="navbtn"
				>
					New poll
				</div></Link>
				<Link to="/profile"><div
					id="profile"
					className="navbtn"
				>
					Profile
				</div></Link>
				<div id="fb-login" onClick={this.handleLogin}>
					<i className="fa fa-facebook-square" /> Login
				</div>
			</div>
			
			<div id="content">
				{this.props.children}
				</div>
		
		</div>
		)
	}
}

export default Navbar;