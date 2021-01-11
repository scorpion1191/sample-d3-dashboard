function createHorizontalBarChart(selector,toolTip,data){
    
    
    d3.select("#"+selector).selectAll("*").remove();
    let dimensions = getSelectorDimensions(selector);

//     let data = [{"salesperson":"Bob","sales":33},{"salesperson":"Robin","sales":12},{"salesperson":"Anne","sales":41},{"salesperson":"Mark","sales":16},{"salesperson":"Joe","sales":59},{"salesperson":"Eve","sales":38},{"salesperson":"Karen","sales":21},{"salesperson":"Kirsty","sales":25},{"salesperson":"Chris","sales":30},{"salesperson":"Lisa","sales":47}];

    data = getTopTenValues(data,'total');
// set the ranges
let y = d3.scaleBand()
          .range([dimensions[1], 0])
          .padding(0.1);

let x = d3.scaleLinear()
          .range([0, dimensions[0]]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
let svg = d3.select("#"+selector).append("svg")
    .attr("width", dimensions[0])
    .attr("height", dimensions[1])
  .append("g")
    .attr("transform", 
          "translate(0,0)");

  // format the data
  data.forEach(function(d) {
    d.total = +d.total;
  });

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.total; })])
  y.domain(data.map(function(d) { return d.type; }));
  //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  // append the rectangles for the bar chart
    let bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")
    bars.append("rect")
      .attr("class", "primaryBg")
      //.attr("x", function(d) { return x(d.sales); })
      .attr("width", function(d) {return x(d.total); } )
      .attr("y", function(d) { return y(d.type); })
      .attr("height", y.bandwidth());
  
     bars.append("text")
            .attr("class", "blackColor")
    .style("font-weight","bold")
            //y position of the label is halfway down the bar
            .attr("y", function(d) { return y(d.type) + y.bandwidth()/2 + 4; })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return 10;
            })
            .text(function (d) {
                return d.type;
            });
    
    
    bars.on('mouseover',function(d){
          let total = d.total
          toolTip.transition().style("opacity", .9);		
          toolTip.html(d.type + "<br/>"  + total)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");		
        })
        .on("mouseout", function(d) {		
            toolTip.transition()			
                .style("opacity", 0);
        });
}