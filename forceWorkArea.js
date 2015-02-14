var width = 640,
    height = 480;

var animationStep = 400;

var force = null,
    nodes = null;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

var initForce = function() {

    svg.selectAll('*').remove();

    var dataNodes = [
        { x: 4*width/10, y: 6*height/9, radius : 10},
        { x: 6*width/10, y: 6*height/9, radius : 10 },
        { x:   width/2,  y: 7*height/9, radius : 10 },
        { x: 4*width/10, y: 7*height/9, radius : 10 },
        { x: 6*width/10, y: 7*height/9, radius : 10 },
        { x:   width/2,  y: 5*height/9, radius : 10 },
        { x: 4*width/10, y: 3*height/9, radius : 10 },
        { x: 6*width/10, y: 3*height/9, radius : 10 },
        { x:   width/2,  y: 2*height/9, radius : 10 },
        { x: 4*width/10, y: 2*height/9, radius : 10 },
        { x: 6*width/10, y: 2*height/9, radius : 10 },
        { x:   width/2,  y: 4*height/9, radius : 10 },
    ];

    force = d3.layout.force()
        .size([width, height])
        .nodes(dataNodes)
        .charge(-300);

    force.gravity(0.25);

    nodes = svg.selectAll('.node')
        .data(dataNodes)
        .enter().append('circle')
        .call(force.drag)
        .attr('class', 'node')
        .attr('r', width/40)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

    force.on('tick', stepforce);

};


var stepforce = function() {
  if (force.fullSpeed) {
    nodes.attr('cx', function(d) { return d.x; })
         .attr('cy', function(d) { return d.y; });
  }
};


initForce();

force.fullSpeed = true;
force.slowMotion = false;

force.start();