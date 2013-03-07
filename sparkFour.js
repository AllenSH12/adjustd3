var marginSparkFour = {top: 5, right: 5, bottom: 5, left: 5},
	sparkWidthFour = 265 - marginSparkFour.left - marginSparkFour.right,
	sparkHeightFour = 50 - marginSparkFour.top - marginSparkFour.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var xSparkFour = d3.time.scale()
	.range([0, sparkWidthFour]);

var ySparkFour = d3.scale.linear()
	.range([sparkHeightFour, 0]);

var sparkLineFour = d3.svg.line()
	.x(function(d) { return xSparkFour(d.date); })
	.y(function(d) { return ySparkFour(d.close); });

sparkFour = d3.select('#sparkFour')
	.style('width', "" + sparkWidthFour + "px")
	.append('sparkFour:svg')
	.attr("width", sparkWidthFour)
	.attr("height", sparkHeightFour)
	.attr('class', 'sparkLine');
	

d3.tsv("data/sparkFour.tsv", function(error, data) {
	data.forEach(function(d) {
	d.date = parseDate(d.date);
	d.close = +d.close;
});

xSparkFour.domain(d3.extent(data, function(d) { return d.date; }));
ySparkFour.domain(d3.extent(data, function(d) { return d.close; }));

sparkFour.append("path")
	.datum(data)
	.attr("class", "sparkLine")
	.attr("d", sparkLineFour);
});

var aspect = 265 / 50,
chart = $("#sparkFour");
$(window).on("resize", function() {
	var targetWidth = chart.parent().width();
	chart.attr("width", targetWidth);
	chart.attr("height", targetWidth / aspect);
});