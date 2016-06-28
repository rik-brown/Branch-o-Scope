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
  createCanvas(600, 600);
  ellipseMode(RADIUS);
  populateColony();
}

function draw() {
  if (p.trailMode == 1) {background(p.bkgcol);}
  if (p.trailMode == 2) {trails();}
  for (var i = 0; i < colony.length; i++) {
    print('I ='+ i + '    colony I = ' + colony[i]);
    colony[i].run(); // runs the cell at position i in the colony array
    if (p.displayMode == 1) {colony[i].displayEllipse();}
    if (p.displayMode == 2) {colony[i].displayPoint();}

    if (colony[i].timeToDivide()) {
      if (colony.length < 256) {
        colony.push(colony[i].spawn(30)); // Add one going right
        colony.push(colony[i].spawn(-25)); // Add one going left
      } else {
        //leaves.push(new Leaf(tree[i].end)); // To be added later
      }
    }
  }
}

function populateColony() {
  background(p.bkgcol);
  colony = []; // Empty the arraylist (or make sure it is empty)
  var pos = createVector(width/2, height/2); // First cell is located at center of canvas
  var vel = createVector(0,-1); // Initial velocity vector is northbound
  var c = new Cell (pos, vel, p.cellStartSize, p.lifespan);
  print (c);
  colony.push(c);
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
  this.cellStartSize = 50; // Starting cell radius
  this.lifespan = 200; // How long will the cell live?
  this.displayMode = 1; // 1=ellipse, 2=point, 3=text
  this.trailMode = 1; // 1=none, 2 = blend, 3 = continuous
}

var initGUI = function () {
		var controller = gui.add(p, 'cellStartSize', 2, 200).step(1).name('Size').listen();
    	controller.onChange(function(value) {populateColony(); });
    var controller = gui.add(p, 'lifespan', 500, 5000).step(1).name('Lifespan').listen();
    	controller.onChange(function(value) {populateColony(); });
    var controller = gui.add(p, 'displayMode', { Ellipse: 1, Point: 2 } ).name('Display Mode');
      controller.onChange(function(value) {populateColony(); });
    gui.add(p, 'trailMode', { None: 1, Blend: 2, Continuous: 3} ).name('Trail Mode');
    gui.close()
}
