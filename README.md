#Titanium UI modules
A collection of JavaScript Modules that create cross-platform versions of iOS native UI elements

##TabbedBar
The tabbedBar module looks and behaves almost exactly like the native iOS element (same options, event listeners etc.). In fact the module will also create the iOS tabbedBar, so it can be used in code that is shared across platforms.

<img src="https://raw.githubusercontent.com/Marcocanc/TiUIModules/master/TabbedBar/screen.gif" />

[Example](https://github.com/Marcocanc/TiUIModules/blob/master/TabbedBar/Example/app.js)

###Usage

Use this module like you would use the native iOS tabbedBar:

    var tb = require("/ui/modules/TabbedBar");
    var bar = tb.createTabbedBar({labels:["Tab 1", "Tab 2", "Tab 3"], index:0, selectedColor: "#ffffff",tintColor: "#007AFF", top:10, width:"90%"});
    
The following additional options are available for android:

- `barBorderWidth` (width of the border)
- `selectedColor` (text color for the selected tab)
- `color` (text color - same as tintColor if undefined)
- `font` (font for the buttons)

##getJSON

The getJSON module provides a function similar to the [jQuery getJSON](https://api.jquery.com/jquery.getjson/) with the addition of an error callback

###Usage

	getJSON(url, dataObject, callback, errorCallback);

####Example

	var mod = require("/data/getJSON");

	mod.getJSON("http://api.openweathermap.org/data/2.5/weather", {q:"munich, de"}, callback, errorCallback);
		
	function callback(res){
		Ti.API.info("getJSON response: "+res.weather[0].description);
	}
	function errorCallback(err){
		Ti.API.info(err.error);
	}
