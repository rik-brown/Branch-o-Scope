# Branch-o-Scope
Kadenze Nature of Code Assignment 4: Fractals

[https://rik-brown.github.io/Branch-o-Scope/]

My goal was to create a recursive function using a 'cell' object.
The 'cell' has behaviour including movement, growth & spawning a number of 'children.
The spawned children are the recursive element, calling the 'cell' constructor function anew for a given number of generations.

Cell movement comprises an adjustable composite of simple linear velocity, perlin noise-based velocity and rotation of heading (in proportion to age of cell).

Cell size, growth-rate and lifespan determine the appearance of each branch-element.
'Branchiness' determines how soon a cell may divide, while 'angle' controls the heading of the new branch relative to the parent.

Cell and background color may be selected in the menu.
Fill and stroke colors may also be individually 'tweaked' (hue, saturation or brightness) in proportion to the cell radius. 

Future ideas:
I would like to experiment with different branching rules (e.g. varying the number of children, allowing the parent branch to continue growing, branching to alternative sides etc.).
I would also like to try  some other movement behaviours, e.g. using a steering force (like avoidance) as an alternative to perlin noise.

Richard Brown
3rd July 2016

