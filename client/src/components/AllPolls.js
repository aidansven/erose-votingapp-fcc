import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import './styles/AllPolls.css';

class AllPolls extends Component {
	constructor(){
		super()
		this.state = {content: []}
	}
	componentDidMount(){
		$('#card').html('<i class="fa fa-spinner fa-pulse fa-2x fa-fw" />');
		$.get('/api/loadpolls', (res)=>{
			$('#card').html('');
			this.setState({content: res})
		})
	}
	render(){
		return <div id="card">{this.state.content.map(function(d, i){
			return (
				<Link to={'/' + d._id}><div id="question-box" key={i}>
					<h4>{d.question}</h4><br />
					<div id="options-box">
						{d.options.map(function(o, i) {
						return <div id="option" key={i}><div id="votes-num">{o[1]}</div>{o[0]}</div>
					})}
					</div>
				</div></Link>
				)
		})}</div>
	}
}

export default AllPolls;