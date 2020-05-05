import React, { Component } from "react";
import ItemSlotMachine from "./item_slot_machine";

class SlotMachine extends Component {

	constructor(props) {
		super(props)

		var imgSet = [
			{url: 'http://ikonen.me/examples/slot/img/build-64.png', id:1},
			{url: 'http://ikonen.me/examples/slot/img/cash-64.png', id:2},
			{url: 'http://ikonen.me/examples/slot/img/energy-64.png', id:3},
			{url: 'http://ikonen.me/examples/slot/img/gold-64.png', id:4},
			{url: 'http://ikonen.me/examples/slot/img/goods-64.png', id:5},
			{url: 'http://ikonen.me/examples/slot/img/staff-64.png', id:6},
		]

		this.state = {
			stop: false,
			listItem1: this.shuffleArray(imgSet),
			listItem2: this.shuffleArray(imgSet),
			listItem3: this.shuffleArray(imgSet),
			result: [],
		}
		this.handleStopDemo = this.handleStopDemo.bind(this)
	}

	shuffleArray(array) {
		let cloneArray = [...array]
		for (let i = cloneArray.length - 1; i > 0; i--) {
			var j = parseInt(Math.random() * i)
			var tmp = cloneArray[i];
			cloneArray[i] = cloneArray[j]
			cloneArray[j] = tmp;
		}
		return cloneArray
	}

	handleStopDemo() {
		this.setState({'stop': !this.state.stop })
		setTimeout(() => {
			this.setState({stop: false,result: [1,3,2]  })
		}, 3000);
	}

	componentDidMount() {
		window.requestAnimFrame = (function(){
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame
		})();
	}

	render() {
		return(
			<div id="viewport">
				<div id="container">
					<div id="reels">
						<ItemSlotMachine
							spin={this.state.stop}
							item={this.state.listItem1}
							result={this.state.result[0]}
							time={1000}
						/>
						<ItemSlotMachine
							spin={this.state.stop}
							item={this.state.listItem2}
							result={this.state.result[1]}
							time={2000}
						/>
						<ItemSlotMachine
							spin={this.state.stop}
							item={this.state.listItem3}
							result={this.state.result[2]}
							time={3000}
						/>
					</div>
					<div id="buttons">
						<div id="play" className="button button-default" onClick={this.handleStopDemo}>Play</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SlotMachine;
