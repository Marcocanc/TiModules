//LoadingView Inspired by https://github.com/CaffeinaLab/com.caffeinalab.titanium.loader
var loader, show, hide, update,
isShowing = false,
defaultText = L("loading", "Loading...");

switch (Ti.Platform.name) {
	case "iPhone OS":
		loader = Ti.UI.createWindow({
			backgroundColor: "#6000",
			backgroundImage: null,
			opacity: 1.0,
			modal: false,
			fullscreen: false,
			zIndex:1000
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
			if (isShowing) {
				update(text, cancelable, cancelCallback);
				return;
			}
			switch(typeof text) {
				case "boolean":
					cancelCallback = cancelable;
					cancelable = text;
					text = defaultText;
					break;
				case "undefined":
					text=defaultText;
					break;
			}
			loaderLabel.setText(text);

			cancelable ? loader.cancelable=true : loader.cancelable=false;
			typeof cancelCallback === "function" ? loader.cancelCallback=cancelCallback : loader.cancelCallback=cancelCallback;
			loader.open();
			isShowing=true;
		};
		hide = function(){
			loader.close();
			isShowing=false;
		};
		update = function(text, cancelable, cancelCallback){
			text ? loaderLabel.setText(text) : loaderLabel.setText(defaultText);
			cancelable ? loader.cancelable=true : loader.cancelable=false;
			typeof cancelCallback === "function"  ? loader.cancelCallback=cancelCallback : loader.cancelCallback=false;
		};
		
		loader.addEventListener("click", cancel);
		
		
		break;
	default: //e.g. android
		if (isShowing) {
			update(text, cancelable, cancelCallback);
			return;
		}
		loader = Ti.UI.Android.createProgressIndicator({
			type: Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
			message: "",
			cancelable: false
		});
	
		show = function(text, cancelable, cancelCallback){
		switch(typeof text) {
				case "boolean":
					cancelCallback = cancelable;
					cancelable = text;
					text = defaultText;
					break;
				case "undefined":
					text=defaultText;
					break;
			}
			loader.setMessage(text);
			
			cancelable ? loader.cancelable=true : loader.cancelable=false;
			typeof cancelCallback === "function" ? loader.cancelCallback=cancelCallback : loader.cancelCallback=false;
			loader.show();
			isShowing=true;
		};
		hide = function(){
			loader.hide();
			isShowing=false;
		};
		update = function(text, cancelable, cancelCallback){
			text ? loader.setMessage(text) : loader.setMessage(defaultText);
			cancelable ? loader.cancelable=true : loader.cancelable=false;
			typeof cancelCallback === "function"  ? loader.cancelCallback=cancelCallback : loader.cancelCallback=false;
		};
		loader.addEventListener("cancel",cancel);
		break;
	}
	
	

function cancel(e) {

	if (loader.cancelable) {
		if (Ti.Platform.name === "iPhone OS") hide();

		if (loader.cancelCallback) loader.cancelCallback();
	}
}

	
exports.show = show;
exports.update = update;
exports.hide = hide;
  
	

