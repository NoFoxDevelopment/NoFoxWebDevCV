/*jslint browser:true*/

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = '#7800FF';
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
	drawBall();

	if (y+dy < 0 || y+dy > canvas.height-ballRadius) {
		dy = -dy;
	} 

	if (x+dx < 0 || x+dx > canvas.width-ballRadius) {
		dx = -dx;
	}

	x += dx;
	y += dy;
}

setInterval(draw, 10);