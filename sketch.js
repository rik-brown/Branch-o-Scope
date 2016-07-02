/* Kadenze 'Nature of Code'
 * p5.js course with Daniel Shiffman
 * Assignment 4: Fractals
 * 'Branch-o-Scope'
 * by Richard Brown
 *
 * FUTURE IDEAS:
 * + Eplore different types of branching events (e.g. parent cell lives on and may produce further branches)
 */

var colony = []; // an array of cells

function setup() {
  colorMode(HSB, 360, 255, 255, 255);
  p = new Parameters();
  gui = new dat.GUI();
  //gui.remember(p); // Uncomment this to enable saving presets in the GUI
  initGUI();
  createCanvas(windowWidth, windowHeight);
  ellipseMode(RADIUS);
  smooth();
  populateColony(); // create an initial population of cells
}

function draw() {
  //colonyDebugger(); Uncomment this for a counter showing number of cells
  if (p.trailMode == 1) {background(p.bkgColor);} // background will be refreshed on every draw cycle
  if (p.trailMode == 2) {trails();} // calls a function to make blended trails
  for (var i = colony.length-1; i >=0;  i--) { // Iterate through the colony array backwards because objects are being spliced
    var c = colony[i];
    c.run(); // runs the cell at position i in the colony array
    if (p.displayMode == 1) {c.displayEllipse();} // display the cell as an ellipse
    if (p.displayMode == 2) {c.displayPoint();} // display the cell as a point
    if (c.timeToBranch()) { // Initiates a division event when the parent cell is ready
      if (c.level < p.maxLevels) { // Test to stop dividing after a chosen number of iterations
        c.level ++;
        colony.push(colony[i].spawn(random(p.maxAngle*0.5, p.maxAngle))); // Add new cell going right
        colony.push(colony[i].spawn(random(-p.maxAngle*0.5,-p.maxAngle))); // Add new cell going left
        colony.splice(i, 1); // Remove the current cell from the array
      }
    }
    if (c.dead()) {colony.splice(i, 1);} // if a cell has died, remove it from the array
  }
  if (colony.length === 0) { if (keyIsPressed || p.autoRestart) {populateColony(); } } // Repopulate the colony when all the cells have died (if key pressed or autorestart selected)
}

function populateColony() { // Spawns (pushes) a population of cells to the array
  background(p.bkgColor);
  colony = []; // Empty the arraylist (or make sure it is empty)
  for (var n = 0; n < p.colonySize; n++) {
    var pos = createVector(width/2, height/2); // Cell is located at the center of the canvas
    var vel = p5.Vector.random2D(); // Initial velocity vector is random
    var startLevel = 1; // First cells start at level 1
    var c = new Cell (pos, vel, p.cellStartSize, p.lifespan, startLevel);
    colony.push(c);
  }
}

function trails() { // gives a cool trail effect
  var transparency = 1;
  blendMode(DIFFERENCE);
  noStroke();
  fill(1);
  rect(-1, -1, width + 1, height + 1);
  blendMode(BLEND);
  fill(255);
}

var Parameters = function () { //These are the initial values for all the parameters & functions shown in the GUI
  this.colonySize = int(random(1, 5)); // Number of cells spawned initially
  this.maxLevels = int(random(4, 7)); // Number of times cell may divide. Range 1-9 (512)
  this.cellStartSize = random(20,50); // Starting cell radius
  this.lifespan = random (200, 300); // How long will the cell live?
  this.growth = random (-10, -2); // If +ve, cell size will increase, if -ve, cell size will decrease
  this.branchiness = 20 // At what stage of a cells lifetime will it branch?
  this.maxAngle = random(30,60); // Largest possible angle between new branch and stem
  this.noisePercent = random(30); // Percentage of velocity coming from noise-calculation
  this.spiral = random(0.2); // Number of full (TWO_PI) rotations the velocity heading will turn through during lifespan
  this.bkgColHSV = { h: random(360), s: random(), v: random() };
  this.bkgColor = color(this.bkgColHSV.h, this.bkgColHSV.s*255, this.bkgColHSV.v*255); // Background colour
  this.fillColHSV = { h: random(360), s: random(), v: random() };
  this.fillColor = color(this.fillColHSV.h, this.fillColHSV.s*255, this.fillColHSV.v*255); // Cell fill colour
  this.fillAlpha = random(255);
  this.strokeColHSV = { h: random(360), s: random(), v: random() };
  this.strokeColor = color(this.strokeColHSV.h, this.strokeColHSV.s*255, this.strokeColHSV.v*255); // Cell stroke colour
  this.strokeAlpha = random(255);
  if (random(1) > 0.5) {this.fill_HTwist = floor(random(1, 360));} else {this.fill_HTwist = 0;}
  if (random(1) > 0.6) {this.fill_STwist = floor(random (1,255));} else {this.fill_STwist = 0;}
  if (random(1) > 0.6) {this.fill_BTwist = floor(random (1,255));} else {this.fill_BTwist = 0;}
  if (random(1) > 0.5) {this.stroke_HTwist = floor(random(1, 360));} else {this.stroke_HTwist = 0;}
  if (random(1) > 0.6) {this.stroke_STwist = floor(random (1,255));} else {this.stroke_STwist = 0;}
  if (random(1) > 0.6) {this.stroke_BTwist = floor(random (1,255));} else {this.stroke_BTwist = 0;}
  this.displayMode = 1; // 1=ellipse, 2=point
  this.trailMode = 3; // 1=none, 2 = blend, 3 = continuous
  this.autoRestart = false; // If true, will not wait for keypress before restarting
  this.restart = function () {populateColony();}; // Function to manually restart
  this.randomRestart = function () {randomizer(); populateColony();}; // Function to randomize values and restart
  this.screenshot = function () {saveCanvas('screendump.png', 'png');} // Function to save a screenshot as .png file
  this.hide = function () {};
}

var randomizer = function () { //Randomizes most of the parameters using the full available range
  p.colonySize = int(random(1, 10)); // Number of cells spawned initially
  p.maxLevels = int(random(3, 9)); // Number of times cell may divide. Range 1-9 (512)
  p.cellStartSize = random(10,100); // Starting cell radius
  p.lifespan = random (50, 500); // How long will the cell live?
  p.branchiness = random(20, 80); // At what stage of a cells lifetime will it branch?
  p.growth = random (-1, -4); // If +ve, cell size will increase, if -ve, cell size will decrease
  p.maxAngle = random(90); // Largest possible angle between new branch and stem
  p.noisePercent = random(100); // Percentage of velocity coming from noise-calculation
  p.spiral = random(0.5); // Number of full (TWO_PI) rotations the velocity heading will turn through during lifespan
  p.bkgColHSV = { h: random(360), s: random(), v: random() };
  p.bkgColor = color(p.bkgColHSV.h, p.bkgColHSV.s*255, p.bkgColHSV.v*255); // Background colour
  p.fillColHSV = { h: random(360), s: random(), v: random() };
  p.fillColor = color(p.fillColHSV.h, p.fillColHSV.s*255, p.fillColHSV.v*255); // Cell colour
  p.fillAlpha = random(255);
  p.strokeColHSV = { h: random(360), s: random(), v: random() };
  p.strokeColor = color(p.strokeColHSV.h, p.strokeColHSV.s*255, p.strokeColHSV.v*255); // Cell colour
  p.strokeAlpha = random(255);
  p.fill_HTwist = floor(random(1, 360));
  p.fill_STwist = floor(random (1,255));
  p.fill_BTwist = floor(random (1,255));
  p.stroke_HTwist = floor(random(1, 360));
  p.stroke_STwist = floor(random (1,255));
  p.stroke_BTwist = floor(random (1,255));
}


var initGUI = function () {
  var f1 = gui.addFolder('Colony');
  var controller = f1.add(p, 'colonySize', 1, 25).step(1).name('Seeds').listen();
    controller.onChange(function(value) {populateColony(); });
  var controller = f1.add(p, 'maxLevels', 2, 9).step(1).name('Levels').listen();
    controller.onChange(function(value) {populateColony(); });
  var f2 = gui.addFolder('Cell');
  var controller = f2.add(p, 'cellStartSize', 1, 100).step(1).name('Radius').listen();
    controller.onChange(function(value) {populateColony(); });
  var controller = f2.add(p, 'lifespan', 50, 500).step(1).name('Length').listen();
    controller.onChange(function(value) {populateColony(); });
  var controller = f2.add(p, 'branchiness', 1, 100).step(1).name('Branchiness').listen();
    controller.onChange(function(value) {populateColony(); });
  var controller = f2.add(p, 'growth', -10, +10).step(0.1).name('Growth').listen();
    controller.onChange(function(value) {populateColony(); });
  var controller = f2.add(p, 'maxAngle', 0, 90).step(1).name('Angle').listen();
    controller.onChange(function(value) {populateColony(); });
  var controller = f2.add(p, 'noisePercent', 0, 100).step(1).name('Noise').listen();
    controller.onChange(function(value) {populateColony(); });
  var controller = f2.add(p, 'spiral', 0, 0.5).name('Twist').listen();
    controller.onChange(function(value) {populateColony(); });
  var f3 = gui.addFolder('Color');
  var controller = f3.addColor(p, 'bkgColHSV').name('Background').listen();
    controller.onChange(function(value) {p.bkgColor = color(value.h, value.s*255, value.v*255); background(p.bkgColor); populateColony();});
  var controller = f3.addColor(p, 'fillColHSV').name('Fill').listen();
    controller.onChange(function(value) {p.fillColor = color(value.h, value.s*255, value.v*255); populateColony();});
  var controller = f3.add(p, 'fillAlpha', 0, 255).name('Transparency').listen();
    controller.onChange(function(value) {populateColony(); });
  var controller = f3.addColor(p, 'strokeColHSV').name('Outline').listen();
    controller.onChange(function(value) {p.strokeColor = color(value.h, value.s*255, value.v*255); populateColony();});
  var controller =f3.add(p, 'strokeAlpha', 0, 255).name('Transparency').listen();
    controller.onChange(function(value) {populateColony(); });
  var f4 = gui.addFolder("Fill Color Tweaks");
    f4.add(p, 'fill_HTwist', 0, 360).step(1).name('Hue').listen();
    f4.add(p, 'fill_STwist', 0, 255).step(1).name('Saturation').listen();
    f4.add(p, 'fill_BTwist', 0, 255).step(1).name('Brightness').listen();
  var f5 = gui.addFolder("Outline Color Tweaks");
    f5.add(p, 'stroke_HTwist', 0, 360).step(1).name('Hue').listen();
    f5.add(p, 'stroke_STwist', 0, 255).step(1).name('Saturation').listen();
    f5.add(p, 'stroke_BTwist', 0, 255).step(1).name('Brightness').listen();

  var f6 = gui.addFolder('Options');
  var controller = f6.add(p, 'displayMode', { Ellipse: 1, Point: 2 } ).name('Display Mode');
    controller.onChange(function(value) {populateColony(); });
  f6.add(p, 'trailMode', { None: 1, Blend: 2, Continuous: 3} ).name('Trail Mode');
  var controller = f6.add(p, 'autoRestart').name('Auto-restart');
    controller.onChange(function(value) {populateColony(); });
  gui.add(p, 'restart').name('RESEED [Space]');
  gui.add(p, 'randomRestart').name('RANDOMIZE [R]');
  gui.add(p, 'screenshot').name('SCREENSHOT [S]');
  gui.add(p, 'hide').name('[H] hides menu');
  gui.close(); // The GUI is closed initially
}

function mousePressed() { //Spawns a single new cell at the mouse position
  var mousePos = createVector(mouseX, mouseY);
  var vel = p5.Vector.random2D();
  var startLevel = 1;
  var c = new Cell (mousePos, vel, p.cellStartSize, p.lifespan, startLevel);
  if (mousePos.x < (width-270)) {colony.push(c);}
}

function mouseDragged() { //Spawns multiple new cells at the mouse position
  var mousePos = createVector(mouseX, mouseY);
  var vel = p5.Vector.random2D();
  var startLevel = 1;
  var c = new Cell (mousePos, vel, p.cellStartSize, p.lifespan, startLevel);
  if (mousePos.x < (width-270)) {colony.push(c);}
}

function keyTyped() {
  if (key === ' ') { // spacebar restarts with current settings
    populateColony();
  }

  if (key === 's') { // S saves a screenshot
    saveCanvas('screendump.png', 'png');
  }

  if (key === 'r') { // R randomizes parameters & restarts
    p.randomRestart();
  }
}

function colonyDebugger() { // Displays values at the top left corner (for debug only)
  fill(50);
  rect(0,0,120,22);
  fill(360, 100);
  textSize(15);
  text("Nr. cells: " + colony.length, 10, 19);
}
