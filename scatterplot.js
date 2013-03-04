function addScatterplot(location) {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 500 - margin.left - margin.right,
      height = 320 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select(document.getElementById(location)).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("data/yelpForecasts.csv", function(error, data) {
    data.forEach(function(d) {
      d.accuracy = +d.accuracy;
      d.price = +d.price;
    });

    x.domain(d3.extent(data, function(d) { return d.price; }));
    y.domain(d3.extent(data, function(d) { return d.accuracy; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "scatterLabel")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Price Target");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "scatterLabel")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Prior Accuracy")

    svg.selectAll(".line")
      .data(x.ticks(16))
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

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.price); })
        .attr("cy", function(d) { return y(d.accuracy); })
        .style("fill", "steelblue");

    var legend = svg.selectAll(".legend")
        .data(color.domain())
      //.enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  });
}