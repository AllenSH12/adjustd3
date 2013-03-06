function getSparkLine(dataFile, location) {
	var margin = {top: 5, right: 5, bottom: 5, left: 5},
		width = 265 - margin.left - margin.right,
		height = 100 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.time.scale()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var sparkLine = d3.svg.line()
		.interpolate("basis")
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.close); });

	sparkSVG = d3.select(location)
		.style('width', "" + width + "px")
		.append('sparkSVG:svg')
		.attr("width", width)
		.attr("height", height)
		.attr('class', 'sparkLine');
		

	d3.tsv(dataFile, function(error, data) {
		data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.close;
	});

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain(d3.extent(data, function(d) { return d.close; }));

	sparkSVG.append("path")
		.datum(data)
		.attr("class", "sparkLine")
		.attr("d", sparkLine);
	});

	var aspect = 265 / 100,
	chart = $("#sparkSVG");
	$(window).on("resize", function() {
		var targetWidth = chart.parent().width();
		chart.attr("width", targetWidth);
		chart.attr("height", targetWidth / aspect);
	});
	return false;
}

function updateData(dataFile, variableToUpdate) {
	d3.tsv(dataFile, function(error, data) {
		data.forEach(function(d) {
			d.date = parseDate(d.date);
			d.close = +d.close;
		})
		for (var i=8; i < data.length; i++) {
			data[i].close = data[i].close * (1 + variableToUpdate);
		}

		x.domain(d3.extent(data, function(d) { return d.date; }));
	  	y.domain(d3.extent(data, function(d) { return d.close; }));

		sparkSVG.selectAll("path")
			.data([data])
			.transition().duration(2000).delay(200)
			.attr("d",sparkLine);
	});
	return false;
}