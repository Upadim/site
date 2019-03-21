var requestURL = 'https://upadim.github.io/site/public_html/json/data.json';
var request = new XMLHttpRequest();

window.onload = function(){
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var menu_json = request.response;

        var menu_html = '<ul>';
        for (var key in menu_json.menu) {
                menu_html = menu_html + '<li id = "' + key + '" class="' + key + ' top_menu_item" onClick="openPage(\'' + menu_json.menu[key].url + '\')">';
                menu_html = menu_html + menu_json.menu[key].name;
                menu_html = menu_html + '</li>';
        }
        menu_html = menu_html + '</ul>';

        document.getElementById("menu").innerHTML = menu_html;
	console.log(menu_json.menu[key].load_js);
	if (menu_json.menu[key].load_js) {
	    var add_js = document.createElement('script');
	    add_js.setAttribute("type","text/javascript");
	    add_js.setAttribute("src", "js/" + menu_json.menu[key].load_js);
	    document.getElementsByTagName("head")[0].appendChild(add_js);    
	}
    };
};

function openPage (url){
    window.open(url,"_self"); 
 }