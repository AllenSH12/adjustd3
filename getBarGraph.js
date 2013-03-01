function getBarGraph(data) {	
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;
	var formatPercent = d3.format(".0%");

	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")

	var svg = d3.select(document.getElementById("chart")).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.selectAll(".bar")
  		.data(data)
	  .enter().append("rect")
	  	.attr("x", function(d, i) { return i * 200; })
	  	.attr("width", function(d) {return 100;})
	  	.attr("y", function(d) { return height - d;})
	  	.attr("height", function(d) { return d; });
}	