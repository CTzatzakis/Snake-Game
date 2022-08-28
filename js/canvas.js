class Canvas {
    constructor(canvas, background = '#000000', framesPerSecond = 60) {
        this._canvas = canvas;
        this._context = canvas.getContext("2d");
        this._ratio = 1;
        this._framesPerSecond = framesPerSecond;
        this._background = background;
        this._originX = 0;
        this._originY = 0;

        if (framesPerSecond <= 0) {
            this._framesPerSecond = 60;
        }

        this.setup();
        window.addEventListener('resize', this.setup.bind(this));
    }
	
    get width () {
        return this.canvas.width / this.ratio;
    }

    get height () {
        return this.canvas.height / this.ratio;
    }

    get canvas () {
        return this._canvas;
    }

    get context () {
        return this._context;
    }

    get ratio () {
        return this._ratio;
    }

    clear () {
        this._context.clearRect(-this._originX, -this._originY, this._canvas.width, this._canvas.height);
    }
	/*
    translate (x, y) {
        this.context.translate(x, y);
        this._originX = x;
        this._originY = y;
    }
	*/

    draw (func) {
        setInterval(function() {
            this.clear();
            func();
        }.bind(this), 1000 / this._framesPerSecond);
    }

    setup () {
        let devicePixelRatio = window.devicePixelRatio || 1;
        let backingStoreRatio = this._context.webkitBackingStorePixelRatio ||
            this._context.mozBackingStorePixelRatio ||
            this._context.msBackingStorePixelRatio ||
            this._context.oBackingStorePixelRatio ||
            this._context.backingStorePixelRatio || 1;
        //this._ratio = devicePixelRatio / backingStoreRatio;


        this._canvas.style.background = this._background;
        this._canvas.width = 600*2/3;
        this._canvas.height = 600*2/3;
        this._context.scale(1, 1);

        if (devicePixelRatio !== backingStoreRatio) {

            this._canvas.width = this._canvas.width * this._ratio;
            this._canvas.height = this._canvas.height * this._ratio;

            this._canvas.style.width = this._canvas.width + 'px';
            this._canvas.style.height = this._canvas.height + 'px';

            this._context.scale(this._ratio, this._ratio);
        }
		console.log("this.canvas.width");
		console.log(this.canvas.width);
		console.log("this._canvas.width");
		console.log(this._canvas.width);
    }
}