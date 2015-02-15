var width = 640,
    height = 480;

var animationStep = 400;
var ballCount = 20;  // MAKE USER DEFINED
var maxBallSize = 30;  //  MAKE USER DEFINED

var force = null,
    nodes = null;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '5px solid black');

var initForce = function() {

    svg.selectAll('*').remove();

    var rand = function(scale){return Math.floor(Math.random() * scale)};

    var dataNodes = [
        { x: 4*width/10, y: 6*height/9, r : rand(maxBallSize) },
        { x: 6*width/10, y: 6*height/9, r : rand(maxBallSize) },
        { x:   width/2,  y: 7*height/9, r : rand(maxBallSize) },
        { x: 4*width/10, y: 7*height/9, r : rand(maxBallSize) },
        { x: 6*width/10, y: 7*height/9, r : rand(maxBallSize) },
        { x:   width/2,  y: 5*height/9, r : rand(maxBallSize) },
        { x: 4*width/10, y: 3*height/9, r : rand(maxBallSize) },
        { x: 6*width/10, y: 3*height/9, r : rand(maxBallSize) },
        { x:   width/2,  y: 2*height/9, r : rand(maxBallSize) },
        { x: 4*width/10, y: 2*height/9, r : rand(maxBallSize) },
        { x: 6*width/10, y: 2*height/9, r : rand(maxBallSize) },
        { x:   width/2,  y: 4*height/9, r : rand(maxBallSize) },
    ];

    force = d3.layout.force()
        .size([width, height])
        .nodes(dataNodes)
        .charge(function(d) { return d.r * rand(-50)})
        .friction(1)
        .gravity(0.05)
        .on('tick', stepforce)
        .start();

    nodes = svg.selectAll('.node')
        .data(dataNodes)
        .enter().append('circle')
        .call(force.drag)
        .attr('class', 'node')
        .attr('r', function(d) {return d.r})
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

};


var stepforce = function() {
    //  Set node position as either node position, or being just within boundary:
    nodes.attr("cx", function(d) { return Math.max(d.r, Math.min(width - d.r, d.x)); })
        .attr("cy", function(d) { return Math.max(d.r, Math.min(height - d.r, d.y)); });
    force.resume();
};


initForce();

force.start();