import React, { Component } from "react";

class ItemSlotMachine extends Component {

	constructor(props) {
		super(props);
		var imgSet = [
			'../assets/img/build-64',
			'../assets/img/cash-64',
			'../assets/img/energy-64',
			'../assets/img/gold-64',
			'../assets/img/goods-64',
			'../assets/img/staff-64'
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

	loadImages(arr, callback) {
		this.images = {};
		var loadedImageCount = 0;

		// Make sure arr is actually an array and any other error checking
		for (var i = 0; i < arr.length; i++){
			var img = new Image();
			img.onload = imageLoaded;
			img.src = arr[i];
			this.images[arr[i] = img;
		}

		function imageLoaded(e) {
			loadedImageCount++;
			if (loadedImageCount >= arr.length) {
				callback();
			}
		}
	}

	preloadImage() {
		const canvas = this.refs.canvas
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = '#ddd';

		for (var i = 0 ; i < this.state.define.ITEM_COUNT ; i++) {
			let img = new Image()
			img.src = 'https://images.viblo.asia/avatar/3baf3941-2d6b-4a27-b8e1-a6654609098f.jpg';
			img.addEventListener("load", function() {

			}, false);
			var asset = this.state.urlimage[i];
			console.log(asset)
			ctx.save();
			ctx.shadowColor = "rgba(0,0,0,0.5)";
			ctx.shadowOffsetX = 5;
			ctx.shadowOffsetY = 5;
			ctx.shadowBlur = 5;
			ctx.drawImage(img, (98 - this.state.define.IMAGE_HEIGHT)/2, i * this.state.define.SLOT_HEIGHT + this.state.define.IMAGE_TOP_MARGIN, 32, 32);
			//ctx.drawImage(img.src, (98 - this.state.define.IMAGE_HEIGHT)/2, (i + this.state.define.ITEM_COUNT) * this.state.define.SLOT_HEIGHT + this.state.define.IMAGE_TOP_MARGIN, 32, 32);
			ctx.restore();
			ctx.fillRect(0, i * this.state.define.SLOT_HEIGHT, 98, this.state.define.SLOT_SEPARATOR_HEIGHT);
			ctx.fillRect(0, (i + this.state.define.ITEM_COUNT)  * this.state.define.SLOT_HEIGHT, 98, this.state.define.SLOT_SEPARATOR_HEIGHT);
		}
	}

	preloadImages( images, callback ) {

		function _preload( asset ) {
			asset.img = new Image();
			asset.img.src = 'https://images.viblo.asia/avatar/3baf3941-2d6b-4a27-b8e1-a6654609098f.jpg';

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



	componentDidMount() {
		preloadImages( this.state.urlimage, function() {
			function _fill_canvas( canvas, items ) {
				const canvas = this.refs.canvas
				var ctx = canvas.getContext('2d');
				ctx.fillStyle = '#ddd';

				for (var i = 0 ; i < ITEM_COUNT ; i++) {
					var asset = items[i];
					ctx.save();
					ctx.shadowColor = "rgba(0,0,0,0.5)";
					ctx.shadowOffsetX = 5;
					ctx.shadowOffsetY = 5;
					ctx.shadowBlur = 5;
					ctx.drawImage(asset.img, (98 - IMAGE_HEIGHT)/2, i * SLOT_HEIGHT + IMAGE_TOP_MARGIN, 32, 32);
					ctx.drawImage(asset.img, (98 - IMAGE_HEIGHT)/2, (i + ITEM_COUNT) * SLOT_HEIGHT + IMAGE_TOP_MARGIN, 32, 32);
					ctx.restore();
					ctx.fillRect(0, i * SLOT_HEIGHT, 98, SLOT_SEPARATOR_HEIGHT);
					ctx.fillRect(0, (i + ITEM_COUNT)  * SLOT_HEIGHT, 98, SLOT_SEPARATOR_HEIGHT);
				}
			}
		})
	}

	render() {
		return(
			<canvas
				id="canvas1"
				width={100}
				height={this.state.define.IMAGE_HEIGHT * this.state.define.ITEM_COUNT * 2}
				ref="canvas"
			></canvas>
		);
	}
}

export default ItemSlotMachine;
