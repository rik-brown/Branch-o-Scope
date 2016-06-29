# cellifract
Kadenze Nature of Code Assignment 4: Fractals

I will create a recursive function which consists of a cell object
The cell will have a behaviour which includes movement, growth & spawning a number of children
The spawned children will be the recursive element, calling the primary function anew

The movement will incorporate a combination of rotation (related to age of cell) and perlin noise (for some variation between cells)

The lifespan of each cell will be relative to it's generation number

The cell could use a concept of 'fertility' but will self-fertilize (binary- or multiple-fission)

When the cell has split, it still exists (gets drawn) but velocity is zero

A new cell needs to inherit:
Position (= current parent position)
Velocity (heading + magnitude) (heading = a function of parent, magnitude = parent)
Starting radius (= current parent radius)
Starting maturity or branch level

Should the 'timeToBranch' parameter be passed on to the cell or calculated inside the cell?
Either way, there needs to be an opportunity to add random / allow for individual variations

The same goes for 'number of branches'

Approach should be to identify which parameters will the cell 'own' and how will random be included.
Proposals:
Movement 
Growth (can be -ve or +ve)
Fertility (= 'time until branch')
Branchiness (= number of branches, from zero to Max)
Branch angle (new direction vs parent direction)

Compared to Cellendipity, the main distinction is that the rules for spawning new cells here are governed by an internal 'recursion rule' as opposed to an external 'environmental chance rule' (ie. being fertile while occupying the same space as a fertile other)
