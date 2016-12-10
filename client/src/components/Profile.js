import React, { Component } from 'react';

class Profile extends Component {
	render(){
		return(
			<div id="card">
				<h2>Hello, {this.props.name}</h2>
			</div>
		)
	}
}

export default Profile;