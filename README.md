#Titanium UI modules
A collection of JavaScript Modules that create cross-platform versions of iOS native UI elements

##TabbedBar
The tabbedBar module looks and behaves almost exactly like the native iOS element (same options, event listeners etc.). In fact the module will also create the iOS tabbedBar, so it can be used in code that is shared across platforms.

###Usage

Use this module like you would use the native iOS tabbedBar:

    var tb = require("/ui/modules/TabbedBar");
    var bar = tb.createTabbedBar({labels:["Tab 1", "Tab 2", "Tab 3"], index:0, selectedColor: "#ffffff",tintColor: "#007AFF", top:10, width:"90%"});
    
- `barBorderWidth` (width of the border)
- `selectedColor` (selected Text Color)
- `color` (text color)
- `font` (font for the buttons)