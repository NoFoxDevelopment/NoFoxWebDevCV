/*jslint browser:true*/

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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,canvas.width,canvas.height);

	ctx.fillStyle = 'white';
	ctx.font = '20px Courier';
	ctx.fillText(AIScore, 25, 25);

	ctx.fillStyle = 'white';
	ctx.font = '20px Courier';
	ctx.fillText(playerScore, 25, canvas.height-25);


	drawBall();
	drawPaddle();
	drawAIPaddle();

	if(x + xv > canvas.width-ballRadius || x + xv < ballRadius) {
        xv = -xv;
    }
    if(y + yv < ballRadius) {
        if(x > aiPaddleX && x < aiPaddleX + aiPaddleWidth) {
            yv = -yv*1.05;
            let dx = x-(aiPaddleX+aiPaddleWidth/2);
            xv = dx*0.15;
        }
        else {
        	if (playerScore === 0 || playerScore === 15) {
        		playerScore += 15;
        		AISpeed += .25;
        		reset();
        	}
        	else if (playerScore === 30) {
        		playerScore += 10;
        		AISpeed += 1;
        		reset();
        	}
        	else if (playerScore === 40) {
        		ctx.fillStyle = '#0070E3';
	            ctx.font = "30px Courier";
	            ctx.fillText('YOU WIN!', 160, canvas.height/2);
	            document.getElementById('reloadButton').style.display='block';
	            endGame(); 
        	}
        }
    }
    else if(y + yv > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            yv = -yv*1.05;
            let dx = x-(paddleX+paddleWidth/2);
            xv = dx*0.15;
        }
        else {
        	if (AIScore === 0 || AIScore === 15) {
        		AIScore += 15;
        		reset();
        	}
        	else if (AIScore === 30) {
        		AIScore += 10;
        		reset();
        	}
        	else if (AIScore === 40) {
        		ctx.fillStyle = '#0070E3';
	            ctx.font = "30px Courier";
	            ctx.fillText('AI WIN!', 160, canvas.height/2);
	            document.getElementById('reloadButton').style.display='block';
	            endGame(); 
        	}
        }
    }

    if (aiPaddleX+aiPaddleWidth/2 < x) {
    	aiPaddleX += AISpeed;
    } else {
    	aiPaddleX -= AISpeed;
    }

	x += xv;
	y += yv;

	if (rightPressed & paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	} else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
}

function endGame() {
	clearInterval(drawing);
}

function reset() {
	x=canvas.width/2;
	y=canvas.height/2;
	xv=2;
	yv=-2;
}