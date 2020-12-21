
// http://codingtra.in
// Steering Text Paths
// I added the functionality to make the particles change into another text and changed the positioning of the text to always be in the middle of the canvas

var font;
var vehicles = [];

//var texts = ['Welcome', 'aboard', 'the', 'coding', 'train', '!!!'];
//var nextT = 0;
var formattedTime = "00:00:00";
var prevSec = -1;
var maxChangeForce = 0;

var instructions = [];
var insText = '"akan ada hari baik"';

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(480, 500);
    background(60);

    var bounds = font.textBounds(formattedTime, 10, 10, 192);
    var posx = width / 2- bounds.w / 4;
    var posy = height / 2 + bounds.h / 4;

    var points = font.textToPoints(formattedTime, posx, posy, 192, {
        sampleFactor: 0.1
			
    });

    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }

    var boundsIns = font.textBounds(insText, 0, 0, 30);
    var posxIns = width /2.3 - boundsIns.w / 2;
    var posyIns = height / 6 + boundsIns.h / 2;

    var insAr = split(insText, ' ');

    for (var i = 0; i < insAr.length; i++) {
        var bounds2 = font.textBounds(insAr[i], 0, 0, 30);
        var posx2 = posxIns;
        var posy2 = posyIns;

        posxIns += bounds2.w + 30;

        var points2 = font.textToPoints(insAr[i], posx2, posy2, 35, {
            sampleFactor: 0.6
        });

        for (var j = 0; j < points2.length; j++) {
            var pt = points2[j];
            var v = new Vehicle(pt.x, pt.y, 2);
            instructions.push(v);
        }
    }
}

function draw() {
    background(60);
  
  calcTime();

    for (var i = 0; i < instructions.length; i++) {
        var v = instructions[i];
        v.behaviors();
        v.update();
        v.show();
    }

    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }
}

function calcTime() {
  var hours = hour();
  var minutes = minute();
  var seconds = second();
  
  if(seconds != prevSec) {
    prevSec = seconds;
    hours = nf(hours, 2, 0);
    minutes = nf(minutes, 2, 0);
    seconds = nf(seconds, 2, 0);
    updateText(hours + ":" + minutes + ":" + seconds);
  }
}

function updateText(newText) {
    //nextT++;
    //if (nextT > texts.length - 1) {
        //nextT = 0;
    //}

  formattedTime = newText;
    var bounds = font.textBounds(formattedTime, 0, 0, 110);
  var posx = width / 8 - bounds.w / 8;
    var posy = height / 2 + bounds.h / 2;

    var points = font.textToPoints(formattedTime, posx, posy, 110, {
        sampleFactor: 0.1
    });

    if (points.length < vehicles.length) {
        var toSplice = vehicles.length - points.length;
        vehicles.splice(points.length - 1, toSplice);

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    } else if (points.length > vehicles.length) {

        for (var i = vehicles.length; i < points.length; i++) {
            var v = vehicles[i - 1].clone();

            vehicles.push(v);
        }

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }

    } else {
        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    }
}
