const initialize = function() {
    // Setup Objects
    let canvas = new Canvas(document.getElementById('canvas'));

    let keyboard = new Keyboard();

    const randomX = function () {
        return Math.floor(Math.random() * (canvas.width / (10 * canvas.ratio))) * (10 * canvas.ratio);
    };

    const randomY = function () {
        return Math.floor(Math.random() * (canvas.height / (10 * canvas.ratio))) * (10 * canvas.ratio);
    };

    let food = [];

    for (let i = 0; i < 3; i++) {
        food.push(
            new Food(
                randomX(),
                randomY(),
                10,
                10,
                canvas.ratio,
                '#FF0000'
            )
        );
    }
	//let Timer = new Timer();
    let snake = new Snake(
        randomX(),
        randomY(),
        10,
        10,
        canvas.ratio,
        '#FFFFFF'
    );

    // Run logic
    setInterval(function () {
        snake.handleScreenInput(document.getElementById('nav').innerHTML);
        snake.handleKeyBoardInput(keyboard);
    }, 1000/60);

    setInterval(function () {
        snake.slither();

        for (let i = food.length; i > 0; i--) {
            if (food[i - 1].collision(snake)) {
                snake.eat(food[i - 1]);
                food[i - 1].move(
                    randomX(),
                    randomY(),
                )
            }
        }

        if ((snake.x < 0) ||
            (snake.x > canvas.width-10) ||
            (snake.y < 0 )||
            (snake.y > canvas.height-10)
        ) {
            snake.die();
			timer.stop();
			window.alert(" \t\t\t\t SNAKE GAME \t\t\t\t \n\n \t\t The game ended with a score : "+document.getElementById('snakeFood').innerText+" \n \t\t and with time : "+document.getElementById('time').innerText+"s"+" \n\n \t\t\t\t\t Replay? \t\t\t\t\t");
			//document.getElementById('snakeMessageDialog').innerText = " SNAKE - The game endded with score : "+document.getElementById('snakeFood').innerText+" and with time : "+document.getElementById('time').innerText+"s"
			document.getElementById('snakeFood').innerText = 0 ;
			document.getElementById('time').innerText = 0 ;
			timer.reset();
			timer.start();
            snake.move(
                randomX(),
                randomY(),
            );
        }

    }, 1000/10)

    const drawGrid = function(canvas) {
		/* GRID
        for (let x = 0; x < canvas.width  ; x += 10 * canvas.ratio) {
            canvas.context.beginPath();
            canvas.context.moveTo(x, 0);
            canvas.context.lineTo(x, canvas.height );

            // set line color
            canvas.context.strokeStyle = '#444444';
            canvas.context.stroke();
        }

        for (let y = 0; y < canvas.height  ; y += 10 * canvas.ratio) {
            canvas.context.beginPath();
            canvas.context.moveTo(0, y);
            canvas.context.lineTo(canvas.width, y);

            // set line color
            canvas.context.strokeStyle = '#444444';
            canvas.context.stroke();
        }
		*/
    };

    // Draw Objects to the canvas
    canvas.draw(
        function () {
            for (let i = food.length; i > 0; i--) {
                food[i - 1].scale = canvas.ratio;
                food[i - 1].draw(canvas);
            }

            snake.scale = canvas.ratio;
            snake.draw(canvas);
            drawGrid(canvas);

        }.bind(canvas)
    );
};

document.addEventListener("DOMContentLoaded", function() {
    initialize();
});
