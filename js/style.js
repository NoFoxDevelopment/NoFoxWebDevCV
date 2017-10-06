$(document).ready(function() {
	$('#logoCircle').fadeIn(750);
});

var cssPath = './css/style.css';
var version = detectIE();

if (typeof window.orientation !== 'undefined') {
	cssPath = './css/mobile.css';
} else if (version != false) {
	cssPath = './css/ie.css';
}

function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
	// IE 10 or older => return version number
	console.log('IE10 or under');
	return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
	// IE 11 => return version number
	console.log('IE 11');
	var rv = ua.indexOf('rv:');
	return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
	// Edge (IE 12+) => return version number
	console.log('IE12+');
	return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

var fileref = document.createElement('link');

fileref.setAttribute('rel', 'stylesheet');
fileref.setAttribute('href', cssPath);

document.getElementsByTagName('head')[0].appendChild(fileref);