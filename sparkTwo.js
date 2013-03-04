var marginsparkTwo = {top: 5, right: 5, bottom: 5, left: 5},
	sparkWidthTwo = 265 - marginsparkTwo.left - marginsparkTwo.right,
	sparkHeightTwo = 100 - marginsparkTwo.top - marginsparkTwo.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var xSparkTwo = d3.time.scale()
	.range([0, sparkWidthTwo]);

var ySparkTwo = d3.scale.linear()
	.range([sparkHeightTwo, 0]);

var sparkLineTwo = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return xSparkTwo(d.date); })
	.y(function(d) { return ySparkTwo(d.close); });

sparkTwo = d3.select('#sparkTwo')
	.style('width', "" + sparkWidthTwo + "px")
	.append('sparkTwo:svg')
	.attr("width", sparkWidthTwo)
	.attr("height", sparkHeightTwo)
	.attr('class', 'sparkLine');
	

d3.tsv("data/sparkTwo.tsv", function(error, data) {
	data.forEach(function(d) {
	d.date = parseDate(d.date);
	d.close = +d.close;
});

xSparkTwo.domain(d3.extent(data, function(d) { return d.date; }));
ySparkTwo.domain(d3.extent(data, function(d) { return d.close; }));

sparkTwo.append("path")
	.datum(data)
	.attr("class", "sparkLine")
	.attr("d", sparkLineTwo);
});

var aspect = 265 / 50,
chart = $("#sparkTwo");
$(window).on("resize", function() {
	var targetWidth = chart.parent().width();
	chart.attr("width", targetWidth);
	chart.attr("height", targetWidth / aspect);
});