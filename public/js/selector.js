function getSelectorDimensions(selector){
    
  let cssObjProp = window.getComputedStyle(document.getElementById(selector), null)
  let width = document.getElementById(selector).offsetWidth 
  let height = document.getElementById(selector).offsetHeight
  
    height = (cssObjProp["padding-bottom"] && parseInt(cssObjProp["padding-bottom"])) ? height - parseInt(cssObjProp["padding-bottom"]) : height;
    
    height = (cssObjProp["padding-top"] && parseInt(cssObjProp["padding-top"])) ? height - parseInt(cssObjProp["padding-top"]) : height;
    
    height = (cssObjProp['margin-top'] && parseInt(cssObjProp["margin-top"])) ? height - parseInt(cssObjProp["margin-top"]) : height;
    
    height = (cssObjProp['margin-bottom'] && parseInt(cssObjProp["margin-bottom"])) ? height - parseInt(cssObjProp["margin-bottom"]) : height;
    
    
    width = (cssObjProp['padding-left'] && parseInt(cssObjProp["padding-left"])) ? width - parseInt(cssObjProp["padding-left"]) : width;
    
    width = (cssObjProp['padding-right'] && parseInt(cssObjProp["padding-right"])) ? width - parseInt(cssObjProp["padding-right"]) : width;
    
    width = (cssObjProp['margin-left'] && parseInt(cssObjProp["margin-left"])) ? width - parseInt(cssObjProp["margin-left"]) : width;
    
    width = (cssObjProp['margin-right'] && parseInt(cssObjProp["margin-right"])) ? width - parseInt(cssObjProp["margin-right"]) : width;
    
    return [width,height];
}