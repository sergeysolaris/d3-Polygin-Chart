var polygonChart = function (params) {
		this.settings = params;
	};

	polygonChart.prototype.draw = function () {

		var chart = this;

		var angleDelta = Math.round(360/chart.settings.data.length);

		var cline = d3.svg.line()
					.x(function(d, i) { return chart.settings.radius.inner*Math.sin((i+1)*angleDelta*Math.PI/180); })
					.y(function(d, i) { return chart.settings.radius.inner*Math.cos((i+1)*angleDelta*Math.PI/180); })
					.interpolate("linear");

		var svg = d3.select(chart.settings.canvasEl).append("svg")
							.attr("viewBox", "0 0 " + chart.settings.canva.width + " " + chart.settings.canva.height)
							.attr("transform", "scale(-1, -1)");

		var mainGroup = svg.append("g")
						.attr("transform", "translate("+ chart.settings.canva.width/2 +", "+ chart.settings.canva.height/2 +")");




		var polygon = mainGroup.append("path")
                            .attr("d", function () { return cline(chart.settings.data) + "Z";})
                            .attr("stroke", chart.settings.poly.stroke)
                            .attr("stroke-width", chart.settings.poly.strokeWidth)
                            .attr("fill", chart.settings.poly.fill);


        var nodeCount = polygon.node().getTotalLength();

		polygon
			.attr("stroke-dasharray", nodeCount + " " + nodeCount)
			.attr("stroke-dashoffset", nodeCount)
			.transition()
			.duration(1000)
			.ease("linear")
			.attr("stroke-dashoffset", 0);

        var dataGroups = mainGroup.selectAll("g")
							.data(chart.settings.data)
							.enter()
							.append("g");

        dataGroups.append("line")
						.attr("x1", function(d, i) { return chart.settings.radius.inner*Math.sin((i+1)*angleDelta*Math.PI/180);})
						.attr("y1", function(d, i) { return chart.settings.radius.inner*Math.cos((i+1)*angleDelta*Math.PI/180);})
						.attr("x2", function(d, i) { return chart.settings.radius.inner*Math.sin((i+1)*angleDelta*Math.PI/180);})
						.attr("y2", function(d, i) { return chart.settings.radius.inner*Math.cos((i+1)*angleDelta*Math.PI/180);})
						.attr("stroke", chart.settings.poly.stroke)
                        .attr("stroke-width", chart.settings.poly.strokeWidth )
                        .transition()
                        .duration(500)
                        .delay(function(d, i){return 1000 + 500*i;})
                        .attr("x2", function(d, i) { return chart.settings.radius.outer*Math.sin((i+1)*angleDelta*Math.PI/180);})
						.attr("y2", function(d, i) { return chart.settings.radius.outer*Math.cos((i+1)*angleDelta*Math.PI/180);})

		var dataVals = dataGroups.append("g");

		dataVals.append("circle")
				.attr("cx", 0)
				.attr("cy", 0)
				.attr("r", chart.settings.circle.radius)
				.attr("style", "stroke: transparent; fill: transparent;")
				.transition()
				.duration(5000)
				.delay(function(d,i) { return 1000 + 500*chart.settings.data.length + 300*i})
				.attr("style", function () { return "stroke: "+ chart.settings.circle.stroke +"; fill: " + chart.settings.circle.fill + ";"});

		dataVals.append("text")
				.attr("style", "stroke: " + chart.settings.font.stroke + "; fill: " + chart.settings.font.fill + ";")
				.attr("text-anchor", "middle")
				.text(function(d) { return d.label });

		dataVals.transition()
				.duration(300)
				.delay(function(d,i) { return 1000 + 500*chart.settings.data.length + 300*i})
				.attr("transform", function(d, i) { return "translate(" + chart.settings.radius.outer*Math.sin((i+1)*angleDelta*Math.PI/180) + ", " + chart.settings.radius.outer*Math.cos((i+1)*angleDelta*Math.PI/180) + ")";});

		var mainText = mainGroup.append("text")
				.attr("text-anchor", "middle")
				.attr("style", function () { return "stroke: #bbb; fill: #bbb; font-size : " + chart.settings.fontSize });

		var textParts = chart.settings.centerText.split("|");

		textParts.forEach( function(textPart, i) {
			mainText.append("tspan")
				.attr("x", 0)
				.attr("y", function () {return 1.2*i + "em";})
				.text(textPart);
		});
	}