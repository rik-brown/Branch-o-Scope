# cellifract
Kadenze Nature of Code Assignment 4: Fractals

I aim to create a recursive function using a 'cell' object
The cell will have behaviour including movement, growth & spawning a number of children
The spawned of children will be the recursive element, calling the primary constructor function anew

The movement will incorporate a blend of linear velocity with heading-rotation (related to age of cell) and perlin noise (for some variation between cells)

The lifespan of each cell will be relative to it's generation number <Currently solved by: Lifespan is multiplied by a static value (0.8) at each branch>

The cell could use a concept of 'fertility' but will self-fertilize (binary- or multiple-fission)

When the cell has split, it still exists (gets drawn) but velocity is zero <Or maybe it is not preferable to continue drawing it, if the primary rendering technique will be 'trails'>

A new cell needs to inherit:
Position (= current parent position)
Velocity (heading + magnitude) (heading = a function of parent, magnitude = parent)
Starting radius (= current parent radius)
Starting maturity or branch level

Should the 'timeToBranch' parameter be passed in from the main Draw() loop to the cell or calculated from inside the cell?
Either way, there needs to be an opportunity to add random / allow for individual variations
Maybe a simple 'generation' value is the most flexible alternative?

The same goes for 'number of branches' to split into, when the time comes.

Approach should be to identify which parameters will the cell 'own' and how will random be included.
Proposals:
Movement
Growth (can be -ve or +ve)
Fertility (= 'time until branch')
Branchiness (= number of branches, from zero to Max)
Branch angle (new direction vs parent direction)

Compared to Cellendipity, the main distinction is that the rules for spawning new cells here are governed by an internal 'recursion rule' as opposed to an external 'environmental chance rule' (ie. being fertile while occupying the same space as a fertile other)

It would be awesome to offer the alternative to use a steering force (e.g. avoidance) as an alternative to perlin noise.
Some colour could be nice - colourshifting as radius shrinks?

NEEDS SOME BUGFIXING - Define the rules for splicing the cells & check that this doesn't create issues downstream
