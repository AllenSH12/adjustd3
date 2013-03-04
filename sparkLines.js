function addSparkLine(location, importedData) {
	var margin = {top: 10, right: 10, bottom: 15, left: 10},
	width = 265 - margin.left - margin.right,
	height = 100 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.time.scale()
	.range([0, width]);

	var y = d3.scale.linear()
	.range([height, 0]);

	var line = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });

	var svg = d3.select(document.getElementById(location)).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.tsv(importedData, function(error, data) {
		data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.close;
	});

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain(d3.extent(data, function(d) { return d.close; }));

	svg.append("path")
	.datum(data)
	.attr("class", "line")
	.attr("d", line);
	});

	var aspect = 265 / 100,
	chart = $("#sparkOne");
	$(window).on("resize", function() {
		var targetWidth = chart.parent().width();
		chart.attr("width", targetWidth);
		chart.attr("height", targetWidth / aspect);
	});	
}
