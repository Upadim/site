function dragEnd() {

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

    if (!checkBoardState()) {
	makeDropable();
	makeDraggable();
    } else {
	theWin();
    }
}

function buildGameBoard() {
    var boardHtml = "";
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function () {
	return .5 - Math.random();
    });

    //Array to test a win state (just one move is needed
    //numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15];

    var row = 1;
    var col = 1;

    for (i = 1; i <= 16; i++) {
	boardHtml = boardHtml + '<div id="cell_' + row + '_' + col + '" class="cell" ondragover="allowDrop(event)" unselectable="on">';
	if (numbers[i - 1]) {
	    boardHtml = boardHtml + '<div id="cell_content_' + row + '_' + col;
	    boardHtml = boardHtml + '" class="cell_content" ondragstart = "drag(event)" ondragend = dragEnd(event) onclick = "clickEventHandler(event)">' + numbers[i - 1] + '</div>';
	}
	boardHtml = boardHtml + '</div>';
	if (col < 4) {
	    col++;
	} else {
	    col = 1;
	}

	if (i % 4 === 0) {
	    boardHtml = boardHtml + '<div class="clear"></div>';
	    row++;
	}
    }

    document.getElementById('game_board').innerHTML = boardHtml;

    makeDropable();
    makeDraggable();
}

function makeDropable() {
    cells = document.getElementById('game_board').getElementsByClassName('cell');
    Array.prototype.forEach.call(cells, function (cell) {
	cell.removeEventListener("drop", drop);
	if (!cell.getElementsByClassName('cell_content').length) {
	    cell.addEventListener("drop", drop);
	}
    });
}

function makeDraggable() {
    var numbers = document.getElementById('game_board').getElementsByClassName('cell_content');
    Array.prototype.forEach.call(numbers, function (number) {
	number.removeAttribute('draggable');
	number.classList.remove('draggable');
    });

    var col_and_row;
    var cells = document.getElementById('game_board').getElementsByClassName('cell');
    Array.prototype.forEach.call(cells, function (cell) {
	if (!cell.getElementsByClassName('cell_content').length) {
	    col_and_row = cell.id.split("_");
	}
    });

    var row = parseInt(col_and_row[1]);
    var col = parseInt(col_and_row[2]);

    var arr_cells = [];
    arr_cells[0] = String.prototype.concat('cell_', row - 1, '_', col);
    arr_cells[1] = String.prototype.concat('cell_', row + 1, '_', col);
    arr_cells[2] = String.prototype.concat('cell_', row, '_', col - 1);
    arr_cells[3] = String.prototype.concat('cell_', row, '_', col + 1);

    arr_cells.forEach(function (value) {
	var container_cell = document.getElementById(value);
	if (typeof (container_cell) !== 'undefined' && container_cell !== null) {
	    var dragable_cell = container_cell.getElementsByClassName('cell_content');
	    if (dragable_cell.length) {
		dragable_cell[0].setAttribute('draggable', true);
		dragable_cell[0].classList.add('draggable');
	    }
	}
    });
}

function buldGameControls() {
    rebuild_btn = '<input type="submit" value="Начать сначала" onclick="buildGameBoard()">';
    document.getElementById("game_controls").innerHTML = rebuild_btn;
}

function checkBoardState() {
    var result = true;
    var cells = document.getElementById('game_board').getElementsByClassName('cell');
    var i = 0;
    Array.prototype.forEach.call(cells, function (cell) {
	if (i >= 15) {
	    return result;
	} else {
	    i++;
	}
	var cell_content = cell.getElementsByClassName('cell_content');
	if (cell_content.length) {
	    if (i !== parseInt(cell_content[0].innerHTML)) {
		result = false;
	    }
	} else {
	    result = false;
	}
    });
    return result;
}

function theWin() {
    var win = '<div id="win">Победа!!!</div>';
    document.getElementById("game_board").innerHTML = win;
}

function clickEventHandler(evt) {
    var empty_cell_id;
    Array.prototype.forEach.call(cells, function (cell) {
	if (!cell.getElementsByClassName('cell_content').length) {
	    empty_cell_id = cell.id;
	}
    });
    if (document.getElementById(evt.target.id).getAttribute("draggable")) {
	document.getElementById(empty_cell_id).appendChild(document.getElementById(evt.target.id));
	makeDraggable();
	makeDropable();
    }
}

buildGameBoard();
buldGameControls();



