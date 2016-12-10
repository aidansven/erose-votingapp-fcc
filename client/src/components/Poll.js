import React, { Component } from 'react';
import $ from 'jquery';
import Chart from 'chart.js';
import './styles/Poll.css';

class Poll extends Component {
	constructor(){
		super();
		this.state = {data: ''}
	}
	handleClick(e){
		//update the data with the selection
		let newdata = this.state.data;
		let option = e.target.innerHTML;
		let chartLabels = [];
		let chartData = [];
		for (var i in newdata.options){
			if (newdata.options[i][0] === option){newdata.options[i][1]++}
			chartLabels.push(newdata.options[i][0]);
			chartData.push(newdata.options[i][1]);
		}
		this.setState({data: newdata});
		setTimeout(()=>$('.btn').css('display', 'none'), 1)
		
		//pass data to donut chart
		var data = {
			labels: chartLabels,
			datasets: [
				{
					data: chartData,
					backgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56",
						"#C9227E",
						"#0BBC5E",
						"#FFBA08",
						"#D00000",
						"#3F88C5"
					]
				}]
		};
		var ctx = document.getElementById('chart');
		var myDoughnutChart = new Chart(ctx, {
			type: 'doughnut',
			data: data
		})
		
		//update the selection in DB
		$.ajax({
			method: 'POST',
			url: '/api/addvote',
			contentType: 'application/json',
			data: JSON.stringify(newdata),
			success: (res)=>{
				console.log(res)
			}
		})
	}
	componentDidMount(){
		$.get('/api/poll/' + this.props.params.pollid, (res)=>{
			this.setState({data: res});
		})
	}
	render(){
		if (!this.state.data) return null;
		return (
			<div id="card">
				<h2>{this.state.data.question}</h2>
				{this.state.data.options.map((option)=>{
					return (<div className="btn" key={option} onClick={(e)=>this.handleClick(e)}>{option[0]}</div>)
				})}
				<h4>Place your vote to see results!</h4>
				<canvas id="chart"></canvas>
			</div>
		)
	}
}

export default Poll;