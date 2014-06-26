	var win = Ti.UI.createWindow({
		backgroundColor:"#ffffff",
		exitOnClose:true,
	});

	var tabbedBar = require("/ui/modules/TabbedBar");
	
	var bar = tabbedBar.createTabbedBar({labels:["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5"], index:0, selectedColor: "#ffffff",tintColor: "#007AFF", top:0, width:"90%"});
	
	bar.addEventListener("click", function(e){
		Ti.API.info(e.index);
		var animation = Titanium.UI.createAnimation({duration:500});
		switch(e.index){
			case 0:
			animation.backgroundColor="white";
			win.animate(animation);
			break;
			case 1:
			animation.backgroundColor="red";
			win.animate(animation);
			break;
			case 2:
			animation.backgroundColor="green";
			win.animate(animation);
			break;
			case 3:
			animation.backgroundColor="blue";
			win.animate(animation);
			break;
			case 4:
			animation.backgroundColor="black";
			win.animate(animation);
			break;
		}
	});
	
	
	win.add(bar);
	
	win.open();
