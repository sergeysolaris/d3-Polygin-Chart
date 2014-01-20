d3-Polygon-Chart
================

Polygon like chart based on d3.js

Usage example
=============

<code>
var expData1 = [{"label" : "HTML"}, {"label" : "CSS"}, {"label" : "C#"}, {"label" : ".NET"}, {"label" : "JS"}];
</code>

var experience1 = new polygonChart({

		data : expData1,
		
		centerText : "MY|FIRST|JOB",
		
		fontSize : "25px",
		
		canvasEl : "#canvas1",
		
		canva : { 
			width : 600,
			height: 600
		},
		
		poly : {
			fill: "#fff",
			stroke: "#bbb",
			strokeWidth : 2
		},

		radius : {
			inner : 150,
			outer : 250
		},

		circle : {
			radius : 50,
			fill : "#ddd",
			stroke : "#bbb"
		},

		font : {
			fill : "#fff",
			stroke : "#fff"
		}
	});
	
	experience1.draw();
