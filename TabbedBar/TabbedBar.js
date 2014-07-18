/*
 * Written by Marco Cancellieri (Applaud GmbH)
 *
 * A truly cross-platform "TabbedBar" for Titanium
 * Tested on Android 4 & iOS
 *
 *
 * Instructions:
 *
 * Simply use this like the native Ti.UI.iOS.TabbedBar (The Module also works with iOS!)
 * Additional available options for android:
 * - barBorderWidth
 * - selectedColor (selected Text Color)
 * - color (text color)
 * - font (font for the buttons)
 */
module.exports = (function () {

    //since the options are compatible with the native iOS tabbed bar, only use the custom bar when the platform isn't iOS
    switch (Ti.Platform.name) {
    case "iPhone OS":
        return {
            createTabbedBar: function (options) {
                return Ti.UI.iOS.createTabbedBar(options);
            }
        };
        break;
    default: //e.g. android
        return {
            createTabbedBar: function (options) {
                return createBar(options);
            }
        };
        break;
    }

    function createBar(options) {
        var barBorderWidth,
            barTextColor,
            barSelectedTextColor,
            barTextFont,
            barTintColor,
            barBackgroundColor,
            barWidth,
            barHeight,
            barLabels,
            barIndex;
        //setting options/default values
        options.barBorderWidth ? barBorderWidth = options.barBorderWidth : barBorderWidth = _toDp(1);
        options.selectedColor ? barSelectedTextColor = options.selectedColor : barSelectedTextColor = "#ffffff";
        options.tintColor ? barTintColor = options.tintColor : barTintColor = "#007AFF";
        options.color ? barTextColor = options.color : barTextColor = barTintColor;
        options.backgroundColor ? barBackgroundColor = options.backgroundColor : barBackgroundColor = "transparent";
        options.font ? barTextFont = options.font : barTextFont = {
            fontSize: _toDp(9)
        };
        options.width ? barWidth = options.width : barWidth = _toDp(200);
        options.height ? barHeight = options.height : barHeight = _toDp(18);
		barLabels= options.labels;
		barIndex = options.index;

        //Errors & Warnings
        if (barBorderWidth < 1) Ti.API.warn("Borders between buttons may not be visible on devices with <= 160 dpi. Consider using a value >= 1");

        //Bar construction

        var bar = Ti.UI.createView({
            touchEnabled: false,
            height: barHeight,
            width: barWidth,
            borderRadius: _toDp(2.5),
            borderWidth: barBorderWidth,
            borderColor: barTintColor,
            layout: (typeof barLabels[i].width !== "undefined") ? "horizontal" ? null,
        });

        //passing positioning data to the view
        if (typeof options.top !== "undefined") bar.top = options.top;
        if (typeof options.bottom !== "undefined") bar.bottom = options.bottom;
        if (typeof options.left !== "undefined") bar.left = options.left;
        if (typeof options.right !== "undefined") bar.right = options.right;

				
        //create Buttons and add behavior
        function generateLabels(){
        	//delete existing labels
        	if (bar.children && bar.children.length>0){
	        	bar.children.forEach(function(button){
		        	bar.remove(button);
	        	});
        	}
	        for (var i = 0; i < barLabels.length; i++) {
	            var button = Ti.UI.createButton({
	                bubbleParent: false,
	                // Don't use title if an image is set.
	                title: (typeof barLabels[i].image !== "undefined") ? "" : (typeof barLabels[i] == "string") ? barLabels[i] : barLabels[i].title,
	                // Add a backgroundImage if image is set.
	                backgroundImage: (typeof barLabels[i].image !== "undefined") ? barLabels[i].image : "",
	                height: "100%",
	                // If label width is set use that, otherwise evenly divide
	                // the bar based on the number of labels. This may cause
	                // issues if a width is set on some labels but not all labels
	                // but it is up to the developer to not do that.
	                width: (typeof barLabels[i].width !== "undefined") ? barLabels[i].width : 100 / barLabels.length + "%",
	                left: (typeof barLabels[i].width !== "undefined") ? 100 / barLabels.length * i + "%",
	                backgroundColor: barBackgroundColor,
	                color: barTextColor,
	                font: barTextFont,
	                borderWidth: barBorderWidth / 2,
	                borderColor: barTintColor,
	                index: i,
	                //--------functions--------
	                setTabSelected: function () {
	                    this.color = barSelectedTextColor;
	                    this.backgroundColor = barTintColor;
	                },
	                setTabDeselected: function () {
	                    this.backgroundColor = barBackgroundColor;
	                    this.color = barTextColor;
	                }
	            });
	
	            if (typeof barIndex !== "undefined") {
	                if (barIndex > -1 && barIndex == i) {
	                    button.setTabSelected();
	                }
	            }
	
	            button.addEventListener("click", function (e) {
	                selectTab(e.source.index);
	            });
	
	            bar.add(button);
	        }
        }
        //getters/setters
        bar.getLabels = function(){
	        return barLabels;
        }
        bar.setLabels = function(labels){
	        barLabels = labels;
			generateLabels(); 
        };
        Object.defineProperty(bar, "labels", {
		    get: bar.getLabels,
		    set: bar.setLabels
		});
		
		bar.setIndex = function(index){
			barIndex = index;
			selectTab(index);
		};
		bar.getIndex = function(){
			return barIndex;
		};
		
		Object.defineProperty(bar, "index", {
		   get: bar.getIndex,
		   set: bar.setIndex
		});
		
		//initialize the object
		if (barLabels && barLabels.length >= 2){
			generateLabels();
		}


        return bar;


        function selectTab(index) {

            for (var c = 0; c < bar.children.length; c++) {
                if (bar.children[c].index !== index) {
                    bar.children[c].setTabDeselected();
                } else {
                    bar.children[c].setTabSelected();

                    barIndex = index;
                    //simulate same behavior of the iOS tabbedBar
                    bar.fireEvent("click", {
                        index: index
                    });
                }
            }
        }


    }

    //create density independent pixels
    function _toDp(pixels) {
        return (pixels * (Titanium.Platform.displayCaps.dpi / 160));
    }

})();
