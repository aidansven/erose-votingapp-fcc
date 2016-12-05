import React, { Component } from 'react';
import './styles/NewPoll.css';
import { browserHistory } from 'react-router';
import $ from 'jquery';

class NewPoll extends Component {
	constructor(){
		super();
		this.state = {
			options: [1, 2]
		}
	}
	addNewOption(){
		let newOptions = this.state.options;
		newOptions.push(this.state.options.length + 1);
		this.setState({options: newOptions})
	}
	submitPoll(){
		function getValue(id){return document.getElementById(id).value}
		let data = {question: getValue('question'), options: []};
		for (let i in this.state.options) {
			if (getValue('option ' + this.state.options[i])) {
				data.options.push([getValue('option ' + this.state.options[i]), 0]);
			}
		}
		if (data.question && data.options.length > 1) {
			$.ajax({
				type: 'POST',
				url: '/api/newpoll',
				data: JSON.stringify(data),
				contentType: "application/json"
			});
			browserHistory.push('/')
		} else {
			alert('Some fields are not correct')
		}
		
	}
	render(){
		return (
			<div id="card">
				<h4>New Poll</h4>
				<div><input id="question" type="text" placeholder="What is your question?"/></div>
				{this.state.options.map(function(key){
					return <input
						type="text"
						key={key}
						id={'option ' + key}
						placeholder={'option ' + key}
					/>
				})}
				<div
					className="btn"
					id="new-option-btn"
					onClick={()=>this.addNewOption()}
				>Add Option</div>
				<div
					className="btn"
					id="submit-poll-btn"
					onClick={()=>this.submitPoll()}
				>Submit</div>
			</div>
		)
	}
}

export default NewPoll;