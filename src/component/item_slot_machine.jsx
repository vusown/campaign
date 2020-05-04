import React, { Component } from "react";

class ItemSlotMachine extends Component {

	constructor(props) {
		super(props);
		
		var imgSet = [
			{url: 'http://ikonen.me/examples/slot/img/build-64.png'},
			{url: 'http://ikonen.me/examples/slot/img/cash-64.png'},
			{url: 'http://ikonen.me/examples/slot/img/energy-64.png'},
			{url: 'http://ikonen.me/examples/slot/img/gold-64.png'},
			{url: 'http://ikonen.me/examples/slot/img/goods-64.png'},
			{url: 'http://ikonen.me/examples/slot/img/staff-64.png'},

		]
		imgSet = this.shuffleArray(imgSet)
		
		this.state = {
			'urlimage': imgSet,
			'define': {
				'IMAGE_HEIGHT': 32,
				'IMAGE_TOP_MARGIN': 7.5,
				'IMAGE_BOTTOM_MARGIN': 7.5,
				'SLOT_SEPARATOR_HEIGHT': 2,
				'SLOT_HEIGHT':  32 + 7.5 + 7.5 + 2,//this.define.IMAGE_HEIGHT + this.define.IMAGE_TOP_MARGIN + this.define.IMAGE_BOTTOM_MARGIN + this.define.SLOT_SEPARATOR_HEIGHT // how many pixels one slot image takes
				'RUNTIME': 3000, // how long all slots spin before starting countdown
				'SPINTIME': 1000, // how long each slot spins at minimum
				'ITEM_COUNT': 6, // item count in slots
				'SLOT_SPEED': 15, // how many pixels per second slots roll
				'DRAW_OFFSET': 45, // how much draw offset in slot display from top
			}
		}
		this.canvas = React.createRef();
	}

	shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			var j = parseInt(Math.random() * i)
			var tmp = array[i];
			array[i] = array[j]
			array[j] = tmp;
		}
		return array
	}

	preloadImages( images, callback ) {
		function _preload( asset ) {
			asset.img = new Image();
			asset.img.src = asset.url;

			asset.img.addEventListener("load", function() {
				_check();
			}, false);

			asset.img.addEventListener("error", function(err) {
				_check(err, asset.id);
			}, false);
		}

		var loadc = 0;
		function _check( err, id ) {
			if ( err ) {
				alert('Failed to load ' + id );
			}
			loadc++;
			if ( images.length == loadc )
				return callback()
		}

		images.forEach(function(asset) {
			_preload( asset );
		});
	}

	drawPreloadImages() {
		this.preloadImages( this.state.urlimage, () => {
			function _fill_canvas( canvas, items ) {
				var ctx = canvas.getContext('2d');
				ctx.fillStyle = '#ddd';
				
				for (var i = 0 ; i < this.state.define.ITEM_COUNT ; i++) {
					var asset = items[i];
					ctx.save();
					ctx.shadowColor = "rgba(0,0,0,0.5)";
					ctx.shadowOffsetX = 5;
					ctx.shadowOffsetY = 5;
					ctx.shadowBlur = 5;
					ctx.drawImage(asset.img, (98 - this.state.define.IMAGE_HEIGHT)/2, i * this.state.define.SLOT_HEIGHT + this.state.define.IMAGE_TOP_MARGIN, 32, 32);
					ctx.drawImage(asset.img, (98 - this.state.define.IMAGE_HEIGHT)/2, (i + this.state.define.ITEM_COUNT) * this.state.define.SLOT_HEIGHT + this.state.define.IMAGE_TOP_MARGIN, 32, 32);
					ctx.restore();
					ctx.fillRect(0, i * this.state.define.SLOT_HEIGHT, 98, this.state.define.SLOT_SEPARATOR_HEIGHT);
					ctx.fillRect(0, (i + this.state.define.ITEM_COUNT)  * this.state.define.SLOT_HEIGHT, 98, this.state.define.SLOT_SEPARATOR_HEIGHT);
				}
			}
			_fill_canvas.bind(this)( this.canvas.current, this.state.urlimage );
			this.canvas.current.style.height = (this.state.define.IMAGE_HEIGHT * this.state.define.ITEM_COUNT * 2) + 'px'
		})
	}
	
	spin() {
		let currentPx = 0;
    
    // setInterval(() => {
		// 	this.canvas.current.style.transform = 'translate3d(0px, '+ (currentPx -= 1) +'px, 0px)'
		// }, 1000);
		this.canvas.current.style.transform = 'translate3d(0px,-' +4*this.state.define.SLOT_HEIGHT+'px, 0px)'
	}
	
	componentDidMount() {
		this.drawPreloadImages.bind(this)()
		if(true) {
			this.spin.bind(this)()
		}
	}

	render() {
		return(
			<canvas
				id="canvas1"
				width={'100px'}
				height={this.state.define.IMAGE_HEIGHT * this.state.define.ITEM_COUNT*2}
				ref={this.canvas}
			></canvas>
		);
	}
}

export default ItemSlotMachine;
