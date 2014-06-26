	var win = Ti.UI.createWindow({
	    backgroundColor: "#ffffff",
	    exitOnClose: true,
	});

	var tabbedBar = require("/ui/modules/TabbedBar");

	var bar = tabbedBar.createTabbedBar({
	    labels: ["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5"],
	    index: 0,
	    selectedColor: "#ffffff",
	    tintColor: "#007AFF",
	    top: 0,
	    width: "90%"
	});

	var animation = Titanium.UI.createAnimation({
	    duration: 500
	});

	bar.addEventListener("click", function (e) {
	    Ti.API.info(e.index);

	    switch (e.index) {
	    case 0:
	        animation.backgroundColor = "white";
	        break;
	    case 1:
	        animation.backgroundColor = "red";
	        break;
	    case 2:
	        animation.backgroundColor = "green";
	        break;
	    case 3:
	        animation.backgroundColor = "blue";
	        break;
	    case 4:
	        animation.backgroundColor = "black";
	        break;
	    }
	    win.animate(animation);
	});


	win.add(bar);

	win.open();