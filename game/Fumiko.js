var Fumiko = function(canvas) {
	
	this.canvas = canvas;
	var _this = this;

	this.getContext = function() {
		this.ctx = this.canvas.getContext("2d");
	};

	this.buildMainCharacter = function() {

		this.fumiko = new FumikoCharacter(this.canvas,this.ctx);
	};

	this.addEvents = function() {
		window.addEventListener('keydown',function(e){
			if(e.keyCode === 39) {
				_this.fumiko.run();
				e.preventDefault();
			}
		});

		window.addEventListener('keyup',function(e){
			_this.fumiko.stop();
		})
	};

	this.init = function() {

		this.getContext();
		this.buildMainCharacter();
		this.addEvents();

	}.call(this);
};

var FumikoCharacter = function(canvas,ctx) {

	this.ctx = ctx;
	this.canvas = canvas;
	var _this = this;

	this.loadImage = function(url,callback) {

		var image = new Image();
		image.onload = function() {
			callback(image);
		}
		image.src = url;
	};

	this._loadImage = function() {

		this.loadImage('images/charset/fum.png',function(image){
			_this.image = image;
			_this.ctx.drawImage(image,0,0,25,50,0,0,50,50);
			_this.ready = true;
		});
	};

	this.run = function() {

		if(!_this.ready || _this.running) {
			return;
		}

		var position = 0;
		this.running = setInterval(function() {

			_this.canvas.width = _this.canvas.width;
			_this.ctx.drawImage(_this.image,position,0,25,50,0,0,50,50);
			
			position += 24;
			if(position>72) {
				position = 0;
			}
		},90);
	};

	this.stop = function() {

		if(this.running) {
			clearInterval(this.running);
			_this.canvas.width = _this.canvas.width;
			_this.ctx.drawImage(_this.image,0,0,25,50,0,0,50,50);
			this.running = false;
		}
	};

	this.init = function() {

		this._loadImage();

	}.call(this);

};