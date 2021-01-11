function createWorldMapCoverageChart(selector,toolTip,worldData,localData){
    d3.select("#"+selector).selectAll("*").remove();
    let dimensions = getSelectorDimensions(selector);
    
    let format = d3.format(",");
    // Set tooltips
let path = d3.geoPath();
    
    var color = d3.scaleThreshold()
    .domain([0,50,100,500,1000,5000])
    .range(["rgb(0,0,0)", "rgba(229,9,20,0.1)", "rgba(229,9,20,0.25)", "rgba(229,9,20,0.8)", "rgba(229,9,20,1)"])

    let svg = d3.select("#"+selector)
                .append("svg")
                .attr("width", dimensions[0])
                .attr("height", dimensions[1])
                .append('g')
                .attr('class', 'map');

    let projection = d3.geoMercator()
                       .scale(130)
                       .translate( [dimensions[0] / 2, dimensions[1] / 1.5]);
    
    path = d3.geoPath().projection(projection);
    
    let totalByName = {};

    localData.forEach(function(d) { totalByName[d.country] = +d.total; });
    worldData.features.forEach(function(d) { d.total = totalByName[d.properties.name] });

    svg.append("g")
       .attr("class", "countries")
       .selectAll("path")
       .data(worldData.features)
       .enter().append("path")
       .attr("d", path)
       .style("fill", function(d) { return color(totalByName[d.properties.name]); })
       .style('stroke', 'white')
       .style('stroke-width', 1.5)
       .style("opacity",0.8)
       .style("stroke","white")
       .style('stroke-width', 0.3)
        .on('mouseover',function(d){
        d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
          let total = d.total ? d.total : "No Coverage"
          toolTip.transition().duration(200).style("opacity", .9);		
          toolTip.html(d.properties.name + "<br/>"  + total)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");		
        })
        .on("mouseout", function(d) {		
            toolTip.transition()		
                .duration(500)		
                .style("opacity", 0);
        d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        }).on('click', function(d,i){ 
            createCharts(graphData,d.properties.name)
        });
       
    svg.append("path")
       .datum(topojson.mesh(worldData.features, function(a, b) { return a.id !== b.id; }))
       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
       .attr("class", "names")
       .attr("d", path);
}