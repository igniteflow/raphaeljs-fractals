/**
 * @author Phil Tysoe
 * Koch snowflake in raphaeljs (http://en.wikipedia.org/wiki/Koch_snowflake)
 * Ported to raphaeljs from http://www.cs.utoronto.ca/~noam/fractal.html by Noam Sutskever
 */
CANVAS_WIDTH = 500;
CANVAS_HEIGHT = 500;
CANVAS_COLOUR = "#333"
SNOWFLAKE_COLOUR = "white"
ITERATIONS = 4

window.onload = function() {
    for (i = 1; i <= ITERATIONS; i++) {
	init(i);
    }
}

function changeBackground(color) {
   document.body.style.background = color;
}

function init(iterations){
    changeBackground(CANVAS_COLOUR);
    canvas = new Raphael('container', CANVAS_WIDTH, CANVAS_HEIGHT);
    fractal([50,150],[500,150],iterations);
    fractal([270,490],[50,150],iterations);
    fractal([500,150],[270,490],iterations);
};

function fractal(move_to, line_to, iterations){

    if (iterations < 0){
        return null;
    }

    draw_line(move_to, line_to, SNOWFLAKE_COLOUR);

    var C = divide(add(multiply(move_to, 2), line_to), 3);
    var D = divide(add(multiply(line_to, 2), move_to), 3);
    var F = divide(add(move_to, line_to), 2);
    
    var V1 = divide(minus(F, move_to), length(F, move_to));
    var V2 = [V1[1], -V1[0]];

    var E = add(multiply(V2, Math.sqrt(3)/6 * length(line_to, move_to)), F);

    if (iterations !=0){
        for (var i = 0; i < 10; i++)
            draw_line(C, D, CANVAS_COLOUR);
    }
    
    fractal(move_to, C, iterations-1);
    fractal(C, E, iterations-1);
    fractal(E, D, iterations-1);
    fractal(D, line_to, iterations-1);
};

function multiply(v, num){
    return [v[0]*num, v[1]*num];
};

function divide(v, num){
    return [v[0]/num, v[1]/num];
};
 
function add(a, b){
    return [a[0]+b[0], a[1]+b[1]];
};

function minus(a, b){
    return [a[0]-b[0], a[1]-b[1]];
};

function length(a, b){
    return Math.sqrt(Math.pow(a[0] - b[0],2) + 
                     Math.pow(a[1] - b[1],2));
};

function draw_line(move_to, line_to, colour){
    path = ["M", move_to[0], ",", move_to[1], "L", line_to[0], ",", line_to[1]].join("");
    paper = canvas.path(path);
    paper.attr("stroke", colour);
};
