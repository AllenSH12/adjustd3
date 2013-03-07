var marginSparkOne = {top: 5, right: 5, bottom: 5, left: 5},
	sparkWidth = 265 - marginSparkOne.left - marginSparkOne.right,
	sparkHeight = 50 - marginSparkOne.top - marginSparkOne.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var xSpark = d3.time.scale()
	.range([0, sparkWidth]);

var ySpark = d3.scale.linear()
	.range([sparkHeight, 0]);

var sparkLine = d3.svg.line()
	.x(function(d) { return xSpark(d.date); })
	.y(function(d) { return ySpark(d.close); });

sparkOne = d3.select('#sparkOne')
	.style('width', "" + sparkWidth + "px")
	.append('sparkOne:svg')
	.attr("width", sparkWidth)
	.attr("height", sparkHeight)
	.attr('class', 'sparkLine');
	

d3.tsv("data/sparkOne.tsv", function(error, data) {
	data.forEach(function(d) {
	d.date = parseDate(d.date);
	d.close = +d.close;
});

xSpark.domain(d3.extent(data, function(d) { return d.date; }));
ySpark.domain(d3.extent(data, function(d) { return d.close; }));

sparkOne.append("path")
	.datum(data)
	.attr("class", "sparkLine")
	.attr("d", sparkLine);
});

var aspect = 265 / 50,
chart = $("#sparkOne");
$(window).on("resize", function() {
	var targetWidth = chart.parent().width();
	chart.attr("width", targetWidth);
	chart.attr("height", targetWidth / aspect);
});