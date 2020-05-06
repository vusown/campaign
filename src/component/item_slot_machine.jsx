import React, { Component } from "react";

class ItemSlotMachine extends Component {

	constructor(props) {
		super(props);

		this.state = {
			'urlimage': this.props.item,
			'define': {
				'IMAGE_HEIGHT': 32,
				'IMAGE_TOP_MARGIN': 7.5,
				'IMAGE_BOTTOM_MARGIN': 7.5,
				'SLOT_SEPARATOR_HEIGHT': 2,
				'SLOT_HEIGHT':  32 + 7.5 + 7.5,//this.define.IMAGE_HEIGHT + this.define.IMAGE_TOP_MARGIN + this.define.IMAGE_BOTTOM_MARGIN + this.define.SLOT_SEPARATOR_HEIGHT // how many pixels one slot image takes
				'ITEM_COUNT': 6, // item count in slots
				'SLOT_SPEED': 10, // how many pixels per second slots roll
				'DRAW_OFFSET': 45, // how much draw offset in slot display from top
			},
			'startPx': -12*(32 + 14 + 2),
			'currentPx': -12*(32 + 14 + 2),
			'refresh': 1,
			'animation': null,
			'result': null,

		}
		this.canvas = React.createRef();
		this.spin = this.spin.bind(this)
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
					ctx.drawImage(asset.img, (98 - this.state.define.IMAGE_HEIGHT)/2, (i + this.state.define.ITEM_COUNT*2) * this.state.define.SLOT_HEIGHT + this.state.define.IMAGE_TOP_MARGIN, 32, 32);
					ctx.restore();
					if (i == 0) {
						ctx.fillRect(0, i * this.state.define.SLOT_HEIGHT, 98, this.state.define.SLOT_SEPARATOR_HEIGHT);
					} else {
						ctx.fillRect(0, i * this.state.define.SLOT_HEIGHT + this.state.define.SLOT_SEPARATOR_HEIGHT , 98, this.state.define.SLOT_SEPARATOR_HEIGHT);
					}

					ctx.fillRect(0, (i + this.state.define.ITEM_COUNT)  * this.state.define.SLOT_HEIGHT + this.state.define.SLOT_SEPARATOR_HEIGHT, 98, this.state.define.SLOT_SEPARATOR_HEIGHT);
					ctx.fillRect(0, (i + this.state.define.ITEM_COUNT*2)  * this.state.define.SLOT_HEIGHT, 98, this.state.define.SLOT_SEPARATOR_HEIGHT);
				}
			}
			_fill_canvas.bind(this)( this.canvas.current, this.state.urlimage );
			//this.canvas.current.style.height = ((this.state.define.IMAGE_HEIGHT + this.state.define.IMAGE_BOTTOM_MARGIN *2 + this.state.define.SLOT_SEPARATOR_HEIGHT)* this.state.define.ITEM_COUNT * 2) + 'px'
			this.canvas.current.style.width = '98px'
		})
	}


	spin() {
		if(this.state.result == null) {
			if (this.state.currentPx < (0 - this.state.define.SLOT_SPEED)) {
				this.canvas.current.style.transform = 'translate3d(0px, ' + this.state.currentPx + 'px, 0px)'
				this.setState({'currentPx': this.state.currentPx + this.state.define.SLOT_SPEED})
			} else {
				this.canvas.current.style.transform = 'translate3d(0px, ' + (this.state.startPx + (this.state.define.SLOT_SPEED + this.state.currentPx)) + 'px, 0px)'
				this.setState({'currentPx': this.state.startPx + (2 * this.state.define.SLOT_SPEED + this.state.currentPx)})
			}
			this.setState({'animation': requestAnimationFrame(this.spin)})
		} else {
			if(this.state.result >=  this.state.currentPx && this.state.currentPx >= this.state.result - this.state.define.SLOT_SPEED ) {
				cancelAnimationFrame(this.state.animation)
				this.setState({'animation': null})
				this.canvas.current.style.transform = 'translate3d(0px, ' + this.state.result + 'px, 0px)'
				this.setState({'result': null})

			} else {
				if (this.state.currentPx < (0 - this.state.define.SLOT_SPEED)) {
					this.canvas.current.style.transform = 'translate3d(0px, ' + this.state.currentPx + 'px, 0px)'
					this.setState({'currentPx': this.state.currentPx + this.state.define.SLOT_SPEED})
				} else {
					this.canvas.current.style.transform = 'translate3d(0px, ' + (this.state.startPx + (this.state.define.SLOT_SPEED + this.state.currentPx)) + 'px, 0px)'
					this.setState({'currentPx': this.state.startPx + (2 * this.state.define.SLOT_SPEED + this.state.currentPx)})
				}
				this.setState({'animation': requestAnimationFrame(this.spin)})
			}
		}
	}

	componentDidMount() {
		this.drawPreloadImages.bind(this)()


	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.spin) {
			requestAnimationFrame(this.spin);
		} else {
			var findResult = 0;
			setTimeout(() => {
				for (const key in this.state.urlimage) {
					console.log(this.state.urlimage[key].id, nextProps.time, key)
					if(this.state.urlimage[key].id == nextProps.result) {
						if(parseInt(key) == 0) {
							findResult = parseInt(key) + this.state.urlimage.length
							break
						} else {
							findResult = parseInt(key)
						}

					}
				}
				this.setState({result:  - (findResult-1)*(this.state.define.SLOT_HEIGHT)-2})
			}, this.props.time)
		}
	}

	render() {

		return(
			<canvas
				width={'98px'}
				height={this.state.define.SLOT_HEIGHT * (this.state.define.ITEM_COUNT * 2 + 3)}
				ref={this.canvas}
			></canvas>
		);
	}
}

export default ItemSlotMachine;
