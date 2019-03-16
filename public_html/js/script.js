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
                menu_html = menu_html + '<li id = "' + key + '" class="' + key + ' top_menu_item" onClick="menuOnClick(\'' + key + '\')">';
                menu_html = menu_html + menu_json.menu[key];
                menu_html = menu_html + '</li>';
        }
        menu_html = menu_html + '</ul>';

        document.getElementById("menu").innerHTML = menu_html;

        menuOnClick("menu_item1");	
    };
    
    buildGameBoard ();
};

function menuOnClick(key) {
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
 
        request.onload = function() {
            var content_json = request.response;

            var active_menu_items = document.getElementsByClassName("top_menu_item");	
            [].forEach.call(active_menu_items, function(el) {
		el.classList.remove("active");
            });

            document.getElementById("content").innerHTML = content_json.content[key];
            document.getElementById(key).classList.add('active');   
        };
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("content", ev.target.textContent);
}

function drop(evt) {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("text");
    this.appendChild(document.getElementById(data));
    makeDropable();
}

function buildGameBoard () {
    var boardHtml = "";
    var numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort(function() {
        return .5 - Math.random();
    });

    var row = 1;
    
    for (i=1; i<=16; i++){
        boardHtml = boardHtml + '<div id="cell_' + row + '_' + i + '" class="cell" ondragover="allowDrop(event)">';        
        if (numbers[i-1]) {
            boardHtml = boardHtml + '<div id="cell_content_' + numbers[i-1] + '" class="cell_content" draggable="true" ondragstart="drag(event)">' + numbers[i -1] + '</div>';
        }
        boardHtml = boardHtml + '</div>';
        if (i%4 === 0){
            boardHtml = boardHtml + '<div class="clear"></div>';
        }   
    }
     
    document.getElementById('game').innerHTML = boardHtml;

    makeDropable();
}

function makeDropable (){
    cells = document.getElementById('game').getElementsByClassName('cell');   
    Array.prototype.forEach.call(cells, function(cell) {
        cell.removeEventListener("drop", drop);
        if (!cell.getElementsByClassName('cell_content').length){
            cell.addEventListener("drop", drop);
        }
    });
}