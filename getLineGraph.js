var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 1140 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var max = 0;

var x = d3.time.scale()
  .range([0, width])

var y = d3.scale.linear()
  .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var line = d3.svg.line()
  .interpolate("basis")
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.close); });
<<<<<<< HEAD

var upsideLine = d3.svg.line()
  .interpolate("basis")
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.upside); });

var downsideLine = d3.svg.line()
  .interpolate("basis")
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.downside); });

var area = d3.svg.area()
	.interpolate("basis")
	.x(function(d) { return x(d.date); })
  .y0(height)
	.y1(function(d) { return y(d.close); });
=======
>>>>>>> changes

svg = d3.select('#chart')
  	.append('svg:svg')
  	.attr('width',width + margin.left + margin.right)
  	.attr('height',height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/yelpSharePrices.csv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

	data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.close;
    d.upside = +d.upside;
    d.downside = +d.downside;
	})

  var priceTargets = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {data: d.date, close: +d[name]};
      })
    };
  })

	x.domain(d3.extent(data, function(d) { return d.date; }));
<<<<<<< HEAD
	y.domain([0,d3.max(data, function(d) { return d.upside; })]);

    svg.selectAll(".area")
      .data(x.ticks(12))
     .enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "#ccc");

    svg.selectAll(".area")
      .data(y.ticks(5))
     .enter().append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", y)
      .attr("y2", y)
      .style("stroke", "#ccc");

    svg.append("path")
      .datum(data)
      .attr("class","area")
      .attr("d", area);

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("id","upsideLine")
      .attr("d", upsideLine);

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("id","downsideLine")
      .attr("d", downsideLine);

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("id","priceLine")
      .attr("d", line);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Date");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");
=======
  y.domain([
    d3.min(priceTargets, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
    d3.max(priceTargets, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Close ($)");

  var priceTargets = svg.selectAll(".priceTarget")
      .data(priceTargets)
    .enter().append("g")
      .attr("class", "priceTarget");

  priceTargets.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  priceTargets.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.close) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
>>>>>>> changes
});