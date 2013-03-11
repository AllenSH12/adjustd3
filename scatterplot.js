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

  d3.tsv("data/stockData.tsv", function(error, data) {
    data.forEach(function(d) {
      d.price = +d.price;
      d.accuracy = +d.accuracy;
      d.priceIndex = +d.priceIndex;
    });

    x.domain(d3.extent(data, function(d) { return d.price; })).nice();
    y.domain(d3.extent(data, function(d) { return d.accuracy; })).nice();

    svg.append("linearGradient")
        .attr("id", "temperature-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", x(22)).attr("y1", 0)
        .attr("x2", x(27)).attr("y2", 0)
      .selectAll("stop")
        .data([
          {offset: "0%", color: "#C0392B"},
          {offset: "50%", color: "#2980B9"},
          {offset: "100%", color: "#27AE60"}
        ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Price ($)");

    svg.append("g")
        .attr("class", "axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Prior Accuracy")

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return d.accuracy * 10;})
        .attr("cx", function(d) { return x(d.price); })
        .attr("cy", function(d) { return y(d.accuracy); })
        

    var legend = svg.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
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