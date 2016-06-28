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


