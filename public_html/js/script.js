window.onload = function(){
	var menu_json = JSON.parse (menu);
	var menu_html = '<ul>';
	for (var key in menu_json.menu) {
		menu_html = menu_html + '<li id = "' + key + '" class="' + key + ' top_menu_item" onClick="menuOnClick(\'' + key + '\')">';
		menu_html = menu_html + menu_json.menu[key];
		menu_html = menu_html + '</li>';
	}
	menu_html = menu_html + '</ul>';

	document.getElementById("menu").innerHTML = menu_html;

	menuOnClick("menu_item1");	
};

function menuOnClick(key) {
	var content_json = JSON.parse (JSON.stringify (content));
	var active_menu_items = document.getElementsByClassName("top_menu_item");	
	[].forEach.call(active_menu_items, function(el) {
		el.classList.remove("active");
	});

	document.getElementById("demo").innerHTML = content_json[key];
	document.getElementById(key).classList.add('active');
}

function funcTest(id) {
	document.getElementById(id).innerHTML = "Hello Dima";
}