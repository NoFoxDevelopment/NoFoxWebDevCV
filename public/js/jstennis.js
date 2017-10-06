/****************************************************
*     JS Tennis: A simple Pong-like game for JS     *
*           Written by NoFoxDevelopment             *
*                  Find my CV @                     *
* https://github.com/NoFoxDevelopment/NoFoxWebDevCV *
****************************************************/

/********************************************
* TODO:                                     *
*       -give ball random start trajectory. *
*       -experiment with different AIs.     *
*       -optimize ball bounce in re: paddle *
********************************************/

/*jslint browser:true*/ //unfucks jslint for SublimeText.

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var x = canvas.width/2;
var y = canvas.height/2+30;
var xv = 2;
var yv = -2;
var ballRadius = 5;
var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = (canvas.width-paddleWidth)/2;
var aiPaddleHeight = 10;
var aiPaddleWidth = 80;
var aiPaddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var drawing = setInterval(draw, 10);
var playerScore = 0;
var AIScore = 0;
var AISpeed = 2.5;

//Track Mouse Position relative to canvas for precise paddle control
canvas.addEventListener('mousemove', function(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	paddleX = relativeX - paddleWidth/2;
})

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = '#80D414';
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight-5, paddleWidth, paddleHeight);
	ctx.fillStyle = '#FFFFFF';
	ctx.fill();
	ctx.closePath();
}

function drawAIPaddle(){
	ctx.beginPath();
	ctx.rect(aiPaddleX, 5, aiPaddleWidth, aiPaddleHeight);
	ctx.fillStyle = '#FFFFFF';
	ctx.fill();
	ctx.closePath();
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i=0; i<6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	return color;
}


function draw() {
	//Black background
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,canvas.width,canvas.height);

	//Net
	ctx.beginPath();
	ctx.setLineDash([5, 5]);
	ctx.moveTo(0, canvas.height/2);
	ctx.lineTo(canvas.width, canvas.height/2);
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'white';
	ctx.stroke();

	//AI Score
	ctx.fillStyle = 'white';
	ctx.font = '20px Courier';
	ctx.fillText(AIScore, 25, 25);

	//Player Score
	ctx.fillStyle = 'white';
	ctx.font = '20px Courier';
	ctx.fillText(playerScore, 25, canvas.height-25);


	drawBall();
	drawPaddle();
	drawAIPaddle();

	if(x + xv > canvas.width-ballRadius || x + xv < ballRadius) { //Bounce off walls
        xv = -xv;
    }
    if(y + yv - 9 < ballRadius) {
        if(x > aiPaddleX && x < aiPaddleX + aiPaddleWidth) {
            yv = -yv*1.05;
            let dx = x-(aiPaddleX+aiPaddleWidth/2);
            xv = dx*0.15; //Simple angle control and bounce-back when hitting the paddle with slightly increased ball speed.
        }
        else {
        	if (playerScore === 0 || playerScore === 15) {
        		playerScore += 15;
        		AISpeed += .25;
        		reset(); //AI misses ball, so increase by 15 if score @ Love or 15, then reset ball position. Also increase AI speed slightly to ramp up difficulty
        	}
        	else if (playerScore === 30) {
        		playerScore += 10;
        		AISpeed += 1;
        		reset(); //AI misses ball, so increase by 10 if score @ 30, then reset ball position. Also increase AI speed a bit more to ramp up difficulty
        	}
        	else if (playerScore === 40) {
        		ctx.fillStyle = '#0070E3';
	            ctx.font = "30px Courier";
	            ctx.fillText('YOU WIN!', 160, canvas.height/2);
	            document.getElementById('reloadButton').style.display='block';
	            endGame();  //AI misses ball, so win if playerscore is 40, then give "Play Again" button to reload page and allow another match.
        	}
        }
    }
    else if(y + yv + 9 > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            yv = -yv*1.05;
            let dx = x-(paddleX+paddleWidth/2);
            xv = dx*0.15; //Simple angle control and bounce-back when hitting the paddle with slightly increased ball speed.
        }
        else {
        	if (AIScore === 0 || AIScore === 15) {
        		AIScore += 15;
        		AISpeed -= .15; //Slightly slow down AI.
        		reset(); //Player misses ball, so increase AIScore by 15 if score @ Love or 15, then reset ball position. Also decrease AI speed slightly to ramp down difficulty
        	}
        	else if (AIScore === 30) {
        		AIScore += 10;
        		AISpeed -= .2; //Slow down AI a bit more to give player a better chance.
        		reset(); //Player misses ball, so increase AIScore by 10 if score @ 30, then reset ball position. Also decrease AI speed a bit more to ramp down difficulty
        	}
        	else if (AIScore === 40) {
        		ctx.fillStyle = '#0070E3';
	            ctx.font = "30px Courier";
	            ctx.fillText('AI WIN!', 160, canvas.height/2);
	            document.getElementById('reloadButton').style.display='block';
	            endGame(); //Player misses ball, so lose if AIscore is 40, then give "Play Again" button to reload page and allow another match.
        	}
        }
    }

    if (aiPaddleX+aiPaddleWidth/2 < x) { //Basic "Shaky Paddle AI" will track ball at predetermined speed. This means players will need to use Angle control to score against AI.
    	aiPaddleX += AISpeed;
    } else {
    	aiPaddleX -= AISpeed;
    }

	x += xv;
	y += yv;
}

function endGame() { //Stop drawing when game is won or lost.
	clearInterval(drawing);
}

function reset() { //Reset ball position and velocity.
	x=canvas.width/2;
	y=canvas.height/2;
	xv=2;
	yv=-2;
}