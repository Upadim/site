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

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    this.appendChild(document.getElementById(data));

    makeDropable();
    makeDragable();
}

function buildGameBoard () {
    var boardHtml = "";
    var numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort(function() {
        return .5 - Math.random();
    });

    var row = 1;
    var col = 1;
    
    for (i=1; i<=16; i++){
        boardHtml = boardHtml + '<div id="cell_' + row + '_' + col + '" class="cell" ondragover="allowDrop(event)" unselectable="on">';        
        if (numbers[i-1]) {
            boardHtml = boardHtml + '<div id="cell_content_' + row + '_' + col + '" class="cell_content">' + numbers[i -1] + '</div>';
        }
        boardHtml = boardHtml + '</div>';
        if (col < 4){
            col++;
        } else {
            col = 1;
        }

        if (i%4 === 0){
            boardHtml = boardHtml + '<div class="clear"></div>';
            row++;
        }   
    }
     
    document.getElementById('game').innerHTML = boardHtml;

    makeDropable();
    makeDragable();
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

function makeDragable (){
    var numbers = document.getElementById('game').getElementsByClassName('cell_content');
    Array.prototype.forEach.call(numbers, function(number) {
        number.removeAttribute('draggable');
    });

    var col_and_row;
    var cells = document.getElementById('game').getElementsByClassName('cell');   
    Array.prototype.forEach.call(cells, function(cell) {
        if (!cell.getElementsByClassName('cell_content').length){
            col_and_row = cell.id.split("_");        
        }
    });
 
    var row = parseInt(col_and_row[1]);    
    var col = parseInt(col_and_row[2]);
    
    var arr_cells = [];
    arr_cells[0] = String.prototype.concat('cell_',row-1,'_',col);
    arr_cells[1] = String.prototype.concat('cell_',row+1,'_',col);
    arr_cells[2] = String.prototype.concat('cell_',row,'_',col-1);
    arr_cells[3] = String.prototype.concat('cell_',row,'_',col+1);
    
    arr_cells.forEach(function(value){
        var container_cell = document.getElementById(value);
        if (typeof(container_cell) !== 'undefined' && container_cell !== null) {
            var dragable_cell = container_cell.getElementsByClassName('cell_content');
            if (dragable_cell.length) {
                dragable_cell[0].setAttribute('draggable', true);
                dragable_cell[0].addEventListener("dragstart", drag);
            }
        }        
    });
}