function getData(resolve,reject){
    d3.csv("/data/netflix_titles.csv",function(data) {
        resolve(data)
    });
}

function getWorldMapData(resolve,reject){
    d3.json("/data/world_country.json",function(data) {
        resolve(data)
    });
}

function updateCoverageList(data){
   let listObject = data.reduce(function (obj,current) { 
      let tempList = current['country'].split(',');
        
      if(current['country'] && tempList.length > 1){
          for(let i = 0;i<tempList.length;i++){
              let tempVal = tempList[i].trim()
              if (tempVal && obj.hasOwnProperty(tempVal)) {
                obj[tempVal] = obj[tempVal]+1;
              } else if(tempVal){
                obj[tempVal] = 1;
              }
          }
      }else{
          if (current['country']  && obj.hasOwnProperty(tempList[0])) {
            obj[tempList[0]] += 1;
          } else if(current['country']){
            obj[tempList[0]] = 1;
          }
          
          if(!current['country']){
              obj["international"] =  obj["international"] ? obj["international"]+1 : 1;
          }
      }   
      return obj;
    }, {});
    
    let list = [];
    for(var item in listObject){
        // this condition is required to prevent moving forward to prototype chain
        if(item != "international" && listObject.hasOwnProperty(item)){
            list.push({"country":item , "total":listObject[item]+listObject["international"]});
        } 
    }    
    return list
} 



function updateContentTypeList(data,countryFilter){
    
   let listObject = data.reduce(function (obj,current) { 
         
      if(applyRegionFilter(countryFilter,current['country'])) {
          let tempList = current['listed_in'].split(',');
          if(current['listed_in'] && tempList.length > 1){
              for(let i = 0;i<tempList.length;i++){
                  let tempVal = tempList[i].trim()
                  if (tempVal && obj.hasOwnProperty(tempVal)) {
                    obj[tempVal] = obj[tempVal]+1;
                  } else if(tempVal){
                    obj[tempVal] = 1;
                  }
              }
          }else{
              if (current['listed_in']  && obj.hasOwnProperty(tempList[0])) {
                obj[tempList[0]] += 1;
              } else if(current['listed_in']){
                obj[tempList[0]] = 1;
              }
          }   
      } 
      
      return obj;
    }, {});
    
    let list = [];
    for(var item in listObject){
        // this condition is required to prevent moving forward to prototype chain
        if(listObject.hasOwnProperty(item)){
            list.push({"type":item , "total":listObject[item]});
        } 
    }    
    return list
} 


function updateContentGroupList(data,countryFilter){
   let listObject = data.reduce(function (obj,current) { 
       if(applyRegionFilter(countryFilter,current['country'])) {
      let tempList = current['rating'].split(',');
      if(current['rating'] && tempList.length > 1){
          for(let i = 0;i<tempList.length;i++){
              let tempVal = tempList[i].trim()
              if (tempVal && obj.hasOwnProperty(tempVal)) {
                obj[tempVal] = obj[tempVal]+1;
              } else if(tempVal){
                obj[tempVal] = 1;
              }
          }
      }else{
          if (current['rating']  && obj.hasOwnProperty(tempList[0])) {
            obj[tempList[0]] += 1;
          } else if(current['rating']){
            obj[tempList[0]] = 1;
          }
      }   
       }
      return obj;
    }, {});
    
    let list = [];
    for(var item in listObject){
        // this condition is required to prevent moving forward to prototype chain
        if(listObject.hasOwnProperty(item)){
            list.push({"name":item , "value":listObject[item]});
        } 
    }    
    return list
} 

function updateContentFocusList(data,countryFilter){
   let listObject = data.reduce(function (obj,current) { 
       if(applyRegionFilter(countryFilter,current['country'])) {
          if (current['release_year']  && obj.hasOwnProperty(current['release_year'])) {
            if(current["type"] == "Movie"){
                obj[current['release_year']]["MOVIE"] = obj[current['release_year']]["MOVIE"] + 1
            }else{
               obj[current['release_year']]["TV"] = obj[current['release_year']]["TV"] + 1 
            }  
          } else if(current['release_year']){
              obj[current['release_year']] = {
                  "TV" : 0,
                  "MOVIE" : 0
              }
              
             if(current["type"] == "Movie"){
                obj[current['release_year']]["TV"] = 0;
                  obj[current['release_year']]["MOVIE"] = 1;
             }else{
               obj[current['release_year']]["MOVIE"] = 0;
               obj[current['release_year']]["TV"] = 1; 
             } 
          } 
       }
      return obj;
    }, {});
    
    let list = [];
    for(var item in listObject){
        // this condition is required to prevent moving forward to prototype chain
        if(listObject.hasOwnProperty(item)){
            list.push({"Year":item , "MOVIE":listObject[item]["MOVIE"] , "TV":listObject[item]["TV"]});
        } 
    }    
    return list
} 


function updateDirectorList(data,countryFilter){
   let listObject = data.reduce(function (obj,current) { 
       if(applyRegionFilter(countryFilter,current['country'])) {
      let tempList = current['director'].split(',');
      if(current['director'] && tempList.length > 1){
          for(let i = 0;i<tempList.length;i++){
              let tempVal = tempList[i].trim()
              if (tempVal && obj.hasOwnProperty(tempVal)) {
                obj[tempVal] = obj[tempVal]+1;
              } else if(tempVal){
                obj[tempVal] = 1;
              }
          }
      }else{
          if (current['director']  && obj.hasOwnProperty(tempList[0])) {
            obj[tempList[0]] += 1;
          } else if(current['director']){
            obj[tempList[0]] = 1;
          }
      }   
       }
      return obj;
    }, {});
    
    let list = [];
    for(var item in listObject){
        // this condition is required to prevent moving forward to prototype chain
        if(listObject.hasOwnProperty(item)){
            list.push({"name":item , "value":listObject[item]});
        } 
    }    
    return list
} 

function getTopTenValues(data,key,value){
    
value = value ? value : 10;
       return data.sort((a,b) => {
            if(b[key] > a[key]){
                return parseInt(a[key])-parseInt(b[key])
            }else{
                return parseInt(b[key])-parseInt(a[key])
            }
        }).slice(0,value);
}


function applyRegionFilter(value , data){
    if(!value){
       return true; 
    }
    let countryList = data.split(',');
    if(!countryList.length || countryList.indexOf(value) !== -1){
        return true;
    } else{
        return false;
    }
}


