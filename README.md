#Titanium UI modules
A collection of JavaScript Modules that create cross-platform versions of iOS native UI elements

##TabbedBar
The tabbedBar module looks and behaves almost exactly like the native iOS element (same options, event listeners etc.). In fact the module will also create the iOS tabbedBar, so it can be used in code that is shared across platforms.

<img src="https://raw.githubusercontent.com/Marcocanc/TiUIModules/master/TabbedBar/screenshot.png" />

###Usage

Use this module like you would use the native iOS tabbedBar:

    var tb = require("/ui/modules/TabbedBar");
    var bar = tb.createTabbedBar({labels:["Tab 1", "Tab 2", "Tab 3"], index:0, selectedColor: "#ffffff",tintColor: "#007AFF", top:10, width:"90%"});
    
The following additional options are available for android:

- `barBorderWidth` (width of the border)
- `selectedColor` (Text Color for the selected tab)
- `color` (text color - same as tintColor if undefined)
- `font` (font for the buttons)