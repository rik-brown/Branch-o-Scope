/* Kadenze 'Nature of Code'
 * p5.js course with Daniel Shiffman
 * Assignment 4: Fractals
 * 'Cellifract'
 * by Richard Brown
 *
 * FUTURE IDEAS:
 * -none at the present-
 */

var colony = []; // an array of cells

function setup() {
  p = new Parameters();
  gui = new dat.GUI();
  //gui.remember(p); // Can add later
  initGUI();
  createCanvas(1000, 1000);
  ellipseMode(RADIUS);
  populateColony();
}

function draw() {
  if (p.trailMode == 1) {background(p.bkgcol);}
  if (p.trailMode == 2) {trails();}
  for (var i = colony.length-1; i >0;  i--) {
    var c = colony[i];
    c.run(); // runs the cell at position i in the colony array
    if (p.displayMode == 1) {c.displayEllipse();}
    if (p.displayMode == 2) {c.displayPoint();}
    if (c.r <= 0) {colony.splice(i, 1);}
    if (c.timeToDivide()) {
      if (colony.length < 256) {
        colony.push(colony[i].spawn(30)); // Add new cell going right
        colony.push(colony[i].spawn(-25)); // Add new cell going left
        colony.splice(i, 1); // Remove the current cell from the array
      }
    }
  }
  if (colony.length === 0) { if (keyIsPressed || p.autoRestart) {populateColony(); } } // Repopulate the colony when all the cells have died
}

function populateColony() {
  background(p.bkgcol);
  colony = []; // Empty the arraylist (or make sure it is empty)
  for (var n = 0; n < random(1, 5); n++) {
    var pos = createVector(width/2, height/2); // First cell is located at center/bottom of canvas
    var vel = createVector(random(-1, 1), random(-1, 1)); // Initial velocity vector is northbound
    var c = new Cell (pos, vel, p.cellStartSize, p.lifespan);
    colony.push(c);
  }
}

function trails() {
  var transparency = 1; // 255 is fully opaque, 1 is virtually invisible
  blendMode(DIFFERENCE);
  noStroke();
  fill(1);
  rect(-1, -1, width + 1, height + 1);
  blendMode(BLEND);
  fill(255);
}

var Parameters = function () { //These are the initial values, not the randomised ones
  this.bkgcol = 128; // Background colour (greyscale)
  this.cellStartSize = 20; // Starting cell radius
  this.lifespan = 200; // How long will the cell live?
  this.displayMode = 1; // 1=ellipse, 2=point, 3=text
  this.trailMode = 3; // 1=none, 2 = blend, 3 = continuous
  this.noisePercent = random(30); // Percentage of velocity coming from noise-calculation
  this.spiral = random(0.3); // Number of full (TWO_PI) rotations the velocity heading will turn through during lifespan
  this.autoRestart = false; // If true, will not wait for keypress before starting anew
  this.restart = function () {populateColony();};
}

var initGUI = function () {
		var controller = gui.add(p, 'cellStartSize', 2, 200).step(1).name('Size').listen();
    	controller.onChange(function(value) {populateColony(); });
    var controller = gui.add(p, 'lifespan', 50, 500).step(1).name('Lifespan').listen();
    	controller.onChange(function(value) {populateColony(); });
    var controller = gui.add(p, 'noisePercent', 0, 100).step(1).name('Noise%').listen();
    	controller.onChange(function(value) {populateColony(); });
    var controller = gui.add(p, 'spiral', 0, 1).name('Spirals').listen();
    	controller.onChange(function(value) {populateColony(); });
    var controller = gui.add(p, 'displayMode', { Ellipse: 1, Point: 2 } ).name('Display Mode');
      controller.onChange(function(value) {populateColony(); });
    gui.add(p, 'trailMode', { None: 1, Blend: 2, Continuous: 3} ).name('Trail Mode');
    gui.add(p, 'autoRestart').name('Auto-restart');
    gui.add(p, 'restart').name('RESTART');
    gui.close()
}


function mousePressed() {
  var mousePos = createVector(mouseX, mouseY);
  var vel = p5.Vector.random2D();
  var c = new Cell (mousePos, vel, p.cellStartSize, p.lifespan);
  if (mousePos.x < (width-270)) {colony.push(c);}
}

function mouseDragged() {
  var mousePos = createVector(mouseX, mouseY);
  var vel = p5.Vector.random2D();
  var c = new Cell (mousePos, vel, p.cellStartSize, p.lifespan);
  if (mousePos.x < (width-270)) {colony.push(c);}
}
