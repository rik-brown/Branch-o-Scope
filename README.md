# cellifract
Kadenze Nature of Code Assignment 4: Fractals

[https://rik-brown.github.io/Branch-o-Scope/]

I aim to create a recursive function using a 'cell' object
The cell will have behaviour including movement, growth & spawning a number of children
The spawned of children will be the recursive element, calling the primary constructor function anew

The movement will incorporate a blend of linear velocity with heading-rotation (related to age of cell) and perlin noise (for some variation between cells)

The lifespan of each cell will be relative to it's generation number <Currently solved by: Lifespan is multiplied by a static value (0.8) at each branch>

Compared to Cellendipity, the main distinction is that the rules for spawning new cells here are governed by an internal 'recursion rule' as opposed to an external 'environmental chance rule' (ie. being fertile while occupying the same space as a fertile other)

It would be awesome to offer the alternative to use a steering force (e.g. avoidance) as an alternative to perlin noise.
Some colour could be nice - colourshifting as radius shrinks?
