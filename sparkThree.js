var marginsparkThree = {top: 5, right: 5, bottom: 5, left: 5},
	sparkWidthThree = 265 - marginsparkThree.left - marginsparkThree.right,
	sparkHeightThree = 100 - marginsparkThree.top - marginsparkThree.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var xSparkThree = d3.time.scale()
	.range([0, sparkWidthThree]);

var ySparkThree = d3.scale.linear()
	.range([sparkHeightThree, 0]);

var sparkLineThree = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return xSparkThree(d.date); })
	.y(function(d) { return ySparkThree(d.close); });

sparkThree = d3.select('#sparkThree')
	.style('width', "" + sparkWidthThree + "px")
	.append('sparkThree:svg')
	.attr("width", sparkWidthThree)
	.attr("height", sparkHeightThree)
	.attr('class', 'sparkLine');
	

d3.tsv("data/sparkThree.tsv", function(error, data) {
	data.forEach(function(d) {
	d.date = parseDate(d.date);
	d.close = +d.close;
});

xSparkThree.domain(d3.extent(data, function(d) { return d.date; }));
ySparkThree.domain(d3.extent(data, function(d) { return d.close; }));

sparkThree.append("path")
	.datum(data)
	.attr("class", "sparkLine")
	.attr("d", sparkLineThree);
});

var aspect = 265 / 100,
chart = $("#sparkThree");
$(window).on("resize", function() {
	var targetWidth = chart.parent().width();
	chart.attr("width", targetWidth);
	chart.attr("height", targetWidth / aspect);
});