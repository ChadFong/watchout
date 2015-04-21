var width = 1000,
    height = 480;

var animationStep = 400;
var ballCount = 20;  // MAKE USER DEFINED
var maxBallSize = 30;  //  MAKE USER DEFINED

var force = null,
    nodes = null;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black');

var initForce = function() {

    svg.selectAll('*').remove();

    var rand = function(scale){return Math.floor(Math.random() * scale)};
    var radius = d3.scale.sqrt().range([0, 8]);

  var m = 4,
  color = d3.scale.category10().domain(d3.range(m));

    var dataNodes = [
    //     { x: 4*width/10, y: 6*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x: 6*width/10, y: 6*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x:   width/2,  y: 7*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x: 4*width/10, y: 7*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x: 6*width/10, y: 7*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x:   width/2,  y: 5*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x: 4*width/10, y: 3*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x: 6*width/10, y: 3*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x:   width/2,  y: 2*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x: 4*width/10, y: 2*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x: 6*width/10, y: 2*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) },
    //     { x:   width/2,  y: 4*height/9, r : radius(1 + Math.floor(Math.random() * 4)), color: color(Math.floor(Math.random() * m)) }
    ];

var n = 100;
// m = 4,
// padding = 6,
// maxSpeed = 3,
// radius = d3.scale.sqrt().range([0, 8]),
// var dataNodes = [];

for(var i in d3.range(n)){
  dataNodes.push({r: radius(1 + Math.floor(Math.random() * 4)),
  color: color(Math.floor(Math.random() * m)),
  x: 100,
  y: 100});
  // speedX: (Math.random() - 0.5) * 2 *maxSpeed,
  // speedY: (Math.random() - 0.5) * 2 *maxSpeed});
}
 

    force = d3.layout.force()
        .size([width, height])
        .nodes(dataNodes)
        .charge(function(d) { return d.r * rand(-50)})
        .friction(0.95)
        .gravity(0.3)
        .on('tick', stepforce)
        .start();

    nodes = svg.selectAll('.node')
        .data(dataNodes)
        .enter().append('circle')
        .call(force.drag)
        .attr('class', 'node')
        .attr('r', function(d) {return d.r})
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .style('fill', function(d) {return d.color} );

};


var stepforce = function() {
    //  Set node position as either node position, or being just within boundary:
    nodes.attr("cx", function(d) { return Math.max(d.r, Math.min(width - d.r, d.x)); })
        .attr("cy", function(d) { return Math.max(d.r, Math.min(height - d.r, d.y)); });
    force.resume();
};


initForce();

force.start();