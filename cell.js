// cell Class
function Cell(pos, vel, cellStartSize_, lifespan_) {

  // BOOLEAN
  this.moving = true; // A new cell always starts of moving

  // GROWTH & REPRODUCTION
  this.lifespan = lifespan_;
  this.life = lifespan_;
  this.age = 0;


  // SIZE AND SHAPE
  this.cellStartSize = cellStartSize_;
  this.cellEndSize = 0.5;
  this.r = this.cellStartSize; // Initial value for radius
  this.size = map(this.r, this.cellStartSize, this.cellEndSize, 1, 0); // Size is a measure of progress from starting to final radius
  this.flatness = random (0.6, 1.4); // Flatness makes the circle into an ellipse
  this.growth = (this.cellStartSize-this.cellEndSize)/this.lifespan; // Growth-rate is calculated from size & expected lifespan

  // MOVEMENT
  this.position = pos.copy(); //cell has position
  this.velocity = vel.copy(); //cell has velocity

  this.run = function() {
    this.live(); // Cell matures (may be useful later for colorshifting)
    if (this.moving) {this.updatePosition();} // Cell moves if it is moving
    this.updateSize(); // Cell grows
  }

  this.live = function() {
    this.age += 1; // Age starts at 0 and increases by one for every drawcycle
    this.maturity = map(this.age, 0, this.lifespan, 1, 0); // Maturity moves from 1 at spawn to 0 at death
  }

  this.updatePosition = function() {
    this.position.add(this.velocity);
  }

  this.updateSize = function() {
    this.r -= this.growth;
    this.size = map(this.r, this.cellStartSize, this.cellEndSize, 1, 0);
  }

  this.timeToDivide = function() {
    this.life--;
    print ('Life= ' + this.life);
    if (this.life < 0 && this.moving) {
      this.moving = false;
      return true;
    } else {
      return false;
    }
  }

  this.spawn = function(angle) {
    // What is my current heading
    var theta = this.velocity.heading();
    // What is my current speed
    var m = this.velocity.mag();
    // Turn me
    theta += radians(angle);
    // Look, polar coordinates to cartesian!!
    var newvel = createVector(m * cos(theta), m * sin(theta));
    // Return a new Branch
    return new Cell(this.pos, newvel, this.r, this.lifespan * 0.66);
  }




  // Display the cell using ellipse
  this.displayEllipse = function() {
    noStroke();
    fill(255, 0, 0);
    var angle = this.velocity.heading();
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    ellipse(0, 0, this.r, this.r * this.flatness); // Red ellipse at full size of cell
    pop();
  }


  // Display the cell using points
  this.displayPoint = function() {
    noFill();
    strokeWeight(5);
    stroke(255, 0, 0, 128);
    point(this.position.x, this.position.y);
  }

  // this.conception = function(other, distVect) {
  //   // Decrease spawn counters.
  //   this.spawnCount--;
  //   other.spawnCount--;
  //
  //   // Calculate position for spawn based on PVector between cell & other (leaving 'distVect' unchanged, as it is needed later)
  //   this.spawnPos = distVect.copy(); // Create spawnPos as a copy of the (already available) distVect which points from parent cell to other
  //   this.spawnPos.normalize();
  //   this.spawnPos.mult(this.r); // The spawn position is located at parent cell's radius
  //   this.spawnPos.add(this.position);
  //
  //   // Calculate velocity vector for spawn as being centered between parent cell & other
  //   this.spawnVel = this.velocity.copy(); // Create spawnVel as a copy of parent cell's velocity vector
  //   this.spawnVel.add(other.velocity); // Add dad's velocity
  //   this.spawnVel.normalize(); // Normalize to leave just the direction and magnitude of 1 (will be multiplied later)
  //
  //   // Call spawn method (in Colony) with the new parameters for position, velocity, colour & starting radius)
  //   colony.spawn(this.spawnPos, this.spawnVel, this.r*p.growthFactor);
  //
  // }

}
