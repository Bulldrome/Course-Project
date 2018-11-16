(function(doc) {

var canvas = doc.getElementById("testCanvas");
var context = canvas.getContext("2d");

 // click event handler
canvas.onclick = function(e) {
    var nextColor = randomColor();
    context.fillStyle = nextColor; 
    context.beginPath();
    context.arc(e.clientX, e.clientY, 30, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}
})(document);