//   .append("circle")
//     .attr("cx", 10)
//     .attr("cy", 10)
//     .attr("r", 10);

// var update = function (data) {
//   // Select all circle and give data
//   var circle = gameWindow.selectAll("circle")
//     .data(data); //, function(d) { return d; } to pass in a key

//   circle.enter().append("circle")
//       .attr("cx", 60)
//       .attr("cy", 60)
//       .attr("r", 100);
// };

// update([1,2,3]);

// var circlesWithData = function(data){
//   return d3.select('body').select('svg').selectAll('circle').data(data, function(d){ return d });
// };

// var update = function(circles){circles.attr('class', 'update')}

// var append = function(circles){
//   circles.enter().append('circle').attr('class','enter').attr('cy', 50).attr('r', 10).attr('cx',function(d){return d})
// };

// var remove = function(circles){
//   circles.exit().attr('class', 'exit').transition().duration(750).remove();
// };
//

var difficulty = 20;

var enemies = [];
for (var i = 0; i < difficulty; i++) {
  enemies.push(0);
}

var width = 800, height = 400, radius = 10;

var gameWindow = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "5px solid black");

// collision
var collision = function() {
  d3.selectAll("svg").selectAll("circle.enemies").each( function(){
    // console.log( "-----------------------------------------");
    console.log( "X: " +d3.select(this).attr("cx") );
    console.log( "Y: " +d3.select(this).attr("cy") );
    console.log( "R: " +d3.select(this).attr("r") );
    console.log( "-----------------------------------------");
  });
 // = function circlesIntersect(c1X,c1Y,c1Radius, c2X, c2Y, c2Radius){
    // var distanceX = c2X - c1X;
    // var distanceY = c2Y - c1Y;
    // var magnitudeSquared = distanceX * distanceX + distanceY * distanceY;
    // return magnitudeSquared < (c1Radius + c2Radius) * (c1Radius + c2Radius);
};


// drag functionality
var dragmove = function (d) {
  d3.select(this)
      .attr("cx", d.x = Math.max(d.radius, Math.min(width - d.radius, d3.event.x)))
      .attr("cy", d.y = Math.max(d.radius, Math.min(height - d.radius, d3.event.y)));
};
var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragmove);

// create player object
var player = d3.select("svg").selectAll("circle").data([{name: player, x: width/2, y: height/2, radius: radius+5}], function(d){return d}).enter().append("circle")
    .attr("cx", function(d){return d.x})
    .attr("cy", function(d){return d.y})
    .attr("r", function(d){return d.radius})
    .attr("class", "player")
    .call(drag);

// update function
var update = function(data) {
  var enemies = d3.select("svg").selectAll("circle.enemies")
      .data(data);

  // update/move them to new locations
  // console.log("Updating Circles!");
  enemies.transition().duration(2000)
      .attr("cx",  function(){return Math.floor(Math.random()*(width-10))})
      .attr("cy",  function(){return Math.floor(Math.random()*(height-10))});

  // create new elements if needed
  // console.log("Building Circles!");
  enemies.enter().append("circle")
      .attr("class", "enemies")
      .attr("cx",  function(){return Math.floor(Math.random()*(width-10))})
      .attr("cy",  function(){return Math.floor(Math.random()*(height-10))})
      .attr("r", radius);

  // remove elements if needed/when difficulty lowered
};

update(enemies);
update(enemies);

setInterval(function() {
  // console.log("shuffling!");
  update(enemies);
}, 1500);

setInterval(function() {
  // console.log("shuffling!");
  collision();
}, 100);
