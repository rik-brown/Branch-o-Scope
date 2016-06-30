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
  initGUI();
  createCanvas(windowWidth, windowHeight);
  ellipseMode(RADIUS);
  populateColony();
}

function draw() {
  colonyDebugger();
  if (p.trailMode == 1) {background(p.bkgcol);}
  if (p.trailMode == 2) {trails();}
  for (var i = colony.length-1; i >=0;  i--) { // Iterate through the array backwards because objects are being spliced
    var c = colony[i];
    c.run(); // runs the cell at position i in the colony array
    if (c.growing && p.displayMode == 1) {c.displayEllipse();}
    if (c.growing && p.displayMode == 2) {c.displayPoint();}
    if (c.timeToDivide()) {
      if (colony.length < 512) {
        colony.push(colony[i].spawn(random(10, 30))); // Add new cell going right
        colony.push(colony[i].spawn(random(-10,-30))); // Add new cell going left
        colony.splice(i, 1); // Remove the current cell from the array
      }
    }
    if (c.dead()) {colony.splice(i, 1);} // if a cell has died, remove it from the array
  }
  if (colony.length === 0) { if (keyIsPressed || p.autoRestart) {populateColony(); } } // Repopulate the colony when all the cells have died
}

function populateColony() {
  background(p.bkgcol);
  colony = []; // Empty the arraylist (or make sure it is empty)
  for (var n = 0; n < p.colonySize; n++) {
    var pos = createVector(width/2, height/2); // First cell is located at center/bottom of canvas
    var vel = p5.Vector.random2D(); // Initial velocity vector is northbound
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
  this.bkgcol = 0; // Background colour (greyscale)
  this.colonySize = 1; // Number of cells spawned initially
  this.cellStartSize = 20; // Starting cell radius
  this.growth = 0; // If +ve, cell size will increase, if -ve, cell size will decrease
  this.lifespan = 200; // How long will the cell live?
  this.displayMode = 1; // 1=ellipse, 2=point, 3=text
  this.trailMode = 3; // 1=none, 2 = blend, 3 = continuous
  this.noisePercent = random(30); // Percentage of velocity coming from noise-calculation
  this.spiral = random(0.3); // Number of full (TWO_PI) rotations the velocity heading will turn through during lifespan
  this.autoRestart = false; // If true, will not wait for keypress before starting anew
  this.restart = function () {populateColony();};
}

var initGUI = function () {
    var controller = gui.add(p, 'colonySize', 1, 20).step(1).name('Colony Size').listen();
      controller.onChange(function(value) {populateColony(); });
    var controller = gui.add(p, 'cellStartSize', 2, 200).step(1).name('Cell Size').listen();
    	controller.onChange(function(value) {populateColony(); });
    var controller = gui.add(p, 'growth', -10, +10).step(0.1).name('Growth Factor').listen();
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

function keyTyped() {
  if (key === ' ') { //spacebar respawns with current settings
    populateColony();
  }
}

function colonyDebugger() { // Displays some values as text at the top left corner (for debug only)
  fill(0);
  rect(0,0,300,20);
  fill(360, 100);
  textSize(16);
  text("Nr. cells: " + colony.length, 10, 20);
}
