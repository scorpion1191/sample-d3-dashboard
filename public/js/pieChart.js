function createPieChart(selector,toolTip,data){
    d3.select("#"+selector).selectAll("*").remove();
    let dimensions = getSelectorDimensions(selector);
    
    let text = "";

    let thickness = 40;
    let duration = 750;
    let padding = 10;
    let opacity = .8;
    let opacityHover = 1;
    let otherOpacityOnHover = .8;
    let tooltipMargin = 13;

    let radius = Math.min(dimensions[0]-padding, dimensions[1]-padding) / 2;
    let color = d3.scaleOrdinal(d3.schemeCategory10);

let svg = d3.select("#"+selector)
.append('svg')
.attr('class', 'pie')
.attr('width', dimensions[0])
.attr('height', dimensions[1]);

let g = svg.append('g')
.attr('transform', 'translate(' + (dimensions[0]/2) + ',' + (dimensions[1]/2) + ')');

let arc = d3.arc()
.innerRadius(0)
.outerRadius(radius);

let pie = d3.pie()
.value(function(d) { return d.value; })
.sort(null);

let path = g.selectAll('path')
  .data(pie(data))
  .enter()
  .append("g")  
  .append('path')
  .attr('d', arc)
  .attr('fill', (d,i) => color(i))
  .style('opacity', opacity)
  .style('stroke', 'white')
  .on("mouseover", function(d) {
     
    })
  .on("mousemove", function(d) {
      
    })
  .on("mouseout", function(d) {   
      
    })
  .on("touchstart", function(d) {
      d3.select("svg")
        .style("cursor", "none");    
  })
  .each(function(d, i) { this._current = i; });

let legend = d3.select("#"+selector).append('div')
			.attr('class', 'legend')
			.attr('style','margin-top:30px;position:absolute;top:15px;right:10px');

let keys = legend.selectAll('.key')
			.data(data)
			.enter().append('div')
			.attr('class', 'key')
			.style('display', 'flex')
			.style('align-items', 'center')
			.style('margin-right', '20px');

		keys.append('div')
			.attr('class', 'symbol')
			.style('height', '10px')
			.style('width', '10px')
			.style('margin', '5px 5px')
			.style('background-color', (d, i) => color(i));

		keys.append('div')
			.attr('class', 'name')
			.text(d => `${d.name} (${d.value})`);

		keys.exit().remove();
}