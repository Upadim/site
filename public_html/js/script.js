var requestURL = 'https://upadim.github.io/site/public_html/json/data.json';
var request = new XMLHttpRequest();

window.onload = function () {
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
	var menu_json = request.response;
	var class_name;
	var active_json_node;
	var name = window.location.pathname.split("/").filter(function(c){return c.length;}).pop();
	
	var menu_html = '<ul>';
	for (var key in menu_json.menu) {
	    if (menu_json.menu[key].url === name) {
		class_name = key + " active";
		active_json_node = menu_json.menu[key];
	    } else {
		class_name = key;
	    }
		
	    menu_html = menu_html + '<li id = "' + key + '" class="' + class_name + ' top_menu_item" onClick="openPage(\'' + menu_json.menu[key].url + '\')">';
	    menu_html = menu_html + menu_json.menu[key].name;
	    menu_html = menu_html + '</li>';
	}
	menu_html = menu_html + '</ul>';

	document.getElementById("menu").innerHTML = menu_html;
	
	if (active_json_node.load_js) {
	    var add_js = document.createElement('script');
	    add_js.setAttribute("type", "text/javascript");
	    add_js.setAttribute("src", "js/" + active_json_node.load_js);
	    document.getElementsByTagName("head")[0].appendChild(add_js);
	}
    };
};

function openPage(url) {
    window.open(url, "_self");
}