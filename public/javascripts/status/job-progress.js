var jobProgress = function(data){
	console.log("jobProgress()...");

	var width = 500,
	    height = 500,
	    twoPi = 2 * Math.PI,
	    progress = 0,
	    total = data.length, // must be hard-coded if server doesn't report Content-Length
	    formatPercent = d3.format(".0%");

	var arc = d3.svg.arc()
	    .startAngle(0)
	    .innerRadius(180)
	    .outerRadius(240);

  d3.select("body").select(".job-progress").select("svg").remove();
	var svg = d3.select("body").select(".job-progress").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var meter = svg.append("g")
	    .attr("class", "progress-meter");

	meter.append("path")
	    .attr("class", "background")
	    .attr("d", arc.endAngle(twoPi));

	var foreground = meter.append("path")
	    .attr("class", "foreground");

	var text = meter.append("text")
	    .attr("text-anchor", "middle")
	    .attr("dy", ".35em");
  /*
	d3.json("https://api.github.com/repos/mbostock/d3/git/blobs/2e0e3b6305fa10c1a89d1dfd6478b1fe7bc19c1e?" + Math.random())
	    .on("progress", function() {
	      var i = d3.interpolate(progress, d3.event.loaded / total);
	      d3.transition().tween("progress", function() {
		      return function(t) {
		        progress = i(t);
		        foreground.attr("d", arc.endAngle(twoPi * progress));
		        text.text(formatPercent(progress));
		      };
	      });
	    })
	    .get(function(error, data) {
	      meter.transition().delay(250).attr("transform", "scale(0)");
	    });
	    */

  var done = 0;
  for (var t=0; t<total; t++){
    if (data[t].status == "done") { done += 1; } 
  }
  
  console.log(data[0]);
  console.log("Done: " + done);
  
  

  var progress = done/total;
		        foreground.attr("d", arc.endAngle(twoPi * progress));
		        text.text(formatPercent(progress));
		        
};
