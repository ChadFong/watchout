var difficulty = 20;

var enemies = [];
for (var i = 0; i < difficulty; i++) {
  enemies.push(0);
}

var width = 800, height = 400, radius = 10, numCollisions = 0, highScore = 0, currentScore = 0;

var gameWindow = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "5px solid black");

// collision
var collision = function() {
  var result = false;
  d3.selectAll("svg").selectAll("circle.enemies").each( function(){
    var player = d3.select("circle.player");
    var playCoords = [player.data()[0].x,player.data()[0].y];
    var enemyCoords = [d3.select(this).attr("cx"), d3.select(this).attr("cy")];

    var dist = Math.sqrt(Math.pow(playCoords[0] - enemyCoords[0], 2) + Math.pow(playCoords[1] - enemyCoords[1], 2));

    if(dist < 25){
      d3.select(".collisions").selectAll("span").text(numCollisions++);
      d3.select(".high").selectAll("span").text(highScore = highScore < currentScore ? currentScore : highScore);
      currentScore = 0;
      result = true;
      return;
    }
  });
  return result;
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


// create new enemies
var enemies = d3.select('svg').selectAll('circle.enemies').data(d3.range(15))
                .enter().append('circle')
                .attr('class','enemies')
                .attr("cx",  function(){return Math.floor(Math.random()*(width-10))})
                .attr("cy",  function(){return Math.floor(Math.random()*(height-10))})
                .attr("r", radius);

// moves enemies
var move = function(element){
    element.transition().duration(2000)
           .attr("cx",  function(){return Math.floor(Math.random()*(width-10))})
           .attr("cy",  function(){return Math.floor(Math.random()*(height-10))})
           .each('end', function(){ move (d3.select(this))})
};


move(enemies);

setInterval(function() {
  var hit = collision();
  if(!hit){
    d3.select(".current").selectAll("span").text(currentScore++);
  }
}, 50);
