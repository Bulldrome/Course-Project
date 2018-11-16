(function(doc) {

var canvas = doc.getElementById("testCanvas");
var context = canvas.getContext("2d");

var centerXs = [];
var centerYs = [];

 // click event handler
canvas.onclick = function(e) {

    var x = e.clientX;
    var y = e.clientY;

    for (var i = 0; i < centerXs.length; ++i) {
        var _x_ = centerXs[i];
        var _y_ = centerYs[i];

        if (Math.pow(x - _x_, 2) + Math.pow(y - _y_, 2) < Math.pow(30 * 2, 2)) {
            context.globalCompositeOperation = 'destination-out';
            context.beginPath();
            context.arc(_x_, _y_, 30 + 0.5, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
            centerXs.splice(i, 1);
            centerYs.splice(i, 1);
            --i;
        }
    }

    centerXs.push(x);
    centerYs.push(y);

    var nextColor = randomColor();
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = nextColor; 
    context.beginPath();
    context.arc(e.clientX, e.clientY, 30, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
};

})(document);