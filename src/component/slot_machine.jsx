import React, { Component } from "react";
import ItemSlotMachine from "./item_slot_machine";

class SlotMachine extends Component {

	constructor(props) {
		super(props);
	}

	firsDrawItem() {

	}

	render() {
		return(
			<div id="viewport">
				<div id="container">
					<div id="reels">
						<ItemSlotMachine


						/>
						<canvas id="canvas2" width="98" height="300"></canvas>
						<canvas id="canvas3" width="98" height="300"></canvas>
					</div>
					<div id="buttons">
						<div id="play" className="button button-default">Play</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SlotMachine;
