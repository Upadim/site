window.onload = function(){
        var requestURL = 'https://upadim.github.io/site/public_html/json/data.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
 
        request.onload = function() {
            var menu_json = request.response;
   
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
};

function menuOnClick(key) {
        var requestURL = 'https://upadim.github.io/site/public_html/json/data.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
 
        request.onload = function() {
            var content_json = request.response;

            var active_menu_items = document.getElementsByClassName("top_menu_item");	
            [].forEach.call(active_menu_items, function(el) {
		el.classList.remove("active");
            });

            document.getElementById("demo").innerHTML = content_json.content[key];
            document.getElementById(key).classList.add('active');   
        };
}