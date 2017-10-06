$(document).ready(function() {
	$('#logoCircle').fadeIn(750);
});

var cssPath = 'style.css';

if (typeof window.orientation !== 'undefined') {
	cssPath = 'mobile.css';
	$('.block dropdown').onclick(function (){
		$('.dropdown-content').show();
	});
} else if (navigator.appName == 'Microsoft Internet Explorer' || 'Netscape') {
	cssPath = 'ie.css';
}

var fileref = document.createElement('link');

fileref.setAttribute('rel', 'stylesheet');
fileref.setAttribute('href', cssPath);

document.getElementsByTagName('head')[0].appendChild(fileref);