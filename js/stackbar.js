function createStackBarChart(selector,toolTip,data,value){
    
   d3.select("#"+selector).selectAll("*").remove(); 
    data = getTopTenValues(data,"Year",5)
    
    let dimensions = getSelectorDimensions(selector);
    // append the svg object to the body of the page
    let svg = d3.select("#"+selector).append("svg")
                .attr("width", dimensions[0])
                .attr("height", dimensions[1])
                .append("g")
                .attr("transform", "translate(0,-20)");

  // List of subgroups = header of the csv files = soil condition here
  let subgroups = ["MOVIE","TV"]

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  let groups = d3.map(data, function(d){return(d.Year)}).keys()

  // Add X axis
  let x = d3.scaleBand()
      .domain(groups)
      .range([0, dimensions[0]])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + dimensions[1] + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  let y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.MOVIE + d.TV; })])
                  .range([dimensions[1]/2, 0]);
  svg.append("g")

  // color palette = one color per subgroup
  let color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#757575','#000'])

  //stack the data? --> stack per subgroup
  let stackedData = d3.stack()
    .keys(subgroups)
    (data)

  // Show the bars
  svg.append("g").attr("transform", "translate(0," + dimensions[1]/2 + ")")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.Year); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
    
    
    let legend = svg.selectAll(".legend")
    .data(stackedData.reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0,0)"; })
      .style("font", "10px sans-serif");

  legend.append("rect")
      .attr("x", function(d, i) { return i*150;})
      .attr("y", function(d, i) { return 20})
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", function(d) { return color(d.key); });

  legend.append("text")
      .attr("x",  function(d, i) { return i*150 + 20;})
      .attr("y", function(d, i) { return 30})
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .text(function(d,i) { 
            return d.key;
      }).style("fontSize","12px");
}