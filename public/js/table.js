function createTable(selector,data){
    d3.select("#"+selector).selectAll("*").remove();
    let dimensions = getSelectorDimensions(selector);
    
    data = getTopTenValues(data,"value",5)

	var ul = d3.select('#'+selector).append('ul').attr("class", "list-group");

	ul.selectAll('li')
	.data(data)
	.enter()
	.append('li')
    .attr("class","list-group-item")
    .attr("style","display: flex;place-items: flex-end;font-size:14px;font-weight:bold;height:"+dimensions[1]/data.length+"px").text(function (d, i) {
                    return d.name +" - "+d.value;
                });
}


