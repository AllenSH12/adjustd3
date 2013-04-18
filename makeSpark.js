function getSparkLine(location, dataLocation) {
	var margin = {top: 5, right: 20, bottom: 5, left: 20},
		width = 251 - margin.left - margin.right,
		height = 40 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.time.scale()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var sparkLine = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.close); });

	sparkLine = d3.select(location)
		.style('width', "" + width + "px")
		.append('sparkLine:svg')
		.attr("width", width)
		.attr("height", height)
		.attr('class', 'sparkLine');
		
	console.log(dataLocation)

	var loc = dataLocation.toString()

	d3.tsv(loc, function(error, data) {
		data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.close;
	});

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain(d3.extent(data, function(d) { return d.close; }));

	sparkLine.append("path")
		.datum(data)
		.attr("class", "sparkLine")
		.attr("d", sparkLine);
	});

	var aspect = 251 / 40,
	chart = $(location);
	$(window).on("resize", function() {
		var targetWidth = chart.parent().width();
		chart.attr("width", targetWidth);
		chart.attr("height", targetWidth / aspect);
	});
}