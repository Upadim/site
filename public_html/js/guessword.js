var word_array;
var href = window.location.href;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

function getWord() {
    var myRequest = new XMLHttpRequest();
    myRequest.open("GET", dir + "/words/words.txt");
    myRequest.send();
    myRequest.onreadystatechange = function () {
	getWordCallback(myRequest);
    };
}

function getWordCallback(myRequest) {
    var word;
    var words;
    if (myRequest.readyState === 4 && myRequest.status === 200) {
	words = myRequest.responseText.split("\n"[0]);
	word = words[Math.floor(Math.random() * words.length)];
	buildWordBoard(word, buildImageBoard);
    }
}

function buildImageBoard() {
    var image;
    var i = 0;
    var timerID = setTimeout ( function runAgain(){
	if (i<12) {
	    image = '<img src="img/hang_' + i + '.jpg" alt="hang_img"/>';
	    document.getElementById("hang_container").innerHTML = image;	    
	    timerID = setTimeout(runAgain, 500);
	    i++;
	} else {
	    clearTimeout(timerID);
	}
    }, 100);
}

function buildWordBoard(word, callback) {
    var word_html = '';
    word_array = word.trim().split('');

    word_html = '<div id="hang_game_board">';
    word_html = word_html + '<div id="word_container">';
    for (var i = 0; i < word_array.length; i++) {
	console.log(word_array[i]);
	word_html = word_html + '<div class="letter_container">';
	if (i === 0 || i === word_array.length - 1) {
	    word_html = word_html + word_array[i];
	}
	word_html = word_html + "</div>";
    }
    word_html = word_html + '<div class = "clear"></div>';
    word_html = word_html + '</div>';
    word_html = word_html + '<div id = "hang_container">';
    word_html = word_html + '</div>';
    word_html = word_html + '</div>';

    document.getElementById("content").innerHTML = word_html;

    callback();
}

document.addEventListener("keypress", function(e){
  console.log('Key pressed:' + e.key);
  checkCharacter(e.key)
});

function checkCharacter(pressedChar){
    
}

getWord(dir);