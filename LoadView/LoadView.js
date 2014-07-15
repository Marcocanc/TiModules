//LoadingView Inspired by https://github.com/CaffeinaLab/com.caffeinalab.titanium.loader
var loader;
var show;
var hide;
var update;

switch (Ti.Platform.name) {
    case "iPhone OS":
        loader = Ti.UI.createWindow({
			backgroundColor: "#6000",
			backgroundImage: null,
			opacity: 1.0,
			modal: false,
			fullscreen: false
		});
		var loaderView = Ti.UI.createView({
			width: Ti.UI.SIZE,
			height: Ti.UI.SIZE,
			backgroundColor: '#D000',
			borderRadius: 10
		});
		var viewInset = Ti.UI.createView({
			top: 20,
			right: 40,
			bottom: 20,
			left: 40,
			width: Ti.UI.SIZE,
			height: Ti.UI.SIZE,
			layout: 'vertical'
		});
		var loaderIndicator = Ti.UI.createActivityIndicator({
			style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
			color: '#fff'
		});
		var loaderLabel = Ti.UI.createLabel({
			top: 20,
			color: '#fff',
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		
		viewInset.add(loaderIndicator);
		viewInset.add(loaderLabel);
		loaderView.add(viewInset);
		loader.add(loaderView);
		
		loaderIndicator.show();
		
		show = function(text, cancelable, cancelCallback){
			text ? loaderLabel.setText(text) : loaderLabel.setText("Loading...");
			cancelable ? loader.cancelable=true : loader.cancelable=false;
			typeof cancelCallback === "function" ? loader.cancelCallback=cancelCallback : loader.cancelCallback=cancelCallback;
			loader.open();
		};
		hide = function(){
			loader.close();
		};
		update = function(text, cancelable, cancelCallback){
			text ? loaderLabel.setText(text) : loaderLabel.setText("Loading...");
			cancelable ? loader.cancelable=true : loader.cancelable=false;
			typeof cancelCallback === "function"  ? loader.cancelCallback=cancelCallback : loader.cancelCallback=cancelCallback;
		};
		
		loader.addEventListener("click", cancel);
		
		
        break;
    default: //e.g. android
        loader = Ti.UI.Android.createProgressIndicator({
            type: Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
            message: "",
            cancelable: false
        });
        
        show = function(text, cancelable, cancelCallback){
        	text ? loader.setMessage(text) : loader.setMessage("Loading...");
			loader.show();
			cancelable ? loader.cancelable=true : loader.cancelable=false;
        };
        hide = function(){
			loader.hide();
		};
		update = function(text, cancelable, cancelCallback){
			text ? loader.setMessage(text) : loader.setMessage("Loading...");
			cancelable ? loader.cancelable=true : loader.cancelable=false;
		};
		loader.addEventListener("cancel", function(){cancel();});
        break;
    }
    
    

function cancel(e) {

	if (loader.cancelable) {
		if (Ti.Platform.name === "iPhone OS") hide();

		if ( typeof loader.cancelCallback === "function") loader.cancelCallback();
	}
}

    
  exports.show = show;
  exports.update = update;
  exports.hide = hide;
  
    


