var graphData = [];
    var coverageList = [];
    var contentType = [];
    var contentGroup = [];
    var directorList=[];
    var worldData;
    var toolTip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

$(document).ready(async function(){
    
    
    let dataPromise =  new Promise((resolve, reject) => { 
            getData(resolve,reject)
    }); 
    
    let d3WorldMapData = new Promise((resolve, reject) => { 
            getWorldMapData(resolve,reject)
    }); 
    Promise.all([dataPromise,d3WorldMapData]).then((response)=>{
        graphData = response[0];
        worldData = response[1];
        coverageList = updateCoverageList(graphData);
       
        createWorldMapCoverageChart('worldMap',toolTip,worldData,coverageList);
        createCharts(graphData,null)
        
    });    
});



function createCharts(data,country){
     contentType = updateContentTypeList(data,country);
     contentGroup = updateContentGroupList(data,country);
     contentFocus = updateContentFocusList(data,country);
     directorList = updateDirectorList(data,country);
    
    createHorizontalBarChart('barChart',toolTip,contentType);
    createStackBarChart('stackBarChart',toolTip,contentFocus);
    createPieChart('pieChart',toolTip,contentGroup);
    createTable('tableList',directorList);
}