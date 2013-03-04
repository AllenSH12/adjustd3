var margin = {top: 0, right: 0, bottom: 30, left: 0},
  width = 1140 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

var x = d3.time.scale()
  .range([0, width])

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .ticks(12)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .ticks(10)
  .orient("left");


var line = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });

svg = d3.select('#chart')
	.append('svg:svg')
	.attr('width',width + margin.left + margin.right)
	.attr('height',height + margin.top + margin.bottom)
	.attr('class','line');

d3.csv("data/yelpSharePrices.csv", function(error, data) {
	data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.close;
	})

	x.domain(d3.extent(data, function(d) { return d.date; }));
  	y.domain(d3.extent(data, function(d) { return d.close; }));

	svg.append("path")
		.datum(data)
		.attr("class",line)
		.attr("d", line);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "priceLabels")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Time");

    svg.append("g")
        .attr("class", "axis")
        .call(yAxis)
      .append("text")
        .attr("class", "priceLabels")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price");

    svg.selectAll(".line")
      .data(x.ticks(24))
     .enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "#ccc");

    svg.selectAll(".line")
      .data(y.ticks(10))
     .enter().append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", y)
      .attr("y2", y)
      .style("stroke", "#ccc");
});