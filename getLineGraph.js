function getBarGraph() {
	var data = [50, 75, 150, 250, 500];
	var max = d3.max(data);

	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 1150 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear().domain([0, data.length - 1]).range([0, width]);
	var y = d3.scale.linear().domain([0, max]).range([height, 0]);

	svg = d3.select('#chart')
		.style('margin', '20px auto')
		.style('width', "" + width + "px")
		.append('svg:svg')
		.attr('width',width)
		.attr('height',height)
		.attr('class','viz')
		.append('svg:g')

	var line = d3.svg.line().x(function(d, i) { return x(i); }).y(y)

	svg.selectAll('path.line')
		.data([data])
		.enter()
		.append("svg:path")
	.attr("d", line);
}