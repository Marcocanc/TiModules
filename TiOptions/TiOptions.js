var options={
	'inputField':{
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	    color: 'black',
	    autocorrect:false,
	    top: 20,
	    height:30,
	    width: "86%",
	    backgroundColor:"#fff"
	},
	
	
};


//Patform-specific options
var platSpec;
if(Ti.Android){
	platSpec = {
		'inputField':{
			height:Ti.UI.SIZE
		},
	};
}else{
	platSpec = {
	};
}

//merge general and platform-specific option objects
mergeOptions(options, platSpec);


module.exports=function(key, object){
	if (typeof object === "undefined") object = {};
	
	if (typeof options[key] !== "undefined"){
		return mergeOptions(object, options[key]);
	}else{
		Ti.API.warn("TiOptions Module: No options found for key: "+key);
		return object;
	}
};

//Merges obj2 into obj1
function mergeOptions(obj1, obj2) {
    for (var p in obj2) {
        try {
            if (obj2[p].constructor == Object) {
                obj1[p] = mergeOptions(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}